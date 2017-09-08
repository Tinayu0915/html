<?php 
//XHR2 CORS（跨域资源共享）实现跨域
header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:http://a.test.com');  //允许所有来源访问
header('Access-Control-Allow-Methods:POST,GET');  //允许访问的方式
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

//服务端返回JSON数据  
$data='来自server.php的数据 '.$_POST['content'];  
$result=json_encode($data);  

//jsonp方式
$callback=$_GET['callback']; 
if($callback){
    echo $callback."($result)";  
}else{
    echo $result;
}

