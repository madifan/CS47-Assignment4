import { StyleSheet, SafeAreaView, Text, Pressable, Image, View, FlatList, Dimensions } from "react-native";
import { useSpotifyAuth, millisToMinutesAndSeconds } from "./utils";
import { Themes } from "./assets/Themes";
import ListItem from "./app/components/ListItem";
import AuthButton from "./app/components/AuthButton"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from "react-native-webview"

import 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const renderListItem = ({item}) => (
    <ListItem 
      externalURL = {item.external_urls.spotify}
      previewURL = {item.preview_url}
      imageURL={item.album.images[0].url}
      name = {item.name}
      artist= {item.artists[0].name}
      album= {item.album.name}
      duration = {millisToMinutesAndSeconds(item.duration_ms)}
      index = {item.track_number}
    />
);

const List = ({data}) => (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style = {styles.spotifyIcon} source={require("./assets/spotify-logo.png")}/>
        <Text style= {styles.headerTitle}>My Top Tracks</Text>
      </View>
      <FlatList 
        data = {data}
        renderItem = {(item) => renderListItem(item)}
        keyExtractor = {(item) => item.name}
      /> 
       
    </View>
);

function MainScreen({ navigation }) {
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth(true);
  let contentDisplayed;
  if (token) {
		contentDisplayed = <List data={tracks}/>
	} else {
		contentDisplayed = <AuthButton authFunction={getSpotifyAuth}/>
	}
  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

function DetailedSongScreen ({route}){
  const {externalURL} = route.params;
  return (
    <WebView source = {{uri: externalURL}}/>
  );
}

function SongPreviewScreen ({route}){
  const {previewURL} = route.params;
  return (
    <WebView source={{uri: previewURL}}/>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Screen" options={{headerShown: false}} component={MainScreen} />
        <Stack.Screen name="Song Details" component={DetailedSongScreen} 
        options={{
          headerStyle:{
            backgroundColor: Themes.colors.background,
          },
          headerTitleStyle: {
            color: Themes.colors.white,
          },
          }}/>
        <Stack.Screen name="Song Preview" component={SongPreviewScreen} 
        options={{
          headerStyle:{
            backgroundColor: Themes.colors.background,
          },
          headerTitleStyle: {
            color: Themes.colors.white,
          },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    height: windowHeight * 0.08,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Themes.colors.white,
    fontWeight: 'bold',
    fontSize: windowWidth * 0.05
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
