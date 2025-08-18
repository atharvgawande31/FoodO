import { Text, View } from "@/components/Themed";
import orders from "@assets/data/orders";
import { useLocalSearchParams } from "expo-router";




export  default function OrderDatails({order} : any) {
    const {id} = useLocalSearchParams()
    return (
        <View>
        <Text>Order Details: {order.id}</Text>
        </View>
    );
}