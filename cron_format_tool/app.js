const FIELD_DEFINITIONS = [
  { id: "minute", min: 0, max: 59 },
  { id: "hour", min: 0, max: 23 },
  { id: "dayOfMonth", min: 1, max: 31 },
  { id: "month", min: 1, max: 12 },
  { id: "dayOfWeek", min: 0, max: 7 }
];

const PRESETS = [
  { expression: "* * * * *", key: "everyMinute" },
  { expression: "0 * * * *", key: "everyHour" },
  { expression: "0 9 * * *", key: "everyDay" },
  { expression: "0 9 * * 1-5", key: "weekdays" },
  { expression: "0 9 * * 1", key: "everyMonday" },
  { expression: "0 0 1 * *", key: "everyMonth" }
];

const translations = {
  zh: {
    pageTitle: "Cron 表达式工具 | moskic.com",
    switchText: "EN",
    title: "Cron 表达式工具",
    intro: "生成、校验并解释标准五段 Unix Cron 表达式，预览接下来的执行时间。所有计算均在浏览器本地完成。",
    expressionTitle: "Cron 表达式",
    expressionHelp: "格式：分钟 小时 日期 月份 星期",
    copy: "复制表达式",
    copied: "已复制",
    copyFailed: "复制失败，请手动选择表达式。",
    quickBuilderTitle: "快速生成",
    quickBuilderHelp: "选择执行频率，表达式会自动同步。",
    scheduleType: "执行频率",
    typeMinutes: "每隔若干分钟",
    typeHours: "每隔若干小时",
    typeDaily: "每天",
    typeWeekly: "每周",
    typeMonthly: "每月",
    typeCustom: "自定义",
    interval: "间隔",
    minuteUnit: "分钟",
    hourUnit: "小时",
    runTime: "执行时间",
    weekdaySelect: "星期",
    weekdayWorkdays: "周一至周五",
    weekdayWeekend: "周末",
    monthDay: "每月日期",
    builderHint: "需要列表、范围或更复杂的规则时，可继续使用下方字段编辑。",
    fieldsTitle: "高级字段编辑",
    minute: "分钟",
    hour: "小时",
    dayOfMonth: "日期",
    month: "月份",
    dayOfWeek: "星期",
    sundayNote: "星期字段中 0 和 7 都表示星期日。",
    resultTitle: "表达式含义",
    timezone: "使用当前时区",
    presetsTitle: "常用预设",
    nextRunsTitle: "接下来 5 次执行",
    syntaxTitle: "语法速查",
    syntaxAny: "任意值",
    syntaxList: "多个值，例如 1,3,5",
    syntaxRange: "范围，例如 1-5",
    syntaxStep: "步长，例如 */10",
    unixNote: "本工具使用五段 Unix Cron，不支持 Quartz 的秒、年份、?、L、W 和 #。",
    dayRule: "当日期和星期都不是 * 时，传统 Cron 会在任一字段匹配时执行。",
    valid: "表达式有效",
    invalidFieldCount: "Cron 表达式必须包含 5 个字段。",
    invalidEmpty: "{field}不能为空。",
    invalidSyntax: "{field}包含不支持的语法。",
    invalidValue: "{field}中的数值必须在 {min}–{max} 之间。",
    invalidRange: "{field}中的范围起点不能大于终点。",
    invalidStep: "{field}中的步长必须是正整数。",
    fixExpression: "修正表达式后即可查看含义和执行时间。",
    noRuns: "在未来 10 年内没有找到执行时间。",
    everyMinute: "每分钟",
    everyHour: "每小时",
    everyDay: "每天 09:00",
    weekdays: "工作日 09:00",
    everyMonday: "每周一 09:00",
    everyMonth: "每月 1 日 00:00",
    everyMinuteExplain: "每分钟执行一次。",
    everyHourExplain: "每小时的第 0 分钟执行。",
    everyDayExplain: "每天 09:00 执行。",
    weekdaysExplain: "每周一至周五 09:00 执行。",
    everyMondayExplain: "每周一 09:00 执行。",
    everyMonthExplain: "每月 1 日 00:00 执行。",
    anyMinute: "每分钟",
    anyHour: "每小时",
    anyDayOfMonth: "每天",
    anyMonth: "每月",
    anyDayOfWeek: "每天",
    sunday: "日",
    monday: "一",
    tuesday: "二",
    wednesday: "三",
    thursday: "四",
    friday: "五",
    saturday: "六",
    weekdaySunday: "星期日",
    weekdayMonday: "星期一",
    weekdayTuesday: "星期二",
    weekdayWednesday: "星期三",
    weekdayThursday: "星期四",
    weekdayFriday: "星期五",
    weekdaySaturday: "星期六",
    everyNMinutesExplain: "每 {interval} 分钟执行一次。",
    everyNHoursExplain: "每 {interval} 小时执行一次，均在整点运行。",
    hourlyAtMinuteExplain: "每小时的第 {minute} 分钟执行。",
    hourlyAtMinutesExplain: "每小时的第 {minutes} 分钟执行。",
    dailyDuringHourExplain: "每天 {hour}:00–{hour}:59，每分钟执行一次。",
    monthlyOnDayExplain: "每月 {day} 日全天每分钟执行一次。",
    monthlyHourlyAtMinuteExplain: "每月 {day} 日每小时的第 {minute} 分钟执行。",
    yearlyDuringMonthExplain: "每年 {month} 月内每分钟执行一次。",
    yearlyDailyAtExplain: "每年 {month} 月每天 {time} 执行。",
    weeklyAllDayExplain: "{weekday}全天每分钟执行一次。",
    weeklyHourlyExplain: "{weekday}每小时整点执行。",
    weekdayHoursIntervalExplain: "{weekday} {start}:00–{end}:59，每 {interval} 分钟执行一次。",
    dayOrWeekdayAtExplain: "每月 {day} 日或{weekday} {time} 执行。",
    dailyAtExplain: "每天 {time} 执行。",
    weeklyAtExplain: "{weekday} {time} 执行。",
    monthlyAtExplain: "每月 {day} 日 {time} 执行。"
  },
  en: {
    pageTitle: "Cron Expression Tool | moskic.com",
    switchText: "中文",
    title: "Cron Expression Tool",
    intro: "Build, validate, and explain standard five-field Unix Cron expressions, then preview upcoming runs. Everything is processed locally in your browser.",
    expressionTitle: "Cron expression",
    expressionHelp: "Format: minute hour day-of-month month day-of-week",
    copy: "Copy expression",
    copied: "Copied",
    copyFailed: "Copy failed. Please select the expression manually.",
    quickBuilderTitle: "Quick builder",
    quickBuilderHelp: "Choose a frequency and the expression updates automatically.",
    scheduleType: "Frequency",
    typeMinutes: "Every few minutes",
    typeHours: "Every few hours",
    typeDaily: "Daily",
    typeWeekly: "Weekly",
    typeMonthly: "Monthly",
    typeCustom: "Custom",
    interval: "Interval",
    minuteUnit: "minutes",
    hourUnit: "hours",
    runTime: "Run time",
    weekdaySelect: "Weekday",
    weekdayWorkdays: "Monday to Friday",
    weekdayWeekend: "Weekend",
    monthDay: "Day of month",
    builderHint: "Use the advanced fields below for lists, ranges, or more complex schedules.",
    fieldsTitle: "Advanced field editor",
    minute: "Minute",
    hour: "Hour",
    dayOfMonth: "Day",
    month: "Month",
    dayOfWeek: "Weekday",
    sundayNote: "In the weekday field, both 0 and 7 represent Sunday.",
    resultTitle: "Meaning",
    timezone: "Current time zone",
    presetsTitle: "Common presets",
    nextRunsTitle: "Next 5 runs",
    syntaxTitle: "Syntax reference",
    syntaxAny: "Any value",
    syntaxList: "Multiple values, e.g. 1,3,5",
    syntaxRange: "A range, e.g. 1-5",
    syntaxStep: "An interval, e.g. */10",
    unixNote: "This tool uses five-field Unix Cron. Quartz seconds, years, ?, L, W, and # are not supported.",
    dayRule: "When both day and weekday are restricted, traditional Cron runs when either field matches.",
    valid: "Valid expression",
    invalidFieldCount: "A Cron expression must contain exactly 5 fields.",
    invalidEmpty: "{field} cannot be empty.",
    invalidSyntax: "{field} contains unsupported syntax.",
    invalidValue: "Values in {field} must be between {min} and {max}.",
    invalidRange: "A range in {field} cannot start above its end.",
    invalidStep: "A step in {field} must be a positive integer.",
    fixExpression: "Fix the expression to see its meaning and upcoming runs.",
    noRuns: "No execution time was found within the next 10 years.",
    everyMinute: "Every minute",
    everyHour: "Every hour",
    everyDay: "Daily at 09:00",
    weekdays: "Weekdays at 09:00",
    everyMonday: "Mondays at 09:00",
    everyMonth: "Monthly at 00:00",
    everyMinuteExplain: "Runs every minute.",
    everyHourExplain: "Runs at minute 0 of every hour.",
    everyDayExplain: "Runs every day at 09:00.",
    weekdaysExplain: "Runs Monday through Friday at 09:00.",
    everyMondayExplain: "Runs every Monday at 09:00.",
    everyMonthExplain: "Runs at 00:00 on the first day of every month.",
    anyMinute: "every minute",
    anyHour: "every hour",
    anyDayOfMonth: "every day",
    anyMonth: "every month",
    anyDayOfWeek: "every day",
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    weekdaySunday: "Sunday",
    weekdayMonday: "Monday",
    weekdayTuesday: "Tuesday",
    weekdayWednesday: "Wednesday",
    weekdayThursday: "Thursday",
    weekdayFriday: "Friday",
    weekdaySaturday: "Saturday",
    everyNMinutesExplain: "Runs every {interval} minutes.",
    everyNHoursExplain: "Runs every {interval} hours on the hour.",
    hourlyAtMinuteExplain: "Runs at minute {minute} of every hour.",
    hourlyAtMinutesExplain: "Runs at minutes {minutes} of every hour.",
    dailyDuringHourExplain: "Runs every minute from {hour}:00 through {hour}:59 every day.",
    monthlyOnDayExplain: "Runs every minute on day {day} of every month.",
    monthlyHourlyAtMinuteExplain: "Runs at minute {minute} of every hour on day {day} of every month.",
    yearlyDuringMonthExplain: "Runs every minute during month {month} of every year.",
    yearlyDailyAtExplain: "Runs every day at {time} during month {month} of every year.",
    weeklyAllDayExplain: "Runs every minute on {weekday}.",
    weeklyHourlyExplain: "Runs at the start of every hour, {weekday}.",
    weekdayHoursIntervalExplain: "Runs every {interval} minutes from {start}:00 through {end}:59, {weekday}.",
    dayOrWeekdayAtExplain: "Runs at {time} on day {day} of every month or on {weekday}.",
    dailyAtExplain: "Runs every day at {time}.",
    weeklyAtExplain: "Runs on {weekday} at {time}.",
    monthlyAtExplain: "Runs on day {day} of every month at {time}."
  }
};

