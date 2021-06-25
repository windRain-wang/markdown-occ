//  默认配置
import { Config } from "./types";
const config: Config = {
  // 默认主题
  theme: "default",
  editorDom: document.getElementById("editor") as HTMLTextAreaElement,
  showDiv: <HTMLElement>document.getElementById("preview"),
  inputDom: <HTMLInputElement>document.getElementById("title"),
  saveBtn: <HTMLButtonElement>document.getElementById("saveBtn"),
  editBtn: <HTMLButtonElement>document.getElementById("editBtn"),
  toolbars: document.getElementsByClassName("toolbar"),
  md: 768
};

export default config;
