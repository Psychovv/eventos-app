import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getEvents } from "../services/eventService";
import { Event } from "../types/types";
import { RootStackParamList } from "../routes/AppRoutes";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventList"
>;

export function EventListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchEvents() {
    try {
      console.log("Buscando eventos na API...");
      setLoading(true);
      setError(false);

      const data = await getEvents();
      console.log("Eventos carregados:", data.length);
      setEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      console.log("Erro no fetch:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  function handleSearch(text: string) {
    setSearch(text);

    if (!text.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredEvents(filtered);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Deu erro ao carregar.</Text>
        <Button title="Tentar de novo" onPress={fetchEvents} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Evento"
        onPress={() => navigation.navigate("CreateEvent")}
      />

      <TextInput
        placeholder="Pesquisar..."
        value={search}
        onChangeText={handleSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nada por aqui.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("EventDetails", { event: item })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 16,
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#eee"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});