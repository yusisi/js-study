//日期和时间

var then = new Date(2016, 0, 10);//2011年1月10日
var later = new Date(2016, 0, 10, 22, 10, 30);//同一天，当地时间10:20:30pm
var now = new Date;//当前日期和时间
var elapsed = now - then;//日期减法，计算时间间隔的毫秒数；
later.getFullYear();//2011
later.getMonth();//0从0开始计数的月数；
later.getDate();//1从1开始计数的日期数；
later.getDay();//0得到星期几，0代表星期日，5代表星期一；
later.getHours();//当地时间10:20pm;
later.getUTCHours();//用UTC表示时间，基于时区；

//字符串的使用

var s = "hello, world"      //定义一个字符串
s.charAt(0)                //"h":第一个字符串
s.charAt(s.length-1)       //"d":最后一个字符串
s.substring(1,4)           //"ell":第二到四个字符
s.slice(1,4)               //"ell":同上
s.slice(-3)                //"rld":最后三个字符
s.indexof("l")             //2:字符l首次出现的位置
s.lastindexof("l")         //10:字符l最后一次出现的位置
s.indexof("l",3)           //3:在位置3及之后l首次出现的位置
s.slit(", ")               //["hello", "world"]分割成字串
s.replace("h", "H")        //"hello, woeld" 全文字符替换
s.topperCase()             //"HELLO, WORLD"

//javascript 转义符

\o     NUL字符（\u0000）;
\b     退格符（\u0008）;
\t     水平制表符（\u0009）;
\n     换行符（\u000A）;
\V     垂直制表符（\u000B）;
\f     换页符（\u000C）;
\r     回车符（\u000D）;
\"     双引号（\u0022）;
\'     撇号或单引号（\u0027）;
\\     反斜线（\u005C）;
\xXX   有两位十六进制数XX指定的拉丁字符；
\uXXXX 由4位十六进制XXXX指定的unicode字符；


//javascript算术运算

Math.pow(2,53);         //2的53次幂  9007199254740992
Math.round(.6);         //四舍五入  1.0
Math.ceil(.6);          //向上求整  1.0
Math.floor(.6);         //向下求整  0.0
Math.PI;                //圆周率  π
Math.abs(-5);           //求绝对值  5
Math.max(x,y,z);        //返回最大值
Math.min(x,y,z);        //返回最小值
Math.random();          //生成一个大于等于0小于1.0的伪随机数
Math.E                  //自然对数的底数  e
Math.sqrt(3);           //3的平方根
Math.pow(3,1/3);        //3的立方根
Math.sin(0);            //三角函数还有cos,atan等
Math.log(10);           //10的自然对数
Math.log(100)/Math.LN2; //以10为低100的对数
Math.log(512)/Math.LN2; //以2为低512的对数
Math.EXP(3);            //e的3次幂