import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./ScreenLogin";
import Register from "./ScreenRegister";
import Recover from "./ScreenRecoverPassword";
import ScreenMain from "./ScreenMain";
import ScreenDevice from "./ScreenDevice";
import ScreenRoutine from "./ScreenRoutine";

import { UserContext } from "../contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function Navegacao() {
  const [data, setData] = useState([]);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ data, setData }}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2A2B37",
            },
            headerTintColor: "#E2C792",
            headerTitleStyle: {
              textTransform: "capitalize",
              textAlign: "center",
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "LOGIN", headerLeft: () => null }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "CADASTRO" }}
          />

          <Stack.Screen
            name="Recover"
            component={Recover}
            options={{ title: "Recuperar senha" }}
          />
          <Stack.Screen
            name="ScreenMain"
            component={ScreenMain}
            options={{ title: "INÍCIO", headerLeft: () => null }}
          />
          <Stack.Screen
            name="ScreenDevice"
            component={ScreenDevice}
            options={{ title: "DISPOSITIVOS" }}
          />
          <Stack.Screen
            name="ScreenRoutine"
            component={ScreenRoutine}
            options={{ title: "ROTINAS" }}
          />
        </Stack.Navigator>
      </UserContext.Provider>
      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}
