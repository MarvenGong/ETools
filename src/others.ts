/* eslint-disable no-useless-escape */
const paramTest = /([^?#]*)(#.*)?$/;
const prep = function (str) {
  return decodeURIComponent(str.replace(/\+/g, ' '));
};
const digitTest = /^\d+$/;
const keyBreaker = /([^\[\]]+)|(\[\])/g;
/**
 * 将jquery序列化表单后得到的字符串转换成标准的json对象
 * @param params--jquery序列化后的字符串
 * @returns {{}}
 */
export const deparam = function (params: string) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  let data = {}, pairs, lastPart; 
  if (params && paramTest.test(params)) {
    let pairs: any[] = params.split('&');
    for (let index = 0; index < pairs.length; index++) {
      let pair = pairs[index];
      let parts = pair.split('='), key = prep(parts.shift()), value = prep(parts.join('='));
      let current: any = data;
      if (key) {
        parts = key.match(keyBreaker);
        for (let j = 0, l = parts.length - 1; j < l; j++) {
          if (!current[parts[j]]) {
            current[parts[j]] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
          }
          current = current[parts[j]];
        }
        lastPart = parts.pop();
        if (lastPart === '[]') {
          current.push(value);
        } else {
          current[lastPart] = value;
        }
      }
    }
  }
  return data;
};
/**
* 将url中的get参数转换成标准json对象
* @param u
* @returns {{}}
*/
export const urlParamToObj = function (u: string) {
  let sear = u.slice(u.indexOf('?') + 1).split('&'), p = {};
  for (let i = 0, j = sear.length; j > i; i++) {
    let s = sear[i].split('=');
    p[s[0]] = s[1];
  }
  return p;
};
/**
* 阻止事件向上冒泡
* @param e
*/
export const stopPropagation = function (e: Event) {
  //判断是否是IE浏览器，不是就用e.stopPropagation否则用 e.cancelBubble=true阻止事件冒泡
  if (e.stopPropagation)
    e.stopPropagation();
  else
    e.cancelBubble = true;
};
/**
 * 动态加载样式文件
 * @param url--样式的地址
 * @constructor
 */
export const loadStyle = function (url) {
  try {
    document.createStyleSheet(url);
  } catch (e) {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink);
  }
}
/**
 * 打开一个新窗口
 * @param url打开的链接
 * @param windowName窗口的title
 * @param width窗口宽度
 * @param height窗口高度
 */
export const openWindow = function (url: string, windowName: string, width = 1280, height = 768) {
  let x = Number(screen.width / 2.0) - (width / 2.0);
  let y = Number(screen.height / 2.0) - (height / 2.0);
  let isMSIE = (navigator.appName == 'Microsoft Internet Explorer');
  if (isMSIE) {
    let p = 'resizable=1,location=no,scrollbars=no,width=';
    p = p + width;
    p = p + ',height=';
    p = p + height;
    p = p + ',left=';
    p = p + x;
    p = p + ',top=';
    p = p + y;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    let retval = window.open(url, windowName, p);
  } else {
    const options = `top=${y},left=${x},scrollbars=${scrollbars},dialog=yes,modal=yes,width=${width},height=${height},resizable=no`;
    // console.log(options)
    let win = window.open(url, 'ZyiisPopup', options);
    eval('try { win.resizeTo(width, height); } catch(e) { }');
    win.focus();
  }
};