const CLEANNESS_TABLE = {
  Rookie: { 2: 7.5, 3: 15, 4: 22.5 },
  D: { 2: 11.25, 3: 22.5, 4: 33.8 },
  C: { 2: 16.9, 3: 33.8, 4: 50.5 },
  B: { 2: 25.25, 3: 50.5, 4: 76 },
  A: { 2: 38, 3: 76, 4: 114 },
};

const STORAGE_KEY = "iracing-safety-rating-estimator-v3";
const LANGUAGE_KEY = "iracing-safety-rating-estimator-language";
const FIELD_IDS = [
  "license", "targetSr", "sessionType", "cornersPerLap",
  "laps", "incidents", "safetyLaps", "roundMode",
];

const SESSION_KEYS = [
  "race", "heat", "warmup", "openQualify", "openPractice",
  "timeTrial", "loneQualify", "lonePractice", "unranked",
];

const translations = {
  zh: {
    pageTitle: "iRacing 安全分风险估算器 | moskic.com",
    description: "根据执照等级、目标安全分、场次权重和赛道弯角数，估算 iRacing 比赛的事故点数风险。",
    switchText: "EN", switchLabel: "Switch to English", homeLabel: "Simple Tools 首页",
    title: "iRacing 安全分风险估算器",
    intro: "用社区常见的推断方式，估算一场比赛大概能承受多少事故点数。适合赛前风险判断，不用于精确预测赛后安全分涨跌。",
    inputTitle: "输入参数", licenseLabel: "执照等级", licenseHelp: "等级越高，维持同样安全分通常需要跑得越干净。",
    licenseRookie: "Rookie 新手", licenseD: "D 级", licenseC: "C 级", licenseB: "B 级", licenseA: "A 级",
    targetSrLabel: "目标安全分", targetSrHelp: "选择用于判断的安全分目标；估算器支持 2.00–4.00。iRacing 实际范围为 0.00–4.99。", targetSrAria: "目标安全分滑块",
    sessionLabel: "排名场次类型", sessionHelp: "以下权重适用于会影响安全分的 Ranked 场次。",
    cornersLabel: "每圈弯角系数", cornersHelp: "iRacing 为赛道配置定义的弯角计算值，不一定等于肉眼数出的弯道数量。",
    lapsLabel: "场次圈数", lapsHelp: "本场预计完成的圈数。",
    incidentsLabel: "本场事故点数（x）", incidentsHelp: "例如比赛结束显示 4x，这里填 4。",
    safetyLapsLabel: "安全余量（圈）", safetyLapsHelp: "预留一点余量，避免刚好卡在红线。",
    roundModeLabel: "显示方式", roundModeHelp: "保守模式会把建议事故点数向下取整。", roundFloor: "保守：向下取整", roundRaw: "显示小数",
    calculate: "计算风险", save: "保存默认值", reset: "恢复示例",
    calculationNote: "安全分与近期历史中的弯角数和事故点数有关，因此结果只适合判断风险。赛事自身的事故处罚阈值仍以赛事规则为准。",
    resultTitle: "估算结果", targetCpiName: "目标干净标准", targetCpiHint: "平均多少个弯对应 1 个有效事故点，越高越严格。",
    weightName: "场次事故权重", weightHint: "正式比赛为 1.00；数值越小，同样事故点的影响越小。",
    cornersName: "本场计算弯角数", effectiveCornersHint: "场次圈数 × 每圈弯角系数",
    weightedIncidentsName: "本场有效事故点", weightedIncidentsHint: "实际事故点数 × 场次事故权重",
    allowedName: "估算事故点阈值", allowedHint: "在当前目标和安全余量下推算的事故点参考值。",
    raceCpiName: "本场干净程度", raceCpiHint: "计算弯角数 ÷ 有效事故点；0x 显示为无限大。",
    initialStatus: "填好参数后点击计算。", quickTipsLabel: "快速提示",
    cpiTableTitle: "推断参考表", tableLicense: "执照等级", srTwo: "安全分 2.00", srThree: "安全分 3.00", srFour: "安全分 4.00",
    cpiTableNote: "数字表示平均多少个弯对应 1 个有效事故点。",
    sessionTableTitle: "不同场次对安全分的影响", sessionTypeHeader: "场次类型", weightHeader: "权重",
    sourceLabel: "场次权重参考：",
    glossaryTitle: "名词解释", usageTitle: "怎么用",
    disclaimer: "非官方估算工具。实际变化还会受到个人历史记录、赛道配置和安全分整数区间变化等因素影响。",
    invalidFields: "请检查标红字段，并输入允许范围内的数字。", invalidMargin: "安全余量不能大于场次圈数。", saved: "已保存默认值", resetDone: "已恢复示例",
    sessionNames: {
      race: "正式比赛", heat: "分组赛", warmup: "热身", openQualify: "开放排位",
      openPractice: "赛事内开放练习", timeTrial: "计时赛", loneQualify: "单人排位",
      lonePractice: "单人练习", unranked: "其他或非排名场次",
    },
    glossary: [
      ["安全分", "iRacing 用来衡量驾驶是否干净的分数。事故点少、完成弯角多，安全分更容易上涨。"],
      ["事故点数（x）", "一场内累计的 0x、1x、2x、4x 等；比赛结束显示 6x，就填 6。"],
      ["干净程度", "平均多少个计算弯角对应 1 个有效事故点，数值越大越好。"],
      ["有效事故点", "实际事故点数乘以场次事故权重。权重越小，同样事故点对安全分的影响越小。"],
    ],
    usage: [
      ["赛前", "选择执照等级、目标安全分和排名场次类型，再填写弯角系数与圈数，查看估算事故点阈值。"],
      ["赛后", "填写最终 x 数，查看本场干净程度和风险提示。"],
      ["实战建议", "把估算事故点阈值当作参考边界而不是目标，并尽量留出余量。"],
    ],
    zeroSession: (name) => `<strong>这个场次通常不影响安全分。</strong> 当前选择的是 ${name}，权重为 0.00。可用于记录表现，但不建议据此判断安全分涨跌。`,
    invalidCorners: "本场弯角数为 0，请检查比赛圈数和每圈弯角数。",
    zeroResult: ({ allowed }) => `<strong>本场 0x。</strong> 没有产生有效事故点；当前估算事故点阈值为 ${allowed}x。`,
    belowThreshold: ({ incidents, allowed, difference }) => `<strong>低于估算阈值。</strong> 本场 ${incidents}，估算阈值为 ${allowed}x，剩余约 ${difference}x 余量。`,
    atThreshold: ({ incidents, allowed }) => `<strong>达到估算阈值。</strong> 本场 ${incidents}，与当前估算阈值 ${allowed}x 相同。`,
    aboveThreshold: ({ incidents, allowed, difference }) => `<strong>超过估算阈值。</strong> 本场 ${incidents}，估算阈值为 ${allowed}x，超出约 ${difference}x。`,
    promotionRookie: "该目标达到 Rookie 快速晋升门槛；实际 SR 达标且满足 MPR 后将晋升 D 级。",
    promotionStandard: "该目标达到快速晋升门槛；实际 SR 达标且满足 MPR 后将晋升下一级。",
    incidentValue: (value) => `${value}x`,
    tips: { weight: "场次事故权重", weighted: "有效事故点", threshold: "估算阈值", difference: "距阈值", noImpact: "不影响安全分", practice: "不计算事故点阈值" },
  },
  en: {
    pageTitle: "iRacing Safety Rating Risk Estimator | moskic.com",
    description: "Estimate incident-point risk from license class, target Safety Rating, session weight, and track corners.",
    switchText: "中文", switchLabel: "切换到中文", homeLabel: "Simple Tools home",
    title: "iRacing Safety Rating Risk Estimator",
    intro: "Use a common community estimate to gauge how many incident points a session may tolerate. It is intended for pre-race risk planning, not exact post-race Safety Rating predictions.",
    inputTitle: "Inputs", licenseLabel: "License class", licenseHelp: "Higher classes generally require cleaner driving to maintain the same Safety Rating.",
    licenseRookie: "Rookie", licenseD: "Class D", licenseC: "Class C", licenseB: "Class B", licenseA: "Class A",
    targetSrLabel: "Target Safety Rating", targetSrHelp: "Choose a benchmark from 2.00–4.00. The actual iRacing Safety Rating range is 0.00–4.99.", targetSrAria: "Target Safety Rating slider",
    sessionLabel: "Ranked session type", sessionHelp: "These weights apply to Ranked sessions that affect Safety Rating.",
    cornersLabel: "Corner multiplier per lap", cornersHelp: "The corner-counting value defined by iRacing for the track configuration; it may differ from the visible number of turns.",
    lapsLabel: "Session laps", lapsHelp: "The number of laps expected in this session.",
    incidentsLabel: "Session incident points (x)", incidentsHelp: "For example, enter 4 if the session result shows 4x.",
    safetyLapsLabel: "Safety margin (laps)", safetyLapsHelp: "Reserve a margin instead of sitting exactly on the estimated limit.",
    roundModeLabel: "Display mode", roundModeHelp: "Conservative mode rounds the incident recommendation down.", roundFloor: "Conservative: round down", roundRaw: "Show decimals",
    calculate: "Calculate risk", save: "Save defaults", reset: "Restore example",
    calculationNote: "Safety Rating depends on recent corner and incident history, so this result is only a risk estimate. Event penalty thresholds still follow the event rules.",
    resultTitle: "Estimate", targetCpiName: "Target cleanliness standard", targetCpiHint: "Average calculated corners per weighted incident point; higher is stricter.",
    weightName: "Session incident weight", weightHint: "A race is 1.00; a lower value reduces the effect of the same incidents.",
    cornersName: "Calculated session corners", effectiveCornersHint: "Session laps × corner multiplier per lap",
    weightedIncidentsName: "Weighted incident points", weightedIncidentsHint: "Actual incident points × session incident weight",
    allowedName: "Estimated incident threshold", allowedHint: "Reference value derived from the target and safety margin.",
    raceCpiName: "Session cleanliness", raceCpiHint: "Calculated corners ÷ weighted incident points; 0x is shown as infinity.",
    initialStatus: "Complete the inputs to calculate.", quickTipsLabel: "Quick tips",
    cpiTableTitle: "Community estimate table", tableLicense: "License class", srTwo: "Safety Rating 2.00", srThree: "Safety Rating 3.00", srFour: "Safety Rating 4.00",
    cpiTableNote: "Values represent average calculated corners per weighted incident point.",
    sessionTableTitle: "Safety Rating impact by session", sessionTypeHeader: "Session type", weightHeader: "Weight",
    sourceLabel: "Session weights: ",
    glossaryTitle: "Glossary", usageTitle: "How to use it",
    disclaimer: "This is an unofficial estimator. Actual changes also depend on your history, track configuration, and crossings of whole-number Safety Rating thresholds.",
    invalidFields: "Check the highlighted fields and enter numbers within the allowed ranges.", invalidMargin: "The safety margin cannot exceed the session laps.", saved: "Defaults saved", resetDone: "Example restored",
    sessionNames: {
      race: "Race", heat: "Heat", warmup: "Warm-Up", openQualify: "Qualify - Open", openPractice: "Practice - Open (in-event)",
      timeTrial: "Time Trial", loneQualify: "Qualify - Lone", lonePractice: "Practice - Lone", unranked: "Other or Unranked session",
    },
    glossary: [
      ["Safety Rating", "iRacing's measure of clean driving. Fewer incidents over more corners generally improves it."],
      ["Incident points (x)", "The accumulated 0x, 1x, 2x, and 4x events in a session; enter 6 if the result shows 6x."],
      ["Cleanliness", "The average number of calculated corners per weighted incident point. Higher is better."],
      ["Weighted incidents", "Actual incident points multiplied by session weight. A lower weight reduces the effect of the same incident count."],
    ],
    usage: [
      ["Before a session", "Choose your license, target Safety Rating, and Ranked session type, then enter the corner multiplier and laps to see the estimated incident threshold."],
      ["After a race", "Enter your final incident count to review session cleanliness and the risk message."],
      ["Practical advice", "Treat the estimated incident threshold as a reference boundary, not a target, and leave a margin."],
    ],
    zeroSession: (name) => `<strong>This session usually does not affect Safety Rating.</strong> ${name} has a weight of 0.00. You can record performance, but should not use it to judge SR movement.`,
    invalidCorners: "Session corners are zero. Check laps and corners per lap.",
    zeroResult: ({ allowed }) => `<strong>This session was 0x.</strong> No weighted incident points were recorded; the current estimated threshold is ${allowed}x.`,
    belowThreshold: ({ incidents, allowed, difference }) => `<strong>Below the estimated threshold.</strong> This session was ${incidents}; the threshold is ${allowed}x, leaving about ${difference}x.`,
    atThreshold: ({ incidents, allowed }) => `<strong>At the estimated threshold.</strong> This session was ${incidents}, equal to the current ${allowed}x threshold.`,
    aboveThreshold: ({ incidents, allowed, difference }) => `<strong>Above the estimated threshold.</strong> This session was ${incidents}; the threshold is ${allowed}x, exceeded by about ${difference}x.`,
    promotionRookie: "This target meets the Rookie Fast Track threshold; the actual SR and MPR must both qualify for promotion to Class D.",
    promotionStandard: "This target meets the Fast Track threshold; the actual SR and MPR must both qualify for promotion.",
    incidentValue: (value) => `${value}x`,
    tips: { weight: "Session incident weight", weighted: "Weighted incidents", threshold: "Estimated threshold", difference: "Distance to threshold", noImpact: "No Safety Rating impact", practice: "No incident threshold calculated" },
  },
};

