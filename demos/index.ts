import ETools from '../dist/index';
(async () => {
  console.log(ETools.extend(true, {hello: 1}, {world: 2}));
  console.log(ETools.deparam('a=1&b=2'));
  console.log(ETools.html.htmlEncode('<p></p>'));
  console.log('获取字符串长度', ETools.string.getStrLength('hello world'));
  console.log('验证邮箱格式', ETools.verify.isEmail('564645@qq.com'));
  console.log('设置cookie', ETools.cookie.setCookie('etools-test', 'etools'));
  console.log('获取cookie', ETools.cookie.getCookie('etools-test'));
  console.log('删除cookie', ETools.cookie.delCookie('etools-test'));
  
  console.log('时间字符串转Date时间', ETools.datetime.parse('2022-01-01 00:00:00'));
  console.log('时间加天数', ETools.datetime.getNewDay('2022-01-01 00:00:00', 2));
  await ETools.async.wait(500);
  document.querySelector('#btn-new-window')?.addEventListener('click', () => {
    ETools.openWindow('https://www.baidu.com', '百度', 800, 600)
  });
})()
