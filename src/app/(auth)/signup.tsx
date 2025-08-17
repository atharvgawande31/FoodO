import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";


export default function LoginScreen() {
    const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
 const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string }>({})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) => emailRegex.test(email);

  const handleSignUp = () => {

    if (!validateSignUp()) {
      return;
    }
    Alert.alert("Success", `Welcome ${username}!`);
    router.push("/(user)/menu");

  };

  const validateSignUp = () => {
    const newErrors: { email?: string; username?: string; password?: string } = {};

    if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (password.length < 4) {
      newErrors.password = "Password must be greater than 4 characters";
    }
    if (username.length < 2) {
      newErrors.username = "Please enter a valid username";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }



  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: "Create Account" }} />
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone.no"
          value={email}
          onChangeText={setEmail}
        />
      </View>
       
      {/* Username */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Error Messages */}
      {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
      {errors.username && <Text style={{ color: "red" }}>{errors.username}</Text>}
      {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}

      {/* Login Button */}
      <Button onPress={handleSignUp} text="Create Account"></Button>
      <Link style={styles.signUp} href={"/(auth)/login"} asChild><Text>Log In</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    fontSize: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
   signUp: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
