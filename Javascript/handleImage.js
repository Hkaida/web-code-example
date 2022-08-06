/**
 * 图片处理
 */

/**
 * 读取图片的Base64编码
 * @param {File} file input type="file" 获取的文件
 * @returns {Promise<string>} Base64
 */
export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
};

/**
 * 将图片的 url 转为 Base64 格式
 * @param {String} img 图片的url
 * @returns 
 */
export const imageToBase64 = img => {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/jpeg" + ext);
  return dataURL;
};

/**
 * 将base64格式转为File格式
 * @param {*} urlData 
 * @param {*} fileName 
 * @returns {File}
 */
export const base64ToFile = (urlData, fileName) => {
  let arr = urlData.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bytes = atob(arr[1]); // 解码base64
  let n = bytes.length;
  let ia = new Uint8Array(n);
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  return new File([ia], fileName, { type: mime });
};