import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();

  const onPictureSaved = async (image) => {
    console.log("onPictureSaved");
    navigation.navigate("TextRecognition", { image });
  };
  const snap = async () => {
    if (cameraRef) {
      await cameraRef.current.takePictureAsync({
        onPictureSaved,
        base64: true,
        quality: 0.3,
      });
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        autoFocus={true}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={snap}>
          <Text style={styles.text}> Capture </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 6,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: "black",
  },
});
