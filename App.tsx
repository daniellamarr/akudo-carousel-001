/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import DownloadEllipse from './assets/images/DownloadEllipse.png';

const {width} = Dimensions.get('screen');

const Loader = ({
  loadingAnim,
  status,
}: {
  loadingAnim: any;
  status: string;
}): JSX.Element => {
  const backgroundColor = loadingAnim.interpolate({
    inputRange: [0, width / 2, width - 61, width - 60],
    outputRange: [
      '#0A66FF',
      'rgba(10, 102, 255, 0.6)',
      '#0A66FF',
      'transparent',
    ],
    extrapolate: 'clamp',
  });
  const newWidth = loadingAnim.interpolate({
    inputRange: [0, width - 60],
    outputRange: ['0.1%', '100%'],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[styles.button, styles.loader, {backgroundColor, width: newWidth}]}
    />
  );
};

function App(): JSX.Element {
  const [status, setStatus] = useState('download');
  const loadingAnim = useRef(new Animated.Value(0)).current;

  const handleLoad = () => {
    setStatus('downloading');
    Animated.timing(loadingAnim, {
      toValue: width - 60,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
      setStatus('done');
    });
  };

  const textOpacity = loadingAnim.interpolate({
    inputRange: [0, width - 61, width - 60],
    outputRange: [1, 0, 1],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topView}>
          <Image source={DownloadEllipse} style={styles.downloadEllipse} />
          <Text>Your file is ready</Text>
        </View>
      </SafeAreaView>
      <View style={styles.buttonOuter}>
        <TouchableOpacity onPress={() => handleLoad()}>
          <Loader status={status} loadingAnim={loadingAnim} />
          <View style={styles.button}>
            <View>
              <Animated.Text
                style={[styles.buttonText, {opacity: textOpacity}]}>
                {status === 'download'
                  ? 'Download'
                  : status === 'done'
                  ? 'Done'
                  : 'Downloading...'}
              </Animated.Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topView: {
    alignItems: 'center',
    paddingTop: 30,
  },
  downloadEllipse: {
    height: 40,
    width: 40,
    marginBottom: 10,
  },
  buttonOuter: {
    width,
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextView: {
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default App;
