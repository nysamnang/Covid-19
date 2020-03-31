import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, DataTable} from 'react-native-paper';
import Color from '../assets/Color';

export default function(props) {
  const isGlobal = props.isGlobal;
  const [data, setData] = useState([]);
  const [chunkData, setChunkData] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const [selectedSorting, setSelectedSorting] = useState('positive');

  useEffect(() => {
    chunkArrayData(props.data);
  }, [props.data]);

  // Chunk array data
  const chunkArrayData = array_data => {
    const chunks = [];
    array_data.forEach(item => {
      if (!chunks.length || chunks[chunks.length - 1].length === 10) {
        chunks.push([]);
      }
      chunks[chunks.length - 1].push(item);
    });
    setChunkData(chunks);
    setData(chunks[0]);
  };

  // Sorting data
  const onSorting = option => {
    if (option !== selectedSorting) {
      let sorted_data = [...props.data];
      if (option === 'country') {
        sorted_data.sort((a, b) => a.country > b.country);
      } else {
        sorted_data.sort((a, b) => a[option] < b[option]);
      }
      chunkArrayData(sorted_data);
      setSelectedSorting(option);
      setPageActive(0);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.col_index}>
              <Text style={styles.heading}>ល.រ</Text>
            </DataTable.Title>
            <DataTable.Title
              style={styles.col_region}
              disabled={!isGlobal}
              sortDirection={
                !isGlobal
                  ? false
                  : selectedSorting === 'country'
                  ? 'descending'
                  : 'ascending'
              }
              onPress={() => onSorting('country')}>
              <Text style={styles.heading}>
                {isGlobal ? 'ប្រទេស' : 'ខេត្ត/ក្រុង'}
              </Text>
            </DataTable.Title>
            <DataTable.Title
              numeric
              style={styles.col_number}
              disabled={!isGlobal}
              sortDirection={
                !isGlobal
                  ? false
                  : selectedSorting === 'positive'
                  ? 'descending'
                  : 'ascending'
              }
              onPress={() => onSorting('positive')}>
              <Text style={[styles.heading, styles.text_danger]}>វិជ្ជមាន</Text>
            </DataTable.Title>
            <DataTable.Title
              numeric
              style={styles.col_number}
              disabled={!isGlobal}
              sortDirection={
                !isGlobal
                  ? false
                  : selectedSorting === 'cured'
                  ? 'descending'
                  : 'ascending'
              }
              onPress={() => onSorting('cured')}>
              <Text style={[styles.heading, styles.text_success]}>ជាវិញ</Text>
            </DataTable.Title>
            <DataTable.Title
              numeric
              style={styles.col_small}
              disabled={!isGlobal}
              sortDirection={
                !isGlobal
                  ? false
                  : selectedSorting === 'death'
                  ? 'descending'
                  : 'ascending'
              }
              onPress={() => onSorting('death')}>
              <Text style={[styles.heading, styles.text_brown]}>ស្លាប់</Text>
            </DataTable.Title>
          </DataTable.Header>
          {data.map((row, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.col_index}>
                  <Text>{pageActive * 10 + (index + 1)}.</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.col_region}>
                  <Text>{isGlobal ? row.country : row.PROVINCE}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.col_number}>
                  <Text style={styles.text_danger}>
                    {isGlobal ? row.positive : row.POSITIVE}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.col_number}>
                  <Text style={styles.text_success}>
                    {isGlobal ? row.cured : row.CURED}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.col_small}>
                  <Text style={styles.text_brown}>
                    {isGlobal ? row.death : row.DEATH}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <DataTable.Pagination
            page={pageActive}
            numberOfPages={chunkData.length}
            onPageChange={page => {
              setData(chunkData[page]);
              setPageActive(page);
            }}
            label={`បង្ហាញ ${pageActive + 1} នៃ ${chunkData.length}`}
          />
        </DataTable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    backgroundColor: Color.White,
  },
  heading: {
    fontSize: 14,
  },
  col_index: {
    flex: 1.5,
  },
  col_region: {
    flex: 5,
  },
  col_number: {
    flex: 3,
  },
  col_small: {
    flex: 2.5,
  },
  text_info: {
    color: Color.INFO,
  },
  text_success: {
    color: Color.SUCCESS,
  },
  text_danger: {
    color: Color.DANGER,
  },
  text_brown: {
    color: Color.BROWN,
  },
});
