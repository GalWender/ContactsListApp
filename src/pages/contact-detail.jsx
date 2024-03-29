import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from "react"
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { expoContactsService } from '../services/exoContacts.service'


const ContactDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params
    const [contact, setContact] = useState(null)

    useEffect(() => {
        (async () => {
            try {
              const sortedContacts = await expoContactsService.getContacts()
              const filterdContact = sortedContacts.find((contact) => contact._id === id)
              setContact(filterdContact)
            }
            catch (err) {
              console.log('there was an error retrieving contacts', err);
            }
          })()
    }, [])

    const handleBack = () => {
        navigation.navigate('Contacts')
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={handleBack}
            >
                <Image style={styles.backImg} source={require("../../assets/img/arrow-left.png")} />
            </TouchableOpacity>
            <View style={styles.profileImgContainer}>
                {contact?.imgUri ?
                    <Image source={{ uri: contact.imgUri }} style={styles.profileImg} />
                    :
                    <Text style={[styles.profileText, { backgroundColor: contact?.profileColor, opacity: 0.76 }]}>{contact?.section}</Text>
                }
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{contact?.firstName? contact?.firstName : ""} {contact?.lastName? contact.lastName : ""}</Text>
            </View>
            <View style={styles.contactInfoContainer}>
                <Text style={styles.contactInfo}>Contact info</Text>
                <Text style={styles.phoneNumberTxt}>{contact?.phoneNumber}</Text>
                <Text style={styles.mobileTitleTxt}>Mobile</Text>
            </View>
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
    backBtn: {

    },
    backImg: {
        width: 30,
        height: 30,
        marginVertical: 30,
    },
    profileImgContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    profileImg: {
        borderRadius: 100,
        width: 100,
        height: 100,
      },
      profileText:{
        borderRadius: 100,
        width: 100,
        height: 100,
        textAlign: "center",
        lineHeight: 100,
        fontSize:35,
        fontWeight: 700,
      },
      nameContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
      },
      name:{
        fontSize:35,
        fontWeight:"600"
      },
      contactInfo:{
        fontSize:15,
        fontWeight:"500",
      },
      contactInfoContainer: {
        // width:100,
        // height:100,
        padding:20,
        backgroundColor: "#d6d6d6",
        borderRadius:12,
      },
      phoneNumberTxt:{
        marginVertical:10,
        fontSize:14,
      },
      mobileTitleTxt:{
        fontSize:12,
        fontWeight:"500"
      }
})

export default ContactDetail