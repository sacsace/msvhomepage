export type QnaAnswer = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

export type QnaThread = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  answers: QnaAnswer[];
};
