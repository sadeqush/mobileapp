import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      refreshing: false,
      posts: []
    }
  }

  

  getposts(){

    fetch("http://stark.cse.buffalo.edu/cse410/blackhole/api/postcontroller.php", {
      method: "POST",
      body: JSON.stringify({
        action: "getPosts",
        max_posts: "25"
      })
    })
    .then(response => response.json())
    .then(json => {
        this.setState({
          isLoading: false,
          posts: json.posts
        }
          );
          })
  }

  componentDidMount() {
    // Check if there's a session when the app loads
    this.getposts();
  }

  onRefresh(){
    this.getposts();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh()} />}>
        
        {this.state.posts.map(post => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{post.post_text}</Text>
              <Text style={styles.cardDescription}>Written by: {post.name}</Text>
            </View>
        ))}

        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: "Home Page",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
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
    fontSize: 12,
    color: 'gray'
  }
});