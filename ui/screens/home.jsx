import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function App({ navigation }) {
  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        mediaType: 'photo',
        includeBase64: true,
        // compressImageQuality: 0.8,
      });
      await ImagePicker.clean();
      navigation.navigate('TextRecognition', { image });
    } catch (error) {
      // console.error(error);
    }
  };
  const openPicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        mediaType: 'photo',
        includeBase64: true,
        // compressImageQuality: 0.8,
      });
      await ImagePicker.clean();
      navigation.navigate('TextRecognition', { image });
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.text}> Capture </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openPicker}>
          <Text style={styles.text}> Select from gallery </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'lightblue',
    borderWidth: 2,
    shadowOpacity: 2,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});
