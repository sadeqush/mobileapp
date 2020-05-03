import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';


import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function Profile() {

    //All the states
    const [name, setName] = useState("Bleh");
    const [userid, setUserid] = useState("1");


    //Getting Userid
    SecureStore.getItemAsync('user').then(returnValue => {
        setUserid(returnValue)
      });




    //Getting Name from Userid
    fetch("http://stark.cse.buffalo.edu//cse410/blackhole/api/usercontroller.php", {
        method: "post",
        body: JSON.stringify({
              action: "getUsers",
              userid: userid
        })
      }).then(res => res.json())
      .then(
          (results) => {
            setName(results.users[0].name);
          }
      )






  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Ionicons style={styles.icon} name="md-people-circle-icon" size={80} color="#a4a4a4" />
      <OptionButton
        icon="md-man"
        label={"Name: " + name}
      />
    <OptionButton
        icon="md-people"
        label={"User ID: " + userid}
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  icon: {
    alignItems: "center",
    padding: 20,
    marginLeft: 140,
    marginRight: 140,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
