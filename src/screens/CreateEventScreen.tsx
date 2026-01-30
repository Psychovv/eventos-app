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
import { ZodError } from "zod";

import { RootStackParamList } from "../routes/AppRoutes";
import { EventStatus, CreateEventDTO } from "../types/types";
import { createEvent } from "../services/eventService";
import { createEventSchema } from "../validators/createEventSchema";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventList"
>;

type FormErrors = {
  title?: string;
  date?: string;
  location?: string;
};

export function CreateEventScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<EventStatus>("PLANNED");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleCreateEvent() {
    setErrors({});

    const newEvent: CreateEventDTO = {
      title,
      date: new Date(date).toISOString(),
      location,
      status,
    };

    try {
      createEventSchema.parse(newEvent);

      setLoading(true);
      await createEvent(newEvent);

      Alert.alert("Boa!", "Evento criado.");
      navigation.goBack();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: FormErrors = {};

        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof FormErrors;
          fieldErrors[fieldName] = err.message;
        });

        setErrors(fieldErrors);
        return;
      }

      Alert.alert("Erro", "Não deu pra criar o evento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[
          styles.input,
          errors.title && styles.inputError,
        ]}
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title}</Text>
      )}

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={[
          styles.input,
          errors.date && styles.inputError,
        ]}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />
      {errors.date && (
        <Text style={styles.errorText}>{errors.date}</Text>
      )}

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={[
          styles.input,
          errors.location && styles.inputError,
        ]}
        value={location}
        onChangeText={setLocation}
      />
      {errors.location && (
        <Text style={styles.errorText}>
          {errors.location}
        </Text>
      )}

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
    backgroundColor: "#fff",
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
  statusButtons: {
    marginTop: 10,
    gap: 10,
  },
  createButton: {
    marginTop: 30,
  },
});
