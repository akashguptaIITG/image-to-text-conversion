import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import TextRecognition from "./screens/text-recognition";
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />

      <MainStack.Screen name="TextRecognition" component={TextRecognition} />
    </MainStack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
