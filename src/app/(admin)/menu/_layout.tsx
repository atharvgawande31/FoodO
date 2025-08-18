import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

export default function MenuStack() {
  return (
    <Stack>
      
        <Stack.Screen
        name="home"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={"/(admin)/menu/create"} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="square-o"
                    size={25}
                    color="black"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        
        }}
      />

    </Stack>
  );
}
