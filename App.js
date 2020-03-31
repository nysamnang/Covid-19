import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import BottomTabNavigator from './src/BottomTabNavigator';
import Color from './src/assets/Color';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar backgroundColor={Color.GRAY} />
      <BottomTabNavigator />
    </PaperProvider>
  );
}
