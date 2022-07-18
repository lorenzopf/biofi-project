import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';

const NftCard = () => (
  <Card style={[styles.card, styles.shadowProp]}>
    <Card.Title
      title="My NFT"
      subtitle="Your current NFT can be stacked or upgrade with side activites"
    />
    <Card.Cover
      source={{ uri: 'https://picsum.photos/700' }}
      style={styles.cardImage}
    />
    <Card.Content>
      <Grid>
        <Col style={styles.col}>
          <Title>Actions</Title>
          <Paragraph>2 / Day</Paragraph>
        </Col>
        <Col style={styles.col2}>
          <Title style={styles.white}>Lifetime</Title>
          <Paragraph style={styles.white}>30 minutes</Paragraph>
        </Col>
      </Grid>
      <Grid>
        <Col style={styles.col2}>
          <Title style={styles.white}>Level</Title>
          <Paragraph style={styles.white}>1</Paragraph>
        </Col>
        <Col style={styles.col}>
        <Title>Proofs</Title>
        <Paragraph>150</Paragraph>
        </Col>
      </Grid>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardImage: {
    margin: 15,
    borderRadius: 20,
  },
  col: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#8fdfa4"
  },
  col2: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#2a4876"
  },
  white: {
    color: "#feffff",
  }
});

export default memo(NftCard);
