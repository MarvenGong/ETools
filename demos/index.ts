import _ from '../dist/index';
(() => {
  console.log(_.extend(true, {hello: 1}, {world: 2}));
  console.log(_.deparam('a=1&b=2'));
  console.log(_.html.htmlEncode('<p></p>'));
  console.log('获取字符串长度', _.string.getStrLength('hello world'));
  console.log('验证邮箱格式', _.verify.isEmail('564645@qq.com'));
  console.log('设置cookie', _.cookie.setCookie('etools-test', 'etools'));
  console.log('获取cookie', _.cookie.getCookie('etools-test'));
  console.log('删除cookie', _.cookie.delCookie('etools-test'));
  document.querySelector('#btn-new-window')?.addEventListener('click', () => {
    _.openWindow('https://www.baidu.com', '百度', 800, 600)
  });
  console.log('时间字符串转Date时间', _.datetime.parse('2022-01-01 00:00:00'));
  console.log('时间加天数', _.datetime.getNewDay('2022-01-01 00:00:00', 2));
})()
