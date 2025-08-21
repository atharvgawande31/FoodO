import { View, Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/app/providers/AuthProviders";

export default function AuthLayout() {
   const {session} = useAuth()

   if(session) {
        return <Redirect href="/" />;
   }
   return(
    <Stack/>
   )
}