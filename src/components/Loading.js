import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Subheading} from 'react-native-paper';

export default function() {
  return (
    <View style={styles.container}>
      <Subheading style={styles.text}>កំពុងទាញយកទិន្ន័យ...</Subheading>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
  },
});
