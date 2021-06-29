//  默认配置
import { Config } from "./types";
const config: Config = {
  // 默认主题
  theme: "default",
  editorWrap: <HTMLDivElement>document.getElementById("editorWrap"),
  editorDom: <HTMLTextAreaElement>document.getElementById("editor"),
  showDiv: <HTMLDivElement>document.getElementById("preview"),
  inputDom: <HTMLInputElement>document.getElementById("title"),
  saveBtn: <HTMLButtonElement>document.getElementById("saveBtn"),
  editBtn: <HTMLButtonElement>document.getElementById("editBtn"),
  toolbars: document.getElementsByClassName("toolbar"),
  md: 768,
  loading: <HTMLDivElement>document.getElementById("loading")
};

export default config;
