/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Platform, StyleSheet} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {usePlayer, PlayerView, SourceType} from 'bitmovin-player-react-native';

function prettyPrint(header, obj) {
  console.log(header, JSON.stringify(obj, null, 2));
}

let tokenOne =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc0NzE3ODQ0NCwid212ZXIiOjIsIndtaWRmbXQiOiJhc2NpaSIsIndtaWR0eXAiOjEsIndtaWRsZW4iOjUxMiwid21vcGlkIjozMiwid21pZCI6ImE1NWVjN2U0NTUwOSJ9.7dc5CpanZmsEHHBVSA7miu1RWm2zLrkdTwR0vWAnILw';
let tokenTwo =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc0OTg1Njg0NCwid212ZXIiOjIsIndtaWRmbXQiOiJhc2NpaSIsIndtaWR0eXAiOjEsIndtaWRsZW4iOjUxMiwid21vcGlkIjozMiwid21pZCI6ImE1NWVjN2U0NTUwOSJ9.d6VpjKfPV1qR3Lgzty_1xbW581ua1My2KI24rHQflVY';

const BasicPlayback = () => {
  const [currentToken, setCurrentToken] = useState(tokenOne);

  //   const player = usePlayer({
  //     remoteControlConfig: {
  //       isCastEnabled: false,
  //     },
  //   });

  useEffect(() => {
    setCurrentToken(tokenOne);
    const intervalId = setInterval(() => {
      setCurrentToken(prevToken =>
        prevToken === tokenOne ? tokenTwo : tokenOne,
      );
      console.log('token change---', currentToken);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const requestCallback = (type, request) => {
    // console.log('type-----', type);
    // console.log('request-------', request);

    // Access current properties

    request.headers['Authorization'] = `Bearer ${currentToken}`;
    

    // console.log('1111', JSON.stringify(type));

    // console.log('22222', JSON.stringify(request));

    // Modify the request

    // request.method = 'GET';

    // Return the processed request via a Promise
    const processed = {
      body: request.body,
      headers: request.headers,
      method: request.method,
      url: request.url,
    };
    // console.log('🚀 ~ requestCallback ~ processed:', processed);
    return Promise.resolve(processed);
  };

  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: '15f0fdc4-f3c0-484d-a9b4-7a47a10d5d98',
    networkConfig: {
      // preprocessHttpRequest: requestCallback,
    },
  });

  console.log('token>>>>', currentToken);

  useFocusEffect(
    useCallback(() => {
      player.load({
        url:
          Platform.OS === 'ios'
            ? `https://d2ch2o8hmxnkoe.cloudfront.net/${currentToken}/bpk-tv/ArenaHD/default/index.m3u8`
            : 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
        type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
        title: 'Art of Motion',
        poster:
          'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
        thumbnailTrack:
          'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt',
        metadata: {platform: Platform.OS},
      });
      return () => {
        player.destroy();
      };
    }, [player, currentToken]),
  );

  const onReady = useCallback(event => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  const onEvent = useCallback(event => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  return (
    <View style={styles.container}>
      <PlayerView
        player={player}
        style={styles.player}
        onPlay={onEvent}
        onPlaying={onEvent}
        onPaused={onEvent}
        onReady={onReady}
        onSourceLoaded={onEvent}
        onSeek={onEvent}
        onSeeked={onEvent}
        onStallStarted={onEvent}
        onStallEnded={onEvent}
        onVideoPlaybackQualityChanged={onEvent}
      />
    </View>
  );
};

export default BasicPlayback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  player: {
    flex: 1,
  },
});
