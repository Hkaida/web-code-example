/**
 * 防抖函数：高频多次触发，只执行最后一次
 * @param {Function} callback 原函数
 * @param {Number} wait 停止操作后等待的时间（毫秒）
 * @returns {Function} 新函数
 */
 export const debounce = (callback, wait) => {
  let timer = null;
  return function() {
    let args = arguments; // arguments中存着e
       
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, wait)
  }
}

/**
 * 节流函数：高频多次触发，隔一段时间后的触发才执行
 * @param {Function} callback 原函数
 * @param {Number} delay 每执行一次的间隔时间（毫秒）
 * @returns {Function} 新函数
 */
export const throttle = (callback, delay) => {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        callback.apply(self, args);
        timer = null;
      }, delay);
    }
  };
};

/**
 * 返回 Promise 的函数
 * @callback promiseFunction
 * @returns {Promise}
 */
/**
 * 限制重复请求or其他用Promise处理的异步操作
 * - 重复请求只发起第一次的请求
 * @param {promiseFunction} callback 原函数
 * @returns {Function} 新函数
 */
export function firstPromise(callback) {
  let p = null
  return function (...args) {
    // 请求的实例，已存在意味着正在请求中，直接返回实例，不触发新的请求
    return p || (p = callback.apply(this, args).finally(() => (p = null)))
  }
}