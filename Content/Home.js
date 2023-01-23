import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
const Home = ({navigation}) => {
  const [subject, setSubject] = useState('');
  const [present, setPresent] = useState();
  const [total, setTotal] = useState();
  const onAdd = async () => {
    ///  CREATING  DATA FOR DATABASE///
    if (!subject || !present || !total) {
      return Alert.alert('warning !!', 'Please enter all the fields');
    }

    try {
      firestore()
        .collection('Attendance')
        .doc(auth().currentUser.uid)
        .collection('haajri')
        .add({
          Subject: subject,
          Present: present,
          Total: total,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setPresent();
      setSubject('');
      setTotal();
      navigation.navigate('Result');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <AntDesign
        name="arrowright"
        size={55}
        color="white"
        style={{
          position: 'absolute',
          right: 20,
          top: 0,
          zIndex: 1,
          borderRadius: 50,
          backgroundColor: 'purple',

          //any of width
          justifyContent: 'center',
          borderRadius: 22, // it will be height/2
        }}
        onPress={() => {
          navigation.navigate('Result');
        }}
      />

      <StatusBar animated={true} backgroundColor="white" />

      <Lottie
        style={{alignSelf: 'center', height: 280}}
        source={require('../Images/student.json')}
        autoPlay
      />
      <View style={{marginTop: 20, marginLeft: 15}}>
        <Text style={{fontSize: 30, fontWeight: '900'}}> Add Subject</Text>
        <AntDesign
          name="book"
          color="black"
          size={35}
          style={{position: 'absolute', top: 74, left: 17}}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: 350,
            borderRadius: 20,
            marginTop: 25,
            height: 55,
            alignItems: 'center',

            left: 50,
            width: 300,
            fontSize: 19,
            color: 'black',
            justifyContent: 'center',
          }}
          placeholder="Subject Name"
          placeholderTextColor="black"
          value={subject}
          onChangeText={text => setSubject(text)}></TextInput>
      </View>
      <View style={{marginTop: 20, marginLeft: 15}}>
        <AntDesign
          name="user"
          color="black"
          size={35}
          style={{position: 'absolute', top: 15, left: 17}}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: 350,
            borderRadius: 15,
            marginTop: 10,
            alignItems: 'center',
            alignItems: 'center',

            left: 50,
            width: 300,
            fontSize: 19,
            color: 'black',
            justifyContent: 'center',
          }}
          placeholder="Total Present"
          placeholderTextColor="black"
          value={present}
          onChangeText={text => setPresent(text)}></TextInput>
      </View>
      <View style={{marginTop: 20, marginLeft: 15}}>
        <AntDesign
          name="cap"
          color="black"
          size={35}
          style={{position: 'absolute', top: 20, left: 17}}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: 350,
            borderRadius: 20,
            marginTop: 10,
            alignItems: 'center',
            alignItems: 'center',

            left: 50,
            width: 300,
            fontSize: 19,
            justifyContent: 'center',
            color: 'black',
          }}
          placeholder="Total Classes"
          placeholderTextColor="#000"
          value={total}
          onChangeText={text => setTotal(text)}></TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>Add Subject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  button: {
    marginTop: 22,
    backgroundColor: 'purple',
    width: 380,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 50,
  },
  buttonText: {
    padding: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
