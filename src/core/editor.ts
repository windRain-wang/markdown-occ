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
const md: MarkdownIt = new MarkdownIt({
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
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});
export function creator(config: Config = defaultConfig) {
  // config
  config = Object.assign({}, defaultConfig, config);
  const editorArea = new EditorArea(config.editorDom);
  const showView = new PreviewPanel(config.showDiv);
  new Title("", config.inputDom);
  const switchBtn = new SwitchBtn(
    config.saveBtn,
    config.editBtn,
    config.editorDom,
    config.showDiv
  );

  /**
   * 每当 editorArea.value 改变时， 触发事件
   */
  editorArea.edvalEventQuene.addEventListener(function () {
    const html = md.render(editorArea.editorValue);
    showView.showHtml = html;
  });

  /**
   * 工具栏
   */
  for (let i = 0; i < config.toolbars.length; i++) {
    const toolbar = config.toolbars[i];
    const toolFragment = document.createDocumentFragment();
    tools.forEach((tool: Tool) => {
      const copyTool = tool.toolDom.cloneNode();
      copyTool.addEventListener("click", function () {
        editorArea.handleToolEvent(tool.toolType);
      });
      toolFragment.appendChild(copyTool);
      toolFragment.appendChild(copyTool);
    });
    toolbar.appendChild(toolFragment);
  }

  // 初始状态时， 应该显示的样式
  const currentWindowWidth = document.body.clientWidth;
  if (currentWindowWidth <= config.md) {
    switchBtn.toPreview();
  } else {
    switchBtn.bothShow();
  }
  // 窗口变化时，应该显示的样式
  window.addEventListener("resize", function () {
    const currentWindowWidth = document.body.clientWidth;
    if (currentWindowWidth <= config.md) {
      switchBtn.toPreview();
    } else {
      switchBtn.bothShow();
    }
  });
}
