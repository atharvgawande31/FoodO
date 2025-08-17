import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Image } from "react-native";
import Button from "@/components/Button";
import { defaultImage } from "@/components/ProductList";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";


export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});
  const [image, setImage] = useState<string | null>(null);

  //Input Validation

  const validateForm = () => {
    if (!price) {
      setErrors({ price: "Please enter a price" });
      return false;
    }
    if (!name) {
      setErrors({ name: "Name required" });
      return false;
    }
    if (isNaN(parseFloat(price || ""))) {
      setErrors({ price: "price must be a number" });
      return false;
    }
    return true;
  };

  //Form Submission

  const { id } = useLocalSearchParams();
  const updatingItem = !!id;

  function handleForm() {
    setErrors({});
    if (updatingItem) {
      Alert.alert("Update", "Product updated successfully");
      return;
    }
    if (!validateForm()) {
      Alert.alert("Validation failed", "Please fix the errors in the form");
      return;
    }
    Alert.alert("Success", "Product created successfully");
  }

  //Image Picker

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //Delete Item

  function deleteItem() {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Handle delete logic here
          Alert.alert("Deleted", "Product deleted successfully");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: updatingItem ? "Update Pizza" : "Create Pizza" }}
      />
      <Image
        style={styles.image}
        source={{ uri: image || defaultImage }}
      ></Image>
      <Text onPress={pickImage} style={styles.selectImage}>
        Select Image
      </Text>

      {/* Name */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Enter product name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      {/* Price */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
        />
      </View>

      {errors.name ? <Text style={{ color: "red" }}>{errors.name}</Text> : null}
      {errors.price ? (
        <Text style={{ color: "red" }}>{errors.price}</Text>
      ) : null}

      <Button
        onPress={handleForm}
        text={updatingItem ? "Update" : "Create"}
      ></Button>
      {updatingItem ? (
        <Text style={styles.delete} onPress={deleteItem}>
          Delete
        </Text>
      ) : null}
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
  labelText: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },

  selectImage: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.tint,
    marginBottom: 8,
  },
  image: {
    width: 300,
    aspectRatio: 1,
    resizeMode: "cover",
    alignSelf: "center",
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  delete: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
