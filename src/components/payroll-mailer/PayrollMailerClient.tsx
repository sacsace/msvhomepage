"use client";

import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MailSettingsPanel } from "@/components/payroll-mailer/MailSettingsPanel";
import { PayrollMailerPasswordGate } from "@/components/payroll-mailer/PayrollMailerPasswordGate";
import { payrollMailerPageCopy } from "@/lib/i18n/payroll-mailer-locale";
import type { SiteLocale } from "@/lib/site-locale";
import { formatCurrency, getWorkbookSheetNames, parsePayrollFromBuffer, readPayrollWorkbook } from "@/lib/payroll-mailer/payroll";
import { renderMailHtmlDocument } from "@/lib/payroll-mailer/email-compose";
import { isSmtpConfigured } from "@/lib/payroll-mailer/smtp-client";
import { normalizeEmployeeForSendApi, normalizeSmtpForSendApi } from "@/lib/payroll-mailer/send-payload";
import { renderTemplate } from "@/lib/payroll-mailer/template";
import type { ParsePayrollResult, SendResult } from "@/types/payroll-mailer";
import {
  COMPOSE_STORAGE_KEY,
  EMPTY_COMPOSE_SETTINGS,
  EMPTY_SMTP_SETTINGS,
  SMTP_STORAGE_KEY,
  type PayrollComposeSettings,
  type SmtpSettings,
} from "@/types/payroll-mailer";

const PAYROLL_MAILER_API = "/api/payroll-mailer";

const StepTitle = ({ label }: { label: string }) => (
  <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
);

type PayrollMailerClientProps = {
  locale: SiteLocale;
};

type AccessState = "loading" | "not_configured" | "locked" | "unlocked";

