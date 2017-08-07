### webapp音频播放插件audioplay.js
> 说明文档：http://aweig.com/433.html

---

webapp音频播放插件audioplay.js，采用自定义html标签替换audio标签

![image](https://awei922.github.io/html/audioplayerJs/demo.gif)
## 功能
- 播放/暂停
- 进度条显示
- 可触摸拖拉播放进度

## 用法

1、首先加载插件，需要用到的文件有audioplay.css和audioplay.js文件。
```
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="path/to/audioplay.css">
</head>
<body>
    ...
    <script src="path/to/audioplay.js"></script>
</body>
</html>
```


2、在页面加入全局唯一audio标签

```
<audio preload="auto" controls>           
    Your browser does not support the audio element.您的浏览器不支持 audio 标签。
</audio>
```

3、利用html标签自定义播放器的样式

```
<div class="audioplay-box active">
    <div class="audioplay-play" data-src="audio.mp3"></div>
    <div class="audioplay-bar">
        <div class="audioplay-progress"></div>
        <div class="audioplay-playhead"></div>
    </div>
    <div class="audioplay-time-duration">18"</div>
</div>
```

4、创建AudioPlay对象并初始化

```
<script>
    var audioPlay = new AudioPlay('.audioplay-box');
    audioPlay.init();
</script>
```

> 源码和demo  

源码：https://github.com/awei922/html/tree/master/audioplayerJs   
demo：https://awei922.github.io/html/audioplayerJs/index.html 