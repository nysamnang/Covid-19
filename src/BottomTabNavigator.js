import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import TabCambodia from './tabs/TabCambodia';
import TabWorld from './tabs/TabWorld';
import TabKnowledge from './tabs/TabKnowledge';
import TabAbout from './tabs/TabAbout';
import Color from './assets/Color';

const defaultNavigation = {
  index: 0,
  routes: [
    {key: 'cambodia', title: 'កម្ពុជា', icon: 'home'},
    {key: 'world', title: 'ពិភពលោក', icon: 'earth'},
    {key: 'knowledge', title: 'គួរយល់ដឹង', icon: 'book'},
    {key: 'about', title: 'អំពីកម្មវិធី', icon: 'information'},
  ],
};

const renderScene = BottomNavigation.SceneMap({
  cambodia: TabCambodia,
  world: TabWorld,
  knowledge: TabKnowledge,
  about: TabAbout,
});

export default function BottomTabNavigator() {
  const [navigation, setNavigation] = useState(defaultNavigation);
  return (
    <BottomNavigation
      navigationState={navigation}
      onIndexChange={index => setNavigation({...navigation, index})}
      renderScene={renderScene}
      barStyle={{backgroundColor: Color.White}}
      activeColor={Color.PRIMARY}
      inactiveColor={Color.PRIMARY}
    />
  );
}
