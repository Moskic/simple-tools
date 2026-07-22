const LANGUAGE_KEY = "simple-tools-language";
const ELO_SCALE = 1600;
const K_FACTOR = 200;
const MIN_DRIVERS = 2;
const MAX_DRIVERS = 64;

const translations = {
  zh: {
    pageTitle: "iRacing iRating 计算器 | moskic.com",
    description: "按社区常用的多人 Elo 近似公式，估算 iRacing 正式比赛后的 iRating 变化。",
    switchText: "EN", switchLabel: "Switch to English", homeLabel: "Simple Tools 首页",
    title: "iRacing iRating 计算器",
    intro: "按最终分类顺序填写同组车手及赛前 iRating，估算每位车手的分数变化。所有计算均在浏览器本地完成。",
    fieldTitle: "完赛顺序与赛前 iR", fieldHelp: "每行就是最终分类中的一个名次。多级别比赛请只填写与你同级别的车手。",
    positionHeader: "名次", driverHeader: "车手", ratingHeader: "赛前 iR", meHeader: "我的车手", orderHeader: "调整", removeHeader: "删除",
    calculate: "计算 iR 变化", addDriver: "添加车手", restoreExample: "恢复示例",
    classificationNote: "退赛或拖车后，按比赛结果页最终列出的分类名次填写；起步位置、圈速和事故点不参与此估算。",
    resultTitle: "我的估算结果", changeName: "预计变化", changeHint: "按整数显示，官方结果可能相差约 1 iR。",
    newRatingName: "预计新 iR", newRatingHint: "赛前 iR 加上预计变化。", sofName: "本组 SoF", sofHint: "使用社区常见的指数平均公式估算。",
    breakEvenName: "大致保本名次", breakEvenHint: "最接近 0 iR 变化的完赛位置。", initialStatus: "填写车手后即可计算。",
    summaryTitle: "计算口径", allResultsTitle: "全场估算", allResultsHelp: "变化值取整前全场总和为 0；逐人取整后可能出现少量尾差。",
    expectedHeader: "预期名次", changeHeader: "预计变化", newRatingHeader: "预计新 iR",
    formulaTitle: "社区近似公式", formulaNote: "A 是实际击败对手的比例，E 是根据双方 iR 推算的平均预期胜率。等价于你与同组每位车手分别进行一次 Elo 比较，再按对手数量归一化。",
    usageTitle: "使用边界", disclaimer: "非官方估算工具。公式来自社区长期反向推算，通常很接近正式结算，但 iRacing 没有公开精确算法；隐藏小数、未发车及特殊赛事规则都可能造成偏差。",
    driverCount: (count) => `${count} 位车手`, driverPlaceholder: (position) => `车手 ${position}`,
    selectDriver: (name) => `选择 ${name} 作为我的车手`, moveUp: (name) => `将 ${name} 上移一名`, moveDown: (name) => `将 ${name} 下移一名`, removeDriver: (name) => `删除 ${name}`,
    tooFewDrivers: "至少需要 2 位车手。", tooManyDrivers: `最多支持 ${MAX_DRIVERS} 位车手。`, invalidRatings: "请为所有车手输入 1–20,000 之间的有效赛前 iR。",
    selectedStatusPositive: ({ name, position, change }) => `<strong>${name} 在 P${position} 的表现高于模型预期。</strong> 预计获得 ${change} iR。`,
    selectedStatusNegative: ({ name, position, change }) => `<strong>${name} 在 P${position} 的表现低于模型预期。</strong> 预计失去 ${change} iR。`,
    selectedStatusEven: ({ name, position }) => `<strong>${name} 在 P${position} 附近基本符合模型预期。</strong> 预计 iR 变化接近 0。`,
    summary: [
      ["比较对象", "只与同一计分类别中的其他车手逐一比较；多级别比赛应分开填写。"],
      ["纳入计算", "赛前 iR、最终分类名次和同组人数。"],
      ["不纳入计算", "发车位、进退位置、圈速、事故点和比赛时长。"],
      ["显示精度", "先计算小数变化，再四舍五入为整数；官方隐藏小数可能带来约 1 iR 的差异。"],
    ],
    usage: [
      ["适用", "达到最低参赛人数并被判定为 Official 的 Ranked Race。"],
      ["退赛", "使用结果页的最终分类顺序；未发车和特殊弃权处理可能比普通完赛产生更大误差。"],
      ["耐力赛", "车队 iR、报名车手及结算细节更复杂，本工具不针对 Team Event 做特殊修正。"],
    ],
    tips: { expected: "模型预期", actual: "实际完赛", beatRate: "实际击败比例", fieldSize: "同组人数" },
    positionValue: (value) => `P${value}`, percentValue: (value) => `${value}%`,
  },
  en: {
    pageTitle: "iRacing iRating Calculator | moskic.com",
    description: "Estimate post-race iRating changes with the community's common multiplayer Elo approximation.",
    switchText: "中文", switchLabel: "切换到中文", homeLabel: "Simple Tools home",
    title: "iRacing iRating Calculator",
    intro: "Enter the drivers in final classified order with their pre-race iRating to estimate everyone's change. All calculations run locally in your browser.",
    fieldTitle: "Finish order and pre-race iR", fieldHelp: "Each row is one classified position. For multiclass races, include only drivers in your class.",
    positionHeader: "Finish", driverHeader: "Driver", ratingHeader: "Pre-race iR", meHeader: "My driver", orderHeader: "Order", removeHeader: "Remove",
    calculate: "Calculate iR changes", addDriver: "Add driver", restoreExample: "Restore example",
    classificationNote: "For retirements or tows, use the final classified order on the results page. Grid position, lap times, and incidents are not used by this estimate.",
    resultTitle: "My estimate", changeName: "Estimated change", changeHint: "Shown as an integer; the official result may differ by about 1 iR.",
    newRatingName: "Estimated new iR", newRatingHint: "Pre-race iR plus the estimated change.", sofName: "Class SoF", sofHint: "Estimated with the common community exponential-average formula.",
    breakEvenName: "Approx. break-even", breakEvenHint: "The finishing position closest to a 0 iR change.", initialStatus: "Enter the field to calculate.",
    summaryTitle: "Calculation basis", allResultsTitle: "Full-field estimate", allResultsHelp: "Unrounded changes sum to zero; rounding each driver can leave a small remainder.",
    expectedHeader: "Expected finish", changeHeader: "Est. change", newRatingHeader: "Est. new iR",
    formulaTitle: "Community approximation", formulaNote: "A is the actual share of opponents beaten; E is the average expected win probability derived from both ratings. This is equivalent to an Elo comparison with every opponent, normalized by opponent count.",
    usageTitle: "Scope and limits", disclaimer: "Unofficial estimator. The formula is based on long-running community reverse engineering and is usually close to the official result, but iRacing has not published its exact algorithm. Hidden decimals, non-starters, and special event rules may introduce differences.",
    driverCount: (count) => `${count} ${count === 1 ? "driver" : "drivers"}`, driverPlaceholder: (position) => `Driver ${position}`,
    selectDriver: (name) => `Select ${name} as my driver`, moveUp: (name) => `Move ${name} up one place`, moveDown: (name) => `Move ${name} down one place`, removeDriver: (name) => `Remove ${name}`,
    tooFewDrivers: "At least 2 drivers are required.", tooManyDrivers: `A maximum of ${MAX_DRIVERS} drivers is supported.`, invalidRatings: "Enter a valid pre-race iR from 1 to 20,000 for every driver.",
    selectedStatusPositive: ({ name, position, change }) => `<strong>${name}'s P${position} finish beat the model's expectation.</strong> Estimated gain: ${change} iR.`,
    selectedStatusNegative: ({ name, position, change }) => `<strong>${name}'s P${position} finish was below the model's expectation.</strong> Estimated loss: ${change} iR.`,
    selectedStatusEven: ({ name, position }) => `<strong>${name}'s P${position} finish was close to the model's expectation.</strong> Estimated iR change is near zero.`,
    summary: [
      ["Compared against", "Every other driver in the same scoring class; enter multiclass fields separately."],
      ["Included", "Pre-race iRating, final classified position, and class field size."],
      ["Not included", "Grid position, positions gained, lap times, incidents, and race duration."],
      ["Display precision", "Decimal changes are calculated first and then rounded; official hidden decimals can cause a difference of about 1 iR."],
    ],
    usage: [
      ["Applies to", "Ranked Races that meet participation requirements and go Official."],
      ["Retirements", "Use final classification. Non-starters and special forfeits can create larger errors than normal finishes."],
      ["Endurance", "Team iRating, registered drivers, and settlement rules are more complex; this tool has no Team Event adjustment."],
    ],
    tips: { expected: "Model expectation", actual: "Actual finish", beatRate: "Opponents beaten", fieldSize: "Class field" },
    positionValue: (value) => `P${value}`, percentValue: (value) => `${value}%`,
  },
};

