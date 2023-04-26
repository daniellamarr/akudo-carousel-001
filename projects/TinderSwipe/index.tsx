/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  PanResponder,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TinderNo from './assets/icons/TinderNo';
import TinderSuper from './assets/icons/TinderSuper';
import TinderYes from './assets/icons/TinderYes';
import TinderIcon from './assets/images/Tinder.png';

type ItemType = {
  name: string;
  location: string;
  age: number;
  image: string;
};

const items: ItemType[] = [
  {
    name: 'Declan Rice',
    location: 'Birmingham, Uk',
    age: 27,
    image:
      'https://images.pexels.com/photos/16407235/pexels-photo-16407235.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: 'Odumodu Blvck',
    location: 'Lagos, Nigeria',
    age: 29,
    image:
      'https://images.pexels.com/photos/16462830/pexels-photo-16462830.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    name: 'Daniel Lamarr',
    location: 'New Jersey, US',
    age: 32,
    image:
      'https://images.pexels.com/photos/16041156/pexels-photo-16041156.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    name: 'Ucee',
    location: 'AntiWorldGangstars',
    age: 40,
    image:
      'https://images.pexels.com/photos/7763201/pexels-photo-7763201.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
];
const endOfLineImage =
  'https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=600';

const {width, height} = Dimensions.get('screen');
const newWidth = width - 40;

const TinderDislike = ({pan}: any): JSX.Element => {
  const opacity = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.dislikeButton, {opacity}]}>
      <Text style={styles.dislikeText}>NOPE</Text>
    </Animated.View>
  );
};

const TinderLike = ({pan}: any): JSX.Element => {
  const opacity = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.likeButton, {opacity}]}>
      <Text style={styles.likeText}>LIKE</Text>
    </Animated.View>
  );
};

const EndOfLine = (): JSX.Element => {
  return (
    <ImageBackground
      source={{uri: endOfLineImage}}
      style={styles.endOfLineBox}
      imageStyle={styles.endOfLineBoxImage}>
      <LinearGradient
        colors={['rgba(255, 120, 84, 0.6)', 'rgba(253, 38, 125, 0.9)']}
        style={styles.endOfLineGradient}>
        <Text style={styles.endOfLineText}>
          You hit the end of the line for today
        </Text>
        <Text style={styles.endOfLineDesc}>Try again in 12 hours</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

function TinderSwipe(): JSX.Element {
  const [currentItem, setCurrentItem] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const swipeRight = (gestureState?: any) => {
    Animated.spring(pan, {
      toValue: {x: width + 100, y: gestureState?.dy || 100},
      useNativeDriver: true,
    }).start(() => {
      setCurrentItem(prev => prev + 1);
      pan.setValue({x: 0, y: 0});
    });
  };
  const swipeLeft = (gestureState?: any) => {
    Animated.spring(pan, {
      toValue: {x: -width - 100, y: gestureState?.dy || 100},
      useNativeDriver: true,
    }).start(() => {
      setCurrentItem(prev => prev + 1);
      pan.setValue({x: 0, y: 0});
    });
  };
  const carouselAnim = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          swipeRight(gestureState);
        } else if (gestureState.dx < -120) {
          swipeLeft(gestureState);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const renderItem = (item: ItemType, index: number) => {
    const inputRange = [-width / 2, 0, width / 2];

    const scale = pan.x.interpolate({
      inputRange,
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });

    const opacity = pan.x.interpolate({
      inputRange,
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });

    const rotate = pan.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['10deg', '0deg', '-10deg'],
      extrapolate: 'clamp',
    });
    if (index < currentItem) {
      return null;
    } else if (index === currentItem) {
      return (
        <Animated.View
          key={index}
          style={[
            styles.imageContainer,
            {
              zIndex: items.length - index,
              transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate}],
            },
          ]}
          {...carouselAnim.panHandlers}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.image}
            imageStyle={styles.imageStyle}>
            <TinderLike pan={pan} />
            <TinderDislike pan={pan} />
            <LinearGradient
              colors={['rgba(9, 12, 16, 0)', 'rgba(9, 12, 16, 0.7)']}
              style={styles.gradient}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>
                  {item.name}, {item.age}
                </Text>
                <Text style={styles.descText}>Lives in {item.location}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          key={index}
          style={[
            styles.imageContainer,
            {zIndex: items.length - index, opacity, transform: [{scale}]},
          ]}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.image}
            imageStyle={styles.imageStyle}>
            <LinearGradient
              colors={['rgba(9, 12, 16, 0)', 'rgba(9, 12, 16, 0.7)']}
              style={styles.gradient}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>
                  {item.name}, {item.age}
                </Text>
                <Text style={styles.descText}>Lives in {item.location}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.navbar}>
            <Image
              source={TinderIcon}
              style={styles.profilePicture}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.outerContainer}>
          {currentItem >= items.length ? <EndOfLine /> : items.map(renderItem)}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => swipeLeft()}>
            <TinderNo />
          </TouchableOpacity>
          <TouchableOpacity>
            <TinderSuper />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swipeRight()}>
            <TinderYes />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  outerContainer: {
    height: height - 300,
  },
  imageContainer: {
    width: newWidth,
    height: height - 300,
    position: 'absolute',
  },
  imageStyle: {
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    borderRadius: 30,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 20,
    paddingVertical: 25,
  },
  mainText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  descText: {
    fontSize: 16,
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingVertical: 20,
  },
  dislikeButton: {
    borderWidth: 5,
    borderColor: '#FF4545',
    borderRadius: 20,
    padding: 20,
    transform: [{rotate: '20deg'}],
    position: 'absolute',
    top: 150,
    right: 80,
    zIndex: 1000,
  },
  dislikeText: {
    fontSize: 26,
    color: '#FF4545',
  },
  likeButton: {
    borderWidth: 5,
    borderColor: '#29E28A',
    borderRadius: 20,
    padding: 20,
    transform: [{rotate: '-20deg'}],
    position: 'absolute',
    top: 150,
    left: 80,
    zIndex: 1000,
  },
  likeText: {
    fontSize: 26,
    color: '#29E28A',
  },
  endOfLineBox: {
    width: newWidth,
    height: height - 300,
  },
  endOfLineBoxImage: {
    borderRadius: 30,
  },
  endOfLineGradient: {
    borderRadius: 30,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  endOfLineText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  endOfLineDesc: {
    color: '#111d25',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TinderSwipe;
