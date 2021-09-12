import React, { useState } from "react";
import { StyleSheet, View, Switch, Text, TouchableOpacity } from "react-native";

export default function ScreenRoutine({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>

      <View style={styles.containerOption}>
        <Text style={styles.optionText}>Fechar janela quando chover</Text>
        <Switch
          trackColor={{ false: "#2c2c2c", true: "#a3a3a3" }}
          thumbColor={isEnabled ? "#E2C792" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>


      <View style={styles.containerOption}>
        <Text style={styles.optionText}>Enviar notificações quando chover</Text>
        <Switch
          trackColor={{ false: "#2c2c2c", true: "#a3a3a3" }}
          thumbColor={isEnabled ? "#E2C792" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.containerOption}>
        <Text style={styles.optionText}>Enviar log de erros para desenvolvedor</Text>
        <Switch
          trackColor={{ false: "#2c2c2c", true: "#a3a3a3" }}
          thumbColor={isEnabled ? "#E2C792" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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

  containerOption:{
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E2C792",
    paddingBottom: 10,
    marginBottom: 15
  },

  optionText:{
    color: "#fff"
  }
});
