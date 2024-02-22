import * as ContactsList from 'expo-contacts'
import { View, StyleSheet, Text } from "react-native"
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import ContactsListCmp from '../cmps/contact-list'
import { getRandomColor } from '../services/utils.service'

const Contacts = () => {
  const [contacts, setContacts] = useState(null)
  const [filterInput, setFilterInput] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await ContactsList.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await ContactsList.getContactsAsync({
          fields: [ContactsList.Fields.FirstName, ContactsList.Fields.LastName, ContactsList.Fields.PhoneNumbers, ContactsList.Fields.Image],
        })
        if (data.length > 0) {
          const sortedData = data.map((contact) => {
            return {
              _id: contact.id,
              firstName: contact.firstName,
              lastName: contact.lastName,
              imgUri: contact.imageAvailable ? contact.image.uri : null,
              phoneNumber: contact.phoneNumbers[0].number,
              section: contact.firstName[0].toLocaleUpperCase(),
              profileColor: getRandomColor()
            }
          }).sort((a, b) => a.section.localeCompare(b.section))
          setContacts(sortedData)
        }
      }
    })()
  }, [])

  const handleFilterChange = (txt) => {
    setFilterInput(txt)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <Text style={styles.header}>Contacts</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={handleFilterChange}
          value={filterInput}
          placeholder='Search contacts'
        />
        {contacts?.length > 0 && <ContactsListCmp contacts={contacts} filter={filterInput}/>}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  scrollContainer: {

  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,

  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#d6d6d6",
    borderRadius: 12
  },
})

export default Contacts