import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../routes/AppRoutes";
import { EventStatus } from "../types/types";
import { updateEventStatus, deleteEvent } from "../services/eventService";

type EventDetailsRouteProp = RouteProp<
  RootStackParamList,
  "EventDetails"
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventDetails"
>;

export function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { event } = route.params;

  const [status, setStatus] = useState<EventStatus>(event.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleUpdateStatus(newStatus: EventStatus) {
    console.log("Mudando status para:", newStatus);
    try {
      setUpdatingStatus(true);
      await updateEventStatus(event.id, { status: newStatus });
      setStatus(newStatus);
      Alert.alert("Sucesso", "Status atualizado!");
    } catch {
      Alert.alert("Erro", "Não deu pra mudar o status.");
    } finally {
      setUpdatingStatus(false);
    }
  }

  function handleDeleteEvent() {
    Alert.alert(
      "Excluir",
      "Quer mesmo apagar esse evento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            console.log("Apagando evento ID:", event.id);
            try {
              setDeleting(true);
              await deleteEvent(event.id);
              Alert.alert("Pronto", "Evento apagado.");
              navigation.goBack();
            } catch (error) {
              console.log("Erro ao apagar:", error);
              Alert.alert("Erro", "Não deu pra apagar.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
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
          disabled={updatingStatus || status === "PLANNED"}
        />
        <Button
          title="Confirmado"
          onPress={() => handleUpdateStatus("CONFIRMED")}
          disabled={updatingStatus || status === "CONFIRMED"}
        />
        <Button
          title="Cancelado"
          onPress={() => handleUpdateStatus("CANCELLED")}
          disabled={updatingStatus || status === "CANCELLED"}
        />
      </View>

      <View style={styles.deleteButton}>
        <Button
          title={deleting ? "Apagando..." : "Apagar Evento"}
          color="red"
          onPress={handleDeleteEvent}
          disabled={deleting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  deleteButton: {
    marginTop: 30,
  },
});