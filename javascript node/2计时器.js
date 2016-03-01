//定时器应用函数
//例：定时器应用函数
/*
 *安排函数发f()在未来的调用模式
 *在等待了若干秒之后调用f()
 *如果设置了interval并没有设置end参数，则对f()调用将不会停止
 *如果没有设置interval和end，只在若干毫秒之后调用f()一次
 *只有指定了f(),才会从start=0的时候开始
 *注意，调用invoke()不会阻塞，他会立即返回
 */

 function invoke(f, start, interval, end){
 	if(!start) strat = 0;                     //默认设置为0毫秒
 	if(argument.length <=2)                   //单次调用模式
 		setTimeout(f, start);                 //若干毫秒后的单次调用模式
 	else{                                     //多次调用模式
 		setTimeout(repeat, start);            //在若干毫秒后调用repeat()
 		function repeat(){                    //在上一行所示的setTimeout()中调用
 			var h = setInterval(f, interval); //循环调用f()
 			//在end毫秒后停止调用，前提是end已经定义
 			if(end) setTimeout(function(){ clearInterval(h);},end);
 		}
 	}
 }