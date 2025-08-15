import { Product } from "@assets/types";
import { View, Text} from "./Themed";
import { StyleSheet, Pressable } from "react-native";
import { Image } from "react-native";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

export const defaultImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"

export const ProductList = ({ product }: { product: Product }) => (
    
    <Link href={`/menu/${product.id}`} asChild>
        <Pressable style={styles.container}>
            <Image
                source={{
                    uri:
                        product.image || defaultImage
                }}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>

        </Pressable>
    </Link>

);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 8,
        maxWidth: "50%",
    },

    title: {
        fontSize: 20,
        fontWeight: 600,
        marginVertical: 8,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    price: {
        fontSize: 15,
        fontWeight: 700,
        color: Colors.light.tint,
    },
});
