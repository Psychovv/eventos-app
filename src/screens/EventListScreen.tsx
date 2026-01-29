import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";

import { api } from "../services/api";
import { Event } from "../types/types";

export function EventListScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get<Event[]>("/events");
      setEvents(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!search.trim()) {
      return events;
    }

    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, events]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar eventos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar evento pelo título"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 16,
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
