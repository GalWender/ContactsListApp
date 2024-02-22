import * as ContactsList from 'expo-contacts'
import { utilService } from './utils.service'

const getContacts = async () => {
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
                    profileColor: utilService.getRandomColor()
                }
            })
            return sortedData
        }
    }


}

export const expoContactsService = {
    getContacts
}