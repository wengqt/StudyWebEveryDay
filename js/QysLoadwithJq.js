/**
 * Created by 延松松松松 on 2017/4/28.
 */
$.ajax({
    url:"JSON/QYSinfo.json",
    type:"GET",
    dataType:"json",
    success:function (data) {
        for(var i=1;i<data.Study.length;i++){
            var divTI = document.createElement("div");
            divTI.className="task_item";
            var divTN = document.createElement("div");
            divTN.className = "task_name";
            divTN.innerHTML= data.Study[i].time+data.Study[i].task_name;

            var  divTA = document.createElement("div");
            divTA.className = "task_according";
            divTA.innerHTML=data.Study[i].task_according;

            divTI.appendChild(divTN);
            divTI.appendChild(divTA);
            document.getElementById("schedule").appendChild(divTI);







        }

    }


});