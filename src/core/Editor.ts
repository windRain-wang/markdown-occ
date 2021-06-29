//  如果按照面对对象的做法来做的话， 编辑器中的每一个 东西都是一个小对象，最后再组合起来
import EditorArea from "./EditorArea";
import PreviewPanel from "./PreviewPanel";
import Title from "./Title";
import SwitchBtn from "./SwitchBtn";
import tools, { Tool } from "./Tool";
import defaultConfig from "./config";
import { Config } from "./types";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

/**
 * 创建一个 markdown 编辑器，
 * 可以根据用户自定义的配置， 来创建 markdown 编辑器
 * 如果用户没有传入配置，则使用默认的配置
 */
export class Editor {
  private _config: Config = defaultConfig;
  private editorArea: EditorArea;
  private showView: PreviewPanel;
  private titleDom: Title;
  private switchBtn: SwitchBtn;
  private currentLayoutSize: string;
  private mdCompiler: MarkdownIt;
  constructor(config?: Object) {
    this._config = Object.assign({}, config, this._config);
    this.mdCompiler = this.initMdCompiler();
    const {
      editorDom,
      showDiv,
      inputDom,
      saveBtn,
      editBtn,
      editorWrap
    } = this._config;
    this.editorArea = new EditorArea(editorDom);
    this.showView = new PreviewPanel(showDiv);
    this.titleDom = new Title("", inputDom);
    this.switchBtn = new SwitchBtn(saveBtn, editBtn, editorWrap, showDiv);
    this.currentLayoutSize = "md";
    this.init();
  }

  /**
   * 根据配置来 初始化 markdown
   */
  init() {
    this.initTextarea();

    this.initToolbars();

    this.initStateStyle();

    this.bindResponseEvent();

    this.removeLoading();
  }

  /**
   * 初始化 markdown 编译器
   */
  initMdCompiler() {
    const _this = this;
    return new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) {}
        }

        return (
          '<pre class="hljs"><code>' +
          _this.mdCompiler.utils.escapeHtml(str) +
          "</code></pre>"
        );
      }
    });
  }

  /**
   * 每当 this.editorArea.value 改变时， 触发事件
   */
  initTextarea() {
    const _this = this;
    this.editorArea.edvalEventQuene.addEventListener(function () {
      const html = _this.mdCompiler.render(_this.editorArea.editorValue);
      _this.showView.showHtml = html;
    });
  }

  /**
   * 工具栏
   */
  initToolbars() {
    const _this = this;
    for (let i = 0; i < this._config.toolbars.length; i++) {
      const toolbar = this._config.toolbars[i];
      const toolFragment = document.createDocumentFragment();
      tools.forEach((tool: Tool) => {
        const copyTool = tool.toolDom.cloneNode();
        copyTool.addEventListener("click", function () {
          _this.editorArea.handleToolEvent(tool.toolType);
        });
        toolFragment.appendChild(copyTool);
        toolFragment.appendChild(copyTool);
      });
      toolbar.appendChild(toolFragment);
    }
  }

  // 初始状态时， 应该显示的样式
  initStateStyle() {
    const currentWindowWidth = document.body.clientWidth;
    if (currentWindowWidth <= this._config.md) {
      this.switchBtn.toPreview();
    } else {
      this.switchBtn.bothShow();
    }
  }
  // 窗口变化时，应该显示的样式
  bindResponseEvent() {
    const _this = this;
    window.addEventListener("resize", function () {
      const size = _this.getCurrentLayoutSize();
      if (size === _this.currentLayoutSize) {
        return;
      } else if (size === "md") {
        _this.switchBtn.toPreview();
      } else {
        _this.switchBtn.bothShow();
      }
      _this.currentLayoutSize = size;
    });
  }

  /**
   * 移除加载动画
   */
  removeLoading() {
    this._config.loading.remove();
  }

  getCurrentLayoutSize() {
    const currentWindowWidth = document.body.clientWidth;
    return currentWindowWidth <= this._config.md ? "md" : "lg";
  }
}
