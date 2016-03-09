//创建自定义对象
var person = new object()
	person.name = "wangwei";
	person.age = 30;
	person.sex = "male";
	person.sayName = function(){
		alert(this.name);
	};

	person.sayName();

//工厂模式，用函数来封装以特定接口创建对象的细节

function creatPerson(name,age,sex){
	var o = new Object();
	o.name = "wangwei";
	o.age = 30;
	o.sex = "male";
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var person1 = creatPerson("xiaohua","12","female");
var person1 = creatPerson("bingbing","22","male");

person1.sayName();
person2.sayName();

//构造函数模式

function person(name,age,sex){
	this.name = "wangwei";
	this.age = 30;
	this.sex = "male";
	this.sayName = function(){
		alert(this.name);
	};
}

var person1 = new person("xiaohua","12","female");
var person2 = new person("bingbing","22","male");

person1.sayName();
person2.sayName();

//原型模式

function Person(){
	
}
Person.prototype.name = "wangwei";
Person.prototype.age = 30;
Person.prototype.sex = "male";
Person.prototype.sayName = function(){
	alert(this.name);
};

var person1 = new person;
var person2 = new person;

person1.name = "xiaohua"
person1.sayName();  //"xiaohua"来自实例
person2.sayName();  //"wangwei"来自原型

//更简单的原型语法

function Person(){
	
}
Person.prototype = {
	constructor : Person,
	name : "wangwei",
	age : 30,
	sex : "male",
	sayName : function(){
		alert(this.name);
	}
}
