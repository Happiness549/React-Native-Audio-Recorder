
import { useAudioRecorder, useAudioRecorderState, RecordingPresets, AudioModule, setAudioModeAsync } from "expo-audio";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RecordingScreen() {
  const router = useRouter();

  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    directory: "document",
  });

  const recorderState = useAudioRecorderState(audioRecorder);
  const [hasSaved, setHasSaved] = useState(false);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const permission =
        await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow microphone access to record audio."
        );
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setHasSaved(false);
    } catch (error) {
      Alert.alert("Recording error", "Could not start recording.");
      console.log(error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setHasSaved(true);

      Alert.alert(
        "Recording saved",
        "Your voice recording has been saved successfully."
      );
    } catch (error) {
      Alert.alert("Recording error", "Could not save your recording.");
      console.log(error);
    }
  };

  const handleRecordButton = () => {
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (recorderState.isRecording) {
            Alert.alert(
              "Recording in progress",
              "Stop your recording before leaving this screen."
            );
            return;
          }

          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>New Recording</Text>
        <Text style={styles.subtitle}>Capture your thoughts</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {formatTime(recorderState.durationMillis)}
          </Text>

          <Text style={styles.timerLabel}>
            {recorderState.isRecording
              ? "Recording in progress"
              : hasSaved
                ? "Recording saved"
                : "Recording time"}
          </Text>
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

        <TouchableOpacity
          style={[
            styles.recordButton,
            recorderState.isRecording && styles.stopButton,
          ]}
          onPress={handleRecordButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name={recorderState.isRecording ? "stop" : "mic"}
            size={35}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.instruction}>
          {recorderState.isRecording
            ? "Tap to stop recording"
            : "Tap to start recording"}
        </Text>
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
  stopButton: {
    backgroundColor: "#D93636",
  },
  instruction: {
    color: "#A5A2BD",
    fontSize: 14,
    marginTop: 20,
  },
});
