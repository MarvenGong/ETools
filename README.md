# etools
### 安装和使用
+ 使用npm安装：`npm install -s etools`

  通过es6模块引入，如`import _ from "etools";console.log(_.extend(true,{},{"age":23}));`
+ 下载并在页面引入etools.js

    直接调用ETool对象中得方法，如`console.log(ETools.extend(true,{},{"age":23}));`
+ Git 仓库地址 https://github.com/MarvenGong/ETools
***
### 版本说明
+ 1.2.4  新增async相关函数用来处理异步函数常用方法
* 1.2.3  修正了部分bug，新增array数组扩展，增加Array.filterBy方法
* 1.2.2  修正了部分bug，新增string下的generateUUID和addNum方法
* 1.0.9  修正了deparam函数依赖jquery的$.each函数的问题  

### 详细文档
#### 对象相关
+ `ETools.extend(deep,obj1,obj2)`

    作用：类似于jquery.extend方法，合并json对象，并将合并后的对象保存到obj1中作为返回值

    参数：
        1. deep,是否深度复制，设为true，会复制对象中嵌套的对象。
        2. obj1,obj2,要合并的对象

    案例：`ETools.extend(true,{"name":"zhangsan",gender:"male"},{"age":12})`
            输出结果`{"name":"zhangsan",gender:"male","age":12}`

    说明，我们可以将obj1设为空{}，用这个方法克隆一个对象，解决引用类型赋值的问题
#### url请求相关
+ `ETools.deparam(str)`

    将jquery序列化表单之后得到的参数字符串转换成标准的json对象

    str,即要格式化的字符串

    ETools.deparam("aaa=bbb&ccc=ddd")输出结果{aaa:bbb,ccc:ddd}

    <a href="http://www.gongminghua.site/ETools/formDeparam">查看演示>></a>
+ `ETools.urlParamToObj(url)`

    将连接中的get请求参数转换成json对象

    url:链接

    `ETools.deparam("www.baidu.com?aaa=bbb&ccc=ddd")`输出结果`{aaa:bbb,ccc:ddd}`

#### 事件
+ `ETools.stopPropagation(event)`

    阻止事件向上冒泡，点击某元素不会触发父元素的事件

    event:事件对象

    <code>ETools.stopPropagation(event)</code>
#### 异步函数相关
+ `ETools.async.wait(timestamp)`

  在异步函数中等待指定的时间

  timestamp 等待的时间的毫秒数
  <code>async getUserList() {</code>
  <code>  await ETools.async.wait(2000)</code>
  <code>}</code>
#### 时间日期相关
+ `ETools.datetime.compareDate(starate,endDate)`

    比较两个日期的大小

    日期格式"yyyy-mm-dd",如果返回值为-1，则前者大于后者，为0两者相等，为1，后者大于前者

    <code>ETools.datetime.compareDate("2015-12-11","2015-12-12")</code>
+ `ETools.datetime.compareTime(startTime,endTime)`

    比较两个时间的大小

    日期格式"yyyy-mm-dd h:mi:s",如果返回值为-1，则前者大于后者，为0两者相等，为1，后者大于前者

    `ETools.datetime.compareDate("2015-12-11 12:10:00","2015-12-12 12:10:00")`
+ `ETools.datetime.arriveTimerFormat(s)`

    将秒数转换成对应的多少小时，多少分多少秒（用于倒计时的显示）

    s:要计算的秒数
+ `ETools.datetime.arriveTimerFormat(52010)->[0, 14, 26, 50, "14:26:50"]`
+ `ETools.datetime.format(date,formatStr)`

    将Date类型的时间转换成指定格式的字符串

    <p>date:日期类型的对象（如：new Data()）</p>formatStr：想要的时间格式如："yyyy-mm-dd h:m:s 星期w"

    ETools.datetime.Format(new Date(),"yyyy-MM-dd h:m:s 星期w")->"2015-16-24 15:16:15 星期四"
+ `ETools.datetime.parse(timeStr)`

    将时间字符串转换成对应的时间戳

    <p>timeStr:时间字符串（如："2015-16-24 15:16:15"）</p>

    `ETools.datetime.parse("2015-16-24 15:16:15")->1461482175`

+ `ETools.datetime.getNewDay(dataStr,addNumber)`

    日期加上天数得到新的日期

    dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD

    参数：dataStr原来的日期（如：“2014-12-1”）

    addNumber要增加或减少的天数，减少就给负数值

    如：ETools.datetime.getNewDay("2017-12-1",2) -- "2017-12-3"

    ETools.datetime.getNewDay("2017-12-1",-2) -- "2017-11-29"


####html格式操作
+ `ETools.html.htmlEncode(str)`

    把html中的常见符号转换成特殊符号码，如"<"转换成<pre>"&amp;lt;"</pre>

    参数str，要转换的html代码
+ `ETools.html.htmlDecode(str)`

    把html代码转换成html元素

    参数str，要转换的html字符串

#### 页面操作
+ `ETools.page.addFavorite(url,title)`

    将页面添加到浏览器收藏夹

    url:要添加的地址信息。title:在收藏夹中的名字

    ETools.page.addFavorite("www.baidu.com","百度")
+ `ETools.page.addHome(url)`

    将页面设为浏览器的首页

    url:要添加的地址信息。

    ETools.page.addFavorite("www.baidu.com")
