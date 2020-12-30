import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import axios from 'axios';

export default function TextRecognition({ route }) {
  const [textDetected, setTextDetected] = useState('');
  const image = route.params ? route.params.image : undefined;
  const source = axios.CancelToken.source();
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(
          'http://192.168.29.242:3000/api/gcp/imageToText',
          JSON.stringify({ image: image.data }),
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const { data } = result.data;
        setTextDetected(data);
      } catch (error) {
        console.error(error);
        setTextDetected('no text detected!');
      }
    })();
    return () => {
      source.cancel('Request cancelled');
    };
  }, [image]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>{textDetected}</Text>
      </ScrollView>
      <ScrollView>
        <Image
          source={{ uri: `data:image/png;base64,${image.data}` }}
          style={styles.image}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  image: {
    width: 300,
    height: 400,
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: '200',
  },
});
