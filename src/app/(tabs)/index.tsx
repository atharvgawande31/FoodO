import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import products from '@assets/data/products';

import EditScreenInfo from '@/components/EditScreenInfo';
import {  ScrollView } from 'react-native'
import { ProductList } from '@/components/ProductList';


export default function TabOneScreen() {
  return (
    <ScrollView>
      <ProductList product={products[1]} />
      <ProductList product={products[2]} /> 
      <ProductList product={products[3]} />
    </ScrollView>
  );
}
