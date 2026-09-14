export type Row = Record<string, string>;

export type Template = {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
};

export type DocumentRecord = {
  id: string;
  recipient: string;
  email: string;
  template: string;
  status: "Generated" | "Failed" | "Pending";
  createdAt: string;
};
