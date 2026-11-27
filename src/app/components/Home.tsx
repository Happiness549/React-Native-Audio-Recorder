
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";

type Recording = {
  id: string;
  name: string;
  uri: string;
  duration: number;
  date: string;
};

export const Home = () => {
  const router = useRouter();
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRecordings = async () => {
        try {
          const savedRecordings = await AsyncStorage.getItem("recordings");

          if (savedRecordings) {
            setRecordings(JSON.parse(savedRecordings));
          } else {
            setRecordings([]);
          }
        } catch (error) {
          console.log("Error loading recordings:", error);
        }
      };

      loadRecordings();
    }, [])
  );

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Journal</Text>
        <Text style={styles.subtitle}>Your thoughts, your voice.</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Recordings</Text>
        <Text style={styles.recordingCount}>
          {recordings.length} recordings
        </Text>
      </View>

      {recordings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎙️</Text>
          <Text style={styles.emptyTitle}>No recordings yet</Text>
          <Text style={styles.emptyText}>
            Start capturing your thoughts and memories with your voice.
          </Text>
        </View>
      ) : (
        <FlatList
          data={recordings}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.recordingCard}>
              <View style={styles.recordingIcon}>
                <Ionicons name="mic" size={22} color="#8B6CF6" />
              </View>

              <View style={styles.recordingInfo}>
                <Text style={styles.recordingName}>{item.name}</Text>
                <Text style={styles.recordingDate}>
                  {formatDate(item.date)}
                </Text>
              </View>

              <Text style={styles.duration}>
                {formatTime(item.duration)}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.recordButton}
        activeOpacity={0.8}
        onPress={() => router.push("/Record")}
      >
        <Text style={styles.recordButtonText}>＋ Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  list: {
    paddingBottom: 15,
  },
  recordingCard: {
    backgroundColor: "#25243B",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  recordingIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#302B4A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  recordingDate: {
    color: "#A5A2BD",
    fontSize: 12,
    marginTop: 5,
  },
  duration: {
    color: "#A5A2BD",
    fontSize: 13,
  },
  recordButton: {
    backgroundColor: "#F04482",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  recordButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
