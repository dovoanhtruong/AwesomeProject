import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Alert, FlatList, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

export const LoginScreen = props => {
    const {
        navigation
    } = props;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false);
    const [visibleTrue, setVisibleTrue] = useState(false);


    const onLogin = () => {
        const option = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }
        fetch('http://10.0.2.2:3000/api/login', option)
            .then((res) => res.json())
            .then((res) => {
                setError('')
                if (res.status) {
                    showDialogTrue();
                    setTimeout(() => {
                        ListSwitch();
                    }, 2000);
                    //   navigation.navigate('ListScreen')
                } else {
                    showDialog();
                }
            })
            .catch((err) => console.error(err))
    }

    const showDialog = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const showDialogTrue = () => {
        setVisibleTrue(true);
    };
    const handleCancelTrue = () => {
        setVisibleTrue(false);
    };

    const readValue = async(key = 'key') => {
        const v = await AsyncStorage.getItem(key);
        console.log(v);
    }

    const saveValue = async(key, value) => {
        await AsyncStorage.setItem(key, value);
    }

    const removeValue = async(key) => {
        await AsyncStorage.removeItem(key);
    }

    const clearDb = async() => {
        await AsyncStorage.clear();
    }

    const runWithCatch = (block) => {
        return async() => {
            try {
                await block();
            } catch (e) {
                console.log(e)
            }
        };
    }

    const RegisterSwitch = () => {
        navigation.navigate('RegisterScreen')
    }
    const ListSwitch = () => {
        navigation.navigate('ListScreen')
    }
    return ( <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/catlogin.png")} />
   
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="User name"
            placeholderTextColor="#003f5c"
            onChangeText={setUsername}
          />
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
   
        <TouchableOpacity style={styles.loginBtn}  onPress={onLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
  
        <TouchableOpacity>
          <Text style={styles.forgot_button} onPress={RegisterSwitch}>REGISTER</Text>
        </TouchableOpacity>
  
        <Dialog.Container visible={visible}>
          <Dialog.Title style={{color:"#FF1493"}}>Không thể đăng nhập được rồi</Dialog.Title>
          <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/catngu.png")} />
          <Dialog.Description>
           Bạn chưa nhập thông tin hay là nhập sai
          </Dialog.Description>
          <Dialog.Button label="Thử lại nhé" style={{color:"#FF1493"}} onPress={handleCancel} />
        </Dialog.Container>
  
        <Dialog.Container visible={visibleTrue}>
          <Dialog.Title style={{color:"#FF1493",marginLeft:40}}>Đăng nhập thành công</Dialog.Title>
          <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/cat.png")} />
        </Dialog.Container>
        
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 20,
        marginTop: -100,
        width: 200,
        height: 200
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginTop: 20,
        color: "#FF1493"
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});