const $ = (id) => document.getElementById(id);
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function text() { return translations[currentLanguage]; }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
function formatNumber(value, digits = 1) {
  if (!Number.isFinite(value)) return "—";
  return Number(value).toFixed(digits).replace(/\.0$/, "");
}

function targetCleanlinessFor(license, safetyRating) {
  const table = CLEANNESS_TABLE[license];
  const score = clamp(Number(safetyRating), 2, 4);
  if (score <= 3) return table[2] + (table[3] - table[2]) * (score - 2);
  return table[3] + (table[4] - table[3]) * (score - 3);
}

function applyLanguage() {
  const t = text();
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = t.pageTitle;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector(".brand").setAttribute("aria-label", t.homeLabel);
  $("langSwitch").textContent = t.switchText;
  $("langSwitch").setAttribute("aria-label", t.switchLabel);
  $("targetSrRange").setAttribute("aria-label", t.targetSrAria);
  $("quickTips").setAttribute("aria-label", t.quickTipsLabel);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t[element.dataset.i18n];
    if (typeof value === "string") element.textContent = value;
  });

  document.querySelectorAll("#sessionType option").forEach((option) => {
    const key = option.value;
    option.textContent = `${t.sessionNames[key]} (${Number(option.dataset.weight).toFixed(2)})`;
  });

  renderReferenceTables();
  renderGlossaryAndUsage();
  calculate();
}

