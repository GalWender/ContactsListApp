import * as ContactsList from 'expo-contacts'
import { View, StyleSheet, Text } from "react-native"
import { useEffect } from 'react';

const Contacts = () => {

    useEffect(()=>{
        (async () => {
          const { status } = await ContactsList.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await ContactsList.getContactsAsync({
              fields: [ContactsList.Fields.FirstName],
            });
    
            if (data.length > 0) {
              const contact = data[0];
              console.log(contact);
            }
          }
        })()
      },[])
    
    return (
        <View>
          <Text>helldddo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  })

export default Contacts