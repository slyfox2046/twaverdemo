$(function() {
	// 选项卡
	$(".o-tab .o-tab-hd > li").on("click",function(){
        if($(this).hasClass('disabled')){
            return false;
        }else{
            $(this).addClass("active").siblings().removeClass('active');
            var i = $(this).index();
            $(this).parent().next().find(".o-tab-content > li").eq(i).show().siblings().hide();
        }
    })

	// 面板
	$(".o-panel-hd .o-tab > li").on(
			"click",
			function() {
				$(this).addClass("active").siblings().removeClass('active');
				var i = $(this).index();
				$(this).parent().parent().next().find(".o-panel-content > li")
						.eq(i).show().siblings().hide();
			});

	$(".o-panel-hd .arrow-box").on(
			"click",
			function() {
				if ($(this).find(".arrow").hasClass("arrow-down")) {
					$(this).find(".arrow").removeClass("arrow-down").addClass(
							"arrow-up");
					$(this).parent().parent(".o-panel-hd").next().hide();
				} else {
					$(this).find(".arrow").removeClass("arrow-up").addClass(
							'arrow-down');
					$(this).parent().parent(".o-panel-hd").next().show();
				}
			});
	$(".o-panel-hd .close").on("click", function() {
		$(this).parent().parent().parent().hide();
	});

	//文件上传
    $(".o-upload .viewfile").mouseout(function(){
        $(this).parent().siblings('.upload').hide();
    })

    $(".o-upload .file1").mouseover(function(){
        $(this).siblings('.upload').show();
    })

    $(".o-upload .file").change(function(){
        $(this).siblings('.span').find(".viewfile").val($(this).val());
        $(this).hide();
    })

    //菜单
//    $(".o-menu .arrow-box").bind("touchstart click",function(e){
//        e.stopPropagation();
//        if(e.originalEvent.touches){ // 手机端 touch事件处理
//            if($(this).find(".arrow").hasClass("arrow-down")){
//                $(this).parents(".o-menu-bd").find(".arrow").removeClass("arrow-up").addClass("arrow-down");
//                $(this).parents(".o-menu-bd").find(".second-menu-bd").hide();
//                $(this).find(".arrow").removeClass("arrow-down").addClass("arrow-up");
//                $(this).parent().next().show();
//            }else{
//                $(this).find(".arrow").removeClass("arrow-up").addClass("arrow-down");
//                $(this).parent().next().hide();
//            }
//            return false;
//        }else{
//           // PC端 click事件处理
//           	if($(this).find(".arrow").hasClass("arrow-down")){
//                $(this).parents(".o-menu-bd").find(".arrow").removeClass("arrow-up").addClass("arrow-down");
//                $(this).parents(".o-menu-bd").find(".second-menu-bd").slideUp();
//                $(this).find(".arrow").removeClass("arrow-down").addClass("arrow-up");
//                $(this).parent().next().slideDown();
//            }else{
//                $(this).find(".arrow").removeClass("arrow-up").addClass("arrow-down");
//                $(this).parent().next().slideUp();
//            }
//            return false;
//        }
//
//    });

    // 多条件下拉框
    $(".input-search-multiple .input-search .arrow-box").on("click",function(){
        if($(this).find(".arrow").hasClass("arrow-down")){
            $(this).find(".arrow").removeClass("arrow-down").addClass("arrow-up");
        }else {
            $(this).find(".arrow").removeClass("arrow-up").addClass('arrow-down');
        }
        $(this).toggleClass('show-bd');
        $(this).parent().parent().next(".input-search-bd").toggleClass('o-hide');
    })

        //文本域限制输入字数
    statInputNum(".o-textarea .textarea", 200);
    function statInputNum(textArea, numItem) {
        var $text = $(textArea);
        var max = numItem;
        $text.on("input propertychange", function () {
            var $curText = $(this);
            var $count = $(".word-count");
            var curLength = $curText.val().length;
                if (curLength >= max) {
                    var num = $curText.val().substr(0, max - 1);
                    $curText.val(num);
                    $count.text(max + "/" + max);
                } else {
                     $count.text(curLength + "/" + max);
                }
        });
    };

    //下拉组件
    $(".o-nav-select .select-content > li").on("click",function(){
        $(this).addClass("active").siblings().removeClass('active');
    })


    //超出显示区域表头固定顶部
    // var topDistance = $("#table-fixed").offset().top;
    // $(window).scroll(function() {
    //     var topMenuScroll = $(window).scrollTop();
    //     var tableHeadWidth = $(".table-scroll .table-body").width();
    //     if(topMenuScroll >= topDistance){
    //         $(".table-head").css("width",tableHeadWidth);
    //         $(".table-head").addClass("fix-top");
    //     }else{
    //         $(".table-head").removeClass("fix-top");
    //         $(".table-head").css("width",tableHeadWidth);
    //     }
    // })
    //菜单
    $(".o-menu ").on("click",'.second-menu-hd .arrow-box',function(){
        if($(this).find(".arrow").hasClass("arrow-down")){
            $(this).parents(".o-menu-bd").find(".second-menu-hd .arrow").removeClass("arrow-up").addClass("arrow-down");
            $(this).parents(".o-menu-bd").find(".second-menu-bd").slideUp();
            $(this).find(".arrow").removeClass("arrow-down").addClass("arrow-up");
            $(this).parent().next().slideDown();
        }else{
            $(this).find(".arrow").removeClass("arrow-up").addClass("arrow-down");
            $(this).parent().next().slideUp();
        }
    })

    $(".o-menu").on("click",'.second-menu-bd .arrow-box',function(){
        if($(this).find(".arrow").hasClass("arrow-down")){
            $(this).find(".arrow").removeClass("arrow-down").addClass("arrow-up");
            $(this).siblings(".third-menu").removeClass("o-hide");
        }else{
            $(this).find(".arrow").removeClass("arrow-up").addClass("arrow-down");
            $(this).siblings(".third-menu").addClass("o-hide");
        }
    })


    $(".o-area .o-select-area").on("click",function(){
        if ($(this).find(".arrow").hasClass("arrow-down")) {
            $(this).find(".arrow").removeClass("arrow-down").addClass(
                    "arrow-up");
            $(this).parent().find(".o-tab").show();
        } else {
            $(this).find(".arrow").removeClass("arrow-up").addClass(
                    'arrow-down');
            $(this).parent().find(".o-tab").hide();
        }
    })
})