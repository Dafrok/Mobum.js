(function($){
    var animation={
        animateFixed:[
            'bounce',
            'flash',
            'pulse',
            'rubberBand',
            'shake',
            'swing',
            'tada',
            'wobble',
            'hinge',
        ],
        animateIn:['bounceIn',
            'bounceInDown',
            'bounceInLeft',
            'bounceInRight',
            'bounceInUp',
            'fadeIn',
            'fadeInDown',
            'fadeInDownBig',
            'fadeInLeft',
            'fadeInLeftBig',
            'fadeInRight',
            'fadeInRightBig',
            'fadeInUp',
            'fadeInUpBig',
            //'flipInX',
            //'flipInY',
            'lightSpeedIn',
            'rotateIn',
            'rotateInDownLeft',
            'rotateInDownRight',
            'rotateInUpLeft',
            'rotateInUpRight',
            'rollIn',
            'zoomIn',
            'zoomInDown',
            'zoomInLeft',
            'zoomInRight',
            'zoomInUp',
            'slideInDown',
            'slideInLeft',
            'slideInRight',
            'slideInUp',
        ],
        animateOut:[
            'bounceOut',
            'bounceOutDown',
            'bounceOutLeft',
            'bounceOutRight',
            'bounceOutUp',
            'fadeOut',
            'fadeOutDown',
            'fadeOutDownBig',
            'fadeOutLeft',
            'fadeOutLeftBig',
            'fadeOutRight',
            'fadeOutRightBig',
            'fadeOutUp',
            'fadeOutUpBig',
            //'flipOutX',
            //'flipOutY',
            'lightSpeedOut',
            'rotateOut',
            'rotateOutDownLeft',
            'rotateOutDownRight',
            'rotateOutUpLeft',
            'rotateOutUpRight',
            'rollOut',
            'zoomOut',
            'zoomOutDown',
            'zoomOutLeft',
            'zoomOutRight',
            'zoomOutUp',
            'slideOutDown',
            'slideOutLeft',
            'slideOutRight',
            'slideOutUp',
        ]
    }
    var $frames=$("#frames"),
        mobumData={}
    function nextFrame(frame,max){
        if(frame==max){
            return 0
        }
        else
        {
            return frame+1
        }
    }
    function addAnimation(ani,option){
        if(ani){
            return ani
        }
        else{
            switch(option){
                case "in":
                    return animation.animateIn[Math.floor((Math.random()*animation.animateIn.length))]
                case "out":
                    return animation.animateOut[Math.floor((Math.random()*animation.animateOut.length))]
                default:
                    return animation.animateFixed[Math.floor((Math.random()*animation.animateFixed.length))]
            }
        }
    }
    function animateInit(mobumData){
        if(mobumData.frames.length==$frames.find("li").length){
            $frames.find("li").each(function(){
                var $this = $(this),
                    index=$this.index(),
                    image=$this.find("img")[0].src,
                    text=$this.find(".text")
                if(image.src!=mobumData.frames[index].img){
                    image=mobumData.frames[index].img
                }
                if(text.text()!=mobumData.frames[index].text){
                    text.text(mobumData.frames[index].text)
                }
            })
        }
        else{
            $frames.html("")
            for(frame in mobumData.frames){
                $frames.append($('<li></li>')
                        .append('<div class="image"><img style="opacity:0" src="'+mobumData.frames[frame].img+'"/></div>')
                        .append('<div style="opacity:0" class="text">'+mobumData.frames[frame].text+'</span>')
                )
            }
        }
    }
    function animateGo(frame){
        if(!frame){
            frame=0;
            $.getJSON("../data/mobum.json",function(data){
                animateInit(data)
                mobumData=data
                var max=mobumData.frames.length,
                    next=nextFrame(frame,max-1)
                if(frame<max){
                    var $frame=$frames.children("li").eq(frame),
                        aniIn=addAnimation(mobumData.frames[frame].animateIn,"in"),
                        aniOut=addAnimation(mobumData.frames[frame].animateOut,"out")
                    $frame.find('img')
                        .attr("class","")
                        .css("opacity",1)
                        .addClass("animated")
                        .addClass(aniIn)
                    $frame.children('div').eq(1)
                        .attr("class","")
                        .css("opacity",1)
                        .addClass("animated")
                        .addClass("fadeInUp")
                    setTimeout(function(){
                        $frame.find('img')
                            .removeClass(aniIn)
                            .addClass(aniOut)
                        $frame.children('div').eq(1)
                            .addClass("fadeInUp")
                            .addClass("fadeOutDown")
                    },mobumData.delay)
                    setTimeout(function(){animateGo(next)},mobumData.delay)
                }
            })
        }
        else{
            var max=mobumData.frames.length,
                next=nextFrame(frame,max-1)
            if(frame<max){
                var $frame=$frames.children().eq(frame),
                    aniIn=addAnimation(mobumData.frames[frame].animateIn,"in"),
                    aniOut=addAnimation(mobumData.frames[frame].animateOut,"out")
                $frame.find('img')
                    .attr("class","")
                    .css("opacity",1)
                    .addClass("animated")
                    .addClass(aniIn)
                $frame.children('div').eq(1)
                    .attr("class","")
                    .css("opacity",1)
                    .addClass("animated")
                    .addClass("fadeInUp")
                setTimeout(function(){
                    $frame.find('img')
                        .removeClass(aniIn)
                        .addClass(aniOut)
                    $frame.children('div').eq(1)
                        .addClass("fadeInUp")
                        .addClass("fadeOutDown")
                },mobumData.delay)
            }
            setTimeout(function(){animateGo(next)},mobumData.delay)
        }
    }
    animateGo()
})(Zepto)