/*用户登录*/

//获取cookie
function getCookie(key){
	var arr1= document.cookie.split(';');
	for(var i=0;i<arr1.length;i++){
		var arr2 = arr[i].split('=');
		if(arr2[0]==key){
			return arr2[1];
		}
	}

}

userUpdateStatus();

function userUpdateStatus(){

	var uid = getCookie('uid');
	var username = getCookie('username');
	//uid存在则是登陆状态
	if(uid){
	//有用户名和退出按钮显示，不显示注册和登陆表单
	}else{
		//uid不存在则不现实退出按钮和用户名
	}

}


/*退出功能*/

//a链接点击退出。return false防止a链接跳转

//初始化（更新用户状态）
updateUserStatus()


