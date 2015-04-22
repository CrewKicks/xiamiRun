# xiamiRun

![xiamiRun](http://ww1.sinaimg.cn/large/61b8bbf4jw1ek6de23vn4j20di0c0weu.jpg)

A service for parsing the real path of Xiami music.


## Run:

```
sails lift
```

### Request:

```
http://127.0.0.1:1337/xiami/run?song=http://www.xiami.com/song/[id]
```

### Response:


```
{
    title: "The Diamondtina Drover",
    artist: "Christy Moore",
    album: "Ordinary Man",
    url: "http://m5.file.xiami.com/1/38/21038/130524/1320819_597112_l.mp3?auth_key=b115dcf56393e373d3e10ac4da902f04-1410393600-0-null",
    cover: "http://img.xiami.net/images/album/img38/21038/130524.jpg"
}

```

----

[perber.com](http://www.perber.com)

----
MIT LICENSE



