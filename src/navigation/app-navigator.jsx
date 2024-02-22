import { createStackNavigator } from "@react-navigation/stack"
import Contacts from "../pages/contacts"
import ContactDetail from "../pages/contact-detail"

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ContactDetail"
                component={ContactDetail}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default AppNavigator