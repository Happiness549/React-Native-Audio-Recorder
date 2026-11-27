import { Text, View, StyleSheet } from "react-native";
import { Home } from "@/app/components/Home";
import RecordingScreen from "./components/RecordingScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <Home/>
      <RecordingScreen />
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
