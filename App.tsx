import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


Notifications.addNotificationReceivedListener(notification => {
  Alert.alert(JSON.stringify(notification));
});

Notifications.addNotificationResponseReceivedListener(notification => {
  Alert.alert(JSON.stringify(notification));
});




export default function App() {
  const notificationListener = useRef();
  const [token, setToken] = useState('');

  const notification = Notifications.useLastNotificationResponse()
  console.log(notification);

  useEffect(() => {

  }, []);
  

  useEffect(() => {
    const initNotifications =  async () => {
      await Notifications.requestPermissionsAsync()
      const expoToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(expoToken);
      setToken(expoToken);

      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    };

    initNotifications();
  }, []);

  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
