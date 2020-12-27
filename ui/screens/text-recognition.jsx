import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text } from "react-native";
import { useState } from "react/cjs/react.development";
import axios from "axios";

export default function TextRecongnition({ route }) {
  const [textDetected, setTextDetected] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { image } = route.params;
        console.log(image);
        const result = await axios.post(
          "http://52.73.243.18:3000/api/gcp/imageToText",
          JSON.stringify({ image: image.base64 }),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = result.data;
        setTextDetected(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{textDetected}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: 20,
  },
});
