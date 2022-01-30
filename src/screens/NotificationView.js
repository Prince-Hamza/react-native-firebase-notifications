import { View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex } from '../styles/styles'
import { Notifications } from '../firebase/Notifications';
const Notify = new Notifications()

const NotificationView = () => {

    const [tokenList, setTokenList] = useState([])
    const [done, setDone] = useState(false)
    const [selectedToken, setSelectedToken] = useState('')



    const [notificationData, setNotificationData] = useState(
        {
            notification:
            {
                title: 'title',
                body: 'notification description',
                click_action: 'https://www.google.com'
            },
            to: ''
        }
    )



    useEffect(() => {
        const init = async () => {
            var tokens = await Notify.getTokenList()
            setTokenList(tokens)
            setDone(true)
        }


        init()

    }, [])

    const updateNotificationData = (attrib, value) => {
        if (attrib !== 'to') notificationData['notification'][attrib] = value
        if (attrib == 'to') notificationData['to'] = value
        setNotificationData(notificationData)
    }

    const sendNotification = () => {
        if (selectedToken == '') alert('No Device Token Selected')
        if (selectedToken !== ''  && notificationData) {
            notificationData.to = selectedToken
            Notify.sendNotification(notificationData)
        }
    }

    const selectToken = (token) => {
        setSelectedToken(token)
       // alert(selectedToken)
    }

    if (done == true) {
        return (
            <View style={{ ...Flex.column, width: '100%' }}>

                <View style={{ ...Styles.Input, marginBottom: 55 }}>
                    <TextInput style={Styles.Input} placeholder={'Title'} onChangeText={(text) => updateNotificationData('title', text)} />
                    <TextInput style={Styles.Input} placeholder={'Description'} onChangeText={(text) => updateNotificationData('body', text)} />
                    <TextInput style={Styles.Input} placeholder={'Redirect Url'} onChangeText={(text) => updateNotificationData('click_action', text)} />
                    <TextInput style={Styles.Input} value={selectedToken} placeholder={'Device Token'} onChangeText={(text) => updateNotificationData('to', text)} />
                    <Button title={'Send Notification'} onPress={() => { sendNotification() }} ></Button>
                </View>


                <Text> click on a token to select</Text>

                <View style={{ ...Flex.column, width: '100%' }}>
                    <FlatList
                        data={tokenList}
                        renderItem={({ item }) => <ListItem item={item} select={selectToken} />}
                        keyExtractor={item => Math.random()}
                    />
                </View>

            </View >
        )
    }


    return null

}

export default NotificationView;


const ListItem = (props) => {
    return (
        <View style={{ ...Flex.row, ...Flex.justifyRow.center, height: 100 }}>
            <Text onPress={() => { props.select(props.item.token) }} > {props.item.name}</Text>
            <Text onPress={() => { props.select(props.item.token) }} > {props.item.token.substring(0, 25)}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    Input: {
        backgroundColor: 'whitesmoke',
        width: '90%'
    }
})