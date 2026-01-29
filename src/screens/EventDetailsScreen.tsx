import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../routes/AppRoutes";

type EventDetailsRouteProp = RouteProp<
  RootStackParamList,
  "EventDetails"
>;

export function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.label}>Data</Text>
      <Text>{event.date}</Text>

      <Text style={styles.label}>Local</Text>
      <Text>{event.location}</Text>

      <Text style={styles.label}>Status</Text>
      <Text>{event.status}</Text>

      <Text style={styles.label}>Criado em</Text>
      <Text>{event.createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: "bold",
  },
});
