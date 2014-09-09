// jshint ignore:start 

/**
 * XiamiController
 *
 * @description :: Server-side logic for managing xiamis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var url = require('url');
var http = require('http');
var xmlreader = require('xmlreader');

var isXiamiSong = /www.xiami.com\/song\/\d+/;
var sidPattern = /(\d+)/;
var songUrlPattern = /a href="(\/song\/\d+)"/g;

module.exports = {
    run : function (req, res) {
        var pageUrl = req.param('song');

        if (!isXiamiSong.test(pageUrl)) {
            res.jsonp({'status': 'the url is error'});
            return;
        }

        var sid = sidPattern.exec(pageUrl)[1];
        var options = url.parse('http://www.xiami.com/song/playlist/id/'+ sid +'/object_name/default/object_id/0');
        var xiamiRealSong = {};

        http.get(options, function(resp) {
            resp.setEncoding('utf8');

            var xml = '';

            resp.on('data', function(data) {
                xml += data;
            })

            resp.on('end', function() {
                xmlreader.read(xml, function(errors, responsive){
                    if(null !== errors ){
                        console.log('errors', errors)
                        return;
                    }

                    xiamiRealSong.title = toTxt(responsive.playlist.trackList.track.title.text());
                    xiamiRealSong.artist =  toTxt(responsive.playlist.trackList.track.artist.text());
                    xiamiRealSong.album = toTxt(responsive.playlist.trackList.track.album_name.text());

                    // 封面处理
                    var cover;
                    var coverpath = responsive.playlist.trackList.track.pic.text();
                    var coverReg = /http:\/\/[a-zA-Z0-9-.-\/-_]+.(jpg|jpeg|png|gif|bmp)/g;
                    var json;

                    // 正则替换小的封面为大封面
                    if(coverReg.test(coverpath)){
                        coverpath.replace(coverReg, function(s,value) {
                            cover = s.replace('_1', '');
                        });
                    }
                    xiamiRealSong.cover =  cover;

                    json = xiamiRealSong;

                    res.jsonp(json);

                });

            })
        })
    }
};

// 过滤转义字符
function toTxt(str){
    var RexStr = /(&lt;|&gt;|&quot;|&#39;|&#039;|&amp;)/g;
    str = str.replace(RexStr,
        function(MatchStr){
            switch(MatchStr){
                case "&lt;":
                    return "<";
                    break;
                case "&gt;":
                    return ">";
                    break;
                case "&quot;":
                    return '\"';
                    break;
                case "&#39;":
                    return "'";
                    break;
                case "&#039;":
                    return "'";
                    break;
                case "&amp;":
                    return "&";
                    break;
                default :
                    break;
            }
        }
    )
    return str;
}



// /* jshint ignore:end */