import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
} from 'react-native';
import {
  IconButton,
  Card,
  DataTable,
  Subheading,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import Color from '../assets/Color';
import API from '../assets/API';

const images = [
  {url: '', props: {source: require('../assets/images/knowledge_01.jpg')}},
  {url: '', props: {source: require('../assets/images/knowledge_02.jpg')}},
  {url: '', props: {source: require('../assets/images/knowledge_03.jpg')}},
  {url: '', props: {source: require('../assets/images/knowledge_04.jpg')}},
  {url: '', props: {source: require('../assets/images/knowledge_05.jpg')}},
];

const useful_links = [
  {
    title: 'ទំព័រហ្វេសប៊ុក ក្រសួងសុខាភិបាល​នៃព្រះរាជាណាចក្រ​កម្ពុជា',
    url: 'https://facebook.com/pg/MinistryofHealthofCambodia',
  },
  {
    title: 'ទំព័រហ្វេសប៊ុក នាយកដ្ឋានប្រយុទ្ធនឹងជំងឺឆ្លងនៃព្រះរាជាណាចក្រកម្ពុជា',
    url: 'https://www.facebook.com/cdcmohcam/',
  },
  {
    title: 'គេហទំព័រ Worldmeter',
    url: 'https://worldometers.info/coronavirus/',
  },
  {
    title: 'គេហទំព័រ ក្រសួងសុខាភិបាល​នៃព្រះរាជាណាចក្រ​កម្ពុជា',
    url: 'http://moh.gov.kh/',
  },
  {
    title: 'គេហទំព័រ នាយកដ្ឋានប្រយុទ្ធនឹងជំងឺឆ្លងនៃព្រះរាជាណាចក្រកម្ពុជា',
    url: 'http://cdcmoh.gov.kh/',
  },
  {
    title: 'គេហទំព័រ​របាយការណ៍​ស្ថានភាព​មេរោគ​កូរ៉ូណារបស់​អង្គការសុខភាពពិភពលោក',
    url:
      'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/',
  },
];

export default function TabKnowledge() {
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    axios.get(API.CONTACT).then(({data}) => setContacts(data.DATA));
  }, []);

  return (
    <View style={styles.container}>
      <Header title="គួរយល់ដឹង" />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="រោគសញ្ញា និងការការពារ" />
        <Card style={styles.card}>
          <Card.Content>
            <Divider />
            <ScrollView horizontal>
              {images.map((image, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.button_thumbnail}
                    onPress={() => {
                      setImageIndex(index);
                      setVisible(true);
                    }}>
                    <Image
                      source={image.props.source}
                      style={styles.thumbnail}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Divider />
            <WebView
              source={{uri: 'https://www.youtube.com/embed/maV544KrMvU'}}
              containerStyle={styles.webview}
              allowsFullscreenVideo={true}
            />
          </Card.Content>
        </Card>
        {contacts ? (
          <>
            <SectionTitle title="លេខ​មន្ទីរ​សុខាភិបាល​រាជធានី​ខេត្ត" />
            <Card style={styles.card}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>
                    <Subheading>រាជធានី.ខេត្ត</Subheading>
                  </DataTable.Title>
                  <DataTable.Title style={styles.col_number}>
                    <Subheading>លេខទូរស័ព្ទ</Subheading>
                  </DataTable.Title>
                </DataTable.Header>
                {contacts.map((contact, index) => {
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>
                        <Text>{contact.title}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={styles.col_number}
                        onPress={() => Linking.openURL(`tel:${contact.phone}`)}>
                        <Text>{contact.phone}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </Card>
          </>
        ) : null}
        <SectionTitle title="តំណភ្ជាប់សំខាន់ៗ" />
        <Card style={styles.card}>
          <Card.Content>
            {useful_links.map((link, index) => {
              return (
                <TouchableOpacity
                  style={styles.link}
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => Linking.openURL(link.url)}>
                  <Icon name="circle" style={styles.icon} />
                  <Text style={styles.text}>{link.title}</Text>
                </TouchableOpacity>
              );
            })}
          </Card.Content>
        </Card>
      </ScrollView>
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={imageIndex}
          renderHeader={() => (
            <IconButton
              icon="close"
              color={Color.White}
              style={styles.icon_close}
              onPress={() => setVisible(false)}
            />
          )}
          enableSwipeDown={true}
          onSwipeDown={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 5,
  },
  card: {
    margin: 5,
    backgroundColor: Color.White,
  },
  button_thumbnail: {
    margin: 5,
  },
  thumbnail: {
    width: 130,
    height: 130,
  },
  icon_close: {
    position: 'absolute',
    top: 25,
    right: 10,
    zIndex: 99,
  },
  webview: {
    flex: 1,
    marginTop: 20,
    height: 170,
    width: 300,
    alignSelf: 'center',
  },
  link: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 7,
    fontSize: 10,
  },
  text: {
    fontSize: 16,
    color: Color.INFO,
  },
  col_number: {
    flex: 0,
  },
});
