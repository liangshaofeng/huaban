function shape(copy,cobj,xp){
    this.cobj=cobj;
    this.copy=copy;
    this.xp=xp;
    this.canvasW=copy.offsetWidth;
    this.canvasH=copy.offsetHeight;
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.style="stroke";
    this.type="line";
    this.history=[];
    this.bianNum=5;
    this.jiaoNum=5;
    this.xpSize=10;
    this.isback=true;
}
shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
        this.xp.style.display="none";
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var startX= e.offsetX;
            var startY= e.offsetY;
            that.copy.onmousemove=function(e){
                var moveX= e.offsetX;
                var moveY= e.offsetY;
                that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.type](startX,startY,moveX,moveY);
            };
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.copy.onmousemove=null;
                that.copy.onommuseup=null;
            }
            that.isback=true;
        }
    },
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var startX= e.offsetX;
            var startY= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startX,startY)
            that.copy.onmousemove=function(e){
                var moveX= e.offsetX;
                var moveY= e.offsetY;
                that.cobj.lineTo(moveX,moveY);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.copy.onmousemove=null;
                that.copy.onommuseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj.stroke();
        this.cobj[this.style]();
    },
    circle:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj.stroke();
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        var a=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
        }
        this.cobj.closePath();
        this.cobj.stroke();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        var a=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
            }else{
                this.cobj.lineTo(x+r1*Math.cos(a*i),y+r1*Math.sin(a*i));
            }
        }
        this.cobj.closePath();
        this.cobj.stroke();
        this.cobj[this.style]();
    },
    clear:function(){
        var that=this;
        that.isback=true;
        that.copy.onmousemove=function(e){
            var moveX=e.offsetX;
            var moveY=e.offsetY;
            var left=moveX-that.xpSize/2;
            var top=moveY-that.xpSize/2;
            if(left<0){
                left=0;
            }
            if(top<0){
                top=0;
            }
            if(left>that.canvasW-that.xpSize){
                left=that.canvasW-that.xpSize;
            }
            if(top>that.canvasH-that.xpSize){
                top=that.canvasH-that.xpSize;
            }
            that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpSize+"px;height:"+that.xpSize+"px";
        }
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                var moveX=e.offsetX;
                var moveY=e.offsetY;
                var left=moveX-that.xpSize/2;
                var top=moveY-that.xpSize/2;

                if(left<0){
                    left=0;
                }
                if(top<0){
                    top=0;
                }
                if(left>that.canvasW-that.xpSize){
                    left=that.canvasW-that.xpSize;
                }
                if(top>that.canvasH-that.xpSize){
                    top=that.canvasH-that.xpSize;
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpSize+"px;height:"+that.xpSize+"px";
                that.cobj.clearRect(left,top,that.xpSize,that.xpSize);
            }
            that.copy.onomuseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.copy.onmousemove=null;
                that.copy.onommuseup=null;
                that.clear();
            }
        }
    },

}