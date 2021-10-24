import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Alert,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { getComponents, addComponent } from "../util/componentApi";
import { getLogs, addLog } from "../util/logApi";

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

  const context = useContext(UserContext);
  let devices = context.data?.componentes;

  const handleStage = () => {
    switch (stage) {
      case "Pesquisar":
        console.log(context.data);

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
        break;

      case "Adicionar":
        setImg(connectedImg);
        setStatus("Conectado");
        setStage("Desconectar");
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

  const handleCloseWindow = () => {
    if (window === "Fechar") {
      setWindow("Abrir");

      addLog(`${Date.now}`, "Janela fechada por ordem do usuário.");
    } else {
      setWindow("Fechar");

      addLog(`${Date.now}`, "Janela aberta por ordem do usuário.");
    }

    Alert.alert(
      `${window == "Fechar" ? "Fechando Janela" : "Abrindo Janela"}`,
      "",
      [{ text: "OK", onPress: () => console.log("OK") }],
      { cancelable: false }
    );
  };

  return (
    <View>
      {devices.length ? (
        devices.map((item, index) => {
          return (
            <View style={styles.container} key={index}>
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
                    Dispositivo: {item.name}
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
          );
        })
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

          <TouchableOpacity onPress={handleStage} style={styles.btnMainAction}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#50505a",
    alignItems: "center",
    padding: 16,
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
});
