export default class SwitchBtn {
  constructor(
    private saveBtn: HTMLButtonElement,
    private editorBtn: HTMLButtonElement,
    private editorDom: HTMLTextAreaElement,
    private showDom: HTMLElement
  ) {
    this.saveBtn.style.display = "none";
    this.bindEvent();
  }

  toEdit() {
    this.saveBtn.style.display = "inline-block";
    this.editorBtn.style.display = "none";
    this.editorDom.style.display = "block";
    this.showDom.style.display = "none";
  }

  toPreview() {
    this.saveBtn.style.display = "none";
    this.editorBtn.style.display = "inline-block";
    this.editorDom.style.display = "none";
    this.showDom.style.display = "block";
  }

  bothShow() {
    this.saveBtn.style.display = "none";
    this.editorBtn.style.display = "none";
    this.editorDom.style.display = "block";
    this.showDom.style.display = "block";
  }

  bindEvent() {
    const _this = this;
    this.saveBtn.addEventListener("click", function () {
      _this.toPreview();
    });

    this.editorBtn.addEventListener("click", function () {
      _this.toEdit();
    });
  }
}
