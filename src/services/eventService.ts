import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import { Event, UpdateEventDTO, CreateEventDTO } from "../types/types";

const STORAGE_KEY = "@eventos_app:lista_eventos";

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await api.get<Event[]>("/events");
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    throw error;
  }
}

export async function createEvent(data: CreateEventDTO): Promise<Event> {
  const response = await api.post<Event>("/events", data);
  return response.data;
}

export async function updateEventStatus(
  id: string,
  data: UpdateEventDTO
): Promise<Event> {
  const response = await api.put<Event>(`/events/${id}`, data);
  return response.data;
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/events/${id}`);
}