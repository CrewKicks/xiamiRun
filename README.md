# xiamiRun

![xiamiRun](http://ww1.sinaimg.cn/large/61b8bbf4jw1ek6de23vn4j20di0c0weu.jpg)

A service for parsing the real path of Xiami song.


## Usage:

```
sails lift
```

### Visit:

http://127.0.0.1:1337/xiami/run?song=http://www.xiami.com/song/[song's id]

e.g.

[http://182.92.148.39:1337/xiami/run?song=http://www.xiami.com/song/1320819](http://182.92.148.39/xiami/run?song=http://www.xiami.com/song/1320819)

### Response:


```
{
	title: "The Diamondtina Drover",
	artist: "Christy Moore",
	album: "Ordinary Man",
	cover: "http://img.xiami.net/images/album/img38/21038/130524.jpg"
}

```

====

extracted from [perber.com](http://www.perber.com)

by: hanjiyun

MIT LICENSE



