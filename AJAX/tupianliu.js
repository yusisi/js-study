window.onload = function(){
	var oUl = document.getElementById('ul');
	var oLi = document.getElementById('li');
	var iTem = oLi.length;
	var iPage = 1;
	
	getList();

function getList(){
	ajax('GET','getPic.php','cpage=' + iPage, function(){
		//解析，把jason变成一个对象
		var data = JSON.parse(data);
		//没有数据的时候
		if(!data.length){
			return;
		}
			for(var i=0; i<data.length; i++){
				var _index = getShort()
				var oDiv = document.creatElement('div');
				var oImg = document.creatElement('img');
				oImg.src = data[i].preview;
				oImg.style.width = '225px';
				oImg.style.height = data[i].height*(225/data[i].width) +'px'
				oDiv.appendChild(oImg);
				var oP = document.creatElement('p');
				oP.innerHtml = data[i].title;
				oDiv.appendChild(oP);
				aLi[_index].appendChild(oDiv);
			}
		b = ture;
	});
}
//页面缓存
window.onscroll = function(){
  var _index = getShort();
  var oLi = aLi[_index];
  var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
  if(getTop(oLi) + oLi.offsetHeight < document.document.clientHeight + scrollTop ){
  	if(b){
  		b = false;
  		iPage++;
  		getList();
  	}
  }
}

function getTop(){

} 

//取得最短的图片
	function getShort(){
		var index = 0;
		var ih = aLi[index].offsetHeight;
		for(var i=1;i<iLen; i++){
			if(aLi[i].offsetHeight<ih){
				index = i;
				ih = aLi[i].offsetHight;
			}
		}
	}
}

