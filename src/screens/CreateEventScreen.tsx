import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../routes/AppRoutes";
import { EventStatus, CreateEventDTO } from "../types/types";
import { createEvent } from "../services/eventService";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventList"
>;

export function CreateEventScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<EventStatus>("PLANNED");
  const [loading, setLoading] = useState(false);

  async function handleCreateEvent() {
    console.log("Tentando criar evento:", { title, date, location, status });

    if (!title || !date || !location) {
      Alert.alert("Atenção", "Preenche tudo aí, por favor.");
      return;
    }

    const newEvent: CreateEventDTO = {
      title,
      date,
      location,
      status,
    };

    try {
      setLoading(true);
      await createEvent(newEvent); 
      console.log("Evento criado com sucesso!");
      Alert.alert("Boa!", "Evento criado.");
      navigation.goBack();
    } catch (error) {
      console.log("Deu ruim ao criar:", error);
      Alert.alert("Erro", "Não deu pra criar o evento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="AAAA-MM-DD"
      />

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusButtons}>
        <Button
          title="Planejado"
          color={status === "PLANNED" ? "#007AFF" : "#ccc"}
          onPress={() => setStatus("PLANNED")}
        />
        <Button
          title="Confirmado"
          color={status === "CONFIRMED" ? "#007AFF" : "#ccc"}
          onPress={() => setStatus("CONFIRMED")}
        />
        <Button
          title="Cancelado"
          color={status === "CANCELLED" ? "#007AFF" : "#ccc"}
          onPress={() => setStatus("CANCELLED")}
        />
      </View>

      <View style={styles.createButton}>
        <Button
          title={loading ? "Salvando..." : "Salvar"}
          onPress={handleCreateEvent}
          disabled={loading}
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
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  statusButtons: {
    marginTop: 10,
    gap: 10,
  },
  createButton: {
    marginTop: 30,
  },
});