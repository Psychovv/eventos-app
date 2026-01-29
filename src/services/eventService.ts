import { api } from "./api";
import { Event, UpdateEventDTO } from "../types/types";

export async function getEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>("/events");
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
