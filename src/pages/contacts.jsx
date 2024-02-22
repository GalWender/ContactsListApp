import { View, StyleSheet, Text } from "react-native"
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import ContactsListCmp from '../cmps/contact-list'
import { expoContactsService } from '../services/exoContacts.service'

const Contacts = () => {
  const [contacts, setContacts] = useState(null)
  const [filterInput, setFilterInput] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const sortedContacts = await expoContactsService.getContacts()
        sortedContacts.sort((a, b) => a.section.localeCompare(b.section))
        setContacts(sortedContacts)
      }
      catch (err) {
        console.log('there was an error retrieving contacts', err);
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
        {contacts?.length > 0 && <ContactsListCmp contacts={contacts} filter={filterInput} />}
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