function renderReferenceTables() {
  const t = text();
  const licenseNames = { Rookie: t.licenseRookie, D: t.licenseD, C: t.licenseC, B: t.licenseB, A: t.licenseA };
  $("cpiTable").innerHTML = Object.entries(CLEANNESS_TABLE).map(([license, values]) => `
    <tr><td>${licenseNames[license]}</td><td>${values[2]}</td><td>${values[3]}</td><td>${values[4]}</td></tr>
  `).join("");

  $("sessionTable").innerHTML = SESSION_KEYS.map((key) => {
    const option = document.querySelector(`#sessionType option[value="${key}"]`);
    const weight = Number(option.dataset.weight);
    return `<tr><td>${t.sessionNames[key]}</td><td>${weight.toFixed(2)}</td></tr>`;
  }).join("");
}

function renderGlossaryAndUsage() {
  const t = text();
  $("glossaryList").innerHTML = t.glossary.map(([term, definition]) => `<li><strong>${term}:</strong> ${definition}</li>`).join("");
  $("usageCopy").innerHTML = t.usage.map(([heading, copy]) => `<p><strong>${heading}:</strong> ${copy}</p>`).join("");
}

function readInputs() {
  const selectedOption = $("sessionType").selectedOptions[0];
  return {
    license: $("license").value,
    targetSafetyRating: Number($("targetSr").value),
    sessionWeight: Number(selectedOption.dataset.weight),
    sessionName: text().sessionNames[selectedOption.value],
    cornersPerLap: Number($("cornersPerLap").value),
    laps: Number($("laps").value),
    incidentPoints: Number($("incidents").value),
    safetyLaps: Number($("safetyLaps").value),
    roundMode: $("roundMode").value,
  };
}

