import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Headline, Title} from 'react-native-paper';
import {PieChart} from 'react-native-svg-charts';
import Color from '../assets/Color';
import MaterialColor from '../assets/MaterialColor';

const SELECTED_COLOR = [];
export default function({data, totalPositive}) {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedLabel(data[0].PROVINCE);
    setSelectedValue(data[0].POSITIVE);
  }, [data]);

  // Random color from MATERIAL_COLOR
  function RandomColor() {
    const color_keys = Object.keys(MaterialColor);
    const random_color_key =
      color_keys[Math.floor(Math.random() * color_keys.length)];
    const colors = MaterialColor[random_color_key];
    const random_color = colors[Math.floor(Math.random() * colors.length)];
    // If duplicate random_color
    if (SELECTED_COLOR.includes(random_color)) {
      /* Note: This condition works only if the length of PieChart data <= the length of MaterialColor,
        Otherwise, it could causes infinite loop because there is no left color to select */
      return RandomColor();
    } else {
      return random_color;
    }
  }

  // Pie Chart Data
  const pieChart = data.map((item, index) => {
    if (!SELECTED_COLOR[index]) {
      const random_color = RandomColor();
      // Push random color to selected color
      SELECTED_COLOR.push(random_color);
    }
    return {
      onPress: () => {
        setSelectedLabel(item.PROVINCE);
        setSelectedValue(item.POSITIVE);
      },
      key: item.PROVINCE,
      value: item.POSITIVE,
      svg: {fill: SELECTED_COLOR[index]},
      arc: {
        outerRadius: item.PROVINCE === selectedLabel ? '100%' : '90%',
        padAngle: 0,
      },
    };
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.wrapper}>
            <PieChart style={styles.pie_chart} data={pieChart} />
            <Headline>
              {((selectedValue * 100) / totalPositive).toFixed(2)}%
            </Headline>
          </View>
          <Title style={styles.title}>
            {selectedLabel} {selectedValue} នាក់
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  card: {
    backgroundColor: Color.White,
  },
  wrapper: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pie_chart: {
    height: 200,
    width: 200,
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    color: Color.DANGER,
    marginTop: 10,
  },
});
