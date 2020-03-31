import React, {useState, useEffect} from 'react';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import axios from 'axios';
import API from '../assets/API';
import Header from '../components/Header';
import CardStats from '../components/CardStats';
import SectionTitle from '../components/SectionTitle';
import PieChart from '../components/PieChart';
import Table from '../components/Table';
import Note from '../components/Note';
import Loading from '../components/Loading';

export default function TabCambodia() {
  const [data, setData] = useState(null);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalCured, setTotalCured] = useState(0);
  const [totalDeath, setTotalDeath] = useState(0);
  const [newPositive, setNewPositive] = useState(0);
  const [newCured, setNewCured] = useState(0);
  const [newDeath, setNewDeath] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // Get data
  const getData = () => {
    axios
      .all([
        axios.get(API.CAMBODIA), // Get data from every province then calculate the total of Positive, Cured & Death case in cambodia.
        axios.get(API.CAMBODIA_DATE), // Get today data to know the increasing number of Positive, Cured & Death case in cambodia.
      ])
      .then(
        axios.spread((provinceRes, todayRes) => {
          // provinceRes
          // Sort data by most Positive case
          provinceRes.data.DATA.sort((a, b) => a.POSITIVE < b.POSITIVE);
          let positive = 0;
          let cured = 0;
          let death = 0;
          for (const item of provinceRes.data.DATA) {
            positive += item.POSITIVE;
            cured += item.CURED;
            death += item.DEATH;
          }
          setData(provinceRes.data);
          setTotalPositive(positive);
          setTotalCured(cured);
          setTotalDeath(death);

          // todayRes
          const new_data = todayRes.data.DATA.pop();
          setNewPositive(new_data.POSITIVE);
          setNewCured(new_data.CURED);
          setNewDeath(new_data.DEATH);
        }),
      )
      .finally(() => {
        setRefreshing(false);
      });
  };

  // On pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  return (
    <View style={styles.container}>
      <Header title="ទិន្នន័យកូវីដ១៩ នៅកម្ពុជា" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SectionTitle title="ស្ថិតិចំនួនករណីទូទាំងប្រទេស​" />
        <CardStats
          totalPositive={totalPositive}
          totalCured={totalCured}
          totalActive={totalPositive - (totalCured + totalDeath)}
          totalDeath={totalDeath}
          newPositive={newPositive}
          newCured={newCured}
          newDeath={newDeath}
        />
        {data ? (
          <>
            <PieChart data={data.DATA} totalPositive={totalPositive} />
            <SectionTitle
              title={`ស្ថិតិចំនួនករណីតាមខេត្ត/ក្រុង (${data.DATA.length})`}
            />
            <Table data={data.DATA} />
            <Note
              lastUpdate={data.META.COVIDCAMBODIAUPDATE}
              link={API.SOURCE_DATA}
            />
          </>
        ) : (
          <Loading />
        )}
      </ScrollView>
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
});
