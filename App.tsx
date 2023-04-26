/* eslint-disable react-native/no-inline-styles */
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
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Plus from './assets/icons/Plus';
import Sparkles from './assets/icons/Sparkles';
import X from './assets/icons/X';
import TwitterIcon from './assets/images/Twitter.png';

type ItemType = {
  name: string;
  username: string;
  message: string;
  timestamp: string;
  comments: number;
  retweets: number;
  likes: number;
  image: string;
};

const items: ItemType[] = [
  {
    name: 'Declan Rice',
    username: 'declanrice',
    message:
      'Ever waited for someone to reply to your message before?\nEspecially something that can change your life?\nThe wait is long...',
    timestamp: 'string',
    comments: 3,
    retweets: 1,
    likes: 13,
    image:
      'https://images.pexels.com/photos/16407235/pexels-photo-16407235.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: 'Odumodu Blvck',
    username: 'declanrice',
    message:
      'Ladies you cannot be stubborn, a thug and a cry baby at the same time 🚶‍♂️',
    timestamp: 'string',
    comments: 3,
    retweets: 1,
    likes: 13,
    image:
      'https://images.pexels.com/photos/16462830/pexels-photo-16462830.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    name: 'Daniel Lamarr',
    username: 'declanrice',
    message: 'Pep’s face is a walking meme collection 😂😂',
    timestamp: '',
    comments: 3,
    retweets: 1,
    likes: 13,
    image:
      'https://images.pexels.com/photos/16041156/pexels-photo-16041156.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    name: 'Ucee',
    username: 'declanrice',
    message:
      'It’s the fact that for the past 2days I’ve been dreaming about designing and this particular case study I need to work on.\nI end up waking up with a headache.\nGod help me',
    timestamp: 'string',
    comments: 3,
    retweets: 1,
    likes: 13,
    image:
      'https://images.pexels.com/photos/7763201/pexels-photo-7763201.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
];
const profilePhoto =
  'https://images.pexels.com/photos/16267173/pexels-photo-16267173.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const {width} = Dimensions.get('screen');

const modalSize = 200;

const Footer = (): JSX.Element => {
  return (
    <View style={styles.footer}>
      <View />
    </View>
  );
};

const FloatingModal = ({modalFadeAnim}: {modalFadeAnim: any}): JSX.Element => {
  return (
    <Animated.View
      style={[
        styles.floatingModal,
        {width: modalFadeAnim, height: modalFadeAnim},
      ]}>
      <View style={{position: 'absolute', bottom: modalSize * 0.8, right: 20}}>
        <RoundButton />
      </View>
      <View style={{position: 'absolute', bottom: modalSize * 0.5, left: 35}}>
        <RoundButton />
      </View>
      <View style={{position: 'absolute', bottom: 0, left: -20}}>
        <RoundButton />
      </View>
    </Animated.View>
  );
};

const RoundButton = ({icon}: {icon?: any}): JSX.Element => {
  return <TouchableOpacity style={styles.roundButton}>{icon}</TouchableOpacity>;
};

const FloatingButton = ({action}: {action: () => void}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={() => action()}>
      <Plus />
    </TouchableOpacity>
  );
};

const FloatingXButton = ({action}: {action: () => void}): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.transparentFloatingButton}
      onPress={() => action()}>
      <X />
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const modalFadeAnim = useRef(new Animated.Value(0)).current;

  const modalFadeIn = () => {
    Animated.spring(modalFadeAnim, {
      toValue: modalSize,
      useNativeDriver: false,
    }).start();
  };
  const modalFadeOut = () => {
    Animated.spring(modalFadeAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const renderItem = ({item, index}: {item: ItemType; index: number}) => {
    return (
      <View style={styles.tweetItem}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.tweetContainer}>
          <View>
            <View style={styles.nameTextBox}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.usernameText}>@{item.username}</Text>
            </View>
            <View />
          </View>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <View style={styles.header}>
            <View>
              <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
            </View>
            <View>
              <Image source={TwitterIcon} style={styles.profilePhoto} />
            </View>
            <View>
              <Sparkles />
            </View>
          </View>
          <View style={styles.tab}>
            <View style={[styles.tabItem, styles.activeTabItem]}>
              <Text style={styles.tabText}>Home</Text>
            </View>
            <View style={styles.tabItem}>
              <Text style={styles.tabText}>Nigerian Designers</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={items}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
        />
      </SafeAreaView>
      <Footer />
      {showModal ? (
        <FloatingXButton
          action={() => {
            setShowModal(false);
            modalFadeOut();
          }}
        />
      ) : (
        <FloatingButton
          action={() => {
            setShowModal(true);
            modalFadeIn();
          }}
        />
      )}
      {showModal && <FloatingModal modalFadeAnim={modalFadeAnim} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  profilePhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 15,
  },
  tabItem: {
    paddingBottom: 10,
  },
  activeTabItem: {
    borderBottomColor: '#1DA1F3',
    borderBottomWidth: 3,
  },
  tabText: {
    color: '#f9f9f9',
    fontWeight: '600',
    fontSize: 16,
  },
  tweetItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopColor: '#3d3d3d',
    borderTopWidth: 0.5,
    borderBottomColor: '#3d3d3d',
    borderBottomWidth: 0.5,
  },
  imageContainer: {
    width: '20%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 30,
  },
  nameTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tweetContainer: {
    flexShrink: 1,
    width: '80%',
  },
  messageBox: {
    marginTop: 5,
  },
  nameText: {
    color: '#f9f9f9',
  },
  usernameText: {
    color: '#a3a2a2',
  },
  messageText: {
    color: '#f9f9f9',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width,
    backgroundColor: '#242424',
    height: 50,
  },
  floatingButton: {
    backgroundColor: '#1DA1F3',
    width: 55,
    height: 55,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentFloatingButton: {
    backgroundColor: 'transaparent',
    width: 55,
    height: 55,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  floatingModal: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    bottom: 70,
    right: 0,
    // height: modalSize,
    // width: modalSize,
    borderRadius: modalSize / 2,
    zIndex: 1,
  },
  roundButton: {
    backgroundColor: '#1DA1F3',
    width: 55,
    height: 55,
    borderRadius: 30,
  },
});

export default App;
