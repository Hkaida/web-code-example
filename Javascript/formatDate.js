/**
 * 日期时间处理
 */
import moment from "moment";

// 对应毫秒数
// const s = 1000;
// const m = 60000;
// const h = 3600000;
// const d = 86400000;

/**
 * 获取当前日期，格式：YYYY-MM-DD
 */
export const nowDate = moment().format("YYYY-MM-DD");

/**
 * 格式化指定时间
 * @param {String | Number | Date} value 时间戳 | Date对象
 * @param {String} dateToken 时间格式，参考 moment 官方文档
 * @returns {String}
 */
export const format = (value, dateToken = "YYYY-MM-DD HH:mm:ss") => {
  if (typeof value === "string") {
    value = Number(value);
  }

  return moment(value).format(dateToken);
};

/**
 * 获取相对现在时间 (从秒开始)
 * @param {String | Number | Date} value 时间戳 | Date对象
 * @returns {String}
 */
export const fromNow = value => {
  if (typeof value === "string") {
    value = Number(value);
  }
  return moment(value).fromNow("s") + "之前";
};

/**
 * 格式化日期
 * @param {String | Number | Date} value 时间戳 | Date对象
 * @returns {String} 今天 | 昨天 | YYYY-MM-DD
 */
export const day = value => {
  if (typeof value === "string") {
    value = Number(value);
  }
  let todayStart = moment()
    .startOf("day")
    .format("x");
  let todayEnd = moment()
    .endOf("day")
    .format("x");

  if (value > todayStart && value < todayEnd) {
    return "今天";
  } else if (value > todayStart - 86400000 && value < todayEnd - 86400000) {
    return "昨天";
  } else {
    return moment(value).format("YYYY-MM-DD");
  }
};
/**
 * 格式化日期时间
 * @param {String | Number | Date} value 时间戳 | Date对象
 * @returns {String} 今天 HH:mm:ss | 昨天 HH:mm:ss | YYYY-MM-DD HH:mm:ss
 */
export const minute = value => {
  if (typeof value === "string") {
    value = Number(value);
  }

  if (day(value) == "今天") {
    return moment(value).format("HH:mm:ss");
  }
  return `${day(value)} ${moment(value).format("HH:mm:ss")}`;
};

/**
 * 格式化日期
 * @param {String | Number } value 天数
 * @returns {String} 今天(MM月DD日) | 明天(MM月DD日) | 后天(MM月DD日) | YYYY年MM月DD日
 */
export const dayLater = value => {
  const d = 86400000;
  if (typeof value === "string") {
    value = Number(value);
  }
  let todayStart = moment()
    .startOf("day")
    .format("x");
  // let todayEnd = moment()
  //   .endOf("day")
  //   .format("x");

  switch (value) {
    case 0:
      return "今天" + moment().format("(MM月DD日)");
    case 1:
      return (
        "明天" + moment(Number(todayStart) + d).format("(MM月DD日)")
      );
    case 2:
      return (
        "后天" + moment(Number(todayStart) + d * 2).format("(MM月DD日)")
      );
    default:
      return (
        value +
        "天" +
        moment(Number(todayStart) + d * value).format("(MM月DD日)")
      );
  }
};

/**
 * 获取日期范围（毫秒值） 
 * @param {String | Number | Date} value 天数 - 获取n天前的时间作为 beginDate
 * @returns {Object} { beginDate, endDate } - beginDate 和 endDate 为毫秒值，endDate是现在这一刻
 */
export const dayRange = value => {

  if (typeof value === "number" && value > 1) {
    //console.log(moment().subtract(value, "day").format("YYYY-MM-DD hh:mm:ss"), moment().format("YYYY-MM-DD hh:mm:ss"));
    return {
      beginDate: moment()
        .subtract(value, "days")
        .format("x"),
      endDate: moment().format("x")
    };
  } else {
    //console.log(moment().startOf(value, "day").format("YYYY-MM-DD hh:mm:ss"), moment().format("YYYY-MM-DD hh:mm:ss"));
    return {
      beginDate: moment()
        .startOf(value, "day")
        .format("x"),
      endDate: moment().format("x")
    };
  }
};

/**
 * 判断时间段 - 凌晨 | 上午 | 下午 | 晚上
 * @param {String | Number | Date} value 至少带有小时的时间点
 * @returns {String} 凌晨 | 上午 | 下午 | 晚上
 */
export const timeSlot = value => {
  const h = 3600000;
  if (typeof value === "string") {
    value = Number(value);
  }
  let dayStart = moment(value)
    .startOf("day")
    .format("x");

  let diff = value - dayStart;
  if (diff >= 0 && diff < 6 * h) {
    return "凌晨";
  } else if (diff >= 6 * h && diff < 12 * h) {
    return "上午";
  } else if (diff >= 12 * h && diff < 18 * h) {
    return "下午";
  } else {
    return "晚上";
  }
};
