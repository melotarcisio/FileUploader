import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

export default function ConfirmDialog({fileName, onConfirm, ip}) {

  const showConfirmDialog = () => {
    return Alert.alert(
      "Confirmação",
      `Deseja enviar o arquivo ${fileName} para o ip ${ip}`,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => onConfirm(true)
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
          onPress: () => onConfirm(false)
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      {showBox && <View style={styles.box}></View>}
      <Button title="Sure" onPress={() => showConfirmDialog()} />
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
});