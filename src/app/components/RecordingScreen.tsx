
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RecordingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>New Recording</Text>
        <Text style={styles.subtitle}>Capture your thoughts</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>00:00</Text>
          <Text style={styles.timerLabel}>Recording time</Text>
        </View>

        <View style={styles.waveform}>
          {[20, 35, 50, 30, 65, 40, 55, 25, 45, 60, 30, 50, 35].map(
            (height, index) => (
              <View
                key={index}
                style={[styles.waveBar, { height }]}
              />
            )
          )}
        </View>

        <TouchableOpacity style={styles.recordButton} activeOpacity={0.8}>
          <Ionicons name="mic" size={35} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.instruction}>Tap to start recording</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151426",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 35,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#25243B",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#A5A2BD",
    fontSize: 15,
    marginTop: 8,
  },
  timerContainer: {
    alignItems: "center",
    marginTop: 65,
    marginBottom: 45,
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  timerLabel: {
    color: "#A5A2BD",
    fontSize: 13,
    marginTop: 8,
  },
  waveform: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 55,
  },
  waveBar: {
    width: 5,
    borderRadius: 5,
    backgroundColor: "#8B6CF6",
  },
  recordButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F04482",
    justifyContent: "center",
    alignItems: "center",
  },
  instruction: {
    color: "#A5A2BD",
    fontSize: 14,
    marginTop: 20,
  },
});
