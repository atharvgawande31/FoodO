import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase"; // import client
import Colors from "@/constants/Colors"; 

export default function LoginScreen() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,

    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Cheers, Log In Successfully");
    router.push("/");

  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Log In" }} />
      <Text style={styles.title}>Log In</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />


      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        onPress={handleSignUp}
        disabled={loading}
        text={loading ? "Logging..." : "Login"}
      />

      <Link href={"/(auth)/signup"} style={styles.signUp}>
        <Text>New here? Create Account</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  signUp: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
    color: Colors.light.tint,
  },
});