function validateInputs() {
  let valid = true;
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    const value = Number(input.value);
    const isValid = input.value.trim() !== "" && Number.isFinite(value) && input.checkValidity();
    input.classList.toggle("field-invalid", !isValid);
    input.setAttribute("aria-invalid", String(!isValid));
    if (!isValid) valid = false;
  });
  const marginValid = Number($("safetyLaps").value) <= Number($("laps").value);
  $("safetyLaps").classList.toggle("field-invalid", !marginValid);
  $("safetyLaps").setAttribute("aria-invalid", String(!marginValid));
  if (!marginValid) valid = false;
  $("formError").textContent = valid ? "" : (marginValid ? text().invalidFields : text().invalidMargin);
  return valid;
}

function clearResults() {
  ["targetCpi", "sessionWeightDisplay", "effectiveCorners", "weightedIncidents", "allowedIncidents", "raceCpi"].forEach((id) => { $(id).textContent = "—"; });
  $("statusBox").className = "status-box bad";
  $("statusBox").textContent = text().invalidFields;
  $("quickTips").replaceChildren();
}

function calculate() {
  renderPromotionNotice();
  if (!validateInputs()) {
    clearResults();
    return;
  }

  const input = readInputs();
  const targetCleanliness = targetCleanlinessFor(input.license, input.targetSafetyRating);
  const sessionCorners = input.cornersPerLap * input.laps;
  const safetyCorners = input.cornersPerLap * input.safetyLaps;
  const safeCorners = Math.max(0, sessionCorners - safetyCorners);
  const weightedIncidents = input.incidentPoints * input.sessionWeight;
  const allowedRaw = input.sessionWeight > 0 ? safeCorners / targetCleanliness / input.sessionWeight : 0;
  const allowed = input.roundMode === "floor" ? Math.floor(allowedRaw) : allowedRaw;
  const raceCleanliness = weightedIncidents > 0 ? sessionCorners / weightedIncidents : Infinity;

  $("targetCpi").textContent = formatNumber(targetCleanliness, 1);
  $("sessionWeightDisplay").textContent = input.sessionWeight.toFixed(2);
  $("effectiveCorners").textContent = formatNumber(sessionCorners, 0);
  $("weightedIncidents").textContent = input.sessionWeight === 0 ? "—" : formatNumber(weightedIncidents, 2);
  $("allowedIncidents").textContent = input.roundMode === "floor" ? String(allowed) : formatNumber(allowed, 2);
  $("raceCpi").textContent = input.sessionWeight === 0 ? "—" : (input.incidentPoints === 0 ? "∞" : formatNumber(raceCleanliness, 1));
  renderStatus(input, sessionCorners, allowed);
  renderTips(input, allowedRaw);
}

