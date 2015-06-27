# xiamiRun

<img src="http://ww1.sinaimg.cn/large/61b8bbf4jw1ek6de23vn4j20di0c0weu.jpg" width="200" height="200">

一个解析虾米音乐 mp3 真实地址的服务。node express。


### 运行:

```
sails lift
```

### 浏览器中输入地址，后面那个 url 是虾米的歌曲地址

```
http://127.0.0.1:1337/xiami/run?song=http://www.xiami.com/song/[id]
```

### 返回:


```
{
    title: "The Diamondtina Drover",
    artist: "Christy Moore",
    album: "Ordinary Man",
    url: "http://m5.file.xiami.com/1/38/21038/130524/1320819_597112_l.mp3?auth_key=b115dcf56393e373d3e10ac4da902f04-1410393600-0-null",
    cover: "http://img.xiami.net/images/album/img38/21038/130524.jpg"
}

```


### Demo

[xiamiRun demo](http://xiamirun.avosapps.com/run?song=http://www.xiami.com/song/1774205606)

----


### 注意

如果运行在国外的服务器上，会被虾米屏蔽，所以写了一个可以运行在国内 Leancloud (https://leancloud.cn) 上的版本： https://github.com/naoyeye/xiamiRunLeanCloud ，上面的 Demo 即为 Leancloud 版。

### 服务于
[perber.com](http://www.perber.com)

----
MIT LICENSE



