import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class Postcard extends Component {

   constructor(props) {
    super(props);
    this.state = {
       light_theme: true
    }
  }

   componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      })
  }

  render() {
      return (
          <TouchableOpacity style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("Postscreen", {
              post: this.props.post
            })
          }
        >
         <View  style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
         <View style={styles.authorImageContainer}>
         <Image source={require("../assets/profile_img.png")}
         style={styles.profileImage}/>
         </View>
         <View style={this.state.light_theme
         ?styles.authorNameContainerLight
         :styles.authorNameContainer}>
         <Text style={this.state.light_theme
         ?styles.authorNameTextLight
         :styles.authorNameText}>{this.props.post.author}</Text>
         </View>
         </View>
          <Image source={require("../assets/post.jpeg")}
         style={styles.postImage}/>
         <View style={styles.captionContainer}>
         <Text style={this.state.light_theme
         ?styles.captionTextLight
         :styles.captionText}>{this.props.post.caption}</Text>
         </View>
         <View style={styles.actionContainer}>
         <View style={styles.likeButton}>
         <Ionicons name={"heart"}size={30}color={"white"}
          style={{width:30,margionLeft:20,margionTop:5}}/>
         <Text style={this.state.light_theme?styles.likeTextLight:styles.likeText}>12k</Text>
        </View>
        </View>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileImage:{
    width:RFValue(20),
    height:RFValue(20)
  },
  cardContainer: {
    margin: RFValue(15),
    backgroundColor: "#2f345d",
    width:RFValue(160),
    height:RFValue(40),
    justifyContent:"center"
  },
  authorImageContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  authorNameContainer: {
    fontSize: RFValue(20),
    color: "white"
  },
  authorNameText: {
    fontSize: RFValue(25),
    color: "white"
  },
  captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
    authorNameContainerLight: {
    fontSize: RFValue(20),
    color: "white"
  },
  authorNameTextLight: {
    fontSize: RFValue(25),
    color: "white"
  },
  captionTextLight: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  captionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  actionContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
   likeTextLight: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  postImage:{
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  }
});
