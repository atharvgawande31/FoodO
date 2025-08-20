import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList,Pressable } from "react-native";
import OrderListItem from "@/components/OrderListtem";
import orders from "@assets/data/orders";
import { OrderStatusList } from "@/types";
import Colors from "@/constants/Colors"; 
import { OrderStatus } from "@/types";

import OrderItemListItem from "@/components/OrderItemListItem";
import { useState } from "react";


export default function OrderDatails() {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id === Number(id));
  

  if (!order) {
    return (
      <View>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order ${order.id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListFooterComponent={() =>(
          <>
  <Text style={{ fontWeight: 'bold',marginHorizontal: 20 }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 , marginHorizontal: 20}}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        // onPress={() => ()}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 6,          borderRadius: 5,
          marginVertical: 10,
          justifyContent:"center",
          alignItems:"center",
          flex: 1,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
      />
    </View>
  );
}
