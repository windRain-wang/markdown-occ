import { MonitorEventQueue } from "./EventQueue";
import { ToolActions } from "./types";
export default class EditorArea {
  private _editorValue: string = "";
  public edvalEventQuene = new MonitorEventQueue();

  constructor(private _editorDom: HTMLTextAreaElement) {
    this.bindEvent();
  }

  public get editorValue(): string {
    return this._editorValue;
  }

  public set editorValue(v: string) {
    this._editorValue = v;
    this.setTextareaValue(v);
    this.edvalEventQuene.excuteEventQueue();
  }

  public get editorDom(): HTMLTextAreaElement {
    return this._editorDom;
  }

  public bindEvent() {
    const _this = this;
    this._editorDom.addEventListener("input", function () {
      if (_this.editorValue !== this.value) {
        _this.editorValue = this.value;
      }
    });
  }

  public setTextareaValue(v: string) {
    this._editorDom.value = v;
  }

  public getCurrentPosition(): number[] {
    const { selectionStart, selectionEnd } = this.editorDom;
    return [selectionStart, selectionEnd];
  }

  /**
   * 添加 工具时间
   * 相当于 redux 中的 reducer
   * @param actionName 工具名称
   */
  public handleToolEvent(actionName: ToolActions) {
    console.log("actionName", actionName);
    switch (actionName) {
      case ToolActions.FontBlod:
        this.setFontBlod();
        break;

      default:
        break;
    }
  }
  /**
   * 是选中字体变粗
   */
  public setFontBlod() {
    const [start, end] = this.getCurrentPosition();
    const frontText = this.editorValue.substring(0, start),
      usingText = this.editorValue.substring(start, end),
      endText = this.editorValue.substring(end);
    this.editorValue = frontText.concat(`**${usingText}**`, endText);
  }
}
