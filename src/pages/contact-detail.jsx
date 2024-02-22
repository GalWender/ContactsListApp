import { useNavigation, useRoute } from '@react-navigation/native'
import * as ContactsList from 'expo-contacts'
import { useEffect, useState } from "react"
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getRandomColor } from '../services/utils.service'


const ContactDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params
    const [contact, setContact] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await ContactsList.requestPermissionsAsync()
            if (status === 'granted') {
                const { data } = await ContactsList.getContactsAsync({
                    fields: [ContactsList.Fields.FirstName, ContactsList.Fields.LastName, ContactsList.Fields.PhoneNumbers, ContactsList.Fields.Image],
                })
                if (data.length > 0) {
                    const filterdContact = data.map((contact) => {
                        return {
                            _id: contact.id,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            imgUri: contact.imageAvailable ? contact.image.uri : null,
                            phoneNumber: contact.phoneNumbers[0].number,
                            section: contact.firstName[0].toLocaleUpperCase(),
                            profileColor: getRandomColor()
                        }
                    }).find((contact) => contact._id === id)
                    setContact(filterdContact)
                }
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