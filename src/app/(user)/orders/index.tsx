import orders from "@assets/data/orders";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListtem";



export default function Order() {
  return (

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />

  );
}
