import { StyleSheet, Text, Pressable, Image, View, Dimensions} from "react-native";
import { Themes } from "../../assets/Themes";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListItem ({externalURL, previewURL, imageURL, name, artist, album, duration}) {;
    const navigation = useNavigation();
    return (
    <Pressable 
        onPress={(e) => {
            e.stopPropagation();
            navigation.navigate("Song Details", {externalURL: externalURL})
            }}
    >
     <View style={styles.item}>
        <Pressable onPress ={() => navigation.navigate("Song Preview", {previewURL: previewURL} )}>
            <Ionicons name="play-circle" size={windowWidth * 0.052} style={styles.playButton} color={Themes.colors.spotify} />
        </Pressable>
        <Image style={styles.albumCover} source={{uri:imageURL}}/>
        <View style={styles.song_artist}>
            <Text numberOfLines={1} style={styles.text}>{name}</Text>
            <Text numberOfLines={1} style={[styles.text, styles.lowOpacity]}>{artist}</Text>
        </View>
       <Text numberOfLines={1} style={[styles.text,styles.albumText]}>{album}</Text>
       <Text style={styles.duration}>{duration}</Text>
     </View>
    </Pressable>
    
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        width: windowWidth,
        height: 0.08 * windowHeight,
        alignItems: "center",
        marginTop: 8,
        marginBottom:8,
    },
    playButton: {
        flex: 0.4,
        marginLeft: windowWidth * 0.05,
        marginRight: 12,
    },
    duration: {
        fontSize: windowWidth * 0.032 ,
        color: Themes.colors.white,
        opacity: 0.6,
        marginLeft: 12,
        marginRight: windowWidth * 0.05,
    },
    albumCover: {
        height:'100%',
        flex: 1,
        resizeMode: "contain",
    },
    song_artist: {
        flex: 2,
        marginRight: 12,
        marginLeft: 12,
        justifyContent: 'center',
    },
    text: {
        fontSize: windowWidth * 0.032 ,
        color: Themes.colors.white,
    },
    lowOpacity: {
        opacity: 0.6,
    },
    albumText: {
        flex: 1,
    }
  });
  