export function PayrollMailerClient({ locale }: PayrollMailerClientProps) {
  const copy = useMemo(() => payrollMailerPageCopy(locale), [locale]);
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings>(EMPTY_SMTP_SETTINGS);
  const [data, setData] = useState<ParsePayrollResult | null>(null);
  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(null);
  const [subjectTemplate, setSubjectTemplate] = useState(copy.defaultSubject);
  const [bodyTemplate, setBodyTemplate] = useState(copy.defaultBody);
  const [defaultCc, setDefaultCc] = useState(EMPTY_COMPOSE_SETTINGS.defaultCc);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendResults, setSendResults] = useState<SendResult[]>([]);
  const [finalConfirmChecked, setFinalConfirmChecked] = useState(false);
  const composeStorageReadyRef = useRef(false);

  const refreshAccess = useCallback(async () => {
    try {
      const res = await fetch(`${PAYROLL_MAILER_API}/access`, { cache: "no-store" });
      const data = (await res.json()) as { configured?: boolean; unlocked?: boolean };
      if (!data.configured) {
        setAccessState("not_configured");
        return;
      }
      setAccessState(data.unlocked ? "unlocked" : "locked");
    } catch {
      setAccessState("not_configured");
    }
  }, []);

  useEffect(() => {
    void refreshAccess();
  }, [refreshAccess]);

  const mailUnlocked = accessState === "unlocked";
  const gateCopy = useMemo(
    () => ({
      title: copy.accessGateTitle,
      lead: copy.accessGateLead,
      passwordLabel: copy.accessPasswordLabel,
      submit: copy.accessSubmit,
      submitting: copy.accessSubmitting,
      wrongPassword: copy.accessWrongPassword,
      genericError: copy.accessGenericError,
    }),
    [copy],
  );

  useEffect(() => {
    startTransition(() => {
      try {
        const stored = sessionStorage.getItem(SMTP_STORAGE_KEY);
        if (stored) {
          setSmtpSettings(JSON.parse(stored) as SmtpSettings);
        }
      } catch {
        sessionStorage.removeItem(SMTP_STORAGE_KEY);
      }
      try {
        const composeStored = sessionStorage.getItem(COMPOSE_STORAGE_KEY);
        if (composeStored) {
          const parsed = JSON.parse(composeStored) as PayrollComposeSettings;
          if (typeof parsed.defaultCc === "string") {
            setDefaultCc(parsed.defaultCc);
          }
        }
      } catch {
        sessionStorage.removeItem(COMPOSE_STORAGE_KEY);
      }
      composeStorageReadyRef.current = true;
    });
  }, []);

  useEffect(() => {
    if (!composeStorageReadyRef.current) return;
    try {
      const payload: PayrollComposeSettings = { defaultCc };
      sessionStorage.setItem(COMPOSE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota errors */
    }
  }, [defaultCc]);

  const smtpReady = isSmtpConfigured(smtpSettings);

  const selectedEmployee = useMemo(
    () => data?.employees.find((employee) => employee.rowNumber === selectedRowNumber) ?? null,
    [data?.employees, selectedRowNumber],
  );

  const mailPreviewHtml = useMemo(
    () => (selectedEmployee ? renderMailHtmlDocument(bodyTemplate, selectedEmployee, locale) : ""),
    [bodyTemplate, selectedEmployee, locale],
  );

  const hasCriticalError = useMemo(
    () => Boolean(data?.issues.some((issue) => issue.severity === "error")),
    [data?.issues],
  );

  const [workbookBuffer, setWorkbookBuffer] = useState<ArrayBuffer | null>(null);
  const [availableSheets, setAvailableSheets] = useState<string[]>([]);
  const [selectedSheetName, setSelectedSheetName] = useState("");

  const formatUploadError = (error: unknown): string => {
    const raw = error instanceof Error ? error.message : copy.uploadGenericError;
    if (/password|암호|encryption|ECMA-376|Unsupported password|password-protected/i.test(raw)) {
      return copy.uploadPasswordHint;
    }
    return raw;
  };

  const applyParsedData = (parsed: ParsePayrollResult) => {
    if (!parsed.employees.length) {
      throw new Error(copy.noEmployees);
    }
    setData(parsed);
    setSelectedRowNumber(parsed.employees[0].rowNumber);
    setAvailableSheets([]);
    setWorkbookBuffer(null);
  };

  const readExcelAndMaybeParse = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const workbook = readPayrollWorkbook(buffer);
    setWorkbookBuffer(buffer);
    const names = getWorkbookSheetNames(workbook);
    if (!names.length) {
      throw new Error(copy.noSheets);
    }
    if (names.length === 1) {
      const parsed = parsePayrollFromBuffer(buffer, names[0]);
      applyParsedData(parsed);
      return;
    }
    setAvailableSheets(names);
    setSelectedSheetName(names[0]);
    setData(null);
    setSelectedRowNumber(null);
    setSendResults([]);
    setSendError("");
    setFinalConfirmChecked(false);
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError("");
    setSendResults([]);
    setSendError("");
    setFinalConfirmChecked(false);
    try {
      await readExcelAndMaybeParse(file);
    } catch (error) {
      setData(null);
      setSelectedRowNumber(null);
      setAvailableSheets([]);
      setWorkbookBuffer(null);
      setUploadError(formatUploadError(error));
    } finally {
      setIsUploading(false);
    }
  };

  const loadSelectedSheet = async () => {
    if (!workbookBuffer || !selectedSheetName) return;
    setIsUploading(true);
    setUploadError("");
    try {
      const parsed = parsePayrollFromBuffer(workbookBuffer, selectedSheetName);
      applyParsedData(parsed);
    } catch (error) {
      setUploadError(formatUploadError(error));
    } finally {
      setIsUploading(false);
    }
  };

  const sendEmails = async (onlyFailed = false) => {
    if (!data) return;
    if (!smtpReady) {
      setSendError(copy.sendNeedSmtp);
      return;
    }
    setIsSending(true);
    setSendError("");

    try {
      const failedIds = sendResults.filter((result) => !result.success).map((result) => result.employeeId);

      const response = await fetch(`${PAYROLL_MAILER_API}/send-payslips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smtp: normalizeSmtpForSendApi(smtpSettings),
          employees: data.employees.map(normalizeEmployeeForSendApi),
          subjectTemplate,
          bodyTemplate,
          defaultCc: defaultCc.trim(),
          onlyEmployeeIds: onlyFailed ? failedIds : undefined,
          locale,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message ?? copy.sendErrorGeneric);
      }

      const nextResults = result.results as SendResult[];
      if (onlyFailed) {
        const successById = new Map(nextResults.map((item) => [item.employeeId, item]));
        setSendResults((previous) => previous.map((item) => successById.get(item.employeeId) ?? item));
      } else {
        setSendResults(nextResults);
      }
    } catch (error) {
      setSendError(error instanceof Error ? error.message : copy.sendErrorGeneric);
    } finally {
      setIsSending(false);
    }
  };

  const failedCount = sendResults.filter((result) => !result.success).length;

  if (accessState === "loading") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        {copy.accessLoading}
      </div>
    );
  }

  if (accessState === "not_configured") {
    return (
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-amber-900">{copy.accessNotConfiguredTitle}</h2>
        <p className="mt-2 text-sm text-amber-800">{copy.accessNotConfiguredLead}</p>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto w-full max-w-screen-2xl flex-1 space-y-6">
        {accessState === "locked" ? (
          <>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {copy.accessLockedMailHint}
            </p>
            <PayrollMailerPasswordGate copy={gateCopy} onUnlocked={() => setAccessState("unlocked")} />
          </>
        ) : null}

        {mailUnlocked ? <MailSettingsPanel settings={smtpSettings} onChange={setSmtpSettings} mail={copy.mail} /> : null}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <StepTitle label={copy.step(1, copy.step1Title)} />
          <p className="mt-2 text-sm text-slate-600">
            {copy.excelIntro}{" "}
            <a href="/samples/payroll-sample.xlsx" className="font-semibold text-blue-700 hover:underline">
              {copy.sampleDownload}
            </a>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>{copy.bulletPassword}</li>
            <li>{copy.bulletSheets}</li>
            <li>{copy.bulletLayout}</li>
          </ul>
          <div className="mt-4">
            <input
              type="file"
              accept=".xlsx"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void handleFileUpload(file);
                }
              }}
              className="block w-full cursor-pointer rounded-md border border-slate-300 p-2 text-sm text-slate-700"
            />
          </div>
          {availableSheets.length > 1 && (
            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">
                {copy.sheetPickerTitle.replace("{count}", String(availableSheets.length))}
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <div>
                  <label htmlFor="sheet-select" className="mb-1 block text-xs font-medium text-blue-900">
                    {copy.sheetNameLabel}
                  </label>
                  <select
                    id="sheet-select"
                    value={selectedSheetName}
                    onChange={(event) => setSelectedSheetName(event.target.value)}
                    className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                  >
                    {availableSheets.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => void loadSelectedSheet()}
                  className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {copy.loadSheet}
                </button>
              </div>
            </div>
          )}
          {isUploading && <p className="mt-3 text-sm text-slate-600">{copy.uploading}</p>}
          {uploadError && <p className="mt-3 rounded bg-red-50 p-3 text-sm text-red-700">{uploadError}</p>}
        </section>

        {mailUnlocked ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <StepTitle label={copy.step(2, copy.step2Title)} />
          <p className="mt-2 text-sm text-slate-600">
            {copy.mailVarsIntro} <code>{"{{employeeName}}"}</code>, <code>{"{{employeeId}}"}</code>,{" "}
            <code>{"{{department}}"}</code>, <code>{"{{designation}}"}</code>, <code>{"{{month}}"}</code>,{" "}
            <code>{"{{payrollMonth}}"}</code>, <code>{"{{payslip}}"}</code> {copy.payslipVarNote}
          </p>
          <p className="mt-1 text-xs text-slate-500">{copy.monthVariableHint}</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
                {copy.mailSubjectLabel}
              </label>
              <input
                id="subject"
                type="text"
                value={subjectTemplate}
                onChange={(event) => setSubjectTemplate(event.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="default-cc" className="mb-1 block text-sm font-medium text-slate-700">
                {copy.mailCcLabel}
              </label>
              <input
                id="default-cc"
                type="text"
                value={defaultCc}
                onChange={(event) => setDefaultCc(event.target.value)}
                placeholder={copy.mailCcPlaceholder}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-800"
                autoComplete="email"
              />
              <p className="mt-1 text-xs text-slate-500">{copy.mailCcHint}</p>
            </div>
            <div>
              <label htmlFor="body" className="mb-1 block text-sm font-medium text-slate-700">
                {copy.mailBodyLabel}
              </label>
              <textarea
                id="body"
                value={bodyTemplate}
                onChange={(event) => setBodyTemplate(event.target.value)}
                rows={8}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-800"
              />
            </div>
            {selectedEmployee ? (
              <div className="rounded border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">{copy.previewTitle}</p>
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-medium">{copy.previewSubjectLabel}</span>{" "}
                  {renderTemplate(subjectTemplate, selectedEmployee)}
                </p>
                <p className="mt-3 text-sm font-medium text-slate-800">{copy.previewBodyTitle}</p>
                <div className="mt-1 overflow-hidden rounded border border-slate-200 bg-white shadow-inner">
                  <iframe
                    title={copy.previewIframeTitle}
                    srcDoc={mailPreviewHtml}
                    className="h-[min(75vh,640px)] w-full min-h-[320px] border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            ) : (
              <p className="rounded border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">{copy.previewNeedExcel}</p>
            )}
          </div>
        </section>
        ) : null}

        {data && (
          <>
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <StepTitle label={copy.step(3, copy.step3Title)} />
              <p className="mt-1 text-xs text-slate-500">
                {copy.dataSheetLabel}: {data.sheetName} · {data.template === "msv" ? copy.templateMsv : copy.templateLegacy}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{copy.statSendable}</p>
                  <p className="text-xl font-bold text-slate-900">{data.employees.length}</p>
                </div>
                <div className="rounded border border-slate-200 bg-amber-50 p-3">
                  <p className="text-xs text-slate-500">{copy.statExcluded}</p>
                  <p className="text-xl font-bold text-amber-700">{data.excludedEmployees.length}</p>
                </div>
                <div className="rounded border border-slate-200 bg-rose-50 p-3">
                  <p className="text-xs text-slate-500">{copy.statIssues}</p>
                  <p className="text-xl font-bold text-rose-700">{data.issues.length}</p>
                </div>
              </div>

              {data.excludedEmployees.length > 0 && (
                <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-4">
                  <h3 className="text-sm font-semibold text-amber-800">{copy.excludedHeading}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-800">
                    {data.excludedEmployees.map((employee) => (
                      <li key={`${employee.employeeId}-${employee.rowNumber}`}>
                        {employee.employeeName} ({employee.employeeId}) - {employee.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.issues.length > 0 && (
                <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-800">{copy.issuesHeading}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {data.issues.map((issue, index) => (
                      <li key={`${issue.rowNumber}-${issue.message}-${index}`} className={issue.severity === "error" ? "text-red-700" : "text-amber-700"}>
                        {copy.formatIssueRow(issue.rowNumber)}: {issue.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <StepTitle label={copy.step(4, copy.step4Title)} />
              <div className="mt-4 grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="space-y-2 rounded border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-700">{copy.selectEmployee}</p>
                  <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                    {data.employees.map((employee) => (
                      <button
                        key={`${employee.employeeId}-${employee.rowNumber}`}
                        type="button"
                        onClick={() => setSelectedRowNumber(employee.rowNumber)}
                        className={`w-full rounded border px-3 py-2 text-left text-sm ${
                          selectedRowNumber === employee.rowNumber
                            ? "border-blue-500 bg-blue-50 text-blue-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <p className="font-semibold">{employee.employeeName}</p>
                        <p className="text-xs text-slate-500">{employee.employeeId}</p>
                      </button>
                    ))}
                  </div>
                </aside>

                {selectedEmployee && (
                  <div className="rounded border border-slate-200 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {selectedEmployee.employeeName} ({selectedEmployee.month})
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded border border-slate-200 p-3">
                        <p className="text-xs text-slate-500">{copy.employeeInfo}</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-700">
                          <li>
                            {copy.labelId}: {selectedEmployee.employeeId}
                          </li>
                          <li>
                            {copy.labelEmail}: {selectedEmployee.email}
                          </li>
                          <li>
                            {copy.labelDept}: {selectedEmployee.department}
                          </li>
                          {selectedEmployee.designation ? (
                            <li>
                              {copy.labelRole}: {selectedEmployee.designation}
                            </li>
                          ) : null}
                        </ul>
                      </div>
                      <div className="rounded border border-slate-200 p-3">
                        <p className="text-xs text-slate-500">{copy.netPayLabel}</p>
                        <p className="mt-3 text-2xl font-bold text-emerald-700">
                          INR {formatCurrency(selectedEmployee.netSalary)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded border border-slate-200 p-3">
                        <p className="text-sm font-semibold text-slate-800">{copy.earningsHeading}</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-700">
                          <li>Basic Salary: INR {formatCurrency(selectedEmployee.basicSalary)}</li>
                          <li>HRA: INR {formatCurrency(selectedEmployee.hra)}</li>
                          <li>OT pay: INR {formatCurrency(selectedEmployee.otPay)}</li>
                          {selectedEmployee.dayShiftAllowance > 0 ||
                          selectedEmployee.nightShiftAllowance > 0 ? (
                            <>
                              {selectedEmployee.dayShiftAllowance > 0 ? (
                                <li>
                                  Day shift allowance: INR{" "}
                                  {formatCurrency(selectedEmployee.dayShiftAllowance)}
                                </li>
                              ) : null}
                              {selectedEmployee.nightShiftAllowance > 0 ? (
                                <li>
                                  Night shift allowance: INR{" "}
                                  {formatCurrency(selectedEmployee.nightShiftAllowance)}
                                </li>
                              ) : null}
                            </>
                          ) : (
                            <li>
                              Night/Day shift allowance: INR{" "}
                              {formatCurrency(selectedEmployee.nightDayShiftAllowance)}
                            </li>
                          )}
                          {selectedEmployee.otherAllowance > 0 ? (
                            <li>Transport Allowance: INR {formatCurrency(selectedEmployee.otherAllowance)}</li>
                          ) : null}
                          <li>Gross Salary: INR {formatCurrency(selectedEmployee.grossSalary)}</li>
                        </ul>
                      </div>
                      <div className="rounded border border-slate-200 p-3">
                        <p className="text-sm font-semibold text-slate-800">{copy.deductionsHeading}</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-700">
                          <li>PF: INR {formatCurrency(selectedEmployee.pf)}</li>
                          <li>ESI: INR {formatCurrency(selectedEmployee.esi)}</li>
                          <li>PT: INR {formatCurrency(selectedEmployee.pt)}</li>
                          <li>TDS: INR {formatCurrency(selectedEmployee.tds)}</li>
                          <li>Other Deduction: INR {formatCurrency(selectedEmployee.otherDeduction)}</li>
                          <li>Total Deduction: INR {formatCurrency(selectedEmployee.totalDeduction)}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {mailUnlocked ? (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <StepTitle label={copy.step(5, copy.step5Title)} />
              <div className="mt-4 space-y-3">
                {!smtpReady && <p className="rounded bg-amber-50 p-3 text-sm text-amber-800">{copy.sendCompleteSmtp}</p>}
                {hasCriticalError && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{copy.sendBlockedNet}</p>}
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={finalConfirmChecked}
                    onChange={(event) => setFinalConfirmChecked(event.target.checked)}
                  />
                  {copy.sendConfirmLabel}
                </label>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={isSending || hasCriticalError || !finalConfirmChecked || !smtpReady}
                    onClick={() => void sendEmails(false)}
                    className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {isSending ? copy.sendInProgress : copy.sendAll}
                  </button>
                  <button
                    type="button"
                    disabled={isSending || failedCount === 0 || !smtpReady}
                    onClick={() => void sendEmails(true)}
                    className="rounded bg-amber-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {copy.resendFailed} ({failedCount})
                  </button>
                </div>
                {sendError && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{sendError}</p>}
              </div>

              {sendResults.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded border border-slate-200">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="border-b border-slate-200 px-3 py-2">{copy.tableEmployee}</th>
                        <th className="border-b border-slate-200 px-3 py-2">{copy.tableEmail}</th>
                        <th className="border-b border-slate-200 px-3 py-2">{copy.tableStatus}</th>
                        <th className="border-b border-slate-200 px-3 py-2">{copy.tableMessage}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sendResults.map((result) => (
                        <tr key={`${result.employeeId}-${result.email}`} className="odd:bg-white even:bg-slate-50">
                          <td className="border-b border-slate-200 px-3 py-2">
                            {result.employeeName} ({result.employeeId})
                          </td>
                          <td className="border-b border-slate-200 px-3 py-2">{result.email}</td>
                          <td
                            className={`border-b border-slate-200 px-3 py-2 font-semibold ${
                              result.success ? "text-emerald-700" : "text-red-700"
                            }`}
                          >
                            {result.success ? copy.statusOk : copy.statusFail}
                          </td>
                          <td className="border-b border-slate-200 px-3 py-2">{result.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
