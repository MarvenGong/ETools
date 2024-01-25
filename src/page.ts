/**
 * 加入收藏夹
 * @param sURL
 * @param sTitle
 */
export const addFavorite = function (sURL, sTitle) {
  try {
    (window.external as any).addFavorite(sURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, '');
    } catch (e) {
      alert('加入收藏失败，请使用Ctrl+D进行添加');
    }
  }
};
/**
* 设为首页
*/
export const addHome = function (url) {
  if (document.all) {
    (document.body.style as any).behavior = 'url(#default#homepage)';
    (document.body as any).setHomePage(url);
  } else if (window.sidebar) {
    if (window.netscape) {
      try {
        window.netscape.security.PrivilegeManager
          .enablePrivilege('UniversalXPConnect');
      } catch (e) {
        alert('该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.appvars.codebase_principal_support 值该为true');
      }
    }
    const prefs = window.Components.classes['@mozilla.org/preferences-service;1']
      .getService(window.Components.interfaces.nsIPrefBranch);
    prefs.setCharPref('browser.startup.homepage', url);
  }
}
export default {
  addFavorite,
  addHome
}