import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import { AppRoutes } from "./src/routes/AppRoutes";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppRoutes />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
