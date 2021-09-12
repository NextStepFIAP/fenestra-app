import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn({ onEnter, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>FENESTRA</Text>

      <View style={styles.formContainer}>
        <Text style={styles.labelText}>Email:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.labelText}>Senha: </Text>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => onEnter(email, password)}>
          <Text style={styles.button}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => onSignUp(true)}
        >
          <Text style={styles.signUpButtonText}>Cadastrar</Text>
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

  labelText:{
    color: "#fff"
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
