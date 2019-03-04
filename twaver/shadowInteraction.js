function shadowInteraction(network){
    shadowInteraction.superClass.constructor.call(this,network);
}
twaver.Util.ext('shadowInteraction',twaver.vector.interaction.BaseInteraction,{
    setUp:function(){
        this.addListener('mousemove');
    },
    tearDown:function(){
        this.removeListener('mousemove');
    },
    handle_mousemove:function(e){
        var element = this.network.getElementAt(e);//根据鼠标位置获取元素
        // console.log("mouse:",element);
        if(element){
            this.shadow(element);//添加阴影
        }else{
            this.reset();
        }
    },
    shadowElement:null,
    shadow:function(element){
        this.reset();
        if(element instanceof twaver.Node){
            this.shadowElement = element;
            element.setImage('shadow');
        }
    },
    reset:function(){
        if(this.shadowElement){
            this.shadowElement.setImage('node_image');
        }
    }
});
