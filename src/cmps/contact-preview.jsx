import { StyleSheet, Text, View } from "react-native"

const ContactPreview = ({contact}) => {
    return (
        <View style={styles.container}>
          <Text>{contact.name}</Text>
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

export default ContactPreview