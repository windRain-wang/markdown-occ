export default class Title {
  constructor(private _title: string, private titleDom: HTMLInputElement) {
    this.bindEvent();
  }

  public get value(): string {
    return this._title;
  }

  public set title(v: string) {
    console.log("title", v);
    this._title = v;
    this.titleDom.value = v;
  }

  bindEvent() {
    const _this = this;
    this.titleDom.addEventListener("input", function (e) {
      _this.title = this.value;
    });
  }
}
