// /* eslint-disable dot-notation */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, {useCallback, useEffect, useState} from 'react';
// import {View, Platform, StyleSheet} from 'react-native';

// import {DrawerRouter, useFocusEffect} from '@react-navigation/native';
// import {usePlayer, PlayerView, SourceType} from 'bitmovin-player-react-native';

// function prettyPrint(header, obj) {
//   console.log(header, JSON.stringify(obj, null, 2));
// }

// let tokenOne =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc0NzE3ODQ0NCwid212ZXIiOjIsIndtaWRmbXQiOiJhc2NpaSIsIndtaWR0eXAiOjEsIndtaWRsZW4iOjUxMiwid21vcGlkIjozMiwid21pZCI6ImE1NWVjN2U0NTUwOSJ9.7dc5CpanZmsEHHBVSA7miu1RWm2zLrkdTwR0vWAnILw';
// let tokenTwo =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc0OTg1Njg0NCwid212ZXIiOjIsIndtaWRmbXQiOiJhc2NpaSIsIndtaWR0eXAiOjEsIndtaWRsZW4iOjUxMiwid21vcGlkIjozMiwid21pZCI6ImE1NWVjN2U0NTUwOSJ9.d6VpjKfPV1qR3Lgzty_1xbW581ua1My2KI24rHQflVY';

// let sourceUrl = `https://d2ch2o8hmxnkoe.cloudfront.net/${tokenOne}/bpk-tv/ArenaHD/default/index.m3u8`;

// const BasicPlayback = () => {
//   const [currentToken, setCurrentToken] = useState(tokenOne);

//   //   const player = usePlayer({
//   //     remoteControlConfig: {
//   //       isCastEnabled: false,
//   //     },
//   //   });

//   useEffect(() => {
//     setCurrentToken(tokenOne);
//     const intervalId = setInterval(() => {
//       setCurrentToken(prevToken =>
//         prevToken === tokenOne ? tokenTwo : tokenOne,
//       );
//       player.play();
//       console.log('token change---', currentToken);
//     }, 20000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const requestCallback = (type, request) => {
//     // console.log('🚀 ~ requestCallback ~ request:', request);
//     // console.log('🚀 ~ requestCallback ~ type:', type);
//     // Access current properties

//     request.headers['Authorization'] = `Bearer ${currentToken}`;
//     request.headers['content-type'] = 'application/json';

//     // Modify the request
//     request.method = 'GET';

//     // Return the processed request via a Promise
//     const processed = {
//       body: request.body,
//       headers: request.headers,
//       method: request.method,
//       url: sourceUrl,
//     };
//     console.log('🚀 ~ requestCallback ~ Request:', processed);
//     return Promise.resolve(processed);
//   };

//   const responseCallback = (type, response) => {
//     // Access response properties

//     // console.log('type--->', JSON.stringify(type));
//     // console.log('response-->>', JSON.stringify(response));

//     // Modify the response

//     response.headers['Authorization'] = `Bearer ${currentToken}`;
//     response.headers['content-type'] = 'application/json';
//     response.request.headers['Authorization'] = `Bearer ${currentToken}`;

//     // Return the processed response via a Promise

//     const processed = {
//       body: response.body,
//       headers: response.headers,
//       request: response.request,
//       status: response.status,
//       url: sourceUrl,
//     };
//     // console.log("🚀 ~ responseCallback ~ processed:", processed)
//     return Promise.resolve(processed);
//   };

//   const player = usePlayer({
//     licenseKey: '15f0fdc4-f3c0-484d-a9b4-7a47a10d5d98',
//     networkConfig: {
//       // preprocessHttpRequest: requestCallback,
//       // preprocessHttpResponse: responseCallback,
//     },
//   });

//   useEffect(() => {
//     console.log('token>>>>', currentToken);
//   }, [currentToken]);

//   const sourceConfig = {
//     url:
//       Platform.OS === 'ios'
//         ? `https://d2ch2o8hmxnkoe.cloudfront.net/${currentToken}/bpk-tv/ArenaHD/default/index.m3u8`
//         : 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
//     type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
//     title: 'Art of Motion',
//     poster:
//       'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
//     thumbnailTrack:
//       'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt',
//     metadata: {platform: Platform.OS},
//     // options: {
//     //   headers: {
//     //     ['Authorization']: `Bearer ${currentToken}`,
//     //   },
//     // },
//     // withCredentials: true,

//     fairplay: {
//       licenseRequestHeaders: {
//         ['Authorization']: `Bearer ${currentToken}`,
//       },
//       // certificateRequestHeaders: {
//       //   Authorization: `Bearer ${currentToken}`,
//       // },
//     },
//   };

//   useFocusEffect(
//     useCallback(() => {
//       player.load(sourceConfig);
//       player.play();
//       return () => {
//         player.destroy();
//       };
//     }, [player, currentToken]),
//   );

//   const onReady = useCallback(event => {
//     prettyPrint(`EVENT [${event.name}]`, event);
//   }, []);

//   const onEvent = useCallback(event => {
//     prettyPrint(`EVENT [${event.name}]`, event);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <PlayerView
//         player={player}
//         style={styles.player}
//         onPlay={onEvent}
//         onPlaying={onEvent}
//         onPaused={onEvent}
//         onReady={onReady}
//         onSourceLoaded={onEvent}
//         onSeek={onEvent}
//         onSeeked={onEvent}
//         onStallStarted={onEvent}
//         onStallEnded={onEvent}
//         onVideoPlaybackQualityChanged={onEvent}
//       />
//     </View>
//   );
// };

// export default BasicPlayback;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
//   player: {
//     flex: 1,
//   },
// });

/* eslint-disable dot-notation */
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

  const player = usePlayer({
    licenseKey: '15f0fdc4-f3c0-484d-a9b4-7a47a10d5d98',
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentToken(prevToken =>
        prevToken === tokenOne ? tokenTwo : tokenOne,
      );
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (player) {
      const sourceConfig = {
        url: `https://d2ch2o8hmxnkoe.cloudfront.net/${currentToken}/bpk-tv/ArenaHD/default/index.m3u8`,
        type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
        title: 'Art of Motion',
        poster:
          'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
        thumbnailTrack:
          'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt',
        metadata: {platform: Platform.OS},
        fairplay: {
          licenseRequestHeaders: {
            ['Authorization']: `Bearer ${currentToken}`,
          },
        },
      };

      player.load(sourceConfig);
      player.play();
    }
  }, [currentToken]);

  const onReady = useCallback(event => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  const onEvent = useCallback(event => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        player.destroy();
      };
    }, [player]),
  );

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
