import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "./providers/Providers";
import CartListItem from "@/components/CartProduct";
import Button from "@/components/Button";

function Cart() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      ></FlatList>
      <View style={styles.checkout}>
        <Text style={styles.totalPrice}>Total Price: ${total}</Text>
        <Button  text={"Checkout"}></Button>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"}></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },

  quantity: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  totalPrice: {
    fontSize: 26,
    marginLeft: 4,
    fontWeight: "bold",
    color: "black",
    top: 0,
  },
  empty: {
    fontSize: 24,
    color: "#888",
    alignSelf: "center",
    position: "absolute",
    top: 300,
  },
  checkout:{
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#1111",
    borderRadius: 20,
    gap: 2
  }
  
});

export default Cart;
