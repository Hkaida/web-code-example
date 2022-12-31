/**
 * 其他
 */

/**
 * 判断移动端
 */
export const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|MicroMessenger/i.test(
  window.navigator.userAgent
);

/**
 * 获取范围内随机整数 - 含最大值，含最小值
 * @param {Number | String} min 最小值 - 如果传入小数会向上取整
 * @param {Number | String} max 最大值 - 如果传入小数会向下取整
 * @returns {Number} 随机数
 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 千分位 - 从个位数开始，每三位数用逗号分隔
 * @param {Number | String} num - 数值
 * @returns {String} 
 */
 export const thousand = num => {
  if (num == undefined) { // 两个等号，可以同时判断是否为null
    return 0;
  }
  num = String(num);

  let strArr = num.split(".");

  return (
    strArr[0].replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ",") +
    (strArr[1] ? "." + strArr[1] : "")
  );
};

/**
 * 限制输入框输入数字
 * @param {Number} num 数值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} precision 小数精度（保留几位小数）
 * @returns 
 */
export const numInputFormat = (
  num,
  min = -99999999,
  max = 99999999,
  precision = 0
) => {
  if (num == undefined || num === "") {
    return num;
  }
  num = String(num);
  // // 删除后默认变0
  // if (num === "") {
  //   return "0";
  // }
  let isNegative = false;
  // 判断是否负数
  if (num[0] === "-") {
    isNegative = true;
  }
  if (precision > 0) {
    // 精度大于0有小数，去掉所有非数字与非小数点，用小数点分割成数组。
    let strArr = num.replace(/[^\d.]/g, "").split(".");
    if (strArr.length > 1) {
      // 如果数组长度大于1说明有小数点，则插入小数点并拼接，再分割，去掉多余小数点。
      strArr.splice(1, 0, ".");
      strArr = strArr.join("").split(".");
    }
    // 小数部分位数裁剪，整数部分转换成数值类型（去掉前面多余的0），最后用小数点拼接起来。
    num = strArr
      .map((n, i) => {
        return i ? n.substr(0, precision) : Number(n);
      })
      .join(".");
  } else {
    // 精度不大于0不能输入小数点，直接去除所有非数字，并限制取值范围。
    num = num.replace(/[\D]/g, "");
  }
  // 如果是负数前面加负号
  if (isNegative) {
    num = "-" + num;
  }

  if (min <= max && Number(num) != 0) {
    // 限制不少于最小值
    if (Number(num) < min) {
      num = min;
    }
    // 限制不超过最大值
    if (Number(num) > max) {
      num = max;
    }
  }

  return num;
};

/**
 * 格式化文件大小显示
 * 1 G = 1073741824 B
 * 1 MB = 1048576 B
 * 1 KB = 1024 B
 * @param {String} fileSize - 文件大小
 * @param {Number} precision 小数精度（保留几位小数）
 */
 export const sizeTransform = (fileSize, precision = 0) => {
  let result = "";
  if (fileSize >= 1073741824) {
    // B => GB
    result = fileSize / 1073741824;
    result = Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
    result = result.toFixed(precision) + "GB";
  } else if (fileSize >= 1048576) {
    // B => MB
    result = fileSize / 1048576;
    result = Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
    result = result.toFixed(precision) + "MB";
  } else if (fileSize >= 1024) {
    // B => KB
    result = fileSize / 1024;
    result = Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
    result = result.toFixed(precision) + "KB";
  } else {
    result = fileSize + "B";
  }
  return result;
};

/**
 * 格式化文件大小
 * @param {string | number} bytes 文件大小file.size
 * @param {number} precision 保留的小数位
 * @returns 例如：20MB
 */
 export function formatFileSize(bytes, precision = 0) {
  if (!bytes) {
    return '0B'
  }
  if (precision < 0) {
    precision = 0
  }

  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  let index = 0
  index = Math.floor(Math.log(parseFloat(bytes)) / Math.log(1024))

  let size = parseFloat(bytes) / Math.pow(1024, index)
  size = size.toFixed(precision)
  
  return size + unitArr[index]
}

/**
 * 复制文字到剪切板
 * @param {String | Number} value 需要复制的值
 * @returns {Boolean} 是否复制成功
 */
 export const copy = value => {
  let transfer = document.createElement("input");
  transfer.style.position = "fixed";
  document.body.appendChild(transfer);
  transfer.value = String(value); // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  let res = document.execCommand("copy");
  transfer.blur();
  document.body.removeChild(transfer);
  return res;
};

/**
 * 拷贝或合并对象，支持深度合并
 * - 参考jQuery的extend方法实现
 * - 原对象会被改变，因此如果不想改变原对象，target可传入{}
 * - extendObject([deep,] target, source1[, source2, ...])
 * @param { Boolean } deep 是否深度操作
 * @param { Object } target 目标对象，接收源对象属性的对象，也是修改后的返回值。
 * @param { Object } source 源对象，包含将被合并的属性。
 * @returns {Object} 目标对象
 */
export function extendObject() {
  // target 被扩展的对象
  // length 参数的数量
  // deep 是否深度操作
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;
  
  // 如果只有一个参数，直接返回target
  if (length === i) {
    return target
  }
  // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
  // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
  // 然后把第二个参数赋值给target
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};

    // 将i赋值为2，跳过前两个参数
    i = 2;
  }

  // target既不是对象也不是函数则把target设置为空对象。
  if (typeof target !== "object" && !typeof target !== 'function') {
    target = {}
  }
  // 开始遍历需要被扩展到target上的参数

  for (; i < length; i++) {
    // 处理第i个被扩展的对象，即除去deep和target之外的对象
    if ((options = arguments[i]) != null) {
      // 遍历第i个对象的所有可遍历的属性
      for (name in options) {
        // 根据被扩展对象的键获得目标对象相应值，并赋值给src
        src = target[name];
        // 得到被扩展对象的值
        copy = options[name];

        // 防止有环，例如 extendObject(true, target, {'target':target});
        if (target === copy) {
          continue;
        }

        // 当用户想要深度操作时，递归合并
        // copy是纯对象或者是数组
        if (deep && copy && (Object.prototype.toString.call(copy) === '[object Object]' || (copyIsArray = Array.isArray(copy)))) {
          // 如果是数组
          if (copyIsArray) {
            // 将copyIsArray重新设置为false，为下次遍历做准备。
            copyIsArray = false;
            // 判断被扩展的对象中src是不是数组
            clone = src && Array.isArray(src) ? src : [];
          } else {
            // 判断被扩展的对象中src是不是纯对象
            clone = src && Object.prototype.toString.call(src) ? src : {};
          }

          // 递归调用extendObject方法，继续进行深度遍历
          target[name] = extendObject(deep, clone, copy);

          // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  
  return target;
};