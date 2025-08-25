import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams, Link } from "expo-router";
import products from "@assets/data/products";
import { defaultImage } from "@/components/ProductList";

import { useState } from "react";
import { useProduct } from "@/api/products";
import { useCart } from "@/app/providers/Providers";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const size: PizzaSize[] = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedize] = useState<PizzaSize>("L");

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(
    parseInt(typeof id === "string" ? id : id[0]),
    { enabled: !!id }
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color="black"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

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
