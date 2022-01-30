import firebase from 'react-native-firebase';
import fireWeb from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import axios from 'axios'
import { API_KEY } from "@env"


export class Notifications {

    getAndSaveToken = async (name) => {
        var token = await this.getToken()
        if (token) this.saveToken(name, token)
    }

    setScheme = () => {
        fireWeb.database().ref('/deviceTokens').push({ name: 'string', token: 'string' })
    }


    saveToken = async (name, token) => {
        var tokenList = await fireWeb.database().ref('/deviceTokens').once('value')
        //var tokenList = resp.val()
        var found = false
        tokenList.forEach(item => { if (item.token == token) found = true })
        if (!found) fireWeb.database().ref('/deviceTokens').push({ name: name, token: token })
    }

    getToken = async () => {
        try {
            await firebase.messaging().requestPermission();
            var fcmToken = await firebase.messaging().getToken();
            console.log(`Device Token :: ${fcmToken}`)
            return fcmToken
        } catch (ex) {
            alert(`Permission Denied`)
            return false
        }
    }

    getTokenList = async () => {
        var firebaseTokens = await fireWeb.database().ref('/deviceTokens').once('value')
        //  var data = resp.val()
        var tokens = []
        firebaseTokens.forEach((item) => { tokens.push(item.val()) })
        return tokens
    }



    sendNotification = (data) => {
        // alert(`Data ::  ${JSON.stringify(data)}`)

        var config = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                'Authorization': `key=${API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }

        axios(config)
            .then((response) => {
                alert(`Notification Resp ::${JSON.stringify(response.data)}`)
            })
            .catch((error) => {
                alert(`Error :: ${error}`)
            })
    }

}



/*
  yarn add react-native-firebase
  react-native link react-native-firebase

  additional linking after autolinking

  @Main Application.java

     import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
     import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

     packages.add(new RNFirebaseNotificationsPackage());
     packages.add(new RNFirebaseMessagingPackage());


  @android/app/build.gradle
    implementation "com.google.firebase:firebase-auth:17.0.0"
    implementation 'com.google.firebase:firebase-core:16.0.1'
    implementation 'com.google.firebase:firebase-messaging:17.0.0'
    
    implementation 'com.google.firebase:firebase-database'

*/

