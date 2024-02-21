import { createStackNavigator } from "@react-navigation/stack"
import Contacts from "../pages/contacts"

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default AppNavigator