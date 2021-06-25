import {Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const [links, setlinks] = useState([]);
  useEffect(() => {
    (async ()=>{
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`
    )
    const data = await response.json();
    console.log(data.photos);
    const link1 = data.photos;
    console.log(link1['photo'][2].url_s);
    console.log(typeof link1);
    // for(let i=0;i<link.length;i++){
    //   link1.push(link[i].url_s);
    //  }
    //const link3=link.url_s;
    setlinks(data.photos.photo);
    console.log(links);

    })()
    return ()=>{
      console.log(links);
    }
  },[]);

  return (
    <ScrollView
      contentContainerStyle={styles.container} scrollEnabled={true} >
      {
        links && links.map((link)=>{
      return(
        <View style={{padding:10}}>
        <Image source={{uri:`https://live.staticflickr.com/${link.server}/${link.id}_${link.secret}_m.jpg` }} 
        
        style={{
          width: 95,
          height: 95,
          }}
      /> 
        </View>      
    )})
      } 
    </ScrollView>
  );
};

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer style=       {styles.container1}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home',                     headerTitleAlign: 'left' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container1: {
    display:"flex",
    padding: 10,
    flexGrow:1,
    flexShrink:0,
    backgroundColor: '#000',
  },
  container:{
    display:"flex",
    padding: 15,
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"center",
  }
});

export default App;
