import React, { memo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Timer from '../components/Timer';
import { Navigation } from '../types';
import { Appbar, Text } from 'react-native-paper';
import { Grid, Col } from 'react-native-easy-grid';
import { Title, Paragraph } from 'react-native-paper';

type Props = {
  navigation: Navigation;
};

const HomePage = ({ navigation }: Props) => (
  <>
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <Appbar.Header>
        <Appbar.Content title="Welcome Back Serhat 👋" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      
      <Text style={styles.subtitle}>Recommended Activities</Text>
      <Grid>
        <Col style={styles.grid}>
          <Text style={styles.activity}>20 minutes off screen</Text>
          <Timer mode={undefined} style={undefined} />
        </Col>
      </Grid>
      <Text style={styles.subtitle}>Today's stats</Text>
      <Grid>
        <Col style={styles.col2}>
          <Title style={{ color: "#feffff" }}>Time Saved</Title>
          <Paragraph  style={{ color: "#feffff" }}>50 minutes</Paragraph>
        </Col>
        <Col style={styles.col1}>
          <Title>Screen time</Title>
          <Paragraph>Global: 3H15</Paragraph>
          <Paragraph>Yourself: 1h17</Paragraph>
        </Col>
      </Grid>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 10
  },
  grid: {
    margin: 15,
    padding: 15,
    backgroundColor: "#8fdfa4",
    borderRadius: 12,
  },
  activity: {
    color: "#2a4876",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700"
  },
  col1: {
    padding: 15,
    margin: 15,
    borderRadius: 8,
    backgroundColor: "#8fdfa4",
    height: 110
  },
  col2: {
    padding: 15,
    margin: 15,
    borderRadius: 8,
    backgroundColor: "#2a4876",
    color: '#8fdfa4',
    height: 110
  },
});

export default memo(HomePage);
