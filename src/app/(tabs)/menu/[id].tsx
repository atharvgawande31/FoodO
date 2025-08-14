import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'




export default function ProductPage() {

  const {id} = useLocalSearchParams()
 
  return (
    <View>
      <Stack.Screen  options={{title: "Details"}}/>
      <Text>product: {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})