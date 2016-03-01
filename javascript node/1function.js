//例：将函数用作值

//在这里定义一些简单的函数
function add(x, y) {return x + y;}
function substract(x, y) {return x - y;}
function multiply(x, y) {return x * y;}
function divide(x, y) {return x / y;}

//这里的函数以上面的某个函数作为参数
//并给它穿瑞昂个操作然后调用它
function operate(operator, operand1, operand2){
	return operator(operand1, operand2);
}

//这行代码所示的函数调用实际上计算了(2+3) + (4*5)的值
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

//我们为这个例子从复试线一个简单的函数
//这次实现使用函数直接量，这些函数直接量定义在一个对象直接量中
var operators = {
	add: function(x, y) {return x + y;},
	substract: function(x, y) {return x - y;},
	multiply: function(x, y) {return x * y;},
	divide: function(x, y) {return x / y;},
	pow： Math.pow  //使用预定义的函数
};

//这个函数接受一个名字作为运算符，在对象中查找这个运算符
//然后将她作用于所提供的操作数
//注意这里调用运算符函数的语法
function operate2(operation, operand1, operand2){
	if(typeof operators[operation] === "function")
		return operators[operation](operand1, operand2);
	else throw "unknow operator";
}

//这样来计算("hello" + " " + "world")的值
var j = operate2("add", "hello", operate2("add", " ", "world"));
//使用预定义的函数Mash.pow()
var k = operate2("pow", 10, 2);



//函数属性
length:实际传入实参个数arguments.length;期望传入实参个数arguments.callee.length
prototype:指向一个对象的引用,这个对象称做"原型对象";
//函数方法
call方法和apply方法：通过调用方法的形式来间接调用函数
bind方法：将函数绑定至某个对象
toString方法：返回一个字符串，这个字符串和函数声明语句的语法相关

//类：类的所有实例对象都从同一个原型对象上继承属性，因此，原型对象是类的核心。

range.js表示范围的类
complex.js:表示复数的类
