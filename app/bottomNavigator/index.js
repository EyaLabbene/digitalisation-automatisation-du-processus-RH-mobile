import React from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MeetingsScreen from "../meetings/index";
import Interviews from "../interviews";
import Leave from "../leave";
import Complaint from "../complaint";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Réunions"
        component={MeetingsScreen}
        options={{
          tabBarLabel: "Réunions",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-week" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Entretiens"
        component={Interviews}
        options={{
          tabBarLabel: "Entretiens",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Congés"
        component={Leave}
        options={{
          tabBarLabel: "Congés",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bed" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Réclamation"
        component={Complaint}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="window-restore" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
