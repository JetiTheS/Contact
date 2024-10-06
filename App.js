import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contact, setContact] = useState({});
  console.log(contact);


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
      }
    }
  }
  return (
    <View style={styles.container}>

      <FlatList
        style={styles.listcontainer}

        renderItem={({ item }) =>
          <View >
            <Text style={{ fontSize: 18 }}>{item.name} {item.phoneNumbers ? item.phoneNumbers[0].number : undefined}</Text>
          </View>}
        data={contact} />
      <View style={styles.button}>
        <Button title="Get Contact" onPress={getContacts} />
      </View>
      <StatusBar />
    </View>

  );
}
//tornari osuuden nappasin täältä https://www.youtube.com/watch?v=PII2YRRhtI8&t=842s
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    marginTop: 50

  },
  button: {
    marginBottom: 50
  }
});
