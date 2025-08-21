import orders from "@assets/data/orders";
import { FlatList, View } from "react-native";
import OrderListItem from "@/components/OrderListtem";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase"; // import supabase client
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/app/providers/AuthProviders";





export default function Order() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Your Orders' }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
      
    </View>
  );
}
