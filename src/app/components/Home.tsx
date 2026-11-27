
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Journal</Text>
        <Text style={styles.subtitle}>Your thoughts, your voice.</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Recordings</Text>
        <Text style={styles.recordingCount}>0 recordings</Text>
      </View>

      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎙️</Text>
        <Text style={styles.emptyTitle}>No recordings yet</Text>
        <Text style={styles.emptyText}>
          Start capturing your thoughts and memories with your voice.
        </Text>
      </View>

      <TouchableOpacity style={styles.recordButton} activeOpacity={0.8}>
        <Text style={styles.recordButtonText}>＋ Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151426",
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 35,
  },
  header: {
    marginBottom: 45,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#A5A2BD",
    fontSize: 15,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "600",
  },
  recordingCount: {
    color: "#A5A2BD",
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  emptyIcon: {
    fontSize: 55,
    marginBottom: 20,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  emptyText: {
    color: "#A5A2BD",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  recordButton: {
    backgroundColor: "#F04482",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  recordButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
