import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import OrderListItem from "@/components/OrderListtem";
import orders from "@assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";

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
      />


    </View>
  );
}
