import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Card, Headline, Title, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../assets/Color';

export default function({
  totalPositive,
  totalCured,
  totalActive,
  totalDeath,
  newPositive,
  newCured,
  newDeath,
}) {
  const cards = [
    {
      title: 'វិជ្ជមានសរុប',
      icon: 'account-multiple-plus',
      number: totalPositive,
      new_number: newPositive,
      color: Color.DANGER,
    },
    {
      title: 'ព្យាបាលជា',
      icon: 'hospital',
      number: totalCured,
      new_number: newCured,
      color: Color.SUCCESS,
    },
    {
      title: 'កំពុងព្យាបាល',
      icon: 'hospital-building',
      number: totalActive,
      color: Color.WARNING,
    },
    {
      title: 'ស្លាប់',
      icon: 'account-remove',
      number: totalDeath,
      new_number: newDeath,
      color: Color.BROWN,
    },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        return (
          <View style={styles.wrapper} key={index}>
            <Card style={styles.card}>
              <View style={styles.card_title_wrapper}>
                <Icon name={card.icon} color={card.color} style={styles.icon} />
                <Title style={[styles.text, {color: card.color}]}>
                  {card.title}
                </Title>
              </View>
              <Card.Content style={styles.content}>
                <Headline style={[styles.text_important, {color: card.color}]}>
                  {card.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Headline>
                {card.new_number ? (
                  <Subheading style={{color: card.color}}>
                    {'  '}(+{card.new_number})
                  </Subheading>
                ) : null}
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapper: {
    flexBasis: '50%',
    padding: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Color.White,
  },
  card_title_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 5,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  text_important: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 10,
  },
});
