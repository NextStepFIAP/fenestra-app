import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  getComponents,
  addComponent,
  updateComponent,
} from "../util/componentApi";
import { getLogs, addLog } from "../util/logApi";
import { getUser } from "../util/userApi";

import magnifierImg from "../assets/magnifier.png";
import disconnectedImg from "../assets/deviceDisconnected.png";
import connectedImg from "../assets/deviceConnected.png";
import connectionImg from "../assets/connection.png";

import { UserContext } from "../contexts/UserContext";

import Swiper from "react-native-swiper/src";

export default function ScreenDevice({ navigation }) {
  const [img, setImg] = useState(magnifierImg);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState(null);
  const [stage, setStage] = useState("Pesquisar");
  const [window, setWindow] = useState("Fechar");
  const [modalVisible, setModalVisible] = useState(false);

  const [deviceName, setDeviceName] = useState("");
  const [chosenDevice, setChosenDevice] = useState("");

  const context = useContext(UserContext);
  let devices = context.data?.componentes;
  // const [devices, setDevices] = useState(context.data.componentes);

  const handleStage = () => {
    switch (stage) {
      case "Pesquisar":
        getComponents();
        getLogs();

        setImg(disconnectedImg);

        //configurar um modal pra perguntar o nome do componente e então setar aqui e/ou na função da api
        setStatus("Desconectado");
        setStage("Conectar");
        break;

      case "Conectar":
        setImg(connectionImg);
        setStatus("Disponível");
        setStage("Adicionar");

        if (devices.length) {
          return;
        } else {
          setDevice(
            Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, "")
              .substr(0, 5)
          );
        }

        break;

      case "Adicionar":
        setImg(connectedImg);
        setStatus("Conectado");
        setStage("Desconectar");

        if (devices.length) {
          return;
        } else {
          addComponent(device, context.id);
        }

        break;

      case "Desconectar":
        setImg(magnifierImg);
        setDevice(null);
        setStatus(null);
        setStage("Pesquisar");
        break;

      default:
        console.log("erro");
    }
  };

  const handleCloseWindow = (deviceId) => {
    if (window === "Fechar") {
      setWindow("Abrir");

      addLog(`${Date.now()}`, "Janela fechada por ordem do usuário.", deviceId);
    } else {
      setWindow("Fechar");

      addLog(`${Date.now()}`, "Janela aberta por ordem do usuário.", deviceId);
    }

    Alert.alert(
      `${window == "Fechar" ? "Fechando Janela" : "Abrindo Janela"}`,
      "",
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  const renameDevice = () => {
    if (deviceName.length <= 0) {
      Alert.alert("Erro", "O campo está vazio!");
      return;
    } else {
      updateComponent(chosenDevice.id, deviceName).then(
        Alert.alert("Relogue para ver as mudanças", "")
      );
    }
  };

  return (
    <View style={styles.containerGeneral}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Modal
          style={styles.containerModal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.containerModal}>
            <Text style={styles.labelTextModal}>Nome da Janela:</Text>
            <TextInput
              placeholder="Nome"
              value={deviceName}
              onChangeText={setDeviceName}
              style={styles.inputModal}
            />

            <TouchableOpacity
              style={styles.btnActionModal}
              onPress={renameDevice}
            >
              <Text style={styles.btnActionModalText}>RENOMEAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnActionModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btnActionModalText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {context.data?.componentes.length > 0 &&
        context.data?.componentes !== null &&
        context.data?.componentes !== undefined ? (
          <Swiper
            activeDotColor="#e2c792"
            showsButtons={true}
            showsPagination={true}
            buttonWrapperStyle={{ top: "-35%" }}
          >
            {devices.map((item, index) => {
              return (
                <View style={styles.container} key={index}>
                  <View>
                    <Image style={styles.img} source={img}/>
                  </View>

                  <View style={styles.containerDeviceInfo}>
                    <View>
                      <Image
                        style={styles.lineBorder}
                        source={require("../assets/lineBorder.png")}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setChosenDevice(item);
                      }}
                      value={item}
                    >
                      <Text style={styles.infoLineText}>
                        Dispositivo: {item.name}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.statusContainer}>
                      <Text style={styles.statusLabel}>Status: </Text>
                      <Text
                        style={
                          ([styles.infoLineText],
                          status == "Desconectado"
                            ? { color: "#000" }
                            : status == "Disponível"
                            ? { color: "#fff", fontWeight: "700" }
                            : status == "Conectado"
                            ? { color: "#E2C792", fontWeight: "700" }
                            : null)
                        }
                      >
                        {status ? status : "Não encontrado"}.
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.textWeather}>
                        Chovendo:
                        {!Math.round(Math.random()) ? (
                          <Text>SIM</Text>
                        ) : (
                          <Text>NÃO</Text>
                        )}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleStage}
                    style={styles.btnMainAction}
                  >
                    <Text style={styles.btnMainActionText}>{stage}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleCloseWindow(devices.id)}
                    style={[
                      styles.btnCloseWindow,
                      status == "Conectado"
                        ? styles.btnCloseWindowVisible
                        : styles.btnCloseWindowHidden,
                    ]}
                  >
                    <Text style={styles.btnCloseWindowText}>
                      {window} Janela
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Swiper>
        ) : (
          <View style={styles.container}>
            <View>
              <Image style={styles.img} source={img} />
            </View>

            <View style={styles.containerDeviceInfo}>
              <View>
                <Image
                  style={styles.lineBorder}
                  source={require("../assets/lineBorder.png")}
                />
              </View>

              <View>
                <Text style={styles.infoLineText}>
                  Dispositivo: {device ? device : "?"}
                </Text>
              </View>

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status: </Text>
                <Text
                  style={
                    ([styles.infoLineText],
                    status == "Desconectado"
                      ? { color: "#000" }
                      : status == "Disponível"
                      ? { color: "#fff", fontWeight: "700" }
                      : status == "Conectado"
                      ? { color: "#E2C792", fontWeight: "700" }
                      : null)
                  }
                >
                  {status ? status : "Não encontrado"}.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleStage}
              style={styles.btnMainAction}
            >
              <Text style={styles.btnMainActionText}>{stage}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCloseWindow}
              style={[
                styles.btnCloseWindow,
                status == "Conectado"
                  ? styles.btnCloseWindowVisible
                  : styles.btnCloseWindowHidden,
              ]}
            >
              <Text style={styles.btnCloseWindowText}>{window} Janela</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
  },

  containerScroll: {
    backgroundColor: "#50505a",
    flexGrow: 1,
  },

  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#50505a",
  },

  containerModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#50505a",
  },

  img: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  containerDeviceInfo: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#E2C792",
    paddingBottom: 20,
  },

  lineBorder: {
    width: "100%",
    height: 10,
    marginBottom: 15,
  },

  btnMainAction: {
    marginTop: 50,
    marginBottom: 30,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: "#000",
    borderColor: "#E2C792",
    borderWidth: 2,
    borderRadius: 4,
  },

  btnMainActionText: {
    color: "#fff",
    textTransform: "uppercase",
  },

  btnCloseWindow: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderColor: "#E2C792",
    borderWidth: 2,
    borderRadius: 4,
  },

  btnCloseWindowText: {
    color: "#000",
    textTransform: "uppercase",
  },

  btnCloseWindowVisible: {
    display: "flex",
  },

  btnCloseWindowHidden: {
    display: "none",
  },

  statusContainer: {
    display: "flex",
    flexDirection: "row",
  },

  infoLineText: {
    color: "#fff",
    marginBottom: 5,
  },

  statusLabel: {
    color: "#fff",
  },

  labelTextModal: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  inputModal: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  btnActionModal: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: "#000",
    borderColor: "#E2C792",
    borderWidth: 2,
    borderRadius: 4,
  },

  btnActionModalText: {
    color: "#fff",
    textTransform: "uppercase",
  },

  textWeather: {
    color: "#fff",
    marginTop: 5,
  },
});
