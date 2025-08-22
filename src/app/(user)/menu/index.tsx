import { View, FlatList, Text } from "react-native";
import { ProductList } from "@/components/ProductList";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useProductList } from "@/api/products";


export default function TabOneScreen() {
  const { data, error, isLoading } = useProductList()

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Failed to fetch data...</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductList product={item} />}
        ListFooterComponent={() => (
          <Button onPress={() => supabase.auth.signOut()} text="Logout" />
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
