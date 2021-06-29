export enum ToolActions {
  FontBlod,
  FontItalic,
  FontDel,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Table
}

export type Config = {
  theme: string;
  editorWrap: HTMLDivElement;
  editorDom: HTMLTextAreaElement;
  showDiv: HTMLDivElement;
  inputDom: HTMLInputElement;
  saveBtn: HTMLButtonElement;
  editBtn: HTMLButtonElement;
  toolbars: HTMLCollection;
  md: number;
  loading: HTMLDivElement;
};
