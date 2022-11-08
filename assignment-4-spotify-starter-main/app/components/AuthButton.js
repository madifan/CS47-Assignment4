import { StyleSheet, SafeAreaView, Text, Pressable, Image, View, Dimensions, FlatList } from "react-native";
import { useSpotifyAuth, millisToMinutesAndSeconds } from "../../utils";
import { Themes } from "../../assets/Themes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AuthButton ({authFunction}) {
	return (
    <Pressable style={styles.Button} onPress = {authFunction}>
      <Image style = {styles.spotifyIcon} source={require("../../assets/spotify-logo.png")}/> 
      <Text style={styles.buttonText}>CONNECT WITH SPOTIFY</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  Button: {
    backgroundColor: Themes.colors.spotify,
    padding: windowWidth * 0.016,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999 ,
  },
  spotifyIcon: {
    height: windowWidth * 0.048,
    width: windowWidth * 0.048,
    marginRight: windowWidth * 0.02,
  },
  buttonText: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize:windowHeight * 0.02,
  },

});
