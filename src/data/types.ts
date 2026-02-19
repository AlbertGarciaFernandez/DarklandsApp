export interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: string;
  area: string;
  start?: string; // HH:mm
  end?: string; // HH:mm
  description?: string;
  isFavorite?: boolean;
}

export type RootStackParamList = {
  MainStatus: undefined;
  EventDetails: { eventId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Agenda: undefined;
  MyAgenda: undefined;
  Admin: undefined;
};
