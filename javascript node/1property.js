//对象直接量

var empty = {};                          //没有任何属性的对象
var point = { x:0, y:0 };                //两个属性
var point2 = { x:point.x, y:point.y+1 }; //更复杂的值
var book = {
	"main title": "javascript",          //属性名字里有空格，必须用字符串表示
	"sub-title": "The Defination",       //属性名字里有连字符，必须用字符串表示
	"for": "all audience",               //"for"是保留字，因此必须用引号
	author:{                             //这个属性的值是一个对象
	firstname:"david",
	surname:"flanagan"
	}
};

//通过new创建对象

var o = new Object();          //创建一个空对象，和{}一样
var a = new Array();           //创建空数组，和[]一样
var d = new Date();            //创建一个表示当前时间的Date对象
var r = new RegExp("js");      //创建一个可以进行模式匹配的RegExp

//原型（prototype）：每个javascript对象都和另一个对象相关联。“另一个”对象就是我们熟知的原型，每个对象都从原型继承属性

//Object.creat()的方法，它创建一个新对象，其中第一个参数是这个对象的原型。

var o1 = Object.creat({x:1, y:2});        //o1继承了属性x和属性y
var o2 = Object.creat(null);              //o2不继承任何属性和方法
var o3 = Object.creat(Object.prototype);  //o3和new Object()一样

//例：通过原型继承创建一个对象

//inherit()返回了一个继承自原型对象p的属性的新对象
//这里使用ECMAScript 5中的Object.creat()函数（如果存在的话）
//如果不存在Object.create(),则退化其使用方法

function inherit(p){                      
	if(p == null) throw TypeError();                          //p是一个对象，但不能是null
	if(Object.create)                                         //如果Object.creat()存在
		return Object.create(p);                              //直接使用它
	var t = typeof p;                                         //否则进行进一步检测
	if(t !== "object" && t !== "function") throw TypeError();
	function f() {};                                           //定义一个空构造函数
	f.prototype = p;                                           //将其原型属性设置为p
	return new f();                                            //使用f()创建p的继承对象
}

//检测属性

//通过in运算符、hasOwnProperty()和propertyIsEnumerable

var o = {x:1, y:2}
"x" in o;                      //true:x是o的属性
"z" in o;                      //false:z不是o的属性
"toString" in o;               //true:o继承toString的属性
o.hasOwnProperty("x");         //true:o有一个自有属性x
o.hasOwnProperty("z")          //false:o中不存在属性z
o.hasOwnProperty("toString")   //false:toString是继承属性

var o = inherit({ z:2 });
o.x = 1;
o.propertyIsEnumerable("x");   //true:o中有个克美剧的自有属性x
o.propertyIsEnumerable("z");   //false:y是继承来的
Object.protopype.propertyIsEnumerable("toString"); //false:不可枚举

//枚举属性
//对象继承的内置方法是不可枚举的，但代码中给对象添加的属性是可枚举的

var o = {x:1, y:2, z:3};         //三个可枚举的自有属性
o.propertyIsEnumerble("toString");//false，不可枚举

for(p in o){
	if(!o.hasOwnProperty(p)) continue;  //跳过属性
}

for(p in o){
	if(typeof o[p] === "function") continue;  //跳过方法
}

//例：用来枚举属性的对象工具函数

/*
 *p中可枚举数性属性复制到o中，并返回o
 *如果o和p中含有同名属性，则覆盖o中的属性
 *这个函数并不处理getter和setter以及复制属性
 */

function extend(o, p) {
	for(prop in p){
		o[prop] = p[prop];
	}
	rturn o;
}

/*
 *p中可枚举数性属性复制到o中，并返回o
 *如果o和p中含有同名属性，o中的属性将不受影响
 *这个函数并不处理getter和setter以及复制属性
 */

function merge(o, p) {
	for(prop in p){
		if (o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
	}
	rturn o;
}

/*
 *如果o中的属性在p没有同名属性，则从o中删除这个属性
 */

function restrict(o, p) {
	for(prop in o){
		if (!(prop in p)) delete in o[prop];
	}
	rturn o;
}

/*
 *如果o中的属性在p存在同名属性，则从o中删除这个属性
 */

function substract(o, p) {
	for(prop in p){
		delete o[prop];
	}
	rturn o;
}

/*
 *返回一个新对象，这个对象同时拥有o和p的属性
 *若o和p中含有同名属性则使用p中属性
 */

function union(o, p) { return extend(extend({},o), p);}

/*
 *返回一个新对象，这个对象拥有在o和p中同时出现的属性
 *像求o和p的交集，但p中的属性的值被忽略
 */

function instersection(o, p) { return restrict(extend({},o), p);}

/*
 *返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
 */

function keys(o){
	if(typeof o !== "object") thrw TypeError();  //参数必须是对象
	var result = [];
	for (var prop in o){
		if (o.hasOwnProperty(prop))
		result.push(prop);
	}
	return result;
}

//属性的特性：值（value）、可枚举性（enumerable）、可写性（writable）、可配置性（configurable）

//例：复制属性的特征

/*
 *给Object.prototype添加一个不可枚举的extend()方法
 *给这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
 *除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
 *参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
 */

Object.defineProperty(Object.prototype,
	"extend",
	{
		writable:true,
		enumberable:false,
		configurable：true,
		value: function(o){
			//得到包括不可枚举的所有属性
		    var names = Object.getOwnPropertyNames(o);
		    //遍历它们
		    for(var i = 0; i < names.length; i++){
		    if(name[i] in this) continue;
		    var desc = Object.getOwnpropertyDescriptor(o,names[i]);
		    Object.defineProperty(this, name[i], desc);
		    }
		}
});

//对象的三个属性：原型（prototype）、类（class）、可扩展性（extensible attribute）

//例：isPrototypeOf()检测一个对象是否是另一个对象的原型

var p = {x:1};                     //定义一个原型对象
var o = Object.creat(p);           //使用这个原型创建一个对象
p.isPrototypeOf(o);                //true:o继承自p
Object.prototype.isPrototypeOf(o); //true:p继承自Object.prototype

//例：classof()函数返回传递给他的任意函数的类

function classof(o){
	if(o === null) return "NULL";
	if(o === undefine) return "Undefined";
	return Object.prototype.tString.call(o).slice(8,-1);
}