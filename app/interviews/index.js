import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  Pressable,
} from "react-native";
import { Card } from "react-native-paper";
import logo from "../../assets/logocodingaholic.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    getData();
  }, [reload]);
  async function accepter(id) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axiosInstance.put(
        "/interview/accepter/" + id,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setReload(reload + 1);
    } catch (exception) {
      console.log(exception);
    }
  }
  async function refuser(id) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axiosInstance.put(
        "/interview/refuser/" + id,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setReload(reload + 1);
    } catch (exception) {
      console.log(exception);
    }
  }
  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axiosInstance.get("/interview/mine2", {
        headers: {
          Authorization: token,
        },
      });
      setInterviews(response.data);
    } catch (exception) {
      console.log(exception);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.image} />
      {interviews.map((element, key) => {
        return (
          <Card style={styles.card} key={key}>
            <Text>
              Date Début : {element.start_date.split("T")[0]}{" "}
              {element.start_date.split("T")[1].split(".")[0]}
            </Text>
            <Text>Participants : {element.interviewee.Username ?? ""}</Text>
            {element.result_case === "waiting" ? (
              <View style={styles.buttons}>
                <Pressable
                  style={styles.refuse}
                  onPress={() => {
                    refuser(element._id);
                  }}
                >
                  <Text style={{ color: "white" }}>Refuser le candidat</Text>
                </Pressable>
                <Pressable
                  style={styles.accept}
                  onPress={() => {
                    accepter(element._id);
                  }}
                >
                  <Text style={{ color: "white" }}>Accepter le candidat</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Text
                  style={
                    element.result_case === "accepted"
                      ? { color: "green", textAlign: "center" }
                      : { color: "red", textAlign: "center" }
                  }
                >
                  {element.result_case === "accepted" ? "Accepté" : "Refusé"}
                </Text>
              </View>
            )}
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
  buttons: {
    marginTop: 8,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  refuse: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "red",
  },
  accept: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#4B7ABE",
  },
});
