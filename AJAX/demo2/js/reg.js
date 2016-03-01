(
	function()
	{
		var $ = function(_id)
		{
			return document.getElementById(_id);
		};
		
		var inpStyle = function()
		{
			var inps = $("inpList").getElementsByTagName("input");//���idΪinpList �е����е�input
			for(var i = 0; i < inps.length; i++)
			{
				inps[i].onfocus = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					this.parentNode.parentNode.className = "point cl";//this ָ��ǰ�������������¼���Ԫ��
					check.focus[this.id](par, this, msg);
				}
				
				inps[i].onblur = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					par.className = "def cl";//this ָ��ǰ�������������¼���Ԫ��
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
					_p.innerHTML = "<i></i>���Լ�������ְɣ�������Ϊ����¼��վ���û���";
				},
				email:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>���������ĳ��������ַ���������ַ����Ϊ�޸�����";
				},
				mobile:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�����������ֻ����룬��������֮�����ϵ";
				},
				pwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�����밲ȫ���룬������Ϊ���ĵ�¼����";
				},
				qrpwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�뽫���������������һ��";
				}
			},
			blurs:
			{
				uname:function(_dd, _this, _p, _isAjax)//dd��ǩ ��ǰ����� ��Ϣ����ı�ǩp
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>�û��ʺŲ���Ϊ�գ�";
					}
					else if(_this.value.length < 3 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>�û�������Ӧ������3-16λ�ַ�֮�䣡";
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>�û���ֻ���ɴ�Сд��ĸ�����֣��»��ߣ��к��ߺ�������ɣ�";
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
									_p.innerHTML = "<i></i>����Ŭ��������";
								},
								function(str)
								{
									//ʹ��setTimeout��Ҫ��Ϊ��ģ�������ϵ���ʵ������ajax�и��̶̵��ӳ�
									setTimeout
									(
										function()
										{
											if(str == "1")//�û����ѱ�ʹ��
											{
												_dd.className = "error cl";
												_p.innerHTML = "<i></i>" + _this.value + "�Ѿ���ʹ�ã��������ְ�~";
												flag = false;
											}
											else//�û�������ʹ��
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
						_p.innerHTML = "<i></i>���䲻��Ϊ�գ�";
					}
					else if(!/\w+((-w+)|(\.\w+))*\@[\w]+((\.|-)[\w]+)*\.[\w]+/.test(_this.value))
					{
						_p.innerHTML = "<i></i>��������ȷ�������ַ��";
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
						_p.innerHTML = "<i></i>�ֻ����벻��Ϊ�գ�";
					}
					else if(!/0?(13|14|15|18)[0-9]{9}/.test(_this.value))
					{
						_p.innerHTML = "<i></i>��������ȷ���ֻ����룡";
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
						_p.innerHTML = "<i></i>���벻��Ϊ�գ�";
					}
					else if(_this.value.length < 6 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>���볤��Ӧ������6-16λ�ַ�֮�䣡";
					}
					else if(!/^[\w_-]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>����ֻ���ɴ�Сд��ĸ�����֣��»��ߺ��к�����ɣ�";
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
						_p.innerHTML = "<i></i>Ϊ�˱�֤�����������׼ȷ�������ٴ��������룡";
					}
					else if(_this.value != pwd.value)
					{
						_p.innerHTML = "<i></i>�����������벻һ�£����������룡";
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
						_p.innerHTML = "<i></i>����Ŭ��������";
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
				alert("�����ύ");
			}
		}
		
		window.onload = function()//�൱�ڳ������� main����
		{
			inpStyle();
		}
	}
)();