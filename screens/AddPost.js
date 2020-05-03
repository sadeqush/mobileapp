import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor() {
    super()

    this.state = {
        posttexti: "post",
        sessionid: "0",
        posted: false,
        response: "",
        userid: "12",
        successmessage: ""
    }
  }

  getsessionid(){
    SecureStore.getItemAsync('session').then(returnValue => {
        this.setState({sessionid: returnValue})
      });
  }

  getuserid(){
    SecureStore.getItemAsync('user').then(returnValue => {
        this.setState({userid: returnValue})
      });

  }

  makepost(){
    fetch("http://stark.cse.buffalo.edu/cse410/blackhole/api/postcontroller.php", {
      method: "POST",
      body: JSON.stringify({
        action: "addOrEditPosts",
        user_id : this.state.userid,
        userid : this.state.userid,
        session_token : this.state.sessionid,
        posttext : this.state.posttexti,
        posttype : "post"
      })
    })
    .then(response => response.json())
    .then(res => {
        this.setState({
          posted: true,
          response: res.Status,
          successmessage: "You post was successfully posted!"
        }
          );
          })
  }

  componentDidMount() {
    // Check if there's a session when the app loads
    this.getsessionid();
    this.getuserid();
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.loginText}>Over here you can add a new post.</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ posttexti: text })}        />
        <Button title="Submit Post" style={styles.submitb} onPress={() => this.makepost()} />
        <Text style={styles.success}>{this.state.successmessage}</Text>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: "Add A Post",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    padding: 20,
    height: 1000
  },
  success: {
    color: 'green',
    padding: 20,
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  loginText: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "left",
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 20
  },
  submitb:{
      padding: 15,
      marginBottom: 50

  },
  card: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  cardDescription: {
    fontSize: 12
  }
});