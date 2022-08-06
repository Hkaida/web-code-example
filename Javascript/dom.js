/**
 * dom 操作
 */

/**
 * 获取元素在页面中的绝对位置
 * @param { eventObject } e 
 * @returns
 */
function handle(e){
  // getBoundingClientRect() 获取元素相对于浏览器窗口的位置
  // document.documentElement.scrollTop、document.documentElement.scrollLeft 获取页面滚动距离
  // 参考：阮一峰博客 http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html
  let x = e.target.getBoundingClientRect().left + document.documentElement.scrollLeft;
  let y = e.target.getBoundingClientRect().top + document.documentElement.scrollTop;
  // do something...
}

