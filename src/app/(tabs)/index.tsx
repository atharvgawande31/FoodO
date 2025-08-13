import { StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from 'react-native';
import { Image } from 'react-native';


export default function TabOneScreen() {

  const product = products[0]
  return (
    <View style={styles.container}>
        <Image source={{uri: product.image}} style={styles.image}/>
         <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
 
  container:{
    flex:1,
    margin:16,
    padding:16,
    backgroundColor:"white"
  },

  title: {
    fontSize: 20,
    fontWeight: 600,
    marginVertical:8
  },
  image:{
    width: "100%",
    aspectRatio:1
  },
  price:{
    fontSize:15,
    fontWeight: 700,
    color: Colors.light.tint
  }
});
