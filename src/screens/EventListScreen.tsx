import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { api } from "../services/api";
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
      setLoading(true);
      setError(false);

      const response = await api.get<Event[]>("/events");
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
 
  //elemento teste mudar talvez****
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
        onChangeText={handleSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
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
