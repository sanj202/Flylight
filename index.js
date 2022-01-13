/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store';

import 'react-native-gesture-handler';




const RNRedux = () => (
    <App />
)

AppRegistry.registerComponent(appName, () => RNRedux);