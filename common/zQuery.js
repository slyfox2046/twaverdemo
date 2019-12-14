'use strict';
function ZQuery(arg){
    this.elements=[];
    this.domString='';
    switch(typeof arg){
        case 'string':
            //元素  获取到
            if(arg.indexOf('<')!=-1){
                //存创建标签
                this.domString=arg;
            }else{
                this.elements=getEle(arg);
                this.length=this.elements.length;
            }
            break;
        case 'function':
            DOMReady(arg);
            break;
        default:
            this.elements.push(arg);
            break;
    }
}

//css================================================================================================================
ZQuery.prototype.css=function (name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[name]=value;
        }
    }else{
        //{} 'width'
        if(typeof name=='string'){
            return getStyle(this.elements[0],name);
        }else{
            var json=name;
            for(var i=0; i<this.elements.length; i++){
                for(var name in json){
                    this.elements[i].style[name]=json[name];
                }
            }
        }
    }
    return this;
};

//attr
ZQuery.prototype.attr=function (name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].setAttribute(name,value);
        }
    }else{
        //{} 'width'
        if(typeof name=='string'){
            return this.elements[0].getAttribute(name);
        }else{
            var json=name;
            for(var i=0; i<this.elements.length; i++){
                for(var name in json){
                    this.elements[i].setAttribute(name,json[name]);
                }
            }
        }
    }
    return this;
};

//html
ZQuery.prototype.html=function (str){
    if(str||str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].innerHTML=str;
        }
    }else{
        return this.elements[0].innerHTML;
    }
    return this;
};

//val
ZQuery.prototype.val=function (str){
    if(str||str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].value=str;
        }
    }else{
        return this.elements[0].value;
    }
    return this;
};

//addClass
ZQuery.prototype.addClass=function (sClass){
    for(var i=0; i<this.elements.length; i++){
        if(this.elements[i].className){
            var re=new RegExp('\\b'+sClass+'\\b','g');
            if(this.elements[i].className.search(re)==-1){
                this.elements[i].className+=' '+sClass;
            }
        }else{
            this.elements[i].className=sClass;
        }
        this.elements[i].className=this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
    }
    return this;
};

//removeClass
ZQuery.prototype.removeClass=function (sClass){
    for(var i=0; i<this.elements.length; i++){
        if(this.elements[i].className){
            var re=new RegExp('\\b'+sClass+'\\b','g');
            this.elements[i].className=this.elements[i].className.replace(re,'');
            this.elements[i].className=this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
            if(this.elements[i].className==''){
                this.elements[i].removeAttribute('class');
            }
        }
    }
    return this;
};

//show
ZQuery.prototype.show=function (){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='block';
    }
    return this;
};

//hide
ZQuery.prototype.hide=function (){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='none';
    }
    return this;
};

//animate
ZQuery.prototype.animate=function (json,options){
    for(var i=0; i<this.elements.length; i++){
        move(this.elements[i],json,options);
    }
    return this;
};

//eq
ZQuery.prototype.eq=function (n){
    return this.elements[n];
};

//index
ZQuery.prototype.index=function (){
    var aEle=this.elements[0].parentNode.children;
    for(var i=0; i<aEle.length; i++){
        if(aEle[i]==this.elements[0]){
            return i;
        }
    }
    return this;
};

//jq转原生
ZQuery.prototype.get=function (n){
    return this.elements[n];
};

//事件
;'click mouseover mouseout mousedown mousemove mouseup mouseenter mouseleave keydown keyup contextmenu dblclick load error scroll resize'.replace(/\w+/g,function (str){
    ZQuery.prototype[str]=function (fn){
        for(var i=0; i<this.elements.length; i++){
            addEvent(this.elements[i],str,fn);
        }
    };
    return this;
});

//hover
ZQuery.prototype.hover=function (fn1,fn2){
    this.mouseenter(fn1);
    this.mouseleave(fn2);
    return this;
};

//toggle
ZQuery.prototype.toggle=function (){
    var arg=arguments;
    var _this=this;
    for(var i=0; i<this.elements.length; i++){
        (function (count){
            _this.elements[i].onclick=function (){
                arg[count%arg.length]();
                count++;
            };
        })(0);
    }
    return this;
};

//addEvent
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,function (ev){
            var oEvent=ev||event;
            if(fn(oEvent)==false){
                oEvent.preventDefault();
                oEvent.cancelBubble=true;
            }
        },false);
    }else{
        obj.attachEvent('on'+sEv,function (ev){
            var oEvent=ev||event;
            if(fn(oEvent)==false){
                oEvent.cancelBubble=true;
                return false;
            }
        });
    }
    return this;
}

//DOM插入
ZQuery.prototype.appendTo=function (str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        //不为人知DOM操作
        aParent[i].insertAdjacentHTML('beforeEnd',this.domString);
    }
    return this;
};
ZQuery.prototype.prependTo=function (str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        //不为人知DOM操作
        aParent[i].insertAdjacentHTML('afterBegin',this.domString);
    }
    return this;
};
ZQuery.prototype.insertAfter=function (str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        //不为人知DOM操作
        aParent[i].insertAdjacentHTML('afterEnd',this.domString);
    }
    return this;
};
ZQuery.prototype.insertBefore=function (str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        //不为人知DOM操作
        aParent[i].insertAdjacentHTML('beforeBegin',this.domString);
    }
    return this;
};

