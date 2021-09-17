import Contact from '../models/contact';

export async function addContact (userId, name, phone) {
    const newContact = await Contact.create({userId, name, phone}); 
	if (newContact) {
        return {
            result: newContact, error: "",
        }
    }

    return {result: null, error: "Failed to create contact"}
}

export async function getContacts (userId) {
    const contacts = await Contact.find({ userId }).exec();

    return {
        result: contacts,
        error: "",
    }
}

export async function deleteContact (id) {
    const deleted = await Contact.deleteOne({id}); 
	if (deleted) {
        return {
            result: deleted, error: "",
        }
    }

    return {result: null, error: "Failed to delete contact"}
}
