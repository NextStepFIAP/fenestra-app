import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getUser,updateUser } from "../util/userApi";

export default function Login({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [stage, setStage] = useState("email");

  const handleEnter = () => {
    if (stage == "email") {
      getUser(email).then((data) => {
        if (data === undefined || data.error) {
          Alert.alert("Erro", "Email não encontrado!");
          return;
        } else {
          setStage("password");
        }
      });
    } else {
      updateUser(email, name, password).then((data) => {
        if (name.length <= 0 || password.length <= 0) {
          Alert.alert("Erro", "Algum campo está vazio!");
          return;
        } else {
          navigation.navigate("Login");
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>FENESTRA</Text>

      {stage == "email" ? (
        <View>
          <Text style={styles.labelText}>Email:</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
      ) : stage == "password" ? (
        <View>
          <Text style={styles.labelText}>Nome:</Text>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.labelText}>Senha:</Text>
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
      ) : null}
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={handleEnter}>
          <Text style={styles.button}>Recuperar</Text>
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

  formContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: 30,
  },

  button: {
    marginVertical: 20,
    backgroundColor: "#2A2B37",
    padding: 10,
    color: "#E2C792",
    borderRadius: 4,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#E2C792",
  },

  labelText: {
    color: "#fff",
  },

  input: {
    alignSelf: "stretch",
    marginVertical: 10,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#C4C4C4",
  },
  signUpButtonText: {
    textAlign: "center",
  },
  signUpButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
