import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "./providers/AuthProviders";
import { Redirect, Link } from "expo-router";
import { ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase"; // import supabase client
const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the {session.user.email} App!</Text>
      <Link href={"/(auth)/login"} style={styles.link} asChild>
        <Button text="Login" />
      </Link>
      <Link href={"/(user)/menu/"} style={styles.link} asChild>
        <Button text="Menu" />
      </Link>
      <Link href={"/(admin)/menu/"} style={styles.link} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Logout" />

       
    </View>
  );
};

const styles = StyleSheet.create({
  link:{
    marginTop: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
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
