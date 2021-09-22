import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,FlatList,Pressable} from 'react-native'
import {Dimensions, Alert, TouchableOpacity, YellowBox } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Swipeout from 'react-native-swipeout';
import io from 'socket.io-client';
import Dialog from "react-native-dialog";
import { DetailScreen } from './DetailScreen';


export const ListScreen = (props)=>{
    const {navigation}=props
const[product,setProduct]=useState([])
const[classifyPro,setClassifyPro]=useState([])

const[idDel,setIdDel]=useState([])
const[name,setName]=useState([])
const[info,setInfo]=useState([])
const[price,setPrice]=useState([])
const[count,setCount]=useState([])
const[classify,setClassify]=useState([])
// const[image,setImage]=useState([])
const [add, setAdd] = useState(false);
const [suc, setSuc] = useState(false);
const image = "https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-violet-1-600x600.jpg"
const nameF = "Iphone"
const infoF = "Apple A5"
const countF = "5"
const priceF = "560"
const classifyF = "Phone"


useEffect(()=>{
	const socket = io('http://10.0.2.2:3000')
	socket.on('server_msg', msg=>{
		// setClassify([])
		// setProduct([])
		fetch('http://10.0.2.2:3000/api/Product')
		.then((res)=>res.json())
		.then((data)=>{
			setClassifyPro(data.Classify)
			setProduct(data.danhSach)
		})
		.catch((err)=>console.error(err))
	})
} , [])

useEffect(()=>{
    fetch('http://10.0.2.2:3000/api/Product')
    .then((res)=>res.json())
    .then((data)=>{
        setClassify(data.Classify)
        setProduct(data.danhSach)
})
    .catch((err)=>console.error(err))
}, [])

const onAdd=()=>{
	console.log('da nhan nut')
	const option={
        method:'post',
        headers:{'Content-Type' : 'application/json'},		
        body: JSON.stringify({name,info,price,count,classify,image})
    }
	fetch('http://10.0.2.2:3000/api/insert', option)
    .then((res)=>res.json())
    .then((res)=>{
        setError('')
		handleCancelAdd();
		console.log('da add1')		
        //   navigation.navigate('ListScreen')
})
// fetch('http://10.0.2.2:3000/api/insert', option)
//     .then((res)=>res.json())
//     .then((res)=>{
//         setError('')
// 		console.log('da add2')
// 		// handleCancelAdd();		
//         //   navigation.navigate('ListScreen')
// })
console.log('da add')
handleCancelAdd();
// onAddFake();
showDialogSuc();
setTimeout(() => {
 handleCancelSuc();
  }, 3000);
}

const onAddFake=()=>{
	console.log('da load fake')
	const option={
        method:'post',
        headers:{'Content-Type' : 'application/json'},		
        body: JSON.stringify({nameF,infoF,priceF,countF,classifyF,image})
    }
	fetch('http://10.0.2.2:3000/api/insert', option)
    .then((res)=>res.json())
    .then((res)=>{
        setError('')
        //   navigation.navigate('ListScreen')
})
console.log('da add fake')
}




const showDialogAdd = () => {
	setAdd(true);
  };
  const handleCancelAdd = () => {
	setAdd(false);
  };

  const showDialogSuc = () => {
	setSuc(true);
  };
  const handleCancelSuc = () => {
	setSuc(false);
  };

const Logout=()=>{
	navigation.navigate('LoginScreen')
} 

const renderItem = ({item})=>{
	const swipeoutSettings = {
		autoClose: true,
		onClose: () => {},
		onOpen: () => {
			// item._setCurrent(item.item);
		},
		left: [
			{
				text: 'Update',
				type: 'secondary',
				onPress: () => {navigation.navigate('DetailScreen',{id: item._id})}
			},
			{
				text: 'Delete',
				type: 'delete',
			
				onPress: () => {navigation.navigate('DeleteScreen',{id: item._id})}
				
			}
		]
	};
    return(
        <Swipeout {...swipeoutSettings}>
        <View style={styles.listContainer}>
            <Image
                source={{ uri: item.image, width: 60, height: 60 }}
                style={{ borderWidth: 1, borderColor: 'black' }}
            />
            <View>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Name: {item.name}</Text>
                <Text style={{ marginLeft: 10 }}>Price: {item.price}</Text>
                <Text style={{ marginLeft: 10 }}>Info: {item.info}</Text>
            </View>
        </View>
    </Swipeout>
    )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginHorizontal:50,
		
	},
	containerBut: {
		flex: 1,
		flexDirection: 'row',
		marginLeft:230
	},

	listContainer: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		margin: width * 3.6 / 187.5,
		padding: width * 3.6 / 187.5,
	
		borderRadius: width * 3.6 / 187.5
	},
	fab: {
		height: 50,
		width: 50,
		borderRadius: 200,
		position: 'absolute',
		bottom: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#686cc3'

	},
	text: {
		fontSize: 30,
		color: 'white'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		width: width * 167.5 / 187.5,
		padding: width * 8 / 187.5,
		borderRadius: width * 3.6 / 187.5,

		margin: 20,
		backgroundColor: 'white',

		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		margin: 2,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center'
	},
	lineDialog: {
		width: '100%',
		height: 40,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#f1f1f1'
	},
	textInputDialog: {
		height: 34,
		flex: 1,
		marginRight: 4,
		borderWidth: 0.1,
		borderRadius: 5,
		color: '#111111',

		fontSize: 15,
		paddingLeft: 5
	}
});