#### 动态加载
+ `ETools.loadStyle(styleUrl)`

    动态加载样式表

    styleUrl：要加载的样式文件的地址

    ETools.loadStyle("css/style.css")

#### 浏览器信息获取
+ `ETools.getExplorerInfo()`

    返回浏览器的名称以及版本信息{browerName:"google",version:"3.10.101.1"}

#### 字符串操作
+ ETools.string.getStrLength(str)

    获取字符串长度，中文字符按两个长度计算

    str:要计算的字符串

    ETools.string.getStrLength("ilove你")->7
+ ETools.string.trim(str)

    去掉字符串左右的空格

    str:要去空格的字符串

    ETools.string.getStrLength(" aaa  ")->"aaa"
+ ETools.string.number2String(number)

    参数 number ： 要转换的数字

    把1,2,3,4....,99999 类型的数字转换成中文字符串

    如：ETools.string.number2String(123) -> “一百二十三”

+ ETools.string.generateUUID()

  生成一个唯一标识的字符串（UUID算法）

+ ETools.string.addNum(number1, number2)

  参数 number1;number2 ： 要相加的两个数字

  包含浮点数的两个数相加，解决丢失精度的问题

  如：ETools.string.addNum(1.1， 1.2) -> “2.3” 如果直接执行1.1+1.2会出现等于2.299999999999999999999的情况

#### 表单验证
+ `ETools.vertify.isURL(str)`

    验证url地址

    ETools.vertify.isURL("www.baidu.com")->true
+ `ETools.vertify.isEmpty(str)`

    验证是否为空

    ETools.vertify.isEmpty(" ")->true
+ `ETools.vertify.isDigit(str)`

    验证是否是数字

    ETools.vertify.isDigit("2.0")->false
+ `ETools.vertify.isTelephone(str)`

    验证固定电话

    ETools.vertify.isTelephone("023-55813950")->true
+ `ETools.vertify.isMobile(str)`

    验证手机号码

    ETools.vertify.isMobile("15696544221")->true
+ `ETools.vertify.isQQ(str)`

    验证QQ号

    ETools.vertify.isQQ("1634251421")->true
+ `ETools.vertify.isEmail(str)`

    验证邮箱地址

    ETools.vertify.isEmail("2542152@qq.com")->true
+ `ETools.vertify.isIDCard(str)`

    验证身份证号码

    ETools.vertify.isIDCard("500235199008205570")->true
+ ` ETools.vertify.isPlusDigit(str)`

    验证是否是无符号正整数

    ETools.vertify.isPlusDigit("52")->true
+ `ETools.vertify.isChinese(str)`

    验证中文字符

    ETools.vertify.isChinese("我爱你")->true
+ ` ETools.vertify.isDate(str)`

    验证日期

    ETools.vertify.isDate("2015-12-12")->true
+ `ETools.vertify.isPostalCode(str)`

    验证邮政编码

    ETools.vertify.isPostalCode("400521")->true
+ `ETools.vertify.isRegisterUserName(str)`

    验证登录名，只能输入5-20个以字母开头、可带数字、“_”、“.”的字串

    ETools.vertify.isRegisterUserName("gong163")->true
+ ` ETools.vertify.isTrueName(str)`

    校验用户姓名：只能输入1-30个以字母开头的字串

    ETools.vertify.isTrueName("龚明华")->true
+ `ETools.vertify.isPassword(str)`

    校验密码：只能输入6-20个字母、数字、下划线

    ETools.vertify.isPassword("gong1632542142")->true
#### 数组相关
+ `Array.filterBy(key, value)`
   从对象数组中根据对象的key筛选值等于value的对象，如果键值对唯一则返回对象，如果不唯一则返回对象数组。

   key: 对象中的键，value: 要筛选的键所对应的值

   [{name: '张三',age: 12},{name: '张三',age: 33},{name: 'lisi',age: 22}].filterBy('name', '张三') -> [{name: '张三',age: 12},{name: '张三',age: 33}];
#### Cookie操作
+ `ETools.cookie.setCookie(name, value, Hours)`

    设置Cookie值

    name:cookie的key，value:cookie的value，Hours：Cookie的超时时间

    ETools.cookie.setCookie("username", "xiaoming", 0.5)
+ `ETools.cookie.getCookie(name)`

    获取Cookie值

    name:cookie的key

    ETools.cookie.getCookie("username")->"xiaoming"
+ `ETools.cookie.delCookie(name)`

    删除Cookie

    name:cookie的key

    ETools.cookie.delCookie("username")

#### html格式操作
+ `ETools.openWindow(url,windowName,width,height)`

    打开一个弹窗窗口

    url打开的链接，windowName窗口的title，width窗口宽度，height窗口高度

    ETools.openWindow("www.baidu.com","百度",500,600)

#### jquery插件
+ `checkAll()`

    表格的行的全选和反全选

    `$(".checkAll").checkAll();`

    需要给复选框绑定checkAll()事件。为其加上data-table属性，属性值指向要执行全选的table的id。

    如果有多个复选框共同作用于同一个表格，给这些复选框加上相同的data-table属性值即可

    <p><a href="http://www.gongminghua.site/ETools/checkAll">查看演示>></a> </p>
