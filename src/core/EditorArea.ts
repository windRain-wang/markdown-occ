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
      case ToolActions.FontItalic:
        this.setFontItalic();
        break;
      case ToolActions.FontDel:
        this.setFontDel();
        break;
      case ToolActions.Headline1:
        this.addHeadline(1);
        break;
      case ToolActions.Headline2:
        this.addHeadline(2);
        break;
      case ToolActions.Headline3:
        this.addHeadline(3);
        break;
      case ToolActions.Headline4:
        this.addHeadline(4);
        break;
      case ToolActions.Headline5:
        this.addHeadline(5);
        break;
      case ToolActions.Headline6:
        this.addHeadline(6);
        break;
      case ToolActions.Table:
        this.addTable();
        break;
      default:
        break;
    }
  }
  /**
   * 处理字体样式
   * 粗体、斜体、删除线
   */
  private handleFontStyle() {
    const [start, end] = this.getCurrentPosition();
    const frontText = this.editorValue.substring(0, start),
      usingText = this.editorValue.substring(start, end),
      endText = this.editorValue.substring(end);
    return [frontText, usingText, endText];
  }
  /**
   * 使选中字体变粗
   */
  private setFontBlod() {
    const [frontText, usingText, endText] = this.handleFontStyle();
    this.editorValue = frontText.concat(`**${usingText}**`, endText);
  }

  /**
   * 使选中的字体变成斜体
   */
  private setFontItalic() {
    const [frontText, usingText, endText] = this.handleFontStyle();
    this.editorValue = frontText.concat(`*${usingText}*`, endText);
  }

  /**
   * 是选中的字体样式 编程删除线样式的
   */
  private setFontDel() {
    const [frontText, usingText, endText] = this.handleFontStyle();
    this.editorValue = frontText.concat(`~~${usingText}~~`, endText);
  }

  /**
   * 添加标题级别
   * @param level 标题级别
   */
  private addHeadline(level: number) {
    const [start] = this.getCurrentPosition();
    const usingText = this.editorValue.substring(0, start),
      otherText = this.editorValue.substring(start),
      usingTextArr = usingText.split("\n"),
      len = usingTextArr.length;
    if (len) {
      usingTextArr[len - 1] = "#".repeat(level) + " " + usingTextArr[len - 1];
      this.editorValue = usingTextArr.join("\n") + otherText;
    }
  }

  /**
   * 添加表格
   */
  private addTable() {
    const [start] = this.getCurrentPosition();
    const usingText = this.editorValue.substring(0, start),
      otherText = this.editorValue.substring(start),
      otherTextarr = otherText.split("\n"),
      len = otherTextarr.length,
      tableText =
        "\n" +
        "|     |     |     |\n" +
        "| --- | --- | --- |\n" +
        "|     |     |     |\n" +
        "|     |     |     |\n" +
        "|     |     |     |\n";
    if (len) {
      otherTextarr[0] = otherTextarr[0] + tableText;
      this.editorValue = usingText.concat(otherTextarr.join("\n"));
    } else {
      this.editorValue = tableText;
    }
  }
}
