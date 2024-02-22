import { StyleSheet, Text, View } from "react-native"
import ContactPreview from "./contact-preview"
import { useEffect, useState } from "react"

const ContactListCmp = ({ contacts, filter }) => {

    const [filterdContacts, setFilteredContacts] = useState(null)


    useEffect(() => {
        const filteredContacts = contacts?.filter((contact) =>
            `${contact.firstName}${contact.lastName}`?.toLowerCase().includes(filter?.toLowerCase())
            ||
            contact.phoneNumber.includes(filter)
        )
        if(filterdContacts) {
            setFilteredContacts(filteredContacts)
        }
        else {
            setFilteredContacts(contacts)
        }
    }, [filter])

    const renderContactsBySection = () => {
        if (!filterdContacts) return null

        const sections = {}
        filterdContacts.forEach((contact) => {
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
                    <ContactPreview key={idx} contact={contact} />
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