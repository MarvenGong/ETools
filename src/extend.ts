export default function extend(deep: boolean, target: any, options: any) {
  var copyIsArray;
  var toString = Object.prototype.toString;
  var hasOwn = Object.prototype.hasOwnProperty;

  var class2type = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Object]': 'object'
  };

  var type = function (obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
  };

  var isWindow = function (obj) {
      return obj && typeof obj === "object" && "setInterval" in obj;
  };

  var isArray = Array.isArray || function (obj) {
          return type(obj) === "array";
      };

  var isPlainObject = function (obj) {
      if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
          return false;
      }

      if (obj.constructor && !hasOwn.call(obj, "constructor")
          && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
      }

      var key;
      for (key in obj) {
      }

      return key === undefined || hasOwn.call(obj, key);
  };
  for (var name in options) {
      var src = target[name];
      var copy = options[name];

      if (target === copy) {
          continue;
      }

      if (deep && copy
          && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
              copyIsArray = false;
              var clone = src && isArray(src) ? src : [];

          } else {
              var clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
      } else if (copy !== undefined) {
          target[name] = copy;
      }
  }

  return target;
};