'use strict';

$(function() {
  console.log('page loading...');

  const myStreamers = ['OgamingSC2', 'ESL_SC2', 'RobotCaleb', 'Habathcx',
                      'storbeck', 'FreeCodeCamp', 'thomasballinger',
                      'terakilobyte', 'comster404', 'brunofin'];

  for(var i = 0; i < myStreamers.length; i++) {
    getTwitchInformation(myStreamers[i]);
  }
});

function getTwitchInformation(streamer) {
  let myUrl = 'https://api.twitch.tv/kraken/streams/' + streamer;

  $.ajax({
    url: myUrl
  }).done((data) => {

    // check for offline
    const streaming = data.stream;
    if(streaming === null) {
      const myObj = {
        name: streamer,
        stream: false
      }

      displayStreamer(myObj);
    } else {
      // streamer is online
      const gameName = data.stream.game;
      const link = data.stream.channel.url;
      const preview = data.stream.channel.logo;

      const myObj = {
        name: streamer,
        stream: true,
        game: gameName,
        link: link,
        preview: preview
      }

      displayStreamer(myObj);
    }
  })

  .fail(() => {
    displayStreamer(streamer, 'error');
  });;
}

function displayStreamer(streamer, error) {
  let myHtml;

  if(error === 'error') {
    myHtml = '<div class="error streamer"><span>' + streamer +
             '</span><span>Account doesn\'t exist</span></div>';
  } else if(!streamer.stream) {
    myHtml = '<div class="offline streamer"><span>' + streamer.name +
             '</span><span>Offline</span></div>';
  } else {
    myHtml = '<div class="online streamer">' +
             '<img src="' + streamer.preview + '"/><span>' +
             '<a href="' + streamer.link + '" target="_blank">' + streamer.name + '</a>' +
             '</span><span>' + streamer.game + '</span>';
  }

  $('.streamers').append(myHtml);
}
