/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 复制或者合并对象
 * @param deep 是否深度拷贝
 * @param target 合并后的对象
 * @param options 要合并的对象44433555
 * @returns {*}
 */
export default function extend(deep: boolean, target: any, options: any) {
  let copyIsArray;
  let toString = Object.prototype.toString;
  let hasOwn = Object.prototype.hasOwnProperty;

  let class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Object]': 'object'
  };

  let type = function (obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
  };

  let isWindow = function (obj) {
    return obj && typeof obj === 'object' && 'setInterval' in obj;
  };

  let isArray = Array.isArray || function (obj) {
    return type(obj) === 'array';
  };

  let isPlainObject = function (obj) {
    if (!obj || type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
      return false;
    }

    if (obj.constructor && !hasOwn.call(obj, 'constructor')
          && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false;
    }

    let key;
    for (key in obj) {
      console.info(key);
    }
    return key === undefined || hasOwn.call(obj, key);
  };
  for (let name in options) {
    let src = target[name];
    let copy = options[name];

    if (target === copy) {
      continue;
    }

    if (deep && copy
          && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
      let clone
      if (copyIsArray) {
        copyIsArray = false;
        clone = src && isArray(src) ? src : [];

      } else {
        clone = src && isPlainObject(src) ? src : {};
      }

      target[name] = extend(deep, clone, copy);
    } else if (copy !== undefined) {
      target[name] = copy;
    }
  }

  return target;
}