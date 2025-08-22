import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "./providers/AuthProviders";
import { Redirect, Link } from "expo-router";
import { ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase"; // import supabase client

const index = () => {
  const { session, loading, profile, isAdmin } = useAuth();

  console.log("Session:", session);
  console.log("Loading:", loading);
  console.log("Profile:", profile);
  console.log("Is Admin:", isAdmin);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(user)/menu" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the {session.user.email} App!</Text>
      <Link href={"/(user)/menu/"} style={styles.link} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu/"} style={styles.link} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Logout" />
    </View>
  );
};

// if (!isAdmin) {
//   return <Redirect href="/(user)/menu" />;
// }

const styles = StyleSheet.create({
  link: {
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
