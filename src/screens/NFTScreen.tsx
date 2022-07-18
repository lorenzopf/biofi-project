import React, { memo, useEffect } from 'react';
import { Appbar, Button } from 'react-native-paper';
import NftCard from '../components/NftCard';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Navigation } from '../types';
import Web3 from 'web3';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import SmartContract from '../../deployedContracts/BioFiCollection.json';
import { AbiItem } from 'web3-utils';
import { Grid, Row } from 'react-native-easy-grid';
import Paragraph from '../components/Paragraph';
import Header from '../components/Header';
import { Button as PaperButton } from 'react-native-paper';
import { getDefaultProvider } from 'ethers';

type Props = {
  navigation: Navigation;
};

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/CKjA2vCRdONEgzsnq363uvG6ogeaOWjH'
  )
);

export default function NFTScreen({ navigation }: Props) {
  const [smObj, setSmObj] = React.useState(null);

  const connector = useWalletConnect();
  const accounts = connector.accounts;
  const contract = '0xd5C80419fD3358699416897e0CaF4806BfcCD67e';

  React.useEffect(() => {
    //smart contract instance
    const SmartContractObj = new web3.eth.Contract(
      SmartContract.abi as AbiItem[],
      // NetworkData.address
      '0xd5C80419fD3358699416897e0CaF4806BfcCD67e'
    );
    setSmObj(SmartContractObj);
  }, []);

  const [userNFT, setUserNFT] = React.useState(null);
  const [NFTMetada, setNFTMetadata] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(connector.connected);

  useEffect(() => {
    console.log('OK' + userNFT);
   !!userNFT && getMetadata();
  }, [userNFT]);

  useEffect(() => {
    isConnected && smObj && fetchConnectedData(accounts[0]);
  }, [isConnected, smObj]);

  useEffect(() => {
    !!NFTMetada && smObj && fetchImage(NFTMetada);
  }, [NFTMetada, smObj]);

  const fetchImage = async (data) => {
    var text = data && data.replace('ipfs://', 'https://ipfs.io/ipfs/');
    await fetch(text)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setImage(responseJson.image);
      });
  };
  const mintNFTs = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceHex = web3.utils.toHex(gasPrice);
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      const nonceHex = web3.utils.toHex(nonce);
      const tx = {
        from: accounts[0],
        to: '0x987934934388446e9a1B8261d6859D31cdD0Eaa5',
        data: smObj.methods.mint(accounts[0], 1).encodeABI(),
        value: web3.utils.toWei((0.001 * 1).toString(), 'ether'),
        gasPrice: gasPriceHex,
        nonce: nonceHex,
      };
      console.log('tx', tx);
      const response = await connector.sendTransaction(tx);
      console.log('response: ', response);
      if (response) {
        const res = await smObj.methods
          .walletOfOwner(accounts[0])
          .call({ from: accounts[0] });
        setUserNFT(res);
        console.log('success');
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const getMetadata = async () => {
    try {
      const res = await smObj.methods
        .tokenURI(userNFT.slice(-1)[0])
        .call({ from: accounts[0] });
      setNFTMetadata(res);
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const fetchConnectedData = async (data) => {
    console.log(smObj)
    const res = await smObj.methods
      .walletOfOwner(data)
      .call({ from: data });
    setUserNFT(res);
    console.log('success');
  };
  React.useEffect(() => {
    //smart contract instance
    const SmartContractObj = new web3.eth.Contract(
      SmartContract.abi as AbiItem[],
      // NetworkData.address
      '0x987934934388446e9a1B8261d6859D31cdD0Eaa5'
    );
    setSmObj(SmartContractObj);
  }, []);

  const ethersConfig = {
    provider: getDefaultProvider('homestead'),
  };
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <Appbar.Header>
        <Appbar.Content title="Your BioFi NFT 🖼" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Grid>
        <Row size={3} style={{ alignItems: 'center' }}>
          {!connector.connected && (
            <Grid style={{ justifyContent: 'center' }}>
              <Button
                style={{
                  width: '90%',
                  backgroundColor: 'lightgreen',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                }}
                onPress={connectWallet}
              >
                Connect your web3 wallet first
              </Button>
            </Grid>
          )}
          {!NFTMetada && !!connector.connected && (
            <Grid style={{ justifyContent: 'center' }}>
              <Button
                style={{
                  width: '90%',
                  backgroundColor: 'lightgreen',
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
                }}
                onPress={mintNFTs}
              >
                Mint your first and unique NFT !
              </Button>
            </Grid>
          )}
          {!!NFTMetada && !!connector.connected && image && (
            <Grid>
            <Image source={{uri: image.replace('ipfs://', 'https://ipfs.io/ipfs/')}} style={{flex:1, width:400, height:400, resizeMode:'contain',borderColor:"lightgreen", borderWidth:20}}  />
            </Grid>
          )}
        </Row>
        <Row size={1}></Row>
      </Grid>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
});
