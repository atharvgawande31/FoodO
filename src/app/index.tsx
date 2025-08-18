import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link } from "expo-router";
import { Redirect } from "expo-router";
const index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showWelcome ? (
        <Text style={styles.title}>Welcome to the Pizza App!</Text>
      ) : (
        <Redirect href="/(user)/menu/" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default index;