const EXAMPLE_DRIVERS = [
  { name: "M. Chen", rating: 2860, selected: false },
  { name: "A. Wilson", rating: 2430, selected: false },
  { name: "You", rating: 2050, selected: true },
  { name: "S. Müller", rating: 2710, selected: false },
  { name: "J. Smith", rating: 1880, selected: false },
  { name: "K. Tanaka", rating: 2240, selected: false },
  { name: "L. Martin", rating: 1630, selected: false },
  { name: "R. Brown", rating: 1420, selected: false },
];

const $ = (id) => document.getElementById(id);
let currentLanguage = getInitialLanguage();
let drivers = cloneExample();

function getInitialLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function text() { return translations[currentLanguage]; }
function cloneExample() { return EXAMPLE_DRIVERS.map((driver) => ({ ...driver })); }
function displayName(driver, index) { return driver.name.trim() || text().driverPlaceholder(index + 1); }
function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  })[character]);
}

function expectedWinProbability(ownRating, opponentRating) {
  return 1 / (1 + Math.pow(2, (opponentRating - ownRating) / ELO_SCALE));
}

function calculateStrengthOfField(ratings) {
  const scale = ELO_SCALE / Math.log(2);
  const exponentialSum = ratings.reduce((sum, rating) => sum + Math.exp(-rating / scale), 0);
  return scale * Math.log(ratings.length / exponentialSum);
}

