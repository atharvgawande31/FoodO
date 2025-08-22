import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { defaultImage } from "@/components/ProductList";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/app/providers/Providers";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api/products";

export default function ProductPage() {
  const { id } = useLocalSearchParams();

  const { data: product, isLoading, error } = useProduct(
    parseInt(typeof id === "string" ? id : id[0])
  );

  const { addItem } = useCart();
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("L");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>Select size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((s) => (
          <Pressable
            key={s}
            onPress={() => setSelectedSize(s)}
            style={[
              styles.size,
              { backgroundColor: selectedSize === s ? "gainsboro" : "white" },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === s ? "black" : "grey" },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to Cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  image: { width: "100%", aspectRatio: 1, alignContent: "center" },
  name: { fontSize: 24, fontWeight: "500", paddingLeft: 16, paddingTop: 16 },
  size: {
    backgroundColor: "gainsboro",
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "600" },
  sizeContainer: { justifyContent: "space-around", flexDirection: "row", paddingTop: 12 },
  price: {
    marginLeft: 16,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.tint,
    marginTop: 50,
  },
});