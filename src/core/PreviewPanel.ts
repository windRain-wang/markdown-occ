export default class PreviewPanel {
  // private _showDiv: HTMLElement = document.createElement("div");
  private _showHtmlText: string = "";

  constructor(private _showDiv: HTMLElement) {}

  public set showHtml(v: string) {
    this._showHtmlText = v;
    this.setShowDivValue(v);
  }

  public get showDiv(): HTMLElement {
    return this._showDiv;
  }

  public setShowDivValue(v: string) {
    this._showDiv.innerHTML = v;
  }
}
