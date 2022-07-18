import React, { memo, useState } from 'react';
import { Navigation } from '../../types';
import { Card, Paragraph, Title } from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { theme } from '../../core/theme';
import Button from '../../components/Button';

const data = [
  {
    id: 1,
    title: 'Instagram',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
  },
  {
    id: 1,
    title: 'Facebook',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png',
  },
  {
    id: 2,
    title: 'Twitter',
    image:
      'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png',
  },
  {
    id: 3,
    title: 'Snapchat',
    image:
      'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214526%21Logo-Snapchat.png',
  },
  {
    id: 4,
    title: 'LinkedIn',
    image: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
  },
  {
    id: 5,
    title: 'YouTube',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png',
  },
];

type Props = {
  navigation: Navigation;
};

const ApplicationList = ({ navigation }: Props) => {
  const [check, setCheck] = useState(false);
  return (
    <>
      <ImageBackground
        source={require('../../assets/background_dot.png')}
        resizeMode="repeat"
        style={styles.background}
      >
        <Title style={styles.title}>
          Choose some apps you would want to reduce your time spent on
        </Title>
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCheck((prevCheck) => !prevCheck);
                }}
              >
                <Card style={[styles.card, styles.shadowProp]} >
                  <Card.Cover
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                  />
                  <Card.Content>
                    <Paragraph style={styles.cardText}>{item.title}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          style={styles.submitButton}
          onPress={() => navigation.navigate('Dashboard')}
          mode="contained"
        >
          Start Now
        </Button>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cardImage: {
    margin: 15,
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
  },
  card: {
    margin: 10,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
  },
  btnNormal: {},
  btnPress: {
    backgroundColor: '#8fdfa4',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    color: theme.colors.primary,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
});

export default memo(ApplicationList);
