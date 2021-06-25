export enum ToolActions {
  FontBlod,
  FontItalic,
  FontDel
}

export type Config = {
  theme: string;
  editorDom: HTMLTextAreaElement;
  showDiv: HTMLElement;
  inputDom: HTMLInputElement;
  saveBtn: HTMLButtonElement;
  editBtn: HTMLButtonElement;
  toolbars: HTMLCollection;
  md: number;
};