function renderStatus(input, sessionCorners, allowed) {
  const t = text();
  const box = $("statusBox");
  box.className = "status-box";
  if (input.sessionWeight === 0) {
    box.classList.add("warn");
    box.innerHTML = t.zeroSession(input.sessionName);
    return;
  }
  if (sessionCorners <= 0) {
    box.classList.add("bad");
    box.textContent = t.invalidCorners;
    return;
  }

  const threshold = input.roundMode === "floor" ? allowed : Number(formatNumber(allowed, 2));
  const difference = Math.abs(threshold - input.incidentPoints);
  const params = {
    incidents: t.incidentValue(input.incidentPoints),
    allowed: formatNumber(threshold, input.roundMode === "floor" ? 0 : 2),
    difference: formatNumber(difference, input.roundMode === "floor" ? 0 : 2),
  };

  if (input.incidentPoints === 0) {
    box.classList.add("good");
    box.innerHTML = t.zeroResult(params);
  } else if (input.incidentPoints < threshold) {
    box.classList.add("good");
    box.innerHTML = t.belowThreshold(params);
  } else if (input.incidentPoints === threshold) {
    box.classList.add("warn");
    box.innerHTML = t.atThreshold(params);
  } else {
    box.classList.add("bad");
    box.innerHTML = t.aboveThreshold(params);
  }
}

