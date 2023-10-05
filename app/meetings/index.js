import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, Dimensions, Image } from "react-native";
import { Card } from "react-native-paper";
import logo from "../../assets/logocodingaholic.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token");
      console.log(token);
      const response = await axiosInstance.get("/meeting/mine", {
        headers: {
          Authorization: token,
        },
      });
      setMeetings(response.data);
    } catch (exception) {
      console.log(exception);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.image} />
      {meetings.map((element, key) => {
        var employees = "";
        for (var i = 0; i < element.employee.length; i++) {
          employees += element.employee[i]["Username"];
          employees += ", ";
        }
        employees = employees.substring(0, employees.length - 2);
        return (
          <Card style={styles.card} key={key}>
            <Text>
              Date Début : {element.start_time.split("T")[0]}{" "}
              {element.start_time.split("T")[1].split(".")[0]}
            </Text>
            <Text>Participants : {employees}</Text>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: (width * 9) / 10,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    marginBottom: 8,
  },
  image: {
    width: (width * 3) / 5,
    height: 200,
    resizeMode: "contain",
  },
});
