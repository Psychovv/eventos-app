export type EventStatus = "PLANNED" | "CONFIRMED" | "CANCELLED";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: EventStatus;
  createdAt: string;
}

export interface CreateEventDTO {
  title: string;
  date: string;
  location: string;
  status: EventStatus;
}

export interface UpdateEventDTO {
  status: EventStatus;
}
