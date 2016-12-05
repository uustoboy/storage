
$.isSession、$.isLocal 判断当前浏览器是否支持 Storage 两个属性的方法 支持为 true 不支持为undefined;

$.storage 存数本地数据的函数：三个参数 name、key、value 三个值 第一个参数为session、local 来分辨存储的是哪一种存储类型 第二参数为 存储的key 值 第三个参数为key对应的value值 如果 value 传的参数为‘’ 则视为删除这组key值，如果只传第一个参数为session、local则返回对应的原生对象 ，如果传了两个参数视为从本地存储里取key值的value，如果没有则返回undefined. 因为低版本的IE不支持Storage 会alert('This browser does NOT support Storage!'),建议如果做低版本的时候先用 $.isSession、$.isLoca 来判断一下客户端是否支持；

$.removeStorage 删除本地存数的key值：两个参数 第一个参数name 传参数session、local 一样分别删除哪种类型的本地存储，第二个参数key 为删除的key名，如果key传入的是‘clearAll’则视为清除全部对应本地存储的key值

$.wachStorage 为时时监控本地存储key的变化函数：一个参数为回调函数