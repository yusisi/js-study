(
	function()
	{
		var $ = function(_id)
		{
			return document.getElementById(_id);
		};
		
		var inpStyle = function()
		{
			var inps = $("inpList").getElementsByTagName("input");//获得id为inpList 中的所有的input
			for(var i = 0; i < inps.length; i++)
			{
				inps[i].onfocus = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					this.parentNode.parentNode.className = "point cl";//this 指向当前咱们所触发此事件的元素
					check.focus[this.id](par, this, msg);
				}
				
				inps[i].onblur = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					par.className = "def cl";//this 指向当前咱们所触发此事件的元素
					check.blurs[this.id](par, this, msg);
				}
			}
			
			$("enter").onclick = function()
			{
				subcheck(inps);
			}
		};
				
		var check =
		{
			focus:
			{
				uname:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>给自己起个名字吧，它将成为您登录本站的用户名";
				},
				email:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>请输入您的常用邮箱地址，此邮箱地址将作为修改密码";
				},
				mobile:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>请输入您的手机号码，方便我们之间的联系";
				},
				pwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>请输入安全密码，它将作为您的登录密码";
				},
				qrpwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>请将上面的密码再输入一次";
				}
			},
			blurs:
			{
				uname:function(_dd, _this, _p, _isAjax)//dd标签 当前输入框 消息区域的标签p
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>用户帐号不得为空！";
					}
					else if(_this.value.length < 3 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>用户名长度应控制在3-16位字符之间！";
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>用户名只能由大小写字母，数字，下划线，中横线和中文组成！";
					}
					else
					{
						if(!_isAjax)
						{
							var x = new Ajax();
							x.get
							(
								"data.php?type=yanzheng&uname=" + _this.value,
								function()
								{
									_dd.className = "loading cl";
									_p.innerHTML = "<i></i>正在努力加载中";
								},
								function(str)
								{
									//使用setTimeout主要是为了模拟网络上的真实环境，ajax有个短短的延迟
									setTimeout
									(
										function()
										{
											if(str == "1")//用户名已被使用
											{
												_dd.className = "error cl";
												_p.innerHTML = "<i></i>" + _this.value + "已经被使用，换个名字吧~";
												flag = false;
											}
											else//用户名可以使用
											{
												_dd.className = "ok cl";
												_p.innerHTML = "<i></i>";
												flag = true;
											}
										},2000
									);
								}, true
							);
						}
						else
						{
							_dd.className = "ok cl";
							_p.innerHTML = "<i></i>";
							flag = true;
						}
					}
					return flag;
				},
				email:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>邮箱不能为空！";
					}
					else if(!/\w+((-w+)|(\.\w+))*\@[\w]+((\.|-)[\w]+)*\.[\w]+/.test(_this.value))
					{
						_p.innerHTML = "<i></i>请输入正确的邮箱地址！";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				mobile:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>手机号码不能为空！";
					}
					else if(!/0?(13|14|15|18)[0-9]{9}/.test(_this.value))
					{
						_p.innerHTML = "<i></i>请输入正确的手机号码！";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				pwd:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>密码不能为空！";
					}
					else if(_this.value.length < 6 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>密码长度应控制在6-16位字符之间！";
					}
					else if(!/^[\w_-]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>密码只能由大小写字母，数字，下划线和中横线组成！";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				qrpwd:function(_dd, _this, _p)
				{
					var flag = false;
					var pwd = $("pwd");
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>为了保证您输入的密码准确无误，请再次输入密码！";
					}
					else if(_this.value != pwd.value)
					{
						_p.innerHTML = "<i></i>密码两次输入不一致，请重新输入！";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				}
			}
		};
		
		var subcheck = function(inps)
		{
			var flag = true;
			for(var i = 0; i < inps.length; i++)
			{
				var par = inps[i].parentNode.parentNode;
				var msg = par.getElementsByTagName("p")[0];
				if(!check.blurs[inps[i].id](par, inps[i], msg, true))
				{
					flag = false;
					break;
				}
			}
			
			if(flag)
			{
				var uname = $("uname").value;
				var email = $("email").value;
				var mobile = $("mobile").value;
				var pwd = $("pwd").value;
				
				var x = new Ajax("json");
				x.get
				(
					"data.php?type=uinfo&uname=" + uname + "&email=" + email + "&mobile=" + mobile + "&pwd=" + pwd,
					function()
					{
						_dd.className = "loading cl";
						_p.innerHTML = "<i></i>正在努力加载中";
					},
					function(data)
					{
						var str = '<ul>\
							<li>' + data.uname + '</li>\
							<li>' + data.email + '</li>\
							<li>' + data.mobile + '</li>\
							<li>' + data.pwd + '</li>\
						</ul>';
						$("box").innerHTML = str;
					}, true
				);
			}
			else
			{
				alert("不可提交");
			}
		}
		
		window.onload = function()//相当于程序的入口 main方法
		{
			inpStyle();
		}
	}
)();