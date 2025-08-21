import products from "@assets/data/products";
import { View, FlatList } from "react-native";
import { ProductList } from "@/components/ProductList";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";


export default function TabOneScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductList product={item} />}
        ListFooterComponent={() => <Button onPress={() => supabase.auth.signOut()} text="Logout" />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />

     
    </View>
  );
}
