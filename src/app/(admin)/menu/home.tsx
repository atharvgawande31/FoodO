import products from '@assets/data/products';
import { Text } from '@/components/Themed';
import {  View, FlatList } from 'react-native'
import { ProductList } from '@/components/ProductList';
import { useProductList } from '@/api/products';


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
            renderItem={({item}) => <ProductList product={item}/>}
            numColumns={2}
            contentContainerStyle={{gap: 10, padding: 10}}
            columnWrapperStyle={{ gap: 10}}
        />
     </View>
  );
}
