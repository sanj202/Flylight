import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, useColorScheme, View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'


import RootNavigation from './app/navigations/index'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};



