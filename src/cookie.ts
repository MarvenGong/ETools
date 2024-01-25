const cookie = {
  /**
   * 删除指定键的cookie内容
   * @param name 键
   */
  delCookie: function (name: string) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = cookie.getCookie(name);
    if (cval != null)
      document.cookie = name + '=' + cval + ';expires=' + (exp as any).toGMTString();
  },
  /**
   * 设置cookie
   * @param name 键
   * @param value 内容
   * @param hours 过期小时数
   */
  setCookie: function (name: string, value: string, hours = 2) {
    let d = new Date();
    d.setTime(d.getTime()+(hours * 60 * 60 * 1000));
    let expires = 'expires=' + (d as any).toGMTString();
    document.cookie = name + '=' + value + '; ' + expires;
    return value;
  },
  /**
   * 获取指定键的cookie内容
   * @param name 键
   * @returns 
   */
  getCookie: function (name: string) {
    let arr = document.cookie
      .match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null)
      return unescape(arr[2]);
    return null;
  }
};
export default cookie;