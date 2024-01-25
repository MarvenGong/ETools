declare const cookie: {
    /**
     * 删除指定键的cookie内容
     * @param name 键
     */
    delCookie: (name: string) => void;
    /**
     * 设置cookie
     * @param name 键
     * @param value 内容
     * @param hours 过期小时数
     */
    setCookie: (name: string, value: string, hours?: number) => string;
    /**
     * 获取指定键的cookie内容
     * @param name 键
     * @returns
     */
    getCookie: (name: string) => string;
};
export default cookie;
