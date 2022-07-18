import React, { useState } from "react";
import { VcStatusRegistry } from "vc-status-registry";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Alert,
  Pressable,
} from "react-native";

//importing library to use Stopwatch and Timer
import { Timer } from "react-native-stopwatch-timer";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

let startDate = null;
let stopDate = null;

const privateKey =
  "058977861e86778484d26a92795c3b648b71ed8f0b5168537b98d17d24084c7b"; // BioFi private key for demo purpose.
const contractAddress = "0xe9fdf8130ad68fd11d195fb1e49a479e30b6d3d4"; // VC Status Registry smart contract address
const provider = "https://rinkeby.infura.io";

const vcStatusRegistry = new VcStatusRegistry(
  provider,
  contractAddress,
  privateKey
);

const sendTimerInfos = async () => {

const connector = useWalletConnect();

  const startDateFormated = new Date(startDate);
  const stopDateFormated = new Date(stopDate);
  const timeSpent =
    Math.floor(Math.abs(startDateFormated - stopDateFormated) / 600) / 100;
  console.log(timeSpent); // Time spent is in Minutes
  const credentialId = connector.accounts[0] ?? "test";
  await vcStatusRegistry.setVcStatus(credentialId);
  console.log("VC DONE");
};

function handleTimer(isTimerStart) {
  if (!isTimerStart) startDate = new Date();
  else {
    stopDate = new Date();
    sendTimerInfos();
  }
}

export default function TimerModule({ mode, style, ...props }) {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(1200000);
  const [resetTimer, setResetTimer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Congratulation ! A Verifiable Credential has been generated !{" "}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Timer
        totalDuration={timerDuration}
        //msecs
        //Time Duration
        start={isTimerStart}
        //To start
        reset={resetTimer}
        //To reset
        options={options}
        //options for the styling
        handleFinish={() => {
          alert("Custom Completion Function");
        }}
        //can call a function On finish of the time
        getTime={(time) => {}}
      />
      <TouchableHighlight
        style={styles.sectionStyle}
        onPress={() => {
          setIsTimerStart(!isTimerStart);
          setResetTimer(false);
          handleTimer(isTimerStart);
          setModalVisible(isTimerStart);
        }}
      >
        <Text style={styles.buttonText}>
          {!isTimerStart ? "START" : "STOP"}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.sectionStyle}
        onPress={() => {
          setIsTimerStart(false);
          setResetTimer(true);
        }}
      >
        <Text style={styles.buttonText}>RESET</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  sectionStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    color: "#2a4876",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const options = {
  container: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#2a4876",
    borderStyle: "solid",
    padding: 5,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "black",
  },
  text: {
    fontSize: 35,
    color: "#2a4876",
    marginLeft: 7,
  },
};
