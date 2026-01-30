import { api } from "./api";
import { Event, UpdateEventDTO, CreateEventDTO } from "../types/types";

export async function getEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>("/events");
  return response.data;
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