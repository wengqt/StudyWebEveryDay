$.ajax({
	url:"JSON/zhxInfo.json",
	type:"GET",
	dataType:"json",
	cache:false,
	success:function(data){
		var html='<ul>';
		var json=eval(data);
		$.each(json.studyRecord,function(index){
			html+='<li>'+json.studyRecord[index].time+'<ul><li>'+json.studyRecord[index].info+'</li></ul></li>';
		});
		html+='<ul>';
		$(".content").html(html);
	}
});