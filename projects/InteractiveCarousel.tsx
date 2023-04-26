/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';

type ItemType = {
  image: string;
};

const items: ItemType[] = [
  {
    image:
      'https://images.pexels.com/photos/16407235/pexels-photo-16407235.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    image:
      'https://images.pexels.com/photos/16462830/pexels-photo-16462830.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    image:
      'https://images.pexels.com/photos/16041156/pexels-photo-16041156.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    image:
      'https://images.pexels.com/photos/7763201/pexels-photo-7763201.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
];

const profilePicture =
  'https://images.pexels.com/photos/10384486/pexels-photo-10384486.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const {width} = Dimensions.get('screen');
const newWidth = width - 150;

function InteractiveCarousel(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const carouselAnim = useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}: {item: ItemType; index: number}) => {
    const inputRange = [
      (index - 1) * newWidth,
      index * newWidth,
      (index + 1) * newWidth,
    ];
    // console.log(inputRange)

    const scale = carouselAnim.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = carouselAnim.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
    console.log(carouselAnim);

    return (
      <View
        style={[
          styles.imageContainer,
          {
            // marginLeft: index === 0 ? 0 : 10,
            // marginRight: index === items.length - 1 ? 0 : 10,
          },
        ]}>
        <Animated.Image
          source={{uri: item.image}}
          style={[styles.image, {opacity, transform: [{scale}]}]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.navbar}>
            <View />
            <View style={styles.profilePictureContainer}>
              <Image
                source={{uri: profilePicture}}
                style={styles.profilePicture}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Designing an interactive carousel</Text>
          </View>
        </View>
        <Animated.FlatList
          data={items}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: carouselAnim}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={1}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
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
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profilePictureContainer: {
    backgroundColor: '#FFD5D5',
    padding: 5,
    borderRadius: 30,
  },
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  imageContainer: {
    width: newWidth,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
  },
});

export default InteractiveCarousel;
