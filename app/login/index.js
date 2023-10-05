import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import logo from "../../assets/logocodingaholic.png";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const width = Dimensions.get("window").width;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    try {
      const response = await axiosInstance.post("/authentification", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", "Bearer " + response.data.token);
      await AsyncStorage.setItem("id", response.data.id);
      if (response.data.role === "employee") {
        router.replace("/bottomNavigator");
      } else {
        throw "You're not an employee";
      }
    } catch (exception) {
      console.log(exception);
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Text style={styles.title}>Bienvenu sur</Text>
      <Image source={logo} style={styles.image} />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="E-mail"
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#4B7ABE"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Mot de passe"
        onChangeText={setPassword}
        autoCapitalize="none"
        placeholderTextColor="#4B7ABE"
        secureTextEntry
      />
      <Pressable style={styles.callToAction} onPress={login}>
        <Text style={{ color: "white" }}>Se Connecter</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  containerContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#4B7ABE",
  },
  image: {
    width: (width * 3) / 5,
    height: 300,
    resizeMode: "contain",
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
});
