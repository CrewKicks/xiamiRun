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
            res.jsonp({
                'error': 1,
                'message':'url 有误，应为：http://www.xiami.com/song/xxxx 格式'
            });
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

                    if (!responsive.playlist) {
                        res.jsonp({
                            'error': 1,
                            'message': '没找到相关信息，该歌曲很可能已经从虾米下架。'
                        });
                        return;
                    }

                    xiamiRealSong.title = toTxt(responsive.playlist.trackList.track.title.text());
                    xiamiRealSong.artist = parseArtist(responsive.playlist.trackList.track);
                    xiamiRealSong.album = toTxt(responsive.playlist.trackList.track.album_name.text());
                    xiamiRealSong.url = getMp3Location(responsive.playlist.trackList.track.location.text());

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

function getMp3Location(str) {
    try {
        var a1 = parseInt(str.charAt(0)),
            a2 = str.substring(1),
            a3 = Math.floor(a2.length / a1),
            a4 = a2.length % a1,
            a5 = [],
            a6 = 0,
            a7 = '',
            a8 = '';
        for (; a6 < a4; ++a6) {
            a5[a6] = a2.substr((a3 + 1) * a6, (a3 + 1));
        }
        for (; a6 < a1; ++a6) {
            a5[a6] = a2.substr(a3 * (a6 - a4) + (a3 + 1) * a4, a3);
        }
        for (var i = 0,a5_0_length = a5[0].length; i < a5_0_length; ++i) {
            for (var j = 0,a5_length = a5.length; j < a5_length; ++j) {
                a7 += a5[j].charAt(i);
            }
        }
        a7 = decodeURIComponent(a7);
        for (var i = 0,a7_length = a7.length; i < a7_length; ++i) {
            a8 += a7.charAt(i) === '^' ? '0': a7.charAt(i);
        }
        return a8;
    } catch(e) {
        return false;
    }
}


function parseArtist(track) {
    if (track.artist.hasOwnProperty('text')) {
        return toTxt(track.artist.text())
    } else if (track.artist_name.hasOwnProperty('text')) {
        return toTxt(track.artist_name.text())
    } else {
        return '未知艺术家';
    }
}



// /* jshint ignore:end */