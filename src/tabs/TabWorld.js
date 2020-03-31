import React, {useState, useEffect} from 'react';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import axios from 'axios';
import API from '../assets/API';
import Header from '../components/Header';
import CardStats from '../components/CardStats';
import SectionTitle from '../components/SectionTitle';
import Table from '../components/Table';
import Note from '../components/Note';
import Loading from '../components/Loading';

export default function TabCambodia() {
  const [data, setData] = useState(null);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalCured, setTotalCured] = useState(0);
  const [totalDeath, setTotalDeath] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // Get data from every country
  const getData = () => {
    axios
      .get(API.GLOBAL)
      .then(res => {
        // Sort data by most Positive case
        res.data.DATA.sort((a, b) => a.positive < b.positive);
        let positive = 0;
        let cured = 0;
        let death = 0;
        for (const item of res.data.DATA) {
          positive += item.positive;
          cured += item.cured;
          death += item.death;
        }
        setData(res.data);
        setTotalPositive(positive);
        setTotalCured(cured);
        setTotalDeath(death);
      })
      .finally(() => setRefreshing(false));
  };

  // On pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  return (
    <View style={styles.container}>
      <Header title="ទិន្នន័យកូវីដ១៩ ទូទាំងពិភពលោក" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SectionTitle title="ស្ថិតិចំនួនករណីទូទាំងពិភពលោក" />
        <CardStats
          totalPositive={totalPositive}
          totalCured={totalCured}
          totalActive={totalPositive - (totalCured + totalDeath)}
          totalDeath={totalDeath}
        />
        {data ? (
          <>
            <SectionTitle
              title={`ស្ថិតិចំនួនករណីតាមប្រទេស (${data.DATA.length})`}
            />
            <Table data={data.DATA} isGlobal={true} />
            <Note
              lastUpdate={data.META.COVIDGLOBALUPDATE}
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
