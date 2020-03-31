import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Title} from 'react-native-paper';
import Color from '../assets/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function({title}) {
  return (
    <View style={styles.container}>
      <Icon name="circle" style={styles.icon} />
      <Title style={styles.title}>{title}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  icon: {
    color: Color.PRIMARY,
    marginLeft: 5,
    marginRight: 10,
    fontSize: 24,
  },
  title: {
    fontWeight: '700',
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
});
