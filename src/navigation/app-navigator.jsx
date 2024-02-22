import { createStackNavigator } from "@react-navigation/stack"
import Contacts from "../pages/contacts"
import ContactDetail from "../pages/contact-detail"

const Stack = createStackNavigator()

const routes = [
    {
        name: "Contacts",
        component: Contacts,
        options: { headerShown: false }
    },
    {
        name: "ContactDetail",
        component: ContactDetail,
        options: { headerShown: false }
    }
]

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            {routes.map((route) =>
                <Stack.Screen
                    name={route.name}
                    component={route.component}
                    options={route.options}
                />
            )}

        </Stack.Navigator>
    )
}

export default AppNavigator