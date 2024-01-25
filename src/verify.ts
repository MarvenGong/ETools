/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/naming-convention */
const trim = function (str: string) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}
const vertify = {
  //判断是否是一个标准url
  isURL: function (strUrl: string) {
    let regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
    if (regular.test(strUrl)) {
      return true;
    }
    else {
      return false;
    }
  },
  isEmpty: function (str: string) {
    if (str == null || typeof str == 'undefined' || trim(str) == '') {
      return true;
    } else {
      return false;
    }
  },
  //判断是否是数字
  isDigit: function (value: string) {
    let patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == '') {
      return false;
    } else {
      return true;
    }
  },
  //判断是否是固定电话
  isTelephone: function (phone: string) {
    let phone_reg = new RegExp(/^([+]{0,1}\d{3,4}|\d{3,4}-)?\d{7,8}$/);
    if (!phone_reg.test(phone)) {
      return false;
    }
    return true;
  },
  isMobile: function (mobile: string) {
    let mobile_reg = new RegExp(/^0{0,1}1[0-9]{10}$/);
    if (!mobile_reg.test(mobile)) {
      return false;
    }
    return true;
  },
  //QQ号码从10000开始
  isQQ: function (qq: string) {
    let qq_reg = new RegExp(/^[1-9][0-9]{4,}$/);
    if (!qq_reg.test(qq)) {
      return false;
    }
    return true;
  },
  //验证是否是邮箱
  isEmail: function (email: string) {
    let email_reg = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/);
    if (!email_reg.test(email)) {
      return false;
    }
    return true;
  },
  //身份证
  isIDCard: function (str: string) {
    let IDCardReg = new RegExp(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/);
    if (!IDCardReg.test(str)) {
      return false;
    }
    return true;
  },
  //不带符号正整数
  isPlusDigit: function (digit: string) {
    let plusDigit_reg = new RegExp(/^\d+$/);
    if (!plusDigit_reg.test(digit)) {
      return false;
    }
    return true;
  },
  //中文字符
  isChinese: function (str: string) {
    if (str.length != 0) {
      let reg = /^[\u0391-\uFFE5]+$/;
      if (!reg.test(str)) {
        return false;
      }
    }
    return true;
  },
  //日期格式的字符串
  isDate: function (datestr: string) {
    let result = datestr.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    if (result == null) {
      return false;
    }
    return true;
  },
  //校验邮政编码
  isPostalCode: function (s: string) {
    //var patrn=/^[a-zA-Z0-9]{3,12}$/;
    let patrn = /^[a-zA-Z0-9 ]{3,12}$/;
    if (!patrn.exec(s)) {
      return false
    }
    return true
  },
  //校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
  isRegisterUserName: function (s) {
    let patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.exec(s)) return false
    return true
  },
  //校验用户姓名：只能输入1-30个以字母开头的字串
  isTrueName: function (s: string) {
    let patrn = /^[a-zA-Z]{1,30}$/;
    if (!patrn.exec(s)) return false
    return true
  },
  //校验密码：只能输入6-20个字母、数字、下划线
  isPassword: function (s: string) {
    let patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false
    return true
  }
};
export default vertify;
