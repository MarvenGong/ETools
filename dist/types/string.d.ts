/**
 * 字符串操作
 * @param str
 * @returns {string|XML}
 */
declare const string: {
    getStrLength: (str: any) => number;
    trim: (str: any) => any;
    /**
         * 把1,2,3,4....,99999 类型的数字转换成中文字符串
         * @param _number 要转换的数字
         * @returns {string}
         */
    number2String: (_number: any) => string;
    /**
         * 生成一个唯一标识字符串
         * @returns {string}
         */
    generateUUID(): string;
    /**
         * 数字相加，包括浮点数相加，不会丢失精度
         * @param num1
         * @param num2
         * @returns {number}
         */
    addNum(num1: any, num2: any): number;
};
export default string;
