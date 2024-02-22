import { Image, StyleSheet, Text, View } from "react-native"

const ContactPreview = ({ contact }) => {
  return (
    <View style={styles.contactPreview}>
      {contact.imgUri ?
        <Image source={{ uri: contact.imgUri }} style={styles.profileImg} />
        :
        <Text style={[styles.profileImg, { backgroundColor: contact.profileColor, opacity: 0.76 }]}>{contact.section}</Text>
      }
      <View style={styles.infoContainer}>
        <Text style={styles.contactName}>{contact.firstName} {contact.lastName}</Text>
        <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
  },
  contactPreview: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: "#d6d6d6"
  },
  contactName: {
  },
  contactPhone: {
    opacity: 0.5,
  },
  infoContainer: {
    marginLeft: 15
  }
})

export default ContactPreview