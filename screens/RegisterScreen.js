import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,Alert,FlatList, TextInput,Button, Pressable,TouchableOpacity} from 'react-native'
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

export const RegisterScreen = props=>{
const{
    navigation
}=props;

const[username,setUsername]=useState('')
const[phonenumber,setPhoneNumber]=useState('')
const[code,setCode]= useState('')
const[password,setPassword]= useState('')
const[password_confirmation,setPassword_confirmation]= useState('')
const [error,setError]=useState('')
const [visible, setVisible] = useState(false);
const [visibleTrue, setVisibleTrue] = useState(false);
const [infoUser, setInfoUser] = useState(false);
const channel='sms';
const onRegister=()=>{
  console.log('regis')
    const option={
        method:'post',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({username,password,password_confirmation})
    }
        fetch('http://10.0.2.2:3000/api/register', option)
    .then((res)=>res.json())
    .then((res)=>{
        setError('')
       if(res.status){
        console.log('ture')
showDialogTrue();
       }else{
      showDialog();
       }
})
    .catch((err)=>console.error(err))
}

const onGetCodeVerity=()=>{
  const option={
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify({phonenumber,channel})
  }
      fetch('http://10.0.2.2:3000/api/test', option)
  .then((res)=>res.json())
  .then((res)=>{
      setError('')
       setTimeout(() => {
        if(res.status){
          showDialogUser();
         }else{
          showDialog();
         }
          }, 1500);
})
  .catch((err)=>console.error(err))
}

// const onCheckCode=()=>{
//   console.log('check')  
//   const option={
//       method:'post',
//       headers:{'Content-Type' : 'application/json'},
//       body: JSON.stringify({code})
//   }

// fetch('http://localhost:3000/api/verity?phonenumber='+phonenumber+'&code='+code,option)
// .then((res)=>res.json())
//   .then((res)=>{
//       setError('')
//        setTimeout(() => {
//         if(res.status){
//           onRegister();
//          }else{
//           showDialog();
//          }
//           }, 2000);
// })
//   .catch((err)=>console.error(err))
// }
const onCheckCode=()=>{
  console.log('check')
console.log('http://localhost:3000/api/verity?phonenumber='+phonenumber+'&code='+code)
  fetch('http://10.0.2.2:3000/api/verity?phonenumber='+phonenumber+'&code='+code)
  .then((res)=>res.json())
  .then((res)=>{
    setTimeout(() => {
      if(res.status){
        console.log('true')
        onRegister();
       }else{
        console.log('false')
        showDialog();
       }
      }, 1500);
})
  .catch((err)=>console.error(err))

}

const LoginSwitch=()=>{
	navigation.navigate('LoginScreen')
}

//VALIDATE
const validate=()=>{
  console.log('validate')
 if(username.length < 1 || password.length < 1 || code.length < 1){
 showDialog();
 }else{
  onCheckCode();
 }
}

//DIALOG
const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const showDialogTrue = () => {
    setVisibleTrue(true);
  };

  const showDialogUser = () => {
    setInfoUser(true);
  };
  const handleCancelUser = () => {
    setInfoUser(false);
  };



const readValue =async (key='key')=> {
  const v = await AsyncStorage.getItem(key);
  console.log(v);
}

const saveValue =async (key, value)=> {
  await AsyncStorage.setItem(key, value);
}

const removeValue =async (key)=> {
  await AsyncStorage.removeItem(key);
}

const clearDb =async ()=> {
  await AsyncStorage.clear();
}

const runWithCatch=(block)=> {
  return async () => {
    try {
      await block();
    } catch (e) {
    console.log(e)
    }
  };
}


return(
<View style={styles.container}>
      <Image style={styles.image} source={require("../assets/catlogin.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          keyboardType="phone-pad"
          placeholder="Your Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={setPhoneNumber}
        />
      </View>
 
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password Confirmation"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={setPassword_confirmation}
        />
      </View> */}
      <Dialog.Container visible={infoUser}>
        <Dialog.Title style={{color:"#FF1493"}}>Thông tin tài khoản</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/catlogin.png")} />
        <Dialog.Input style={{marginHorizontal:25}}  placeholder="Name Login" placeholderTextColor="#FF1493" onChangeText={setUsername} />
        <Dialog.Input style={{marginHorizontal:25}}  placeholder="Password" placeholderTextColor="#FF1493" onChangeText={setPassword} />
        <Dialog.Input style={{marginHorizontal:25}}  placeholder="Confirm Password" placeholderTextColor="#FF1493" onChangeText={setPassword_confirmation} />
        <Dialog.Input style={{marginHorizontal:25}}  placeholder="Code Verity" placeholderTextColor="#FF1493" onChangeText={setCode}  keyboardType="phone-pad"/>
        <Dialog.Button label="Exit" style={{color:"#FF1493"}} onPress={handleCancelUser}/>
        <Dialog.Button label="Register" style={{color:"#FF1493"}} onPress={validate}/>
      </Dialog.Container>
      
      <TouchableOpacity style={styles.loginBtn}  onPress={onGetCodeVerity}>
        <Text style={styles.loginText}>Get Code Verity</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={LoginSwitch}>back LOGIN</Text>
      </TouchableOpacity>

      <Dialog.Container visible={visible}>
        <Dialog.Title style={{color:"#FF1493"}}>Không thể đăng kí được rồi</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/catngu.png")} />
        <Dialog.Description>
         Bạn chưa nhập thông tin hay là nhập sai
        </Dialog.Description>
        <Dialog.Button label="Thử lại nhé" style={{color:"#FF1493"}} onPress={handleCancel} />
      </Dialog.Container>

      <Dialog.Container visible={visibleTrue}>
        <Dialog.Title style={{color:"#FF1493"}}>Đăng kí thành công</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/catlogin.png")} />
        <Dialog.Description>
         Tài khoản cuả bạn đã được thêm
        </Dialog.Description>
        <Dialog.Button label="Login nhá" style={{color:"#FF1493"}} onPress={LoginSwitch}/>
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
      marginTop:-100,
      width:200,
      height:200
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
      marginTop: 15,
      color:"#FF1493"
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#FF1493",
    },
  });
