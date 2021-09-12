import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import * as RootNavigation from './RootNavigation';

export default function ScreenMain({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>FENESTRA</Text>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.redirectButton}
          onPress={() => navigation.navigate("ScreenDevice")}
        >
          <Text style={styles.redirectButtonText}>Listar Dispositivos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirectButton}
          onPress={() => navigation.navigate("ScreenRoutine")}
        >
          <Text style={styles.redirectButtonText}>Rotinas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirectButton}>
          <Text style={styles.redirectButtonText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#50505a",
    alignItems: "center",
    padding: 16,
  },

  titlePage: {
    color: "#E2C792",
    letterSpacing: 2,
    fontSize: 36,
    marginBottom: 30,
  },

  containerButtons: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "stretch",
  },

  redirectButton: {
    backgroundColor: "#C4C4C4",
    borderRadius: 4,
    marginBottom: 25,
    textAlign: "center",
    padding: 15,
  },

  redirectButtonText: {
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
