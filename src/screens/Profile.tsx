import React, { memo } from 'react';
import Button from '../components/Button';
import { Navigation } from '../types';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import Header from '../components/Header';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

type Props = {
  navigation: Navigation;
};

export default function Profile({ navigation }: Props) {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <Appbar.Header>
        <Appbar.Content title="Profil 👤" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Grid style={styles.grid}>
        <Col style={{alignItems:'center'}}> 
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <Header>Welcome dear ! </Header>

          {!connector.connected && (
            <Button mode="outlined" onPress={connectWallet}>
              Connect a Wallet
            </Button>
          )}
          {!!connector.connected && (
            <Button mode="outlined" onPress={killSession}>
              Disconnect from web3
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('HomeScreen')}
          >
            Logout
          </Button>
        </Col>
      </Grid>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  grid: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
});