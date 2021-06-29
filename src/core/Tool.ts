import { ToolActions } from "./types";

/**
 * 创建 工具
 * 相当于 redux 中 createAction
 */
export class Tool {
  private _toolDom: HTMLElement = document.createElement("i");
  constructor(
    private toolName: string,
    private icon: string,
    private _toolType: ToolActions
  ) {
    this._toolDom.classList.add(
      "iconfont",
      this.icon,
      "cursor-pointer",
      "hover:bg-gray-600"
    );
    this._toolDom.setAttribute("title", this.toolName);
  }

  public get toolDom(): HTMLSpanElement {
    return this._toolDom;
  }

  public get toolType(): ToolActions {
    return this._toolType;
  }

  // public bindClickEvent(fn: (e: Event) => void) {
  //   this._toolDom.addEventListener("click", fn);
  // }
}
// 创建的工具功能应该 和 EditorArea 的功能相对应
// new Tool() 类似于 redux action
// EditorArea 类似于 redux reducers
// tool click 类似于 redux dispatch

export default [
  // 字体变粗
  new Tool("加粗", "icon-bold", ToolActions.FontBlod),
  // 字体斜体
  new Tool("斜体", "icon-italic", ToolActions.FontItalic),
  // del 线
  new Tool("删除线", "icon-strike", ToolActions.FontDel),
  // H1
  new Tool("H1", "icon-h11", ToolActions.Headline1),
  // H2
  new Tool("H2", "icon-h", ToolActions.Headline2),
  // H3
  new Tool("H3", "icon-h31", ToolActions.Headline3),
  // H4
  new Tool("H4", "icon-h3", ToolActions.Headline4),
  // H5
  new Tool("H5", "icon-h1", ToolActions.Headline5),
  // H6
  new Tool("H6", "icon-h2", ToolActions.Headline6),
  // table
  new Tool("Table", "icon-table", ToolActions.Table)
];
