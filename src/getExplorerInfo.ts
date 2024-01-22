/**
 * 返回浏览器信息，
 * 返回值{type:浏览器类型,version:浏览器版本}
 * @returns {*}
 */
export default function getExplorerInfo() {
  var explorer = window.navigator.userAgent.toLowerCase();
  // ie
  if (explorer.indexOf("msie") >= 0) {
      var ver = explorer.match(/msie ([\d.]+)/)[1];
      return {
          type: "IE",
          version: ver
      };
  }
  // firefox
  else if (explorer.indexOf("firefox") >= 0) {
      var ver = explorer.match(/firefox\/([\d.]+)/)[1];
      return {
          type: "Firefox",
          version: ver
      };
  }
  // Edge
  else if (explorer.indexOf("edge") >= 0) {
      var ver = explorer.match(/edge\/([\d.]+)/)[1];
      return {
          type: "Edge",
          version: ver
      };
  }
  // Chrome
  else if (explorer.indexOf("chrome") >= 0) {
      var ver = explorer.match(/chrome\/([\d.]+)/)[1];
      return {
          type: "Chrome",
          version: ver
      };
  }

  // Opera
  else if (explorer.indexOf("opera") >= 0) {
      var ver = explorer.match(/opera.([\d.]+)/)[1];
      return {
          type: "Opera",
          version: ver
      };
  }// Safari
  else if (explorer.indexOf("Safari") >= 0) {
      var ver = explorer.match(/version\/([\d.]+)/)[1];
      return {
          type: "Safari",
          version: ver
      };
  }
}