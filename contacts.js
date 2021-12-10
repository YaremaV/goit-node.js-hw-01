const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const result = data.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const idx = data.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newContacts = data.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return data[idx];
  } catch (error) {
    console.log(error.message);
  }
  // const remove = data.splice(idx, 1);
  // await listContacts(data);
  // return remove;
}

async function addContact(name, email, phone) {
  try {
    const newObj = { id: v4(), name, email, phone };
    const list = await listContacts();
    const newList = [...list, newObj];
    fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    return newObj;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
