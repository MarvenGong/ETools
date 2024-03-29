/*
 * Author Marvengong of etekcity
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.ETools = factory());
}(this, (function () {
  'use strict';
  var ETools = {};
  var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, prep = function (str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  };

  /**
     * 复制或者合并对象 
     * @param deep 是否深度拷贝
     * @param target 合并后的对象
     * @param options 要合并的对象
     * @returns {*}
     */
  ETools.extend = function(deep, target, options) {
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
      return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
    };

    var isWindow = function (obj) {
      return obj && typeof obj === 'object' && 'setInterval' in obj;
    };

    var isArray = Array.isArray || function (obj) {
      return type(obj) === 'array';
    };

    var isPlainObject = function (obj) {
      if (!obj || type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
        return false;
      }

      if (obj.constructor && !hasOwn.call(obj, 'constructor')
                && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
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

        target[name] = ETools.extend(deep, clone, copy);
      } else if (copy !== undefined) {
        target[name] = copy;
      }
    }

    return target;
  };
  /**
     * 将jquery序列化表单后得到的字符串转换成标准的json对象
     * @param params--jquery序列化后的字符串
     * @returns {{}}
     */
  ETools.deparam = function (params) {
    var data = {}, pairs, lastPart;
    if (params && paramTest.test(params)) {
      var pairs = params.split('&');
      for (var index = 0; index < pairs.length; index++) {
        var pair = pairs[index];
        var parts = pair.split('='), key = prep(parts.shift()), value = prep(parts.join('=')), current = data;
        if (key) {
          parts = key.match(keyBreaker);
          for (var j = 0, l = parts.length - 1; j < l; j++) {
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
  ETools.urlParamToObj = function (u) {
    var sear = u.slice(u.indexOf('?') + 1).split('&'), p = {};
    for (var i = 0, j = sear.length; j > i; i++) {
      var s = sear[i].split('=');
      p[s[0]] = s[1];
    }
    return p;
  };
  /**
     * 阻止事件向上冒泡
     * @param e
     */
  ETools.stopPropagation = function (e) {
    //判断是否是IE浏览器，不是就用e.stopPropagation否则用 e.cancelBubble=true阻止事件冒泡
    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;
  };

  /**
     *html转移和还原
     */
  ETools.html = {
    htmlEncode: function (text) {
      return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    htmlDecode: function (text) {
      return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(
        /&lt;/g, '<').replace(/&gt;/g, '>');
    }
  };
  /**
     * 页面操作
     * @type {{addFavorite: Function, addHome: Function}}
     */
  ETools.page = {
    /**
         * 加入收藏夹
         * @param sURL
         * @param sTitle
         */
    addFavorite: function (sURL, sTitle) {
      try {
        window.external.addFavorite(sURL, sTitle);
      } catch (e) {
        try {
          window.sidebar.addPanel(sTitle, sURL, '');
        } catch (e) {
          alert('加入收藏失败，请使用Ctrl+D进行添加');
        }
      }
    },
    /**
         * 设为首页
         */
    addHome: function (url) {
      if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);
      } else if (window.sidebar) {
        if (window.netscape) {
          try {
            netscape.security.PrivilegeManager
              .enablePrivilege('UniversalXPConnect');
          } catch (e) {
            alert('该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.appvars.codebase_principal_support 值该为true');
          }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1']
          .getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', url);
      }
    }
  };
  /**
     * 动态加载样式文件
     * @param url--样式的地址
     * @constructor
     */
  ETools.loadStyle = function (url) {
    try {
      document.createStyleSheet(url);
    } catch (e) {
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.type = 'text/css';
      cssLink.href = url;
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);
    }
  }
  /**
     * 返回浏览器信息，
     * 返回值{type:浏览器类型,version:浏览器版本}
     * @returns {*}
     */
  ETools.getExplorerInfo = function () {
    var explorer = window.navigator.userAgent.toLowerCase();
    // ie
    if (explorer.indexOf('msie') >= 0) {
      var ver = explorer.match(/msie ([\d.]+)/)[1];
      return {
        type: 'IE',
        version: ver
      };
    }
    // firefox
    else if (explorer.indexOf('firefox') >= 0) {
      var ver = explorer.match(/firefox\/([\d.]+)/)[1];
      return {
        type: 'Firefox',
        version: ver
      };
    }
    // Edge
    else if (explorer.indexOf('edge') >= 0) {
      var ver = explorer.match(/edge\/([\d.]+)/)[1];
      return {
        type: 'Edge',
        version: ver
      };
    }
    // Chrome
    else if (explorer.indexOf('chrome') >= 0) {
      var ver = explorer.match(/chrome\/([\d.]+)/)[1];
      return {
        type: 'Chrome',
        version: ver
      };
    }

    // Opera
    else if (explorer.indexOf('opera') >= 0) {
      var ver = explorer.match(/opera.([\d.]+)/)[1];
      return {
        type: 'Opera',
        version: ver
      };
    }// Safari
    else if (explorer.indexOf('Safari') >= 0) {
      var ver = explorer.match(/version\/([\d.]+)/)[1];
      return {
        type: 'Safari',
        version: ver
      };
    }
  }
  /**
     * 字符串操作
     * @param str
     * @returns {string|XML}
     */
  ETools.string = {
    //获取字符串长度，中文字符计算为两个长度
    getStrLength: function (str) {
      var strlen = 0;
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
          strlen += 2;
        else
          strlen++;
      }
      return strlen;
    },
    //去掉字符串前后空格
    trim: function (str) {
      return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
    },
    /**
         * 把1,2,3,4....,99999 类型的数字转换成中文字符串
         * @param _number 要转换的数字
         * @returns {string}
         */
    number2String: function (_number) {
      var ary0 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      var ary1 = ['', '十', '百', '千'];
      var ary2 = ['', '万', '亿', '兆'];
      var number = '' + _number + '';

      var ary = [];
      for (var i = number.length - 1; i >= 0; i--) {
        ary.push(number[i])
      }
      ary.join('');
      //console.log(ary);
      var zero = '';
      var newary = '';
      var i4 = -1;
      for (var i = 0; i < ary.length; i++) {
        if (i % 4 == 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
          i4++;
          newary = ary2[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
          zero = ''; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空

        }
        //关于0的处理与判断。
        if (ary[i] == '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
          switch (i % 4) {
          case 0:
            break;
            //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
          case 1:
          case 2:
          case 3:
            if (ary[i - 1] != '0') {
              zero = '零'
            }
            //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
            break;

          }

          newary = zero + newary;
          zero = '';
        }
        else { //如果不是“0”
          newary = ary0[parseInt(ary[i])] + ary1[i % 4] + newary; //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
        }

      }
      if (newary.indexOf('零') === 0) {
        newary = newary.substr(1)
      }//处理前面的0
      return newary;
    },
    /**
         * 生成一个唯一标识字符串
         * @returns {string}
         */
    generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },
    /**
         * 数字相加，包括浮点数相加，不会丢失精度
         * @param num1
         * @param num2
         * @returns {number}
         */
    addNum(num1, num2) {
      var sq1;
      var sq2;
      var m;
      try {
        sq1 = num1.toString().split('.')[1].length;
      } catch (e) {
        sq1 = 0;
      }
      try {
        sq2 = num2.toString().split('.')[1].length;
      } catch (e) {
        sq2 = 0;
      }
      m = Math.pow(10, Math.max(sq1, sq2));
      return (num1 * m + num2 * m) / m;
    }
  };
  /**
     * 正则验证
     */
  ETools.vertify = {
    //判断是否是一个标准url
    isURL: function (strUrl) {
      var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
      if (regular.test(strUrl)) {
        return true;
      }
      else {
        return false;
      }
    },
    isEmpty: function (str) {
      if (str == null || typeof str == 'undefined' || ETools.string.trim(str) == '') {
        return true;
      } else {
        return false;
      }
    },
    //判断是否是数字
    isDigit: function (value) {
      var patrn = /^[0-9]*$/;
      if (patrn.exec(value) == null || value == '') {
        return false;
      } else {
        return true;
      }
    },
    //判断是否是固定电话
    isTelephone: function (phone) {
      var phone_reg = new RegExp(/^([+]{0,1}\d{3,4}|\d{3,4}-)?\d{7,8}$/);
      if (!phone_reg.test(phone)) {
        return false;
      }
      return true;
    },
    isMobile: function (mobile) {
      var mobile_reg = new RegExp(/^0{0,1}1[0-9]{10}$/);
      if (!mobile_reg.test(mobile)) {
        return false;
      }
      return true;
    },
    //QQ号码从10000开始
    isQQ: function (qq) {
      var qq_reg = new RegExp(/^[1-9][0-9]{4,}$/);
      if (!qq_reg.test(qq)) {
        return false;
      }
      return true;
    },
    //验证是否是邮箱
    isEmail: function (email) {
      var email_reg = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/);
      if (!email_reg.test(email)) {
        return false;
      }
      return true;
    },
    //身份证
    isIDCard: function (str) {
      var IDCardReg = new RegExp(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/);
      if (!IDCardReg.test(str)) {
        return false;
      }
      return true;
    },
    //不带符号正整数
    isPlusDigit: function (digit) {
      var plusDigit_reg = new RegExp(/^\d+$/);
      if (!plusDigit_reg.test(digit)) {
        return false;
      }
      return true;
    },
    //中文字符
    isChinese: function (str) {
      if (str.length != 0) {
        var reg = /^[\u0391-\uFFE5]+$/;
        if (!reg.test(str)) {
          return false;
        }
      }
      return true;
    },
    //日期格式的字符串
    isDate: function (datestr) {
      var result = datestr.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
      if (result == null) {
        return false;
      }
      return true;
    },
    //校验邮政编码
    isPostalCode: function (s) {
      //var patrn=/^[a-zA-Z0-9]{3,12}$/;
      var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
      if (!patrn.exec(s)) {
        return false
      }
      return true
    },
    //校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
    isRegisterUserName: function (s) {
      var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
      if (!patrn.exec(s)) return false
      return true
    },
    //校验用户姓名：只能输入1-30个以字母开头的字串
    isTrueName: function (s) {
      var patrn = /^[a-zA-Z]{1,30}$/;
      if (!patrn.exec(s)) return false
      return true
    },
    //校验密码：只能输入6-20个字母、数字、下划线
    isPassword: function (s) {
      var patrn = /^(\w){6,20}$/;
      if (!patrn.exec(s)) return false
      return true
    }
  };
  /**
     * cookie操作
     */
  ETools.cookie = {
    delCookie: function (name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = getCookie(name);
      if (cval != null)
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    },
    setCookie: function (name, value, Hours) {
      var d = new Date();
      var offset = 8;
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      var nd = utc + (3600000 * offset);
      var exp = new Date(nd);
      exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
      document.cookie = name + '=' + escape(value) + ';path=/;expires='
                + exp.toGMTString() + ';domain=sicd.com;';
    },
    getCookie: function (name) {
      var arr = document.cookie
        .match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
      if (arr != null)
        return unescape(arr[2]);
      return null;
    }
  };
  /**
     * 打开一个新窗口
     * @param url打开的链接
     * @param windowName窗口的title
     * @param width窗口宽度
     * @param height窗口高度
     */
  ETools.openWindow = function (url, windowName, width, height) {
    var x = parseInt(screen.width / 2.0) - (width / 2.0);
    var y = parseInt(screen.height / 2.0) - (height / 2.0);
    var isMSIE = (navigator.appName == 'Microsoft Internet Explorer');
    if (isMSIE) {
      var p = 'resizable=1,location=no,scrollbars=no,width=';
      p = p + width;
      p = p + ',height=';
      p = p + height;
      p = p + ',left=';
      p = p + x;
      p = p + ',top=';
      p = p + y;
      var retval = window.open(url, windowName, p);
    } else {
      var win = window.open(url, 'ZyiisPopup', 'top=' + y + ',left=' + x + ',scrollbars=' + scrollbars + ',dialog=yes,modal=yes,width=' + width + ',height=' + height + ',resizable=no');
      eval('try { win.resizeTo(width, height); } catch(e) { }');
      win.focus();
    }
  };
  /**
     * 异步处理相关函数（只支持在async函数中使用，而且支持Promise的环境）
     */
  ETools.async = {
    /**
       * 在异步函数中等待指定的时间
       * @param timestamp 等待的时间的毫秒数
       */
    wait: function(timestamp) {
      if (window.Promise) {
        return new Promise(function(resolve, reject){
          setTimeout(function() {
            resolve();
          }, timestamp)
        });
      } else {
        console.error('your enviroment does not support promise');
        return null;
      }
    }
  };
  /**
     * 时间日期相关函数
     * @type {{}}
     */
  ETools.datetime = {
    /**
         *比较日期大小,格式yyyy-MM-dd
         *小于0前者大于后者,大于0前者小于后者,等于0两者相等
         * @param startTime
         * @param endTime
         * @returns {number}
         */
    compareDate: function (startTime, endTime) {
      var startArr = startTime.split('-');
      var starttime = new Date(startArr[0], startArr[1], startArr[2]);
      var starttimes = starttime.getTime();

      var endArr = endTime.split('-');
      var endtime = new Date(endArr[0], endArr[1], endArr[2]);
      var endtimes = endtime.getTime();

      if (starttimes > endtimes) {
        return -1;
      }
      else if (starttimes == endtimes) {
        return 0;
      }
      else {
        return 1;
      }
    },

    /**
         * 比较时间的大小
         * 时间格式yyyy-MM-dd h:m:s
         *    如：var beginTime = "2009-09-21 00:00:00";var endTime = "2009-09-21 00:00:01";
         */
    compareTime: function (beginTime, endTime) {

      var beginTimes = beginTime.substring(0, 10).split('-');
      var endTimes = endTime.substring(0, 10).split('-');

      beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
      endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
      /*
             alert(beginTime + "aaa" + endTime);
             alert(Date.parse(endTime));
             alert(Date.parse(beginTime));*/
      var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
      if (a < 0) {
        return -1;
      } else if (a > 0) {
        return 1;
      } else if (a == 0) {
        return 0;
      } else {
        return 'exception'
      }
    },
    /**
         * 将秒数转换成对应的多少小时，多少分多少秒（用于倒计时的显示）
         * @param s
         * @returns {*[]}
         */
    arriveTimerFormat: function (s) {
      var t, hour, min, sec, day;
      if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        day = parseInt(hour / 24);
        if (day > 0) {
          hour = hour - 24 * day;
          t = day + 'day ' + hour + ':';
        } else t = hour + ':';
        if (min < 10) {
          t += '0';
        }
        t += min + ':';
        if (sec < 10) {
          t += '0';
        }
        t += sec;
      }
      return [day, hour, min, sec, t];
    },
    /**
         *
         * @param data 日期类型的对象（如：new Date()）
         * @param formatStr 要格式化的日期时间格式（如：“yyyy-MM-dd h:m:s”）
         * @returns {*}
         */
    format: function (date, formatStr) {
      var str = formatStr;
      var Week = ['日', '一', '二', '三', '四', '五', '六'];
      str = str.replace(/yyyy|YYYY/, date.getFullYear());
      str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
      str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
      str = str.replace(/M/g, (date.getMonth() + 1));
      str = str.replace(/w|W/g, Week[date.getDay()]);
      str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
      str = str.replace(/d|D/g, date.getDate());
      str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
      str = str.replace(/h|H/g, date.getHours());
      str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
      str = str.replace(/m/g, date.getMinutes());
      str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
      str = str.replace(/s|S/g, date.getSeconds());
      return str
    },
    /**
         * 将时间日期字符串转换成时间戳得到的值类似于new Date().getTime
         * @param 时间字符串（如：“2015-12-30 12:20:30”）
         * @returns {number}
         */
    parse: function (timeStr) {
      var date = new Date();
      date.setFullYear(timeStr.substring(0, 4));
      date.setMonth(timeStr.substring(5, 7) - 1);
      date.setDate(timeStr.substring(8, 10));
      date.setHours(timeStr.substring(11, 13));
      date.setMinutes(timeStr.substring(14, 16));
      date.setSeconds(timeStr.substring(17, 19));
      return Date.parse(date);
    },
    //日期加上天数得到新的日期
    //dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
    getNewDay: function (dateTemp, days) {
      var dateTemp = dateTemp.split('-');
      var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
      var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
      var rDate = new Date(millSeconds);
      var year = rDate.getFullYear();
      var month = rDate.getMonth() + 1;
      if (month < 10) month = '0' + month;
      var date = rDate.getDate();
      if (date < 10) date = '0' + date;
      return (year + '-' + month + '-' + date);
    },
    /**
         * 根据出生年月获取年龄
         * @param {String} strBirthday 出生年月标准格式字符串 如：1991-08-20
         */
    getAgeByBirthday: function(strBirthday){  
      var returnAge;
      var strBirthdayArr=strBirthday.split('-');
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
      } else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        var ageDiff = nowYear - birthYear ; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            returnAge = dayDiff < 0 ? ageDiff - 1 : ageDiff;
          } else {
            var monthDiff = nowMonth - birthMonth;//月之差
            returnAge = monthDiff < 0 ? ageDiff - 1 : ageDiff
          }
        }
      }
      return returnAge;//返回周岁年龄
    },
    /**
         * 根据身份证号码获取年龄
         * @param {String} idcard 身份证号码
         */
    getAgeByIDCard: function(idcard) {
      if (!ETools.vertify.isIDCard(idcard)) {
        console.error('身份证格式不正确无法获取年龄');
        return false;
      }
      var birthDate = idcard.substr(6, 4) + '-' + idcard.substr(10, 2) + '-' + idcard.substr(12, 2);
      return this.getAgeByBirthday(birthDate);
    }
  };
  /**
     * 数组相关
     */
  ETools.array = {
    init: function() {
      Array.prototype.filterBy = this.filterBy;
    },
    filterBy: function(key, value) {
      var ary = this;
      var newAry = [];
      for (var i = 0; i< ary.length; i++) {
        if (ary[i][key] === value) {
          newAry.push(ary[i]);
        }
      }
      if (newAry.length === 1) {
        return newAry[0];
      } else {
        return newAry;
      }
    }
  }
  /**
     * 全选和反全选
     */
  if (typeof $==='object'){
    $.fn.checkAll = function () {
      $(this).click(function () {
        var _table = $(this).attr('data-table');
        if ($(this).is(':checked')) {
          $('#' + _table + ' input:checkbox').each(function (index, element) {
            this.checked = true;
          });
          $('.checkAll').each(function (index, ele) {
            if ($(ele).attr('data-table') == _table) {
              ele.checked = true;
            }
          });
        } else {
          $('#' + _table + ' input:checkbox').each(function (index, element) {
            this.checked = false;
          });
          $('.checkAll').each(function (index, ele) {
            if ($(ele).attr('data-table') == _table) {
              ele.checked = false;
            }
          });
        }
      });
    };
  }
  ETools.array.init();
  return ETools;

})));
