import { Text, View, StyleSheet } from "react-native";
import { Home } from "@/app/components/Home";


export default function Index() {
  return (
    <View style={styles.container}>
      <Home/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
