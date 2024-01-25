/**
 * 将jquery序列化表单后得到的字符串转换成标准的json对象
 * @param params--jquery序列化后的字符串
 * @returns {{}}
 */
export declare const deparam: (params: string) => {};
/**
* 将url中的get参数转换成标准json对象
* @param u
* @returns {{}}
*/
export declare const urlParamToObj: (u: string) => {};
/**
* 阻止事件向上冒泡
* @param e
*/
export declare const stopPropagation: (e: Event) => void;
/**
 * 动态加载样式文件
 * @param url--样式的地址
 * @constructor
 */
export declare const loadStyle: (url: any) => void;
/**
 * 打开一个新窗口
 * @param url打开的链接
 * @param windowName窗口的title
 * @param width窗口宽度
 * @param height窗口高度
 */
export declare const openWindow: (url: string, windowName: string, width?: number, height?: number) => void;