return(
    <>
    {
        product.length > 0 ?
		<View >
			<View style={styles.containerBut}>
	<AwesomeButtonRick type="primary" style={{}} onPress={Logout}>Log out</AwesomeButtonRick> 
	<AwesomeButtonRick type="secondary" style={{marginLeft:5}} onPress={showDialogAdd}>Add Product</AwesomeButtonRick>
	</View>
        <FlatList
            data={product}
            renderItem={renderItem}
            keyExtractor={(item)=>item._id}
        />
		
		
		<Dialog.Container visible={add}>
        <Dialog.Title style={{color:"#FF1493"}}>Thêm sản phẩm mới</Dialog.Title>
        <Image style={{width:175,height:150,marginLeft:50}} source={require("../assets/catngu.png")} />
		<Dialog.Input style={{marginHorizontal:25}}  placeholder="Name Product" placeholderTextColor="#FF1493" onChangeText={setName} />
		<Dialog.Input style={{marginHorizontal:25}}  placeholder="Info Product" placeholderTextColor="#FF1493" onChangeText={setInfo} />
		<Dialog.Input style={{marginHorizontal:25}}  keyboardType="numeric" placeholder="Count Product" placeholderTextColor="#FF1493" onChangeText={setCount} />
		<Dialog.Input style={{marginHorizontal:25}}  keyboardType="numeric" placeholder="Price Product" placeholderTextColor="#FF1493" onChangeText={setPrice} />
		<Dialog.Input style={{marginHorizontal:25}}  placeholder="Classify Product" placeholderTextColor="#FF1493" onChangeText={setClassify} />

		<Dialog.Button label="Thoát" style={{color:"#FF1493"}} onPress={handleCancelAdd} />
		<Dialog.Button label="Thêm" style={{color:"#FF1493"}} onPress={onAdd} />
      </Dialog.Container>

	  <Dialog.Container visible={suc}>
        <Dialog.Title style={{color:"#FF1493",marginLeft:40}}>Thêm thành công</Dialog.Title>
        <Image style={{width:200,height:200,marginLeft:50}} source={require("../assets/cat.png")} />
      </Dialog.Container>
		
		</View>
		
         : <Text></Text>
    }
    </>
)
} 

const styles=StyleSheet.create({

})