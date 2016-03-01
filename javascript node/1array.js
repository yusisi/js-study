//数组方法

//join()
var a = [1, 2, 3];
a.join();             //"1,2,3"
a.join(" ");          //"1 2 3"
a.join("");           //"123"
var b = new Array(10);
b.join('-');          //'---------'

//reverse()
var a = [1,2,3];
a.reverse().join();    //"3,2,1"

//sort()
var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(", ");    //s == "apple, banana, cherry"

//concat()
var a =[1,2,3]
a.concat(4, 5);  a.concat([4, 5]);         //[1,2,3,4,5]
a.concat([4, 5],[6,7]);                    //[1,2,3,4,5,6,7]

//slice()
var a = [1,2,3,4,5];
a.slice(0,3);            //[1,2,3]
a.slice(3);              //[4,5]
a.slice(1,-1);           //[2,3,4]
a.slice(-3,-2);          //[3]

//splice()返回一个由删除元素组成的数组
var a = [1,2,3,4,5,6,7,8];
a.splice(4);            //返回[5,6,7,8]；a是[1，2，3，4]
a.splice(1,2);          //返回[2,3];a是[1,4]
a.splice(1,1);          //返回[4];a是[1]

var a = [1,2,3,4,5];
a.splice(2,0,'a','b')     //返回[],a是[1,2,'a','b',3,4,5]
a.splice(2,2,[1,2],3)     //返回['a','b'],a是[1,2[1,2],3,3,4,5]

//push()和pop()
var stack = [];
stack.push(1,2);      //stack:[1，2]      返回2
stack.pop();          //stack:[1]         返回2
stack.push(3);         //stack:[1,3]      返回2
stack.pop();           //stack:[1]        返回3

//unshift()和shift()
var a = [];
a.unshift(1);       //a:[1]           返回：1
a.unshift(22);      //a:[22,1]        返回：2
a.shift();          //a:[1]           返回：22
a.unshift(3,[4,5]); //a:[3,[4,5],1]   返回：3 

//toString()和toLocaleString()
[1,2,3].toString();              //生成'1,2,3'
["a","b","c"].toString();        //生成'a,b,c'
[1,[2,'c']].toString();          //生成'1,2,3'

//forEach()从头到尾遍历数组
var data = [1,2,3,4,5];
data.forEach(function(v,i,a){ a[i] = v + 1; });   //data:[2,3,4,5,6]

//map()将调用的数组的每个元素传递给指定的函数
a = [1,2,3];
b = a.map(function(x){return x*x; });   //b是[1,4,9]

//filter()返回的数组元素是调用数组的一个子集
//every()和some()方法是数组的逻辑判定，返回true或false;
//reduce()和reduceRight()方法使用指定的函数将元素进行组合，生成单个值
//indexOf()和lastIndexOf()搜索整个数组中具有给定值的元素，返回找到的第一个元素的索引或者如果没有找到就返回-1