import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../routes/AppRoutes";
import { EventStatus } from "../types/types";
import { updateEventStatus } from "../services/eventService";

type EventDetailsRouteProp = RouteProp<
  RootStackParamList,
  "EventDetails"
>;

export function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const { event } = route.params;

  const [status, setStatus] = useState<EventStatus>(event.status);
  const [loading, setLoading] = useState(false);

  async function handleUpdateStatus(newStatus: EventStatus) {
    try {
      setLoading(true);

      await updateEventStatus(event.id, { status: newStatus });
      setStatus(newStatus);

      Alert.alert("Sucesso", "Status atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.label}>Data</Text>
      <Text>{event.date}</Text>

      <Text style={styles.label}>Local</Text>
      <Text>{event.location}</Text>

      <Text style={styles.label}>Status atual</Text>
      <Text>{status}</Text>

      <View style={styles.buttons}>
        <Button
          title="Planejado"
          onPress={() => handleUpdateStatus("PLANNED")}
          disabled={loading || status === "PLANNED"}
        />
        <Button
          title="Confirmado"
          onPress={() => handleUpdateStatus("CONFIRMED")}
          disabled={loading || status === "CONFIRMED"}
        />
        <Button
          title="Cancelado"
          onPress={() => handleUpdateStatus("CANCELLED")}
          disabled={loading || status === "CANCELLED"}
        />
      </View>
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
  buttons: {
    marginTop: 20,
    gap: 10,
  },
});
