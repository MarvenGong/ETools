declare const datetime: {
    /**
     *比较日期大小,格式yyyy-MM-dd
      *小于0前者大于后者,大于0前者小于后者,等于0两者相等
      * @param startTime
      * @param endTime
      * @returns {number}
      */
    compareDate: (startTime: any, endTime: any) => 0 | 1 | -1;
    /**
     * 比较时间的大小
     * 时间格式yyyy-MM-dd h:m:s
     *    如：var beginTime = "2009-09-21 00:00:00";var endTime = "2009-09-21 00:00:01";
     */
    compareTime: (beginTime: any, endTime: any) => 0 | 1 | -1 | "exception";
    /**
     * 将秒数转换成对应的多少小时，多少分多少秒（用于倒计时的显示）
     * @param s
     * @returns {*[]}
     */
    arriveTimerFormat: (s: any) => any[];
    /**
         *
         * @param data 日期类型的对象（如：new Date()）
         * @param formatStr 要格式化的日期时间格式（如：“yyyy-MM-dd h:m:s”）
         * @returns {*}
         */
    format: (date: any, formatStr: any) => any;
    /**
         * 将时间日期字符串转换成时间戳得到的值类似于new Date().getTime
         * @param 时间字符串（如：“2015-12-30 12:20:30”）
         * @returns {number}
         */
    parse: (timeStr: any) => number;
    getNewDay: (dateStr: string, days: number) => string;
    /**
     * 根据出生年月获取年龄
     * @param {String} strBirthday 出生年月标准格式字符串 如：1991-08-20
     */
    getAgeByBirthday: (strBirthday: any) => any;
    /**
         * 根据身份证号码获取年龄
         * @param {String} idcard 身份证号码
         */
    getAgeByIDCard: (idcard: any) => any;
};
export default datetime;
