var audioPlay = function(el){
    that = this;
    that.el = document.querySelector(el);
    that.audio = document.querySelector('audio');

    //初始化
    that.playbtn = that.el.querySelector('.audioplay-play');
    that.audioplaybar = that.el.querySelector('.audioplay-bar');
    that.progress = that.el.querySelector('.audioplay-progress');
    that.playhead = that.el.querySelector('.audioplay-playhead');
    that.audio.src = that.el.querySelector('.audioplay-play').getAttribute('data-src');
    that.timeLine = that.audioplaybar.offsetWidth;
     that.positionX = 0;

    that.playbtn.addEventListener('click',play);   
    
    //更新进度条
    that.audio.addEventListener('timeupdate',timeupdate);
    that.audio.addEventListener('ended',function(){removeClass(that.playbtn,'active');});

    //滑动进度条
    that.playhead.addEventListener('touchstart',touchstart);
    that.playhead.addEventListener('touchmove',touchmove);
    that.playhead.addEventListener('touchend',touchend);
    
    function touchstart(e){
        removeClass(that.playbtn,'active');
        that.audio.pause();
        that.startX = e.changedTouches[0].pageX; 
    }
    
    function touchmove(e){
        that.moveX = that.positionX + e.changedTouches[0].pageX-that.startX;                             
        that.moveX = that.moveX>=timeLine ? that.timeLine : that.moveX<=0 ? 0 : that.moveX;

        that.playhead.style.left = that.moveX/that.timeLine*100+'%';
        that.progress.style.width = that.moveX/that.timeLine*100+'%';
        that.audio.currentTime = that.moveX/that.timeLine*that.audio.duration;  
    }
    function touchend(e){
        that.positionX = that.positionX + e.changedTouches[0].pageX-that.startX;
        that.positionX = that.positionX>=that.timeLine ? 0 : that.positionX<=0 ? 0 : that.positionX;
        
        console.log(that.positionX);
        //处理播放时间                
        that.audio.currentTime = that.positionX/that.timeLine*that.audio.duration; 

        //滑动完成后播放
        addClass(that.playbtn,'active');
        that.audio.play();
    }

    function timeupdate(){
        var percent = that.audio.currentTime/that.audio.duration;
      
        that.playhead.style.left=percent*100+'%';
        that.progress.style.width=percent*100+'%'
    }
  
    function play(){      
        if(that.audio.paused){
            if(that.audio.currentTime>0 || that.audio.readyState>1){
                addClass(that.playbtn,'active');
                that.audio.play(); 
            }else{
                addClass(that.playbtn,'loading');
                that.audio.load();  
                that.audio.addEventListener("loadedmetadata",function() {
                    removeClass(that.playbtn,'loading'); 
                    addClass(that.playbtn,'active');
                    that.audio.play();                                   
                    that.positionX = that.audio.currentTime/that.audio.duration*that.timeLine;
                }); 
            }
        }else{
            removeClass(that.playbtn,'active');
            that.audio.pause();
        }
    }   

    function hasClass (elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    }
    
    function addClass(elem, cls) {
        if (!hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    }
    
    function removeClass(elem, cls) {
        if (hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
};