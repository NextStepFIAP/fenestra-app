import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "./Login";
import Register from "./Register";
import ScreenLogin from "./ScreenLogin";
import ScreenMain from "./ScreenMain";
import ScreenDevice from "./ScreenDevice";
import ScreenRoutine from "./ScreenRoutine";

export default function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ScreenMain"
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
          options={{ title: "LOGIN" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "CADASTRO" }}
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
      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}
