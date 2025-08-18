import orders from "@assets/data/orders"
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListtem"
import { Link } from "expo-router";


export default function Order() {
  return (
    <FlatList  data={orders} renderItem={({ item }) => <OrderListItem order={item} />} />
  )
}