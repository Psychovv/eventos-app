import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import { EventListScreen } from "./src/screens/EventListScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <EventListScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
