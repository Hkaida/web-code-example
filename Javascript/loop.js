/**
 * 各种方式遍历
 */
/**
 * @callback handler
 * @param {Object} item 
 * @param {Number} i 
 * @param {Array} tree 最深层的数组
 */

/**
 * 递归的map函数 - 只对叶子节点进行操作
 * @param {Array}  tree 
 * @param {handler} callback 
 * @returns 
 */
export const recursionMap = (tree, callback) => {
  return tree.map((item, i) => {
    if (!item.childList) {
      return callback(item, i, tree);
    } else {
      return recursionMap(item.childList, callback);
    }
  });
};

/**
 * 递归的some函数 - 只对叶子节点进行操作
 * @param {Array}  tree 
 * @param {handler} callback 
 * @returns 
 */
export const recursionSome = (tree, callback) => {
  return tree.some((item, i) => {
    if (!item.childList) {
      return callback(item, i, tree);
    } else {
      return recursionSome(item.childList, callback);
    }
  });
};

/**
 * 深度优先，后序递归遍历
 * @param {Array} tree 树形结构的数组
 * @param {Function} func 节点执行函数
 * @param {String} [children] 子数组属性名，默认 'children'
 * @param {Boolean} leaf 是否只对叶子节点操作
 */
 export function lastTreeForEach(tree, func, children = 'children', leaf = false) {
  tree.forEach(data => {
    data[children] && lastTreeForEach(data[children], func, children, leaf) // 遍历子树
    if (leaf && data[children]?.length) {
      return
    }
    func(data)
  })
}

/**
 * 查找节点对象
 * @param { Array } tree 树形结构的数组
 * @param { Function } func 节点执行函数
 * @param { String } children 子数组名称
 */
export function treeFind (tree, func, children = 'children') {
  for (const data of tree) {
    if (func(data)) return data
    if (data[children]) {
      const res = this.treeFind(data[children], func)
      if (res) return res
    }
  }
  return null
}
/**
 * 过滤节点，包含符合条件的子节点，该父节点也会被保留
 * @param { Array } tree 树形结构的数组
 * @param { Function } func 节点执行函数
 * @param { String } children 子数组名称
 */
 export function treeFilter(tree, func, children = 'children') {
  // 使用map复制一下节点，避免修改到原树
  return tree
    .map((node) => ({ ...node }))
    .filter((node) => {
      node[children] =
        node[children] && this.treeFilter(node[children], func)
      return func(node) || (node[children] && node[children].length)
    })
}