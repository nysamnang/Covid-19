import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import {Caption} from 'react-native-paper';
import moment from 'moment';
import Color from '../assets/Color';

export default function({lastUpdate, link}) {
  // Convert date time
  let last_update = lastUpdate;
  last_update = moment(last_update, 'YYYY.MM.DD HH:mm').toDate();
  last_update.setHours(last_update.getHours() - 2);
  last_update = moment(last_update).format('DD-MM-YYYY h:mm A');

  return (
    <View style={styles.container}>
      <Caption style={styles.text_supprt}>
        ធ្វើបច្ចុប្បន្នភាពទិន្នន័យចុងក្រោយ:
        <Text style={styles.text_important}> {last_update}</Text>
      </Caption>
      <Caption style={styles.text_supprt}>
        ប្រភពទិន្នន័យ:{' '}
        <Text style={styles.text_info} onPress={() => Linking.openURL(link)}>
          {link}
        </Text>
      </Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  text_supprt: {
    textAlign: 'center',
  },
  text_important: {
    fontWeight: 'bold',
  },
  text_info: {
    color: Color.INFO,
  },
});
