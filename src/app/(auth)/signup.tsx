import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase"; // import client
import Colors from "@/constants/Colors"; 

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // save extra fields in user_metadata // deep link (for Expo)
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Cheers, Account created successfully");
    router.push("/(auth)/login");

  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Account" }} />
      <Text style={styles.title}>Create Account</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        text={loading ? "Creating..." : "Create Account"}
      />

      <Link href={"/(auth)/login"} style={styles.signUp}>
        <Text>Already have an account? Log In</Text>
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