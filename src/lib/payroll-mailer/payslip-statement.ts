/** English amount in words (Indian grouping), for payslip footer */

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const belowHundred = (n: number): string => {
  if (n < 20) return ones[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return tens[t] + (o ? ` ${ones[o]}` : "");
};

const belowThousand = (n: number): string => {
  if (n < 100) return belowHundred(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return `${ones[h]} Hundred${rest ? ` ${belowHundred(rest)}` : ""}`;
};

export const rupeesInWords = (amount: number): string => {
  let n = Math.round(Math.abs(amount));
  if (n === 0) return "Zero Rupees Only";

  const parts: string[] = [];
  const crores = Math.floor(n / 10000000);
  n %= 10000000;
  const lakhs = Math.floor(n / 100000);
  n %= 100000;
  const thousands = Math.floor(n / 1000);
  n %= 1000;

  if (crores) parts.push(`${belowHundred(crores)} Crore`.trim());
  if (lakhs) parts.push(`${belowHundred(lakhs)} Lakh`.trim());
  if (thousands) parts.push(`${belowThousand(thousands)} Thousand`.trim());
  if (n) parts.push(belowThousand(n));

  const body = `${parts.join(" ").replace(/\s+/g, " ").trim()}`;
  const rounded = Math.round(Math.abs(amount));
  const suffix = rounded === 1 ? "Rupee Only" : "Rupees Only";
  return `${body} ${suffix}`;
};
