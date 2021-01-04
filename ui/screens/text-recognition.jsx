import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import gcpApiConfig from '../config/vision-api-key.json';
import axios from 'axios';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
export default function TextRecognition({ route }) {
  const [textDetected, setTextDetected] = useState('');
  const [isUnmounted, setIsUnmouted] = useState(false);
  const image = route.params ? route.params.image : undefined;
  useEffect(() => {
    (async () => {
      try {
        console.log(isUnmounted);
        if (!isUnmounted) {
          let body = JSON.stringify({
            requests: [
              {
                features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
                image: { content: image.data },
              },
            ],
          });
          const { data } = await axios.post(
            'https://vision.googleapis.com/v1/images:annotate?key=' +
              gcpApiConfig.api_key,
            body,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST',
            },
          );
          const { responses } = data;
          const detections = responses[0].textAnnotations;
          let textData = 'no text found';
          if (detections && detections[0]) {
            textData = detections[0].description;
          }
          setTextDetected(textData);
        }
      } catch (error) {
        console.error(error);
        setTextDetected('no text detected!');
      }
    })();
    return () => {
      setIsUnmouted(true);
    };
  }, [image, isUnmounted]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>{textDetected}</Text>
      </ScrollView>
      <ScrollView>
        <Image
          source={{ uri: `data:image/png;base64,${image.data}` }}
          style={[styles.image, { height: image.height, width: image.width }]}
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
