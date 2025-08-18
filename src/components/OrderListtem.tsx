import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function OrderListItem({ order }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.id}</Text>
      <Text style={styles.orderDate}>
        {(() => {
          const now = new Date();
          const created = new Date(order.created_at);
          const diffMs = now.getTime() - created.getTime();
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

          if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
          } else {
            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
          }
        })()}
      </Text>
      <Text style={styles.orderStatus}>{order.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.055,
    shadowRadius: 8,
    elevation: 0.5,
    borderRadius: 20,
    position: "relative",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderDate: {
    color: "#666",
  },

  orderStatus: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    right: 16,
    top: 26,
  },
});
