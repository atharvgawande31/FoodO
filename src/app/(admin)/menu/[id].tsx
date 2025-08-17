import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultImage } from "@/components/ProductList";
import Colors from "@/constants/Colors";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/app/providers/Providers";
import { PizzaSize } from "@/types";




export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const {addItem} = useCart()
  const product = products.find((p) => p.id.toString() === id);
  const size: PizzaSize[] = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedize] = useState<PizzaSize>("L");

  const addToCart = () => {
    if(!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart")
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: 500,
    paddingLeft: 16,
  },
  price: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 700,
    color: "black",
  },
});
