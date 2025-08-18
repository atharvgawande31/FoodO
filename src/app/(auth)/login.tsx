import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert , TouchableOpacity } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";




export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = (email: string) => emailRegex.test(email);

  const handleLogin = () => {
    if (!validateSignUp()) {
      return;
    }
    Alert.alert("Success", `Welcome ${email}!`);
    router.push("/(user)/menu");
  };

  const validateSignUp = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (password.length < 4) {
      newErrors.password = "Password must be greater than 4 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />
      <Link style={styles.adminLogin} href="/(admin)/menu/home"><Text>Login as admin</Text></Link>
      <Text style={styles.title}>Login</Text>

      {/* Username */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        
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

      {/* Login Button */}
      {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password}</Text>
      )}
      <Button onPress={handleLogin} text="Login"></Button>
      <Link style={styles.signUp} href={"/(auth)/signup"} asChild>
        <Text>Create Account</Text>
      </Link>
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
  adminLogin: {
    position: "absolute",
    top: 10,
    right: 10,
    marginRight: 16,
    marginTop: 16,
    fontSize: 16,
    textDecorationLine: "underline",
    color: Colors.light.tint
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
