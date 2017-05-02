var $=function(obj){
	var str=obj.toString();
	if (str.charAt(0)==".") {
		return document.getElementsByClassName(str.substring(1));
	}
	if (str.charAt(0)=="#") {
		
		return document.getElementById(str.substring(1));
	}
};

// $().prototype={
// 	show:function(){
// 		console.log("aaa");
// 	}
// }




$.ajax=function(obj){
	var xmlhttp;
	var data;
	if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			
		    data=xmlhttp.responseText;
		    // console.log(data);
		    obj.success(data);
	    }
 	}

	xmlhttp.open(obj.type,obj.url,true);
	xmlhttp.send();
	// var parsedata=eval(xmlhttp.responseText);
	// console.log(parsedata);
	// obj.success(data);
	
};
