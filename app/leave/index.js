import { Link } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width;
export default function Leave() {
  const [start_date, setStart_date] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [cause, setCause] = useState("");
  const [end_date, setEnd_date] = useState(new Date());
  const [showEnd, setShowEnd] = useState(false);
  async function send() {
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const response = await axiosInstance.post(
        "/leave",
        {
          start_date: start_date.getTime(),
          end_date: end_date.getTime(),
          employee: id,
          cause: cause,
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
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowStart(false);

    setStart_date(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setEnd_date(currentDate);
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setShowStart(true);
        }}
      >
        <Text>Date de Début :{start_date.toISOString().split("T")[0]}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowEnd(true);
        }}
      >
        <Text>Date de fin : {end_date.toISOString().split("T")[0]}</Text>
      </Pressable>

      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={start_date}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeStart}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={end_date}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeEnd}
        />
      )}
      <TextInput
        style={styles.input}
        value={cause}
        placeholder="Message"
        onChangeText={setCause}
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
    justifyContent: "center",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  callToAction: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#4B7ABE",
  },

  input: {
    width: (width * 4) / 5,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
