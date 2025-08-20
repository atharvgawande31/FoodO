import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, useSegments } from "expo-router";
import { Order, OrderStatusList } from "@/types";
import dayjs from "dayjs"; 
import relativeTime from 'dayjs/plugin/relativeTime';
import { Pressable } from "react-native";


dayjs.extend(relativeTime);


type OrderListItemTypes = {
     order : Order ;
}


export default function OrderListItem({ order }: OrderListItemTypes) {
    const segments = useSegments()

  return (


    
    <Link href={`/${segments[0]}/history/${order.id}` as any} asChild>
         <Pressable>
        
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.id}</Text>
          <Text style={styles.orderDate}>{dayjs(order.created_at).fromNow()}</Text>
      <Text style={styles.orderStatus}>{order.status}</Text>
    </View>
    </Pressable>

    </Link>
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
    borderRadius: 10,
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
