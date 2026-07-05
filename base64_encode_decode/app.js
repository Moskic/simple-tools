const translations = {
  zh: {
    pageTitle: "Base64 编码与解码 | moskic.com",
    switchText: "EN",
    title: "Base64 编码与解码",
    intro: "将文本编码为 Base64，或将 Base64 解码为原文。所有内容仅在浏览器本地处理，不会上传。",
    toolTitle: "转换内容",
    inputLabel: "输入",
    inputPlaceholder: "输入要编码的文本，或要解码的 Base64…",
    encode: "编码为 Base64",
    decode: "解码 Base64",
    clear: "清空",
    outputLabel: "结果",
    outputPlaceholder: "转换结果将显示在这里",
    copy: "复制结果",
    copied: "已复制",
    encoded: "编码完成",
    decoded: "解码完成",
    emptyInput: "请先输入内容。",
    invalidBase64: "无法解码：请输入有效的 Base64 内容。",
    copyFailed: "复制失败，请手动选择结果复制。"
  },
  en: {
    pageTitle: "Base64 Encoder & Decoder | moskic.com",
    switchText: "中文",
    title: "Base64 Encoder & Decoder",
    intro: "Encode text as Base64 or decode Base64 back to text. Everything is processed locally in your browser and is never uploaded.",
    toolTitle: "Convert content",
    inputLabel: "Input",
    inputPlaceholder: "Enter text to encode, or Base64 to decode…",
    encode: "Encode as Base64",
    decode: "Decode Base64",
    clear: "Clear",
    outputLabel: "Result",
    outputPlaceholder: "The converted result will appear here",
    copy: "Copy result",
    copied: "Copied",
    encoded: "Encoding complete",
    decoded: "Decoding complete",
    emptyInput: "Enter some content first.",
    invalidBase64: "Unable to decode: enter valid Base64 content.",
    copyFailed: "Copy failed. Please select and copy the result manually."
  }
};

const input = document.getElementById("input");
const output = document.getElementById("output");
const status = document.getElementById("status");
const langSwitch = document.getElementById("langSwitch");
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const saved = localStorage.getItem("base64ToolLang");
  if (saved === "zh" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key) {
  return translations[currentLanguage][key] || key;
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  langSwitch.textContent = t("switchText");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  setStatus("");
}

function encodeUtf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeUtf8(value) {
  const normalized = value.replace(/\s/g, "");
  if (!normalized || normalized.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) {
    throw new Error("Invalid Base64");
  }
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function requireInput() {
  if (input.value !== "") return true;
  output.value = "";
  setStatus(t("emptyInput"), true);
  input.focus();
  return false;
}

document.getElementById("encodeButton").addEventListener("click", () => {
  if (!requireInput()) return;
  output.value = encodeUtf8(input.value);
  setStatus(t("encoded"));
});

document.getElementById("decodeButton").addEventListener("click", () => {
  if (!requireInput()) return;
  try {
    output.value = decodeUtf8(input.value);
    setStatus(t("decoded"));
  } catch {
    output.value = "";
    setStatus(t("invalidBase64"), true);
  }
});

document.getElementById("clearButton").addEventListener("click", () => {
  input.value = "";
  output.value = "";
  setStatus("");
  input.focus();
});

document.getElementById("copyButton").addEventListener("click", async () => {
  if (!output.value) return;
  try {
    await navigator.clipboard.writeText(output.value);
    setStatus(t("copied"));
  } catch {
    output.select();
    setStatus(t("copyFailed"), true);
  }
});

langSwitch.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("base64ToolLang", currentLanguage);
  applyLanguage();
});

function updateFooterClock() {
  const now = new Date();
  document.getElementById("footerYear").textContent = now.getFullYear();
  const footerTime = document.getElementById("footerTime");
  footerTime.textContent = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);
  footerTime.setAttribute("datetime", now.toISOString());
}

applyLanguage();
updateFooterClock();
setInterval(updateFooterClock, 1000);
