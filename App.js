import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native'
import { useNetInfo } from "@react-native-community/netinfo";
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import RootNavigation from './src/navigation/index'

export default function App() {
  const netInfo = useNetInfo();

  useEffect(() => {
    if (!netInfo.isConnected) {
      Alert.alert('Internet Connectivity Failed')
    }
  }, [netInfo])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};