const expressionInput = document.getElementById("expression");
const validationStatus = document.getElementById("validationStatus");
const explanation = document.getElementById("explanation");
const nextRuns = document.getElementById("nextRuns");
const langSwitch = document.getElementById("langSwitch");
const fieldInputs = FIELD_DEFINITIONS.map((field) => document.getElementById(field.id));
const scheduleType = document.getElementById("scheduleType");
const intervalValue = document.getElementById("intervalValue");
const intervalUnit = document.getElementById("intervalUnit");
const runTime = document.getElementById("runTime");
const weekdaySelect = document.getElementById("weekdaySelect");
const monthDayValue = document.getElementById("monthDayValue");
const intervalControl = document.getElementById("intervalControl");
const timeControl = document.getElementById("timeControl");
const weekdayControl = document.getElementById("weekdayControl");
const monthDayControl = document.getElementById("monthDayControl");
const LANGUAGE_KEY = "simple-tools-language";
let currentLanguage = getInitialLanguage();
let renderTimer;
let currentParsedFields = null;

function getInitialLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key, replacements = {}) {
  let text = translations[currentLanguage][key] || key;
  Object.entries(replacements).forEach(([name, value]) => {
    text = text.split(`{${name}}`).join(value);
  });
  return text;
}

function fieldName(definition) {
  return t(definition.id);
}

