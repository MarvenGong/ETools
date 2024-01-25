/* eslint-disable no-useless-escape */
/**
 *html转译和还原
  */
export default {
  htmlEncode: function (text: string) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  htmlDecode: function (text: string) {
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(
      /&lt;/g, '<').replace(/&gt;/g, '>');
  }
};