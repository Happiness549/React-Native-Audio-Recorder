import * as WebBroswer from "expo-web-browser";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView } from "react-native";

export default function WebBrosweer() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof WebBroswer.openBrowserAsync>
  > | null>(null);

  useEffect(() => {}, []);

  const openWebBrowser = async () => {
    let result = await WebBroswer.openBrowserAsync("https://expo.dev");
    setResult(result);
  };

  return (
    <SafeAreaView>
      <Pressable onPress={() => openWebBrowser()}></Pressable>
    </SafeAreaView>
  );
}
