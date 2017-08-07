var AudioPlay = function(el){
    this.el = document.querySelector(el);
    this.audio = document.querySelector('audio');

    //初始化
    this.playbtn = this.el.querySelector('.audioplay-play');
    this.audioplaybar = this.el.querySelector('.audioplay-bar');
    this.progress = this.el.querySelector('.audioplay-progress');
    this.playhead = this.el.querySelector('.audioplay-playhead');
    this.audio.src = this.el.querySelector('.audioplay-play').getAttribute('data-src');
    this.timeLine = this.audioplaybar.offsetWidth;
    this.positionX = 0;
};
AudioPlay.prototype = {
    init:function(){
        this.bindEvent();      
    },
    bindEvent:function(){
        var that = this;
        this.playbtn.addEventListener('click',that.play.bind(this));           
        //更新进度条
        this.audio.addEventListener('timeupdate',that.timeupdate.bind(this));
        this.audio.addEventListener('ended',function(){that.removeClass(that.playbtn,'active');});

        //滑动进度条
        this.playhead.addEventListener('touchstart',that.touchstart.bind(this));
        this.playhead.addEventListener('touchmove',that.touchmove.bind(this));
        this.playhead.addEventListener('touchend',that.touchend.bind(this));
    },
    play:function(){     
        var that = this; 
        if(this.audio.paused){
            if(this.audio.currentTime>0 || this.audio.readyState>1){
                this.addClass(this.playbtn,'active');
                this.audio.play(); 
            }else{
                this.addClass(this.playbtn,'loading');
                this.audio.load();  
                this.audio.addEventListener("loadedmetadata",function() {
                    that.removeClass(that.playbtn,'loading'); 
                    that.addClass(that.playbtn,'active');
                    that.audio.play();                                   
                    that.positionX = that.audio.currentTime/that.audio.duration*that.timeLine;
                }); 
            }
        }else{
            this.removeClass(this.playbtn,'active');
            this.audio.pause();
        }
    },
    touchstart:function(e){
        this.removeClass(this.playbtn,'active');
        this.audio.pause();
        this.startX = e.changedTouches[0].pageX; 
    },
    touchmove:function(e){
        this.moveX = this.positionX + e.changedTouches[0].pageX-this.startX;                             
        this.moveX = this.moveX>=this.timeLine ? this.timeLine : this.moveX<=0 ? 0 : this.moveX;

        this.playhead.style.left = this.moveX/this.timeLine*100+'%';
        this.progress.style.width = this.moveX/this.timeLine*100+'%';
        this.audio.currentTime = this.moveX/this.timeLine*this.audio.duration;  
    },
    touchend:function(e){
        this.positionX = this.positionX + e.changedTouches[0].pageX-this.startX;
        this.positionX = this.positionX>=this.timeLine ? 0 : this.positionX<=0 ? 0 : this.positionX;
        
        console.log(this.positionX);
        //处理播放时间                
        this.audio.currentTime = this.positionX/this.timeLine*this.audio.duration; 

        //滑动完成后播放
        this.addClass(this.playbtn,'active');
        this.audio.play();
    },
    addClass:function(elem, cls) {
        if (!this.hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },
    removeClass:function(elem, cls) {
        if (this.hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },

    hasClass:function (elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    timeupdate:function(){
        var percent = this.audio.currentTime/this.audio.duration;
      
        this.playhead.style.left=percent*100+'%';
        this.progress.style.width=percent*100+'%'
    }

}
// export default AudioPlay;