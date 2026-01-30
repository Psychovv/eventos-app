import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZodError } from "zod";

import { RootStackParamList } from "../routes/AppRoutes";
import { EventStatus } from "../types/types";
import { createEvent } from "../services/eventService";
import { createEventSchema } from "../validators/createEventSchema";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "EventList">;

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

  
  function handleDateChange(text: string) {
    const cleaned = text.replace(/\D/g, ""); 
    let formatted = cleaned;

    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${formatted}-${cleaned.slice(6, 8)}`;
    }

    setDate(formatted);
  }

  async function handleCreateEvent() {
    setErrors({});

    
    const rawData = {
      title,
      date,
      location,
      status,
    };

    try {
      
      createEventSchema.parse(rawData);

      setLoading(true);

      
      await createEvent({
        ...rawData,
        date: new Date(date).toISOString(),
      });

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
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        value={title}
        onChangeText={setTitle}
        placeholder="Nome do evento"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={[styles.input, errors.date && styles.inputError]}
        value={date}
        onChangeText={handleDateChange}
        placeholder="YYYY-MM-DD"
        keyboardType="numeric"
        maxLength={10}
      />
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={[styles.input, errors.location && styles.inputError]}
        value={location}
        onChangeText={setLocation}
        placeholder="Onde vai ser?"
      />
      {errors.location && (
        <Text style={styles.errorText}>{errors.location}</Text>
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
          title={loading ? "Salvando..." : "Salvar Evento"}
          onPress={handleCreateEvent}
          disabled={loading}
        />
      </View>
    </ScrollView>
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
    marginBottom: 40,
  },
});