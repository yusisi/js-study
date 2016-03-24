$.ajax({
    url: "http://www.hzhuti.com",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    data: { "id": "value" },    //参数值
    type: "GET",   //请求方式
    beforeSend: function() {
        //请求前的处理
    },
    success: function(req) {
        //请求成功时处理
    },
    complete: function() {
        //请求完成的处理
    },
    error: function() {
        //请求出错处理
    }
});

/*//1.$.ajax带json数据的异步请求
var aj = $.ajax( {  
    url:'productManager_reverseUpdate',// 跳转到 action  
    data:{  
             selRollBack : selRollBack,  
             selOperatorsCode : selOperatorsCode,  
             PROVINCECODE : PROVINCECODE,  
             pass2 : pass2  
    },  
    type:'post',  
    cache:false,  
    dataType:'json',  
    success:function(data) {  
        if(data.msg =="true" ){  
            // view("修改成功！");  
            alert("修改成功！");  
            window.location.reload();  
        }else{  
            view(data.msg);  
        }  
     },  
     error : function() {  
          // view("异常！");  
          alert("异常！");  
     }  
});

//2.$.ajax序列化表格内容为字符串的异步请求
function noTips(){  
    var formParam = $("#form1").serialize();//序列化表格内容为字符串  
    $.ajax({  
        type:'post',      
        url:'Notice_noTipsNotice',  
        data:formParam,  
        cache:false,  
        dataType:'json',  
        success:function(data){  
        }  
    });  
} 

//3.$.ajax拼接url的异步请求
var yz=$.ajax({  
     type:'post',  
     url:'validatePwd2_checkPwd2?password2='+password2,  
     data:{},  
     cache:false,  
     dataType:'json',  
     success:function(data){  
          if( data.msg =="false" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间  
          {  
               textPassword2.html("<font color='red'>业务密码不正确！</font>");  
               $("#validatePassword2").val("pwd2Error");  
               checkPassword2 = false;  
               return;  
           }  
      },  
      error:function(){}  
});

//4.$.ajax拼接data的异步请求
$.ajax({   
    url:'<%=request.getContextPath()%>/kc/kc_checkMerNameUnique.action',   
    type:'post',   
    data:'merName='+values,   
    async : false, //默认为true 异步   
    error:function(){   
       alert('error');   
    },   
    success:function(data){   
       $("#"+divs).html(data);   
    }
});*/

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<!--<script src="jquery.js"></script>-->
<script>
//$(function(){}) //阻塞 -> 同步

//非阻塞 - 异步
/*setTimeout(function() {
  alert(1);
}, 2000);

alert(2);*/

window.onload = function() {
  
  var oBtn = document.getElementById('btn');
  
  
  oBtn.onclick = function() {
    
    var xhr = null;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xhr.open('get','getNews.php',true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
      
      if ( xhr.readyState == 4 ) {
        if ( xhr.status == 200 ) {
          //alert( xhr.responseText );
          var data = JSON.parse( xhr.responseText );
          
          var oUl = document.getElementById('ul1');
          var html = '';
          for (var i=0; i<data.length; i++) {
            html += '<li><a href="">'+data[i].title+'</a> [<span>'+data[i].date+'</span>]</li>';
          }
          oUl.innerHTML = html;
        } else {
          alert('出错了,Err：' + xhr.status);
        }
      }
      
    }
    
  }
}
</script>
</head>

<body>
  <input type="button" value="按钮" id="btn" />
    <ul id="ul1"></ul>
</body>
</html>
