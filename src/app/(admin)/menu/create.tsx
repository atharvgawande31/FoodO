import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Image } from "react-native";
import Button from "@/components/Button";
import { defaultImage } from "@/components/ProductList";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});


const validateForm = () => {
    if(!price) {
        setErrors({price: 'Please enter a price'});
        return false;
    }
    if(!name) {
        setErrors({name: "Name required"})
        return false;
    }
    if(isNaN(parseFloat(price))) {
        setErrors({price: 'price must be a number'})
        return false;
    }
    return true;
}

function handleForm() {
    if (!validateForm()) {
        Alert.alert("Validation failed", "Please fix the errors in the form");
        return
    } 

    // Handle form submission
    Alert.alert("Success", "Product created successfully");
}
  

  
  return (
    <View style={styles.container}>

        <Image style={styles.image} source={{uri: defaultImage}}></Image>
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
      {errors.price ? <Text style={{ color: "red" }}>{errors.price}</Text> : null}

      <Button onPress={handleForm} text="Create"></Button>
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
  image:{
    width: 300,
    aspectRatio: 1,
    resizeMode: 'cover',
    alignSelf: 'center'

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
});