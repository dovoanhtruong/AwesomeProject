import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,Alert,FlatList, TextInput,Button, Pressable,TouchableOpacity} from 'react-native'
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import io from 'socket.io-client';


export const DetailScreen = props=>{
const{
    navigation,
    route:{
        params:{id},
    },
}=props;

const[productId,setProductID]=useState(id)
const[product,setProduct]= useState(null)
const[name,setName]= useState(null)
const[info,setInfo]= useState(null)
const[count,setCount]= useState(null)
const[price,setPrice]= useState(null)
const[classify,setClassify]= useState(null)

const image = "https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg"

//http://localhost:3000/api/update/610df9bc4b453212e45596ed

useEffect(()=>{
    if(productId){
    fetch('http://10.0.2.2:3000/api/Product/'+productId)
    .then((res)=>res.json())
    .then((data)=>{
        setProduct(data)
        setName(data.name)
        setInfo(data.info)
        setCount(data.count.toString())
        setPrice(data.price.toString())
        setClassify(data.classify)
})
    .catch((err)=>console.error(err))
}
}, [])

const onUpdate=()=>{
	console.log('da nhan nut')
	const option={
        method:'post',
        headers:{'Content-Type' : 'application/json'},
		
        body: JSON.stringify({name,info,price,count,classify,image})
    }
	fetch('http://10.0.2.2:3000/api/update/'+productId, option)
    .then((res)=>res.json())
    .then((res)=>{
        setError('')
		// handleCancelAdd();
		
        //   navigation.navigate('ListScreen')

})
console.log('da update')
ListSwitch();
// handleCancelAdd();
// showDialogSuc();
// setTimeout(() => {
//  handleCancelSuc();
//   }, 3000);
}

const ListSwitch=()=>{
	navigation.navigate('ListScreen')
} 

return(
   
    <>
    {
        product ?
        <>
       
     {/* <View style={styles.container}>
     <Image
                source={{ uri: product.image, width: 200, height: 200 }}
                style={{marginTop:-150, marginBottom:50,borderRadius:20}}
            />
      <Text style={styles.name}>Name : {product.name}</Text>
      <Text style={styles.name}>Info : {product.info}</Text>
      <Text style={styles.name}>Price : {product.price}</Text>
      <Text style={styles.name}>Count : {product.count}</Text>
      <Text style={styles.name}>Classify : {product.classify}</Text>
    </View> */}
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image}} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
       
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={setName}
            // onChangeText={value=> this.setName({ name: value})}
        />

      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}

          placeholderTextColor="#003f5c"
          value={info}
          onChangeText={setInfo}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
      
          placeholderTextColor="#003f5c"
          value={count}
          onChangeText={setCount}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
    
          placeholderTextColor="#003f5c"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
         
          placeholderTextColor="#003f5c"
          value={classify}
          onChangeText={setClassify}
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn} >
        <Text style={styles.loginText} onPress={onUpdate}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={ListSwitch}>Exit</Text>
      </TouchableOpacity>

      {/* <Dialog.Container visible={visible}>
        <Dialog.Title style={{color:"#FF1493"}}>Không thể đăng nhập được rồi</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/catngu.png")} />
        <Dialog.Description>
         Bạn chưa nhập thông tin hay là nhập sai
        </Dialog.Description>
        <Dialog.Button label="Thử lại nhé" style={{color:"#FF1493"}}  />
      </Dialog.Container>

      <Dialog.Container visible={visibleTrue}>
        <Dialog.Title style={{color:"#FF1493",marginLeft:40}}>Đăng nhập thành công</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/cat.png")} />
      </Dialog.Container> */}
      
    </View>
            </>:
            <><Text>Loading</Text></>
    }
    </>
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
      marginBottom: 10,
      marginTop:-100,
      width:150,
      height:150
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
      marginTop: 10,
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