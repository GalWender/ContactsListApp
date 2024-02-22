import { StyleSheet, Text, View } from "react-native"
import ContactPreview from "./contact-preview"

const ContactListCmp = ({contacts}) => {

    const renderContactsBySection = () => {
        if (!contacts) return null

        const sections = {}
        contacts.forEach((contact) => {
            const section = contact.section
            if (!sections[section]) {
                sections[section] = []
            }
            sections[section].push(contact)
        })

        return Object.keys(sections).map((section, idx) => (
            <View key={idx}>
                <Text style={styles.section}>{section}</Text>
                {sections[section].map((contact, idx) => (
                    <ContactPreview key={idx} contact={contact}/>
                ))}
            </View>
        ))
    }

    return (
        <View>
            {renderContactsBySection()}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 5,
        marginTop: 8,
      },
})
export default ContactListCmp