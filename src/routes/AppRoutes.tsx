import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { EventListScreen } from "../screens/EventListScreen";
import { EventDetailsScreen } from "../screens/EventDetailsScreen";
import { Event } from "../types/types";

export type RootStackParamList = {
  EventList: undefined;
  EventDetails: { event: Event };
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
