(function loadjson() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	xmlhttp.open('GET','JSON/zhxInfo.json',true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4&&xmlhttp.status==200) {
			var data=eval('('+xmlhttp.responseText+')');
			var insertText='<ul>';
			for(var i in data.studyRecord){
				
				insertText +='<li>'+data.studyRecord[i].time+'<ul><li>'+data.studyRecord[i].info+'</li></ul></li>';
			}
			insertText +='</ul>';
			document.getElementById("content").innerHTML=insertText;

			
		}



	}
})();

