import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import Color from '../assets/Color';

export default function({title}) {
  return (
    <Appbar.Header style={styles.header}>
      <Text style={styles.header_text}>{title}</Text>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.White,
    justifyContent: 'center',
  },
  header_text: {
    color: Color.PRIMARY,
    fontSize: 22,
    fontWeight: '700',
  },
});
