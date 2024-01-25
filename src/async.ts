const async = {
  /**
     * 在异步函数中等待指定的时间
     * @param timestamp 等待的时间的毫秒数
     */
  wait: function(timestamp) {
    if (window.Promise) {
      return new Promise(function(resolve){
        setTimeout(function() {
          resolve({});
        }, timestamp)
      });
    } else {
      console.info('%cyour enviroment does not support promise', 'color: #f33;font-weight:bold;font-size:18px');
      return null;
    }
  }
};
export default async;