function calculateDriverResult(driver, position, field) {
  const opponents = field.filter((candidate) => candidate !== driver);
  const expectedWins = opponents.reduce(
    (sum, opponent) => sum + expectedWinProbability(driver.rating, opponent.rating),
    0,
  );
  const actualWins = field.length - position;
  const expectedBeatRate = expectedWins / opponents.length;
  const actualBeatRate = actualWins / opponents.length;
  const rawChange = K_FACTOR * (actualBeatRate - expectedBeatRate);
  const expectedPosition = field.length - expectedWins;

  return {
    ...driver,
    position,
    expectedPosition,
    expectedBeatRate,
    actualBeatRate,
    rawChange,
    roundedChange: Math.round(rawChange),
    newRating: driver.rating + Math.round(rawChange),
    breakEvenPosition: Math.min(field.length, Math.max(1, Math.round(expectedPosition))),
  };
}

function readDriversFromInputs() {
  document.querySelectorAll("#driverRows tr").forEach((row, index) => {
    drivers[index].name = row.querySelector('[data-field="name"]').value;
    drivers[index].rating = Number(row.querySelector('[data-field="rating"]').value);
    drivers[index].selected = row.querySelector('[data-field="selected"]').checked;
  });
}

function validateDrivers() {
  readDriversFromInputs();
  let error = "";
  if (drivers.length < MIN_DRIVERS) error = text().tooFewDrivers;
  if (drivers.length > MAX_DRIVERS) error = text().tooManyDrivers;

  document.querySelectorAll('[data-field="rating"]').forEach((input, index) => {
    const valid = Number.isFinite(drivers[index].rating) && drivers[index].rating >= 1 && drivers[index].rating <= 20000;
    input.classList.toggle("field-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (!valid && !error) error = text().invalidRatings;
  });

  $("formError").textContent = error;
  return !error;
}

function createButton(label, content, className, handler, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button ${className}`.trim();
  button.setAttribute("aria-label", label);
  button.textContent = content;
  button.disabled = disabled;
  button.addEventListener("click", handler);
  return button;
}

function renderDriverRows() {
  const tbody = $("driverRows");
  const fragment = document.createDocumentFragment();

  drivers.forEach((driver, index) => {
    const name = displayName(driver, index);
    const row = document.createElement("tr");
    if (driver.selected) row.classList.add("selected-row");

    const positionCell = document.createElement("td");
    const position = document.createElement("span");
    position.className = "position-badge";
    position.textContent = String(index + 1);
    positionCell.append(position);

    const nameCell = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = driver.name;
    nameInput.placeholder = text().driverPlaceholder(index + 1);
    nameInput.dataset.field = "name";
    nameInput.maxLength = 40;
    nameInput.addEventListener("input", handleInputChange);
    nameCell.append(nameInput);

    const ratingCell = document.createElement("td");
    const ratingInput = document.createElement("input");
    ratingInput.type = "number";
    ratingInput.value = String(driver.rating);
    ratingInput.min = "1";
    ratingInput.max = "20000";
    ratingInput.step = "1";
    ratingInput.inputMode = "numeric";
    ratingInput.dataset.field = "rating";
    ratingInput.addEventListener("input", handleInputChange);
    ratingCell.append(ratingInput);

    const selectedCell = document.createElement("td");
    const selectedInput = document.createElement("input");
    selectedInput.type = "radio";
    selectedInput.name = "selectedDriver";
    selectedInput.checked = driver.selected;
    selectedInput.dataset.field = "selected";
    selectedInput.setAttribute("aria-label", text().selectDriver(name));
    selectedInput.addEventListener("change", () => {
      readDriversFromInputs();
      drivers.forEach((candidate, candidateIndex) => { candidate.selected = candidateIndex === index; });
      renderDriverRows();
      calculate();
    });
    selectedCell.append(selectedInput);

    const orderCell = document.createElement("td");
    const orderButtons = document.createElement("div");
    orderButtons.className = "order-buttons";
    orderButtons.append(
      createButton(text().moveUp(name), "↑", "", () => moveDriver(index, -1), index === 0),
      createButton(text().moveDown(name), "↓", "", () => moveDriver(index, 1), index === drivers.length - 1),
    );
    orderCell.append(orderButtons);

    const removeCell = document.createElement("td");
    removeCell.append(createButton(text().removeDriver(name), "×", "remove-button", () => removeDriver(index), drivers.length <= MIN_DRIVERS));

    row.append(positionCell, nameCell, ratingCell, selectedCell, orderCell, removeCell);
    fragment.append(row);
  });

  tbody.replaceChildren(fragment);
  $("fieldCount").textContent = text().driverCount(drivers.length);
}

function handleInputChange(event) {
  readDriversFromInputs();
  calculate();
}

function moveDriver(index, direction) {
  readDriversFromInputs();
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= drivers.length) return;
  [drivers[index], drivers[nextIndex]] = [drivers[nextIndex], drivers[index]];
  renderDriverRows();
  calculate();
}

function removeDriver(index) {
  if (drivers.length <= MIN_DRIVERS) return;
  readDriversFromInputs();
  const removedSelected = drivers[index].selected;
  drivers.splice(index, 1);
  if (removedSelected) drivers[Math.min(index, drivers.length - 1)].selected = true;
  renderDriverRows();
  calculate();
}

function addDriver() {
  if (drivers.length >= MAX_DRIVERS) {
    $("formError").textContent = text().tooManyDrivers;
    return;
  }
  readDriversFromInputs();
  const averageRating = Math.round(drivers.reduce((sum, driver) => sum + (Number.isFinite(driver.rating) ? driver.rating : 0), 0) / drivers.length) || 1350;
  drivers.push({ name: "", rating: averageRating, selected: false });
  renderDriverRows();
  calculate();
  document.querySelectorAll('[data-field="name"]')[drivers.length - 1].focus();
}

function clearResults(message) {
  ["selectedChange", "selectedNewRating", "strengthOfField", "breakEvenPosition"].forEach((id) => { $(id).textContent = "—"; });
  $("selectedChange").className = "metric-value";
  $("statusBox").className = "status-box bad";
  $("statusBox").textContent = message;
  $("quickTips").replaceChildren();
  $("resultRows").replaceChildren();
}

function formatChange(value) { return value > 0 ? `+${value}` : String(value); }
function formatExpectedPosition(value) { return `P${value.toFixed(1)}`; }

function calculate() {
  if (!validateDrivers()) {
    clearResults($("formError").textContent);
    return;
  }

  const selectedIndex = Math.max(0, drivers.findIndex((driver) => driver.selected));
  if (!drivers.some((driver) => driver.selected)) drivers[0].selected = true;
  const results = drivers.map((driver, index) => calculateDriverResult(driver, index + 1, drivers));
  const selected = results[selectedIndex];
  const sof = Math.round(calculateStrengthOfField(drivers.map((driver) => driver.rating)));

  const changeElement = $("selectedChange");
  changeElement.textContent = `${formatChange(selected.roundedChange)} iR`;
  changeElement.className = "metric-value";
  if (selected.roundedChange > 0) changeElement.classList.add("positive");
  if (selected.roundedChange < 0) changeElement.classList.add("negative");
  $("selectedNewRating").textContent = String(selected.newRating);
  $("strengthOfField").textContent = String(sof);
  $("breakEvenPosition").textContent = text().positionValue(selected.breakEvenPosition);

  renderStatus(selected);
  renderTips(selected, drivers.length);
  renderResults(results);
}

function renderStatus(selected) {
  const t = text();
  const name = escapeHtml(displayName(selected, selected.position - 1));
  const box = $("statusBox");
  const params = { name, position: selected.position, change: Math.abs(selected.roundedChange) };
  box.className = "status-box";
  if (selected.roundedChange > 0) {
    box.classList.add("good");
    box.innerHTML = t.selectedStatusPositive(params);
  } else if (selected.roundedChange < 0) {
    box.classList.add("bad");
    box.innerHTML = t.selectedStatusNegative(params);
  } else {
    box.innerHTML = t.selectedStatusEven(params);
  }
}

function renderTips(selected, fieldSize) {
  const t = text();
  const values = [
    `${t.tips.expected}: ${formatExpectedPosition(selected.expectedPosition)}`,
    `${t.tips.actual}: ${t.positionValue(selected.position)}`,
    `${t.tips.beatRate}: ${t.percentValue((selected.actualBeatRate * 100).toFixed(0))}`,
    `${t.tips.fieldSize}: ${fieldSize}`,
  ];
  const fragment = document.createDocumentFragment();
  values.forEach((value) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = value;
    fragment.append(pill);
  });
  $("quickTips").replaceChildren(fragment);
}

function renderResults(results) {
  const fragment = document.createDocumentFragment();
  results.forEach((result) => {
    const row = document.createElement("tr");
    if (result.selected) row.classList.add("selected-result");
    const values = [
      `P${result.position}`,
      displayName(result, result.position - 1),
      String(result.rating),
      formatExpectedPosition(result.expectedPosition),
      formatChange(result.roundedChange),
      String(result.newRating),
    ];
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 4 && result.roundedChange > 0) cell.classList.add("change-positive");
      if (index === 4 && result.roundedChange < 0) cell.classList.add("change-negative");
      if (index === 4) cell.title = `${result.rawChange.toFixed(2)} iR`;
      row.append(cell);
    });
    fragment.append(row);
  });
  $("resultRows").replaceChildren(fragment);
}

function renderExplanations() {
  const t = text();
  $("summaryList").innerHTML = t.summary.map(([term, definition]) => `<li><strong>${term}:</strong> ${definition}</li>`).join("");
  $("usageCopy").innerHTML = t.usage.map(([term, definition]) => `<p><strong>${term}:</strong> ${definition}</p>`).join("");
}

function applyLanguage() {
  const t = text();
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = t.pageTitle;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector(".brand").setAttribute("aria-label", t.homeLabel);
  $("langSwitch").textContent = t.switchText;
  $("langSwitch").setAttribute("aria-label", t.switchLabel);
  $("quickTips").setAttribute("aria-label", currentLanguage === "zh" ? "计算摘要" : "Calculation summary");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t[element.dataset.i18n];
    if (typeof value === "string") element.textContent = value;
  });
  renderExplanations();
  renderDriverRows();
  calculate();
}

function updateFooterClock() {
  const now = new Date();
  $("footerYear").textContent = String(now.getFullYear());
  $("footerTime").textContent = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  $("footerTime").setAttribute("datetime", now.toISOString());
}

$("calculateButton").addEventListener("click", calculate);
$("addButton").addEventListener("click", addDriver);
$("exampleButton").addEventListener("click", () => {
  drivers = cloneExample();
  renderDriverRows();
  calculate();
});
$("langSwitch").addEventListener("click", () => {
  readDriversFromInputs();
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
});

applyLanguage();
updateFooterClock();
setInterval(updateFooterClock, 1000);
