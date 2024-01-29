/* eslint-disable @typescript-eslint/naming-convention */

import { IAsync } from './async';
import * as Etools from './main';
interface IETools {
  async: IAsync;
}
const ETools: IETools = Etools;
// 导出所有模块，供libiray全局window对象使用
export * from './main';
// 导出默认模块兼容以前的 _.extend() 用法
export default ETools;
