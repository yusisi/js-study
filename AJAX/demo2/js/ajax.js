function Ajax(type)
{
	var aj = new Object();
	
	aj.type = type;
	aj.create = function()
	{
		aj.xhr = null;
		if(window.XMLHttpRequest)
		{
			aj.xhr = new XMLHttpRequest();
		}
		else if(window.ActiveXObject)
		{
			var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			
			for(var i = 0, j = versions.length; i < j; i++)
			{
				aj.xhr = new ActiveXObject(versions[i]);
				if(aj.xhr){break;}
			}
		}
		else
		{
			alert("您的浏览器不支持XMLHttpRequest对象，创建失败！");
		}
	};
	
	//GET请求
	this.get = function(url, before, complete, asyn)
	{
		aj.create();
		aj.complete = complete;
		if(!aj.xhr){return false;}
		else
		{
			//if(before){before();}
			try{before();}catch(e){}
			aj.xhr.open("GET", url, asyn);
			if(complete)
			{
				aj.xhr.onreadystatechange = aj.processHandle;
			}
			aj.xhr.send();
		}
	}
	
	//POST请求
	this.post = function(url, before, complete, asyn)
	{
		aj.create();
		aj.complete = complete;
		if(!aj.xhr){return false;}
		else
		{
			//if(before){before();}
			try{before();}catch(e){}
			aj.xhr.open("POST", url, asyn);
			if(complete)
			{
				aj.xhr.onreadystatechange = aj.processHandle;
			}
			aj.xhr.send();
		}
	}
	
	//返回结果
	aj.processHandle = function()
	{
		if(aj.xhr.readyState == 4 && aj.xhr.status == 200)
		{
			if(aj.type == "json")
			{
				//一般情况下从服务器端返回的json是以字符串的方式返回，所以为了避免js直接将返回值以字符串的方式处理，所以咱们要使用eval将其转换为javascript代码执行;
				aj.str = eval('(' + aj.xhr.responseText + ')');
			}
			else
			{
				aj.str = aj.xhr.responseText;
			}
			aj.complete(aj.str);
		}
	}
}