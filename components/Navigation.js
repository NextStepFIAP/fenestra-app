import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import ScreenMain from "./components/ScreenMain";
import ScreenDevice from "./components/ScreenDevice";
import ScreenRoutine from "./components/ScreenRoutine";

export default function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ScreenMain"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ED145B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="ScreenMain"
          component={ScreenMain}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="ScreenDevice"
          component={ScreenDevice}
          options={({ route }) => ({ title: route.params.item.nome })}
        />
        <Stack.Screen
          name="ScreenRoutine"
          component={ScreenRoutine}
          options={{ title: "Início" }}
        />
      </Stack.Navigator>
      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}
