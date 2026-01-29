import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { EventListScreen } from "../screens/EventListScreen";
import { EventDetailsScreen } from "../screens/EventDetailsScreen";
import { CreateEventScreen } from "../screens/CreateEventScreen";
import { Event } from "../types/types";

export type RootStackParamList = {
  EventList: undefined;
  EventDetails: { event: Event };
  CreateEvent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{ title: "Eventos" }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ title: "Detalhes do Evento" }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{ title: "Novo Evento" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