//remove
ZQuery.prototype.remove=function (){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].parentNode.removeChild(this.elements[i]);
    }
    return this;
};

//插件
$.fn=ZQuery.prototype;
$.fn.extend=function (json){
    for(var name in json){
        ZQuery.prototype[name]=json[name];
    }
};
$.ajax=function (json){
    ajax(json);
};

$.jsonp=function (json){
    jsonp(json);
};

function jsonp(json){
    var json=json||{};
    if(!json.url)return;
    json.cbName=json.cbName||'cb';
    json.data=json.data||{};
    json.data[json.cbName]='show'+Math.random();
    json.data[json.cbName]=json.data[json.cbName].replace('.','');
    var arr=[];
    for(var name in json.data){
        arr.push(name+'='+json.data[name]);
    }
    //a=1&b=2
    var str=arr.join('&');
    window[json.data[json.cbName]]=function (result){
        json.success&&json.success(result);
        oH.removeChild(oS);
    };
    var oH=document.head;
    var oS=document.createElement('script');
    oS.src=json.url+'?'+str;
    oH.appendChild(oS);
}

//ajax
function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(json){
    var json=json||{};
    if(!json.url)return;
    json.data=json.data||{};
    json.type=json.type||'get';
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }
    oAjax.onreadystatechange=function (){
        if(oAjax.readyState==4){
            if(oAjax.status==200){
                json.success&&json.success(oAjax.responseText);
            }else{
                json.error&&json.error(oAjax.status);
            }
        }
    };
}

//getStyle
function getStyle(obj,sName){
    return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
//move
function move(obj,json,options){
    var options=options||{};
    options.duration=options.duration||700;
    options.easing=options.easing||'ease-out';
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(options.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-Math.pow(a,3));
                    break;
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
        }
    },16);
}

//DOMReady
function DOMReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function (){
            fn&&fn();
        },false);
    }else{
        document.attachEvent('onreadystatechange',function (){
            if(document.readyState=='complete'){
                fn&&fn();
            }
        });
    }
}

//把new ZQuery变成$
function $(arg){
    return new ZQuery(arg);
}

//选择器
function getByClass(obj,sClass){
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(sClass);
    }
    var aResult=[];
    var aEle=obj.getElementsByTagName('*');
    var re=new RegExp('\\b'+sClass+'\\b','g');
    for(var i=0; i<aEle.length; i++){
        if(aEle[i].className.search(re)!=-1){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function getByStr(aParent,str){
    var aChild=[];
    for(var i=0; i<aParent.length; i++){
        switch(str.charAt(0)){
            case '#':
                var obj=document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.':
                var aEle=getByClass(aParent[i],str.substring(1));
                for(var j=0; j<aEle.length; j++){
                    aChild.push(aEle[j]);
                }
                break;
            default:
                if(/^\w+\.\w+$/.test(str)){
                    //li.on
                    var arr=str.split('.');
                    var aEle=aParent[i].getElementsByTagName(arr[0]);
                    var re=new RegExp('\\b'+arr[1]+'\\b','g');
                    for(var j=0; j<aEle.length; j++){
                        if(aEle[j].className.search(re)!=-1){
                            aChild.push(aEle[j]);
                        }
                    }
                }else if(/^\w+\[\w+\=\w+\]$/.test(str)){
                    //input[type=text]
                    var arr=str.split(/\[|\=|\]/g);
                    var aEle=aParent[i].getElementsByTagName(arr[0]);
                    for(var j=0; j<aEle.length; j++){
                        if(aEle[j].getAttribute(arr[1])==arr[2]){
                            aChild.push(aEle[j]);
                        }
                    }
                }else if(/^\w+\:\w+(\(\d+\))?$/.test(str)){
                    //li:first li:eq(0)
                    var arr=str.split(/\:|\(|\)/g);
                    var aEle=aParent[i].getElementsByTagName(arr[0]);
                    switch(arr[1]){
                        case 'first':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length-1]);
                            break;
                        case 'even':
                            for(var j=0; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'odd':
                            for(var j=1; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'eq':
                            aChild.push(aEle[arr[2]]);
                            break;
                        case 'lt':
                            for(var j=0; j<arr[2]; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'gt':
                            for(var j=arr[2]; j<aEle.length; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                    }
                }else{
                    var aEle=aParent[i].getElementsByTagName(str);
                    for(var j=0; j<aEle.length; j++){
                        aChild.push(aEle[j]);
                    }
                }
                break;
        }
    }
    return aChild;
}

function getEle(str){
    var arr=str.replace(/^\s+|\s+$/g,'').split(/\s+/g);
    var aChild=[];
    var aParent=[document];

    for(var i=0; i<arr.length; i++){
        aChild=getByStr(aParent,arr[i]);
        aParent=aChild;
    }

    return aChild;
}
