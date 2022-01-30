/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import NotificationView from './src/screens/NotificationView';


import { config } from './config'
import firebase from 'react-native-firebase';
import fireWeb from 'firebase/compat/app'
import 'firebase/compat/database'
import { Notifications } from './src/firebase/Notifications'
import { useState } from 'react/cjs/react.development';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [connect, setConnect] = useState(false)

  useEffect(() => {

    (!firebase.apps.length) && firebase.initializeApp(config)
    try { fireWeb.initializeApp(config) } catch (ex) { console.log(ex) }
    setConnect(true)
    console.log(`Connected To Firebase`)

    //  var Notify = new Notifications()
    //   Notify.getAndSaveToken('Humza')

  })

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {connect && <NotificationView />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
