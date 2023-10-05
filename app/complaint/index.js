import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import logo from "../../assets/logocodingaholic.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";

const width = Dimensions.get("window").width;

export default function Complaint() {
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  async function send() {
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const response = await axiosInstance.post(
        "/complaint",
        {
          message: message,
          createdBy: id,
          object: object,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("success");
    } catch (exception) {
      console.log(exception);
    }
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />

      <TextInput
        style={styles.input}
        value={object}
        placeholder="Objet"
        onChangeText={setObject}
        autoCapitalize="none"
        placeholderTextColor="#4B7ABE"
      />
      <TextInput
        style={styles.input}
        value={message}
        placeholder="Message"
        onChangeText={setMessage}
        autoCapitalize="none"
        placeholderTextColor="#4B7ABE"
        multiline
      />
      <Pressable style={styles.callToAction} onPress={send}>
        <Text style={{ color: "white" }}>Envoyer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: (width * 4) / 5,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  callToAction: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#4B7ABE",
  },
  image: {
    width: (width * 3) / 5,
    height: 200,
    resizeMode: "contain",
  },
});
