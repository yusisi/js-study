//面向对象的javascript表示课程及安排

function Lecture(name, teacher){
//将参数保存为对象的局部属性
	this.name = name;
	this.teacher = teacher;
}
//一条显示lecture信息的字符串
Lecture.prototype.display = function(){
	return this.teacher + "is teaching" + this.name;
};
//Schedule类的构造函数，已课程数组作为参数
function Schedle(lectures){
	this.lecture = lectures;
}
Schedule.prototype.display = function(){
	var src = "";
	//遍历每项课程，建立包含他们的字符串
	for(var i = 0; i<this.lectutre.length; i++)
		str += this.lectures[i].display + "";
		return str;
} 