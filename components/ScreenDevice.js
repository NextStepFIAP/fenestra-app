import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";

import magnifierImg from "../assets/magnifier.png";
import disconnectedImg from "../assets/deviceDisconnected.png";
import connectedImg from "../assets/deviceConnected.png";
import connectionImg from "../assets/connection.png";

export default function ScreenDevice() {
  const [img, setImg] = useState(magnifierImg);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState(null);
  const [stage, setStage] = useState("Pesquisar");

  const handleStage = () => {
    switch (stage) {
      case "Pesquisar":
        setImg(disconnectedImg);
        setDevice("SA655S52EXEMPLO");
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
        console.log("a");
    }
  };

  return (
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

        <View>
          <Text style={styles.infoLineText}>
            Status: {status ? status : "Não encontrado"}.
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleStage} style={styles.btnMainAction}>
        <Text style={styles.btnMainActionText}>{stage}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#50505a",
    alignItems: "center",
    padding: 25,
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

  infoLineText: {
    color: "#fff",
    marginBottom: 5,
  },
});
