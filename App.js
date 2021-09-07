// import "react-native-gesture-handler"
import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from '@react-navigation/drawer';


import { navigationRef } from "./components/RootNavigation";
import ScreenMain from "./components/ScreenMain";
import ScreenDevice from "./components/ScreenDevice";
import ScreenRoutine from "./components/ScreenRoutine";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Início" component={ScreenDevice}>
        <Stack.Screen name="Início" component={ScreenMain} />
        <Stack.Screen name="Device" component={ScreenDevice} />
        <Stack.Screen name="Rotinas" component={ScreenRoutine} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
