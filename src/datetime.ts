/* eslint-disable @typescript-eslint/naming-convention */
import vertify from './verify';

const datetime = {
  /**
   *比较日期大小,格式yyyy-MM-dd
    *小于0前者大于后者,大于0前者小于后者,等于0两者相等
    * @param startTime
    * @param endTime
    * @returns {number}
    */
  compareDate: function (startTime, endTime) {
    let startArr = startTime.split('-');
    let starttime = new Date(startArr[0], startArr[1], startArr[2]);
    let starttimes = starttime.getTime();

    let endArr = endTime.split('-');
    let endtime = new Date(endArr[0], endArr[1], endArr[2]);
    let endtimes = endtime.getTime();

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

    let beginTimes = beginTime.substring(0, 10).split('-');
    let endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    /*
           alert(beginTime + "aaa" + endTime);
           alert(Date.parse(endTime));
           alert(Date.parse(beginTime));*/
    let a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
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
    let t, hour, min, sec, day;
    if (s > -1) {
      hour = Math.floor(s / 3600);
      min = Math.floor(s / 60) % 60;
      sec = s % 60;
      day = Number(hour / 24);
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
    let str = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];
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
    let date = new Date();
    date.setFullYear(timeStr.substring(0, 4));
    date.setMonth(timeStr.substring(5, 7) - 1);
    date.setDate(timeStr.substring(8, 10));
    date.setHours(timeStr.substring(11, 13));
    date.setMinutes(timeStr.substring(14, 16));
    date.setSeconds(timeStr.substring(17, 19));
    return Date.parse(date as any);
  },
  //日期加上天数得到新的日期
  //dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
  getNewDay: function (dateStr: string, days: number) {
    const dateTemp = dateStr.split('-');
    let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
    let millSeconds = Math.abs(nDate as any) + (days * 24 * 60 * 60 * 1000);
    let rDate = new Date(millSeconds);
    let year = rDate.getFullYear();
    let month: number | string = rDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let date: number | string = rDate.getDate();
    if (date < 10) date = '0' + date;
    return (year + '-' + month + '-' + date);
  },
  /**
   * 根据出生年月获取年龄
   * @param {String} strBirthday 出生年月标准格式字符串 如：1991-08-20
   */
  getAgeByBirthday: function(strBirthday){  
    let returnAge;
    let strBirthdayArr = strBirthday.split('-');
    let birthYear = strBirthdayArr[0];
    let birthMonth = strBirthdayArr[1];
    let birthDay = strBirthdayArr[2];
    let d = new Date();
    let nowYear = d.getFullYear();
    let nowMonth = d.getMonth() + 1;
    let nowDay = d.getDate();
    if (nowYear == birthYear) {
      returnAge = 0;//同年 则为0岁
    } else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      let ageDiff = nowYear - birthYear ; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          let dayDiff = nowDay - birthDay;//日之差
          returnAge = dayDiff < 0 ? ageDiff - 1 : ageDiff;
        } else {
          let monthDiff = nowMonth - birthMonth;//月之差
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
    if (!vertify.isIDCard(idcard)) {
      console.info('身份证格式不正确无法获取年龄');
      return false;
    }
    let birthDate = idcard.substr(6, 4) + '-' + idcard.substr(10, 2) + '-' + idcard.substr(12, 2);
    return this.getAgeByBirthday(birthDate);
  }
};
export default datetime;