function parseField(value, definition) {
  if (!value) {
    throw new Error(t("invalidEmpty", { field: fieldName(definition) }));
  }
  if (!/^[\d*/,\-]+$/.test(value)) {
    throw new Error(t("invalidSyntax", { field: fieldName(definition) }));
  }

  const values = new Set();
  const addValue = (number) => {
    if (number < definition.min || number > definition.max) {
      throw new Error(t("invalidValue", {
        field: fieldName(definition),
        min: definition.min,
        max: definition.max
      }));
    }
    values.add(definition.id === "dayOfWeek" && number === 7 ? 0 : number);
  };

  value.split(",").forEach((part) => {
    if (!part) {
      throw new Error(t("invalidSyntax", { field: fieldName(definition) }));
    }

    const segments = part.split("/");
    if (segments.length > 2 || !segments[0]) {
      throw new Error(t("invalidSyntax", { field: fieldName(definition) }));
    }

    let step = 1;
    if (segments.length === 2) {
      if (!/^\d+$/.test(segments[1]) || Number(segments[1]) <= 0) {
        throw new Error(t("invalidStep", { field: fieldName(definition) }));
      }
      step = Number(segments[1]);
    }

    const base = segments[0];
    let start;
    let end;
    if (base === "*") {
      start = definition.min;
      end = definition.max;
    } else if (/^\d+$/.test(base)) {
      start = Number(base);
      end = segments.length === 2 ? definition.max : start;
    } else {
      const range = base.match(/^(\d+)-(\d+)$/);
      if (!range) {
        throw new Error(t("invalidSyntax", { field: fieldName(definition) }));
      }
      start = Number(range[1]);
      end = Number(range[2]);
      if (start > end) {
        throw new Error(t("invalidRange", { field: fieldName(definition) }));
      }
    }

    if (
      start < definition.min ||
      start > definition.max ||
      end < definition.min ||
      end > definition.max
    ) {
      throw new Error(t("invalidValue", {
        field: fieldName(definition),
        min: definition.min,
        max: definition.max
      }));
    }

    for (let number = start; number <= end; number += step) addValue(number);
  });

  return { source: value, values, unrestricted: value.startsWith("*") };
}

function parseExpression(expression) {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5 || parts.some((part) => !part)) {
    throw new Error(t("invalidFieldCount"));
  }
  return FIELD_DEFINITIONS.map((definition, index) => parseField(parts[index], definition));
}

function findNextRuns(fields, count = 5) {
  const results = [];
  const cursor = new Date();
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);
  const limit = new Date(cursor);
  limit.setFullYear(limit.getFullYear() + 10);

  while (cursor <= limit && results.length < count) {
    if (!fields[3].values.has(cursor.getMonth() + 1)) {
      cursor.setMonth(cursor.getMonth() + 1, 1);
      cursor.setHours(0, 0, 0, 0);
      continue;
    }

    const dateMatches = fields[2].values.has(cursor.getDate());
    const weekdayMatches = fields[4].values.has(cursor.getDay());
    const dayMatches = !fields[2].unrestricted && !fields[4].unrestricted
      ? dateMatches || weekdayMatches
      : dateMatches && weekdayMatches;
    if (!dayMatches) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(0, 0, 0, 0);
      continue;
    }

    if (!fields[1].values.has(cursor.getHours())) {
      cursor.setHours(cursor.getHours() + 1, 0, 0, 0);
      continue;
    }

    if (!fields[0].values.has(cursor.getMinutes())) {
      cursor.setMinutes(cursor.getMinutes() + 1, 0, 0);
      continue;
    }

    results.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1, 0, 0);
  }
  return results;
}

