import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Color from '../assets/Color';

export default function TabAbout() {
  const dev_contacts = [
    {
      name: 'Email',
      icon: 'gmail',
      color: '#D44638',
      link: 'mailto:nysamnang168@gmail.com',
    },
    {
      name: 'Facebook',
      icon: 'facebook-box',
      color: '#3B5998',
      link: 'https://www.facebook.com/nysamnang.id',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin-box',
      color: '#0E76A8',
      link: 'https://www.linkedin.com/in/nysamnang',
    },
    {
      name: 'GitHub',
      icon: 'github-circle',
      color: '#211F1F',
      link: 'https://github.com/nysamnang',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="អំពីកម្មវិធី" />
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.text}>
            យើងខ្ញុំបង្កើតកម្មវិធីនេះឡើងគឺក្នុងគោលបំណងចង់អោយប្រជាពលរដ្ឋកម្ពុជាទាំងអស់
            អាចធ្វើការតាមដានពត៌មានទិន្ន័យដែលទាក់ទងទៅនឹងមេរោគប្រភេទថ្មីកូរ៉ូណា
            (CORONA VIRUS) ឬកូវីឌ១៩ (COVID-19)
            ដែលកំពុងតែរាតត្បាតទូទាំងសកលលោករួមទាំងប្រទេសកម្ពុជាយើងផងដែរ។
          </Text>
          <Text style={styles.text}>
            បន្ថែមពីនេះ
            យើងក៏បានរួមបញ្ចូលនូវចំណេះដឹងខ្លះៗអំពីវិធានការណ៍ការពារខ្លួន
            និងការរីករាលដាលនៃប្រភេទជំងឺថ្មីនេះ
            រួមទាំងលេខទំនាក់ទំនងរបស់ក្រសួង​សុខាភិបាល
            ប្រធាន​មន្ទីរ​សុខាភិបាល​រាជធានី​ខេត្ត
            និងតំណភ្ជាប់សំខាន់ៗដែលជាចំណេះដឹងដល់បងប្អូនប្រជាពលរដ្ឋផងដែរ។
          </Text>
          <Text style={styles.text}>
            យើងខ្ញុំសង្ឃឹមថា
            បងប្អូនប្រជាពលរដ្ឋខ្មែរយើងទាំងអស់គ្នានឹងមានការយល់ដឹងច្រើនអំពីអំពីជំងឺរាតត្បាតថ្មីនេះ
            និងអាចជៀសផុតអំពីការឆ្លងមេរោគក៏កាចសាហាវមួយនេះផងដែរ។
          </Text>
        </View>
        <View style={styles.contact_container}>
          <Title>អ្នកអភិវឌ្ឍកម្មវិធី</Title>
          <View style={styles.contact_wrapper}>
            {dev_contacts.map((contact, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => Linking.openURL(contact.link)}>
                  <Icon name={contact.icon} color={contact.color} size={60} />
                  <Text>{contact.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
    backgroundColor: Color.White,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
  contact_container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  contact_wrapper: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
