import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,FlatList} from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Dialog from "react-native-dialog";

export const DeleteScreen = props=>{
const{
    navigation,
    route:{
        params:{id},
    },
}=props;

const[productId,setProductID]=useState(id)
const[idDel,setIdDel]=useState(id)
const[product,setProduct]= useState(null)
const [suc, setSuc] = useState(false);

useEffect(()=>{
    if(productId){
    fetch('http://10.0.2.2:3000/api/Product/'+productId)
    .then((res)=>res.json())
    .then((data)=>{
        setProduct(data)
})
    .catch((err)=>console.error(err))
}
}, [])

const onDelete =()=>{
    useEffect(()=>{
        if(idDel){
        fetch('http://10.0.2.2:3000/api/delete/'+idDel)
        .then((res)=>res.json())
        .then((data)=>{
          console.log('da xoa')
          navigation.navigate('ListScreen')
    })
        .catch((err)=>console.error(err))
    }
    }, [])
}

const onDel=()=>{

	fetch('http://10.0.2.2:3000/api/delete/'+ idDel)
    .then((res)=>res.json())
    .then((res)=>{
        setError('')
})

console.log('da gui')
showDialogSuc();
setTimeout(() => {
 handleCancelSuc();
 ListSwitch();
  }, 3000);
}

const ListSwitch=()=>{
	navigation.navigate('ListScreen')
}
const showDialogSuc = () => {
	setSuc(true);
  };
  const handleCancelSuc = () => {
	setSuc(false);
  };


return(
   
    <>
    {
        product ?
        <>
       
     <View style={styles.container}>
     <Image
                source={{ uri: product.image, width: 200, height: 200 }}
                style={{marginTop:-150, marginBottom:50,borderRadius:20}}
            />
      <Text style={styles.name}>Bạn muốn xóa : {product.name} ?</Text>
      <AwesomeButtonRick type="primary" style={{}} onPress={onDel}>Xóa</AwesomeButtonRick> 
	<AwesomeButtonRick type="secondary" style={{alignItems: "center"}} onPress={ListSwitch}>Trở về</AwesomeButtonRick>

    <Dialog.Container visible={suc}>
        <Dialog.Title style={{color:"#FF1493",marginLeft:40}}>Xóa thành công</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/cat.png")} />
      </Dialog.Container>
    </View>
            </>:
            <><Text>Loading</Text></>
    }
    </>
)
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:10,
       color:'#696969'
        
      },
      price:{
        fontSize: 30,
        fontWeight: 'bold',
      }
})