function formatDate(date) {
  return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

function weekdayName(value) {
  const names = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return t(names[value === 7 ? 0 : value]);
}

function describeWeekdaySchedule(source) {
  const parts = source.split(",").map((part) => {
    if (/^\d+$/.test(part)) {
      const name = weekdayName(Number(part));
      return currentLanguage === "zh" ? `周${name}` : name;
    }

    const range = part.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = weekdayName(Number(range[1]));
      const end = weekdayName(Number(range[2]));
      return currentLanguage === "zh" ? `周${start}至周${end}` : `${start} through ${end}`;
    }

    return describeField(part, FIELD_DEFINITIONS[4]);
  });

  if (currentLanguage === "zh") return `每${parts.join("、")}`;
  if (parts.length < 2) return parts[0];
  if (parts.length === 2) return parts.join(" and ");
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

function describeField(source, definition) {
  if (source === "*") return t(`any${definition.id[0].toUpperCase()}${definition.id.slice(1)}`);

  const formatValue = (value, includeUnit = true) => {
    if (definition.id === "dayOfWeek") return weekdayName(Number(value));
    if (!includeUnit) return value;
    const units = currentLanguage === "zh"
      ? { minute: " 分钟", hour: " 时", dayOfMonth: " 日", month: " 月" }
      : { minute: "", hour: "", dayOfMonth: "", month: "" };
    return `${value}${units[definition.id] || ""}`;
  };

  if (source.includes(",")) {
    return source.split(",").map((part) => describeField(part, definition)).join(
      currentLanguage === "zh" ? "、" : ", "
    );
  }

  const [base, step] = source.split("/");
  if (step) {
    const unitNames = currentLanguage === "zh"
      ? { minute: "分钟", hour: "小时", dayOfMonth: "天", month: "个月", dayOfWeek: "天" }
      : { minute: "minutes", hour: "hours", dayOfMonth: "days", month: "months", dayOfWeek: "days" };
    const interval = currentLanguage === "zh"
      ? `每隔 ${step} ${unitNames[definition.id]}`
      : `every ${step} ${unitNames[definition.id]}`;
    if (base === "*") return interval;
    return `${describeField(base, definition)}${currentLanguage === "zh" ? "，" : ", "}${interval}`;
  }

  if (source.includes("-")) {
    const [start, end] = source.split("-");
    const separator = currentLanguage === "zh" ? "至" : "–";
    if (definition.id === "dayOfWeek") {
      return `${formatValue(start)}${separator}${formatValue(end)}`;
    }
    const suffixes = currentLanguage === "zh"
      ? { minute: " 分钟", hour: " 时", dayOfMonth: " 日", month: " 月" }
      : { minute: "", hour: "", dayOfMonth: "", month: "" };
    return `${formatValue(start, false)}${separator}${formatValue(end, false)}${suffixes[definition.id] || ""}`;
  }
  return formatValue(source);
}

function explainComposedExpression(fields) {
  const [minuteField, hourField, dayField, monthField, weekdayField] = fields;
  const list = (items) => {
    if (currentLanguage === "zh") return items.join("、");
    if (items.length < 2) return items[0];
    if (items.length === 2) return items.join(" and ");
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  };
  const values = (field) => [...field.values].sort((left, right) => left - right);
  const selection = (field) => {
    const range = field.source.match(/^(\d+)-(\d+)$/);
    if (range) {
      return currentLanguage === "zh"
        ? `${range[1]} 至 ${range[2]}`
        : `${range[1]} through ${range[2]}`;
    }
    return list(values(field).map(String));
  };

  const minute = minuteField.source;
  const hour = hourField.source;
  const fixedMinute = /^\d+$/.test(minute);
  const fixedHour = /^\d+$/.test(hour);
  const minuteInterval = minute.match(/^\*\/(\d+)$/);
  const offsetMinuteInterval = minute.match(/^(\d+)\/(\d+)$/);
  const minuteRange = minute.match(/^(\d+)-(\d+)$/);
  const minuteRangeInterval = minute.match(/^(\d+)-(\d+)\/(\d+)$/);
  let time;

  if (currentLanguage === "zh") {
    let hourDescription;
    if (fixedHour) {
      hourDescription = `${hour} 时`;
    } else {
      const hourRange = hour.match(/^(\d+)-(\d+)$/);
      const hourInterval = hour.match(/^\*\/(\d+)$/);
      const offsetHourInterval = hour.match(/^(\d+)\/(\d+)$/);
      const hourRangeInterval = hour.match(/^(\d+)-(\d+)\/(\d+)$/);
      if (hourRange) {
        hourDescription = `${hourRange[1]} 至 ${hourRange[2]} 时`;
      } else if (hourInterval) {
        hourDescription = `从 0 时起每隔 ${hourInterval[1]} 小时`;
      } else if (offsetHourInterval) {
        hourDescription = `从 ${offsetHourInterval[1]} 时起每隔 ${offsetHourInterval[2]} 小时`;
      } else if (hourRangeInterval) {
        hourDescription =
          `${hourRangeInterval[1]} 至 ${hourRangeInterval[2]} 时内每隔 ` +
          `${hourRangeInterval[3]} 小时`;
      } else if (hour !== "*") {
        hourDescription = `${selection(hourField)} 时`;
      }
    }

    if (hour === "*" && minute === "*") {
      time = "每分钟执行一次";
    } else if (hour === "*" && fixedMinute) {
      time = `每小时的第 ${minute} 分钟执行`;
    } else if (hour === "*" && minuteInterval) {
      time = `每隔 ${minuteInterval[1]} 分钟执行一次`;
    } else if (hour === "*" && offsetMinuteInterval) {
      time = `每小时从第 ${offsetMinuteInterval[1]} 分钟起每隔 ` +
        `${offsetMinuteInterval[2]} 分钟执行`;
    } else if (hour === "*" && minuteRange) {
      time = `每小时的第 ${minuteRange[1]} 至 ${minuteRange[2]} 分钟内每分钟执行`;
    } else if (hour === "*" && minuteRangeInterval) {
      time =
        `每小时的第 ${minuteRangeInterval[1]} 至 ${minuteRangeInterval[2]} 分钟内每隔 ` +
        `${minuteRangeInterval[3]} 分钟执行`;
    } else if (hour === "*") {
      time = `每小时的第 ${selection(minuteField)} 分钟执行`;
    } else if (minute === "*") {
      time = `${hourDescription}内每分钟执行`;
    } else if (fixedMinute) {
      time = `${hourDescription}的第 ${minute} 分钟执行`;
    } else if (minuteInterval) {
      time = `${hourDescription}内每隔 ${minuteInterval[1]} 分钟执行`;
    } else if (offsetMinuteInterval) {
      time = `${hourDescription}内从第 ${offsetMinuteInterval[1]} 分钟起每隔 ` +
        `${offsetMinuteInterval[2]} 分钟执行`;
    } else if (minuteRange) {
      time = `${hourDescription}的第 ${minuteRange[1]} 至 ${minuteRange[2]} 分钟内每分钟执行`;
    } else if (minuteRangeInterval) {
      time =
        `${hourDescription}的第 ${minuteRangeInterval[1]} 至 ${minuteRangeInterval[2]} 分钟内` +
        `每隔 ${minuteRangeInterval[3]} 分钟执行`;
    } else {
      time = `${hourDescription}的第 ${selection(minuteField)} 分钟执行`;
    }
  } else {
    let hourDescription;
    if (fixedHour) {
      hourDescription = `hour ${hour}`;
    } else {
      const hourRange = hour.match(/^(\d+)-(\d+)$/);
      const hourInterval = hour.match(/^\*\/(\d+)$/);
      const offsetHourInterval = hour.match(/^(\d+)\/(\d+)$/);
      const hourRangeInterval = hour.match(/^(\d+)-(\d+)\/(\d+)$/);
      if (hourRange) {
        hourDescription = `hours ${hourRange[1]} through ${hourRange[2]}`;
      } else if (hourInterval) {
        hourDescription = `every ${hourInterval[1]} hours starting at hour 0`;
      } else if (offsetHourInterval) {
        hourDescription =
          `every ${offsetHourInterval[2]} hours starting at hour ${offsetHourInterval[1]}`;
      } else if (hourRangeInterval) {
        hourDescription =
          `every ${hourRangeInterval[3]} hours from hour ${hourRangeInterval[1]} ` +
          `through ${hourRangeInterval[2]}`;
      } else if (hour !== "*") {
        hourDescription = `hours ${selection(hourField)}`;
      }
    }

    if (hour === "*" && minute === "*") {
      time = "every minute";
    } else if (hour === "*" && fixedMinute) {
      time = `at minute ${minute} of every hour`;
    } else if (hour === "*" && minuteInterval) {
      time = `every ${minuteInterval[1]} minutes`;
    } else if (hour === "*" && offsetMinuteInterval) {
      time =
        `every ${offsetMinuteInterval[2]} minutes starting at minute ` +
        `${offsetMinuteInterval[1]} of each hour`;
    } else if (hour === "*" && minuteRange) {
      time = `every minute from minute ${minuteRange[1]} through ${minuteRange[2]} of each hour`;
    } else if (hour === "*" && minuteRangeInterval) {
      time =
        `every ${minuteRangeInterval[3]} minutes from minute ${minuteRangeInterval[1]} ` +
        `through ${minuteRangeInterval[2]} of each hour`;
    } else if (hour === "*") {
      time = `at minutes ${selection(minuteField)} of every hour`;
    } else if (minute === "*") {
      time = `every minute during ${hourDescription}`;
    } else if (fixedMinute) {
      time = `at minute ${minute} during ${hourDescription}`;
    } else if (minuteInterval) {
      time = `every ${minuteInterval[1]} minutes during ${hourDescription}`;
    } else if (offsetMinuteInterval) {
      time =
        `every ${offsetMinuteInterval[2]} minutes starting at minute ` +
        `${offsetMinuteInterval[1]} during ${hourDescription}`;
    } else if (minuteRange) {
      time = `every minute from minute ${minuteRange[1]} through ${minuteRange[2]} during ${hourDescription}`;
    } else if (minuteRangeInterval) {
      time =
        `every ${minuteRangeInterval[3]} minutes from minute ${minuteRangeInterval[1]} ` +
        `through ${minuteRangeInterval[2]} during ${hourDescription}`;
    } else {
      time = `at minutes ${selection(minuteField)} during ${hourDescription}`;
    }
  }

  const day = dayField.source;
  const month = monthField.source;
  const weekday = weekdayField.source;
  const hasDay = day !== "*";
  const hasMonth = month !== "*";
  const hasWeekday = weekday !== "*";
  if (!hasDay && !hasMonth && !hasWeekday) {
    return currentLanguage === "zh" ? `${time}。` : `Runs ${time}.`;
  }

  const daySelection = hasDay ? selection(dayField) : "";
  const monthSelection = hasMonth ? selection(monthField) : "";
  let weekdaySchedule = "";
  if (hasWeekday) {
    if (/^[\d,-]+$/.test(weekday)) {
      weekdaySchedule = describeWeekdaySchedule(weekday);
    } else {
      const names = values(weekdayField).map((value) => {
        const name = weekdayName(value);
        return currentLanguage === "zh" ? `周${name}` : name;
      });
      weekdaySchedule = currentLanguage === "zh" ? `每${list(names)}` : list(names);
    }
  }

  if (currentLanguage === "zh") {
    let calendar;
    if (!hasMonth && hasDay && hasWeekday) {
      calendar = `每月 ${daySelection} 日或${weekdaySchedule}`;
    } else if (!hasMonth && hasDay) {
      calendar = `每月 ${daySelection} 日`;
    } else if (!hasMonth) {
      calendar = weekdaySchedule;
    } else if (hasDay && hasWeekday) {
      calendar =
        `每年 ${monthSelection} 月内，日期为 ${daySelection} 日或星期为` +
        `${weekdaySchedule.replace(/^每/, "")}时`;
    } else if (hasDay) {
      calendar = `每年 ${monthSelection} 月的 ${daySelection} 日`;
    } else if (hasWeekday) {
      calendar = `每年 ${monthSelection} 月内的${weekdaySchedule}`;
    } else {
      calendar = `每年 ${monthSelection} 月内`;
    }
    return `${calendar}，${time}。`;
  }

  let calendar;
  if (!hasMonth && hasDay && hasWeekday) {
    calendar = ` on day ${daySelection} of every month or on ${weekdaySchedule}`;
  } else if (!hasMonth && hasDay) {
    calendar = ` on day ${daySelection} of every month`;
  } else if (!hasMonth) {
    calendar = ` on ${weekdaySchedule}`;
  } else if (hasDay && hasWeekday) {
    calendar =
      ` on day ${daySelection} or on ${weekdaySchedule} during month ` +
      `${monthSelection} of every year`;
  } else if (hasDay) {
    calendar = ` on day ${daySelection} of month ${monthSelection} every year`;
  } else if (hasWeekday) {
    calendar = ` on ${weekdaySchedule} during month ${monthSelection} of every year`;
  } else {
    calendar = ` during month ${monthSelection} of every year`;
  }
  return `Runs ${time}${calendar}.`;
}

function explainExpression(expression, fields) {
  const preset = PRESETS.find((item) => item.expression === expression);
  if (preset) return t(`${preset.key}Explain`);

  const sources = fields.map((field) => field.source);
  const minuteInterval = sources[0].match(/^\*\/(\d+)$/);
  if (minuteInterval && sources.slice(1).every((source) => source === "*")) {
    return t("everyNMinutesExplain", { interval: minuteInterval[1] });
  }

  const offsetMinuteInterval = sources[0].match(/^(\d+)\/\d+$/);
  if (offsetMinuteInterval && sources.slice(1).every((source) => source === "*")) {
    const minuteValues = [...fields[0].values].sort((left, right) => left - right);
    if (minuteValues.length === 1) {
      return t("hourlyAtMinuteExplain", { minute: minuteValues[0] });
    }
    let minutes = minuteValues.join(currentLanguage === "zh" ? "、" : ", ");
    if (currentLanguage === "en" && minuteValues.length === 2) {
      minutes = minuteValues.join(" and ");
    } else if (currentLanguage === "en") {
      minutes = `${minuteValues.slice(0, -1).join(", ")}, and ${minuteValues[minuteValues.length - 1]}`;
    }
    return t("hourlyAtMinutesExplain", { minutes });
  }

  if (/^\d+$/.test(sources[0]) && sources.slice(1).every((source) => source === "*")) {
    return t("hourlyAtMinuteExplain", { minute: sources[0] });
  }

  if (
    /^\d+$/.test(sources[1]) &&
    sources[0] === "*" &&
    sources.slice(2).every((source) => source === "*")
  ) {
    return t("dailyDuringHourExplain", { hour: String(sources[1]).padStart(2, "0") });
  }

  if (
    /^\d+$/.test(sources[2]) &&
    sources.slice(0, 2).every((source) => source === "*") &&
    sources.slice(3).every((source) => source === "*")
  ) {
    return t("monthlyOnDayExplain", { day: sources[2] });
  }

  if (
    /^\d+$/.test(sources[0]) &&
    sources[1] === "*" &&
    /^\d+$/.test(sources[2]) &&
    sources.slice(3).every((source) => source === "*")
  ) {
    return t("monthlyHourlyAtMinuteExplain", {
      day: sources[2],
      minute: sources[0]
    });
  }

  if (
    /^\d+$/.test(sources[3]) &&
    sources.slice(0, 3).every((source) => source === "*") &&
    sources[4] === "*"
  ) {
    return t("yearlyDuringMonthExplain", { month: sources[3] });
  }

  if (/^[\d,-]+$/.test(sources[4]) && sources.slice(0, 4).every((source) => source === "*")) {
    return t("weeklyAllDayExplain", {
      weekday: describeWeekdaySchedule(sources[4])
    });
  }

  if (
    sources[0] === "0" &&
    sources.slice(1, 4).every((source) => source === "*") &&
    /^[\d,-]+$/.test(sources[4])
  ) {
    return t("weeklyHourlyExplain", {
      weekday: describeWeekdaySchedule(sources[4])
    });
  }

  const hourInterval = sources[1].match(/^\*\/(\d+)$/);
  if (sources[0] === "0" && hourInterval && sources.slice(2).every((source) => source === "*")) {
    return t("everyNHoursExplain", { interval: hourInterval[1] });
  }

  const hourRange = sources[1].match(/^(\d+)-(\d+)$/);
  if (
    minuteInterval &&
    hourRange &&
    sources[2] === "*" &&
    sources[3] === "*" &&
    /^[\d,-]+$/.test(sources[4])
  ) {
    return t("weekdayHoursIntervalExplain", {
      weekday: describeWeekdaySchedule(sources[4]),
      start: String(hourRange[1]).padStart(2, "0"),
      end: String(hourRange[2]).padStart(2, "0"),
      interval: minuteInterval[1]
    });
  }

  const fixedTime = /^\d+$/.test(sources[0]) && /^\d+$/.test(sources[1]);
  if (fixedTime) {
    const time = `${String(sources[1]).padStart(2, "0")}:${String(sources[0]).padStart(2, "0")}`;
    if (sources[3] === "*") {
      if (sources[2] === "*" && sources[4] === "*") {
        return t("dailyAtExplain", { time });
      }
      if (sources[2] === "*" && /^[\d,-]+$/.test(sources[4])) {
        return t("weeklyAtExplain", {
          weekday: describeWeekdaySchedule(sources[4]),
          time
        });
      }
      if (/^\d+$/.test(sources[2]) && sources[4] === "*") {
        return t("monthlyAtExplain", {
          day: describeField(sources[2], FIELD_DEFINITIONS[2]).replace(/\s*日$/, ""),
          time
        });
      }
      if (/^\d+$/.test(sources[2]) && /^[\d,-]+$/.test(sources[4])) {
        return t("dayOrWeekdayAtExplain", {
          day: sources[2],
          weekday: describeWeekdaySchedule(sources[4]),
          time
        });
      }
    }
    if (sources[2] === "*" && /^\d+$/.test(sources[3]) && sources[4] === "*") {
      return t("yearlyDailyAtExplain", {
        month: sources[3],
        time
      });
    }
  }

  return explainComposedExpression(fields);
}

function renderResult() {
  window.clearTimeout(renderTimer);
  const normalizedExpression = expressionInput.value.trim().replace(/\s+/g, " ");
  fieldInputs.forEach((input) => input.classList.remove("invalid"));

  try {
    currentParsedFields = parseExpression(normalizedExpression);
    validationStatus.textContent = t("valid");
    validationStatus.classList.remove("error");
    explanation.textContent = explainExpression(normalizedExpression, currentParsedFields);
    explanation.classList.remove("error");

    const dates = findNextRuns(currentParsedFields);
    nextRuns.replaceChildren();
    if (dates.length === 0) {
      const item = document.createElement("li");
      item.className = "empty-state";
      item.textContent = t("noRuns");
      nextRuns.append(item);
    } else {
      dates.forEach((date) => {
        const item = document.createElement("li");
        item.textContent = formatDate(date);
        nextRuns.append(item);
      });
    }
  } catch (error) {
    currentParsedFields = null;
    validationStatus.textContent = error.message;
    validationStatus.classList.add("error");
    explanation.textContent = t("fixExpression");
    explanation.classList.add("error");
    nextRuns.replaceChildren();
    const item = document.createElement("li");
    item.className = "empty-state";
    item.textContent = "—";
    nextRuns.append(item);
  }
}

function scheduleRender() {
  window.clearTimeout(renderTimer);
  renderTimer = window.setTimeout(renderResult, 160);
}

function updateBuilderVisibility() {
  const type = scheduleType.value;
  const usesInterval = type === "minutes" || type === "hours";
  intervalControl.hidden = !usesInterval;
  timeControl.hidden = !["daily", "weekly", "monthly"].includes(type);
  weekdayControl.hidden = type !== "weekly";
  monthDayControl.hidden = type !== "monthly";

  if (usesInterval) {
    const isMinutes = type === "minutes";
    intervalValue.max = isMinutes ? "59" : "23";
    intervalUnit.textContent = t(isMinutes ? "minuteUnit" : "hourUnit");
  }
}

function generateFromBuilder() {
  const type = scheduleType.value;
  updateBuilderVisibility();
  if (type === "custom") return;

  let expression;
  if (type === "minutes" || type === "hours") {
    const maximum = type === "minutes" ? 59 : 23;
    const interval = Number(intervalValue.value);
    if (!Number.isInteger(interval) || interval < 1 || interval > maximum) return;
    expression = type === "minutes"
      ? `*/${interval} * * * *`
      : `0 */${interval} * * *`;
  } else {
    if (!/^\d{2}:\d{2}$/.test(runTime.value)) return;
    const [hour, minute] = runTime.value.split(":").map(Number);
    if (type === "daily") expression = `${minute} ${hour} * * *`;
    if (type === "weekly") expression = `${minute} ${hour} * * ${weekdaySelect.value}`;
    if (type === "monthly") {
      const day = Number(monthDayValue.value);
      if (!Number.isInteger(day) || day < 1 || day > 31) return;
      expression = `${minute} ${hour} ${day} * *`;
    }
  }

  if (!expression) return;
  expressionInput.value = expression;
  const parts = expression.split(" ");
  fieldInputs.forEach((input, index) => {
    input.value = parts[index];
  });
  scheduleRender();
}

function handleScheduleTypeChange() {
  if (scheduleType.value === "minutes" || scheduleType.value === "hours") {
    const maximum = scheduleType.value === "minutes" ? 59 : 23;
    const interval = Number(intervalValue.value);
    if (!Number.isInteger(interval) || interval < 1 || interval > maximum) {
      intervalValue.value = scheduleType.value === "minutes" ? "20" : "3";
    }
  }
  generateFromBuilder();
}

function syncBuilderFromExpression() {
  const parts = expressionInput.value.trim().split(/\s+/);
  if (parts.length !== 5) {
    scheduleType.value = "custom";
    updateBuilderVisibility();
    return;
  }

  const [minute, hour, day, month, weekday] = parts;
  const minuteInterval = minute.match(/^\*\/(\d+)$/);
  const hourInterval = hour.match(/^\*\/(\d+)$/);
  const weekdayOption = Array.from(weekdaySelect.options).some((option) => option.value === weekday);

  if ((minute === "*" || minuteInterval) && parts.slice(1).every((part) => part === "*")) {
    scheduleType.value = "minutes";
    intervalValue.value = minuteInterval ? minuteInterval[1] : "1";
  } else if (
    minute === "0" &&
    (hour === "*" || hourInterval) &&
    parts.slice(2).every((part) => part === "*")
  ) {
    scheduleType.value = "hours";
    intervalValue.value = hourInterval ? hourInterval[1] : "1";
  } else if (/^\d+$/.test(minute) && /^\d+$/.test(hour) && month === "*") {
    runTime.value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    if (day === "*" && weekday === "*") {
      scheduleType.value = "daily";
    } else if (day === "*" && weekdayOption) {
      scheduleType.value = "weekly";
      weekdaySelect.value = weekday;
    } else if (/^\d+$/.test(day) && weekday === "*") {
      scheduleType.value = "monthly";
      monthDayValue.value = day;
    } else {
      scheduleType.value = "custom";
    }
  } else {
    scheduleType.value = "custom";
  }
  updateBuilderVisibility();
}

function syncFieldsFromExpression() {
  const parts = expressionInput.value.trim().split(/\s+/);
  if (parts.length === 5) {
    fieldInputs.forEach((input, index) => {
      input.value = parts[index];
    });
  }
  syncBuilderFromExpression();
  scheduleRender();
}

function syncExpressionFromFields() {
  expressionInput.value = fieldInputs.map((input) => input.value.trim()).join(" ");
  syncBuilderFromExpression();
  scheduleRender();
}

function renderPresets() {
  const grid = document.getElementById("presetGrid");
  grid.replaceChildren();
  PRESETS.forEach((preset) => {
    const button = document.createElement("button");
    button.className = "preset-button";
    button.type = "button";

    const label = document.createElement("span");
    label.textContent = t(preset.key);
    const code = document.createElement("code");
    code.textContent = preset.expression;
    button.append(label, code);
    button.addEventListener("click", () => {
      expressionInput.value = preset.expression;
      syncFieldsFromExpression();
    });
    grid.append(button);
  });
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  langSwitch.textContent = t("switchText");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  updateBuilderVisibility();
  renderPresets();
  renderResult();
}

expressionInput.addEventListener("input", syncFieldsFromExpression);
fieldInputs.forEach((input) => input.addEventListener("input", syncExpressionFromFields));
scheduleType.addEventListener("change", handleScheduleTypeChange);
intervalValue.addEventListener("input", generateFromBuilder);
runTime.addEventListener("input", generateFromBuilder);
weekdaySelect.addEventListener("change", generateFromBuilder);
monthDayValue.addEventListener("input", generateFromBuilder);

document.getElementById("copyButton").addEventListener("click", async () => {
  if (!expressionInput.value) return;
  try {
    await navigator.clipboard.writeText(expressionInput.value.trim());
    validationStatus.textContent = t("copied");
    validationStatus.classList.remove("error");
  } catch {
    expressionInput.select();
    validationStatus.textContent = t("copyFailed");
    validationStatus.classList.add("error");
  }
});

langSwitch.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
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

document.getElementById("timezoneName").textContent =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
syncBuilderFromExpression();
applyLanguage();
updateFooterClock();
setInterval(updateFooterClock, 1000);
