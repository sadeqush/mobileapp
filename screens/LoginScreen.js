import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    // Initialize our login state
    this.state = {
      email: '',
      password: '',
      title: 'Login'
    }

    console.log(props)
  }
  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {

    fetch("http://stark.cse.buffalo.edu/cse410/blackhole/api/SocialAuth.php", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(json => {
        console.log(`Logging in with session token: ${json.user.session_token}`)
        SecureStore.setItemAsync('session', json.user.session_token).then(() => {
        this.props.route.params.onLoggedIn();
        this.setState({title: 'Logged in!'});
      })
    })
    
  }

  render() {
    const { email, password } = this.state

    // this could use some error handling!
    // the user will never know if the login failed.
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>{this.state.title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <Button title="Submit" onPress={() => this.onSubmit()} />
      </View>
    );
  }
}

// Our stylesheet, referenced by using styles.container or styles.loginText (style.property)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 30
  },
  loginText: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  }
});