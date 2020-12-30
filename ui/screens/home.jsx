import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function App({ navigation }) {
  const snap = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        mediaType: 'photo',
        includeBase64: true,
        compressImageQuality: 0.5,
      
      });
      navigation.navigate('TextRecognition', { image });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: 'lightblue',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginHorizontal: 130,
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});
