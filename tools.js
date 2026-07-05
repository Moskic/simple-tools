const tools = [
  {
    name: "Steam Market Ratio Calculator",
    nameZh: "Steam 挂刀比例计算器",
    description: "Calculate Steam Wallet proceeds, market fees, and the ratio after selling an externally purchased item.",
    descriptionZh: "计算外部平台买入饰品后在 Steam 市场卖出的到账余额、手续费和挂刀比例。",
    url: "./steam_ratio_calculator/",
  },
  {
    name: "WIDE Evo Print Quality Unlock",
    nameZh: "WIDE Evo 打印画质解锁",
    description: "Prepare photos for direct TF card printing on WIDE Evo to bypass phone-transfer compression and unlock higher print resolution.",
    descriptionZh: "将照片处理为 WIDE Evo 认可的格式，通过 TF 卡直接打印，绕过手机传图压缩并解锁更高打印分辨率。",
    url: "./wide_evo_print_quality_unlock/",
  },
  {
    name: "Base64 Encoder & Decoder",
    nameZh: "Base64 编码与解码",
    description: "Encode text as Base64 or decode Base64 back to readable text, entirely in your browser.",
    descriptionZh: "在浏览器本地将文本编码为 Base64，或将 Base64 解码为可读文本。",
    url: "./base64_encode_decode/",
  },
];

const toolGrid = document.querySelector("#tool-grid");
const toolCount = document.querySelector("#tool-count");
const languageToggle = document.querySelector("#language-toggle");

const translations = {
  zh: {
    pageTitle: "一些简单实用的网页工具",
    toolsTitle: "工具箱",
    count: (count) => `${count} 个工具`,
    switchLabel: "Switch to English",
    switchText: "EN",
  },
  en: {
    pageTitle: "Simple, practical web tools",
    toolsTitle: "Toolbox",
    count: (count) => `${count} ${count === 1 ? "tool" : "tools"}`,
    switchLabel: "切换到中文",
    switchText: "中文",
  },
};

let currentLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createToolCard(tool, index, language) {
  const card = createElement("a", "tool-card");
  card.href = tool.url;
  const toolName = language === "zh" ? tool.nameZh : tool.name;
  const toolDescription = language === "zh" ? tool.descriptionZh : tool.description;
  card.setAttribute("aria-label", toolName);

  const number = createElement("span", "card-number", String(index + 1).padStart(2, "0"));
  const arrow = createElement("span", "card-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");

  const title = createElement("h3", "", toolName);
  const description = createElement("p", "tool-description", toolDescription);

  card.append(number, arrow, title, description);
  return card;
}

function renderTools(language) {
  toolGrid.replaceChildren();

  if (tools.length === 0) {
    toolCount.textContent = translations[language].count(0);
    return;
  }

  const fragment = document.createDocumentFragment();
  tools.forEach((tool, index) => fragment.append(createToolCard(tool, index, language)));
  toolGrid.append(fragment);
  toolCount.textContent = translations[language].count(tools.length);
}

function renderPage() {
  const text = translations[currentLanguage];
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = "Tools | moskic.com";
  document.querySelector("#page-title").textContent = text.pageTitle;
  document.querySelector("#tools-title").textContent = text.toolsTitle;
  languageToggle.textContent = text.switchText;
  languageToggle.setAttribute("aria-label", text.switchLabel);
  renderTools(currentLanguage);
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  renderPage();
});

function updateFooterTime() {
  const now = new Date();
  const footerTime = document.querySelector("#footer-time");

  const time = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  document.querySelector("#footer-year").textContent = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(now);
  footerTime.textContent = time;
  footerTime.setAttribute("datetime", now.toISOString());
}

renderPage();
updateFooterTime();
setInterval(updateFooterTime, 1000);