function renderTips(input, allowedRaw) {
  const t = text().tips;
  const tips = [`${t.weight}: ${input.sessionWeight.toFixed(2)}`];
  if (input.sessionWeight === 0) {
    tips.push(t.noImpact, t.practice);
  } else {
    const weightedIncidents = input.incidentPoints * input.sessionWeight;
    const threshold = input.roundMode === "floor" ? Math.floor(allowedRaw) : Number(formatNumber(allowedRaw, 2));
    tips.push(
      `${t.weighted}: ${formatNumber(weightedIncidents, 2)}`,
      `${t.threshold}: ${formatNumber(threshold, input.roundMode === "floor" ? 0 : 2)}x`,
      `${t.difference}: ${formatNumber(Math.abs(threshold - input.incidentPoints), input.roundMode === "floor" ? 0 : 2)}x`,
    );
  }
  $("quickTips").innerHTML = tips.map((tip) => `<span class="pill">${tip}</span>`).join("");
}

function renderPromotionNotice() {
  const license = $("license").value;
  const target = Number($("targetSr").value);
  let message = "";
  if (target >= 2 && target <= 4) {
    if (license === "Rookie" && target >= 3) message = text().promotionRookie;
    if (["D", "C", "B"].includes(license) && target >= 4) message = text().promotionStandard;
  }
  $("promotionNotice").textContent = message;
}

function saveDefaults() {
  if (!validateInputs()) return;
  const data = {};
  FIELD_IDS.forEach((id) => { data[id] = $(id).value; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  showToast(text().saved);
}

function loadDefaults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    FIELD_IDS.forEach((id) => {
      if (data[id] !== undefined) {
        if (id === "sessionType" && /^\d/.test(data[id])) {
          const legacyMatch = Array.from($(id).options).find((option) => option.dataset.weight === Number(data[id]).toFixed(2));
          if (legacyMatch) $(id).value = legacyMatch.value;
        } else {
          $(id).value = data[id];
        }
      }
    });
    $("targetSr").value = clamp(Number($("targetSr").value) || 3, 2, 4).toFixed(2);
    $("targetSrRange").value = $("targetSr").value;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetExample() {
  localStorage.removeItem(STORAGE_KEY);
  const defaults = { license: "B", targetSr: "3.00", sessionType: "race", cornersPerLap: "15", laps: "20", incidents: "4", safetyLaps: "1", roundMode: "floor" };
  Object.entries(defaults).forEach(([id, value]) => { $(id).value = value; });
  $("targetSrRange").value = defaults.targetSr;
  calculate();
  showToast(text().resetDone);
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

function updateFooterTime() {
  const now = new Date();
  $("footerYear").textContent = new Intl.DateTimeFormat("en", { year: "numeric" }).format(now);
  $("footerTime").textContent = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  $("footerTime").dateTime = now.toISOString();
}

function bindEvents() {
  $("langSwitch").addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyLanguage();
  });
  $("calcBtn").addEventListener("click", calculate);
  $("saveBtn").addEventListener("click", saveDefaults);
  $("resetBtn").addEventListener("click", resetExample);
  $("targetSrRange").addEventListener("input", (event) => {
    $("targetSr").value = Number(event.target.value).toFixed(2);
    calculate();
  });
  $("targetSr").addEventListener("input", () => {
    const value = Number($("targetSr").value);
    if (Number.isFinite(value)) $("targetSrRange").value = clamp(value, 2, 4);
    calculate();
  });
  FIELD_IDS.forEach((id) => {
    if (id === "targetSr") return;
    $(id).addEventListener("input", calculate);
    $(id).addEventListener("change", calculate);
  });
}

loadDefaults();
bindEvents();
applyLanguage();
updateFooterTime();
setInterval(updateFooterTime, 1000);
