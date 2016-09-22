$(function(){
    //菜单
    $(".menu li").click(function(){
        var index=$(this).index(".menu li");
        $(".option").css({transform:"scale(0,0)"}).eq(index).css({transform:"scale(1,1)"})
        $(".menu li").removeClass("active");
        $(this).addClass("active");
    });
    $(".option li").click(function(){
        $(".option li").css("color","#fff");
        $(this).css("color","red");
    });



    //画图功能
    var canvas=document.getElementsByTagName("canvas")[0];
    var copy=document.getElementsByClassName("copy")[0];
    var xp=document.getElementsByClassName("xp")[0];
    var cobj=canvas.getContext("2d");
    var canvasObj=new shape(copy,cobj,xp);
    canvasObj.draw();


    //返回
    $(".option:eq(0) .fanhui").click(function() {
        canvasObj.back();
    })


    //画图
    $(".option:eq(1) li").click(function(){
        if($(this).attr("data-role")=="pen"){
            canvasObj.pen();
        }else{
        canvasObj.type=$(this).attr("data-role");
        if($(this).attr("data-role")=="bian"){
            canvasObj.bianNum=prompt("请输入边数",5);
        }
        if($(this).attr("data-role")=="jiao"){
            canvasObj.jiaoNum=prompt("请输入角数",5);
        }
        canvasObj.draw();
        }
    })


    // 画图方式
    $(".option:eq(2) li:not(.input)").click(function(){
        canvasObj.style=$(this).attr("data-role");
        canvasObj.draw();
    })



    // 设置颜色
        $(".option:eq(3) input").change(function(){
            canvasObj[$(this).attr("data-role")]=$(this).val();
            canvasObj.draw();
        })



    // 设置线条宽度
    $(".option:eq(4) li:not(.input)").click(function(){
        canvasObj.lineWidth=$(this).attr("data-role");
        canvasObj.draw();
    })
    $(".input input").change(function(){
        canvasObj.lineWidth=$(this).val();
        canvasObj.draw();
    })


    // 橡皮
    $(".menu li:last").click(function(){
        canvasObj.clear();
    })
    $(".option:last input").change(function(){
        canvasObj.xpSize=$(this).val();
    })


    //新建
    $(".new").click(function(){
        if(canvasObj.history.length>0) {
            var yes=confirm("是否保存");
            if(yes){
                location.href=canvas.toDataURL().replace("image/png","stream/octet");
            }
            canvasObj.history=[];
            cobj.clearRect(0,0,canvas.width,canvas.height);
        }
    })




    //返回
    $(".back").click(function(){
        if(canvasObj.history.length==0){
            cobj.clearRect(0,0,canvas.width,canvas.height);
            setTimeout(function(){
                alert("不能返回")
            },10)
        }
        if(canvasObj.isback){
            if(canvasObj.history.length==1){
                canvasObj.history.pop();
                cobj.clearRect(0,0,canvas.width,canvas.height);
            }else{
                canvasObj.history.pop();
                cobj.putImageData(canvasObj.history.pop(),0,0);
            }
        }else{
            cobj.putImageData(canvasObj.history.pop(),0,0);
        }
        canvasObj.isback=false;
    })



    //保存
    $(".save").click(function(){
        if(canvasObj.history.length>0) {
            location.href = canvas.toDataURL().replace("image/png", "stream/octet");
        }
    })


    //划上四角出边框
    var kuang=$(".kuang");
    var tops=$(".top");
    var bottom=$(".bottom");
    var left=$(".left");
    var right=$(".right");
    for (var i = 0; i < kuang.length; i++) {
        kuang[i].index=i;
        kuang[i].onmouseover=function(){
            var ow=this.offsetWidth;
            var oh=this.offsetHeight;
            animate(tops[this.index],{width:ow},400);
            animate(bottom[this.index],{width:ow},400);
            animate(left[this.index],{height:oh},400);
            animate(right[this.index],{height:oh},400);
        }
        kuang[i].onmouseout=function(){
            var ow=this.offsetWidth;
            animate(tops[this.index],{width:0},400);
            animate(bottom[this.index],{width:0},400);
            animate(left[this.index],{height:0},400);
            animate(right[this.index],{height:0},400);
        }
    };
})