import { Product } from '@/assets/types';
import { View, Text } from './Themed';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Colors from '../constants/Colors';


export const ProductList = ({ product }: { product: Product }) => (
  <View style={styles.container}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>${product.price}</Text>
  </View>
);

const styles = StyleSheet.create({ 
 
  container:{
    flex:0,
    margin:16,
    padding:16,
    backgroundColor:"white",
    borderRadius: 20
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
