/**
 * 字符串操作
 * @param str
 * @returns {string|XML}
 */
const string = {
  //获取字符串长度，中文字符计算为两个长度
  getStrLength: function (str) {
    let strlen = 0;
    for (let i = 0; i < str.length; i++) {
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
    let ary0 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let ary1 = ['', '十', '百', '千'];
    let ary2 = ['', '万', '亿', '兆'];
    let number = '' + _number + '';

    let ary = [];
    for (let i = number.length - 1; i >= 0; i--) {
      ary.push(number[i])
    }
    ary.join('');
    //console.log(ary);
    let zero = '';
    let newary = '';
    let i4 = -1;
    for (let i = 0; i < ary.length; i++) {
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
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
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
    let sq1;
    let sq2;
    let m;
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
export default string;
