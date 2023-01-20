import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

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
    <View style={{flex: 1, marginTop: 30}}>
      <Lottie
        style={{alignSelf: 'center', height: 280}}
        source={require('../Images/student.json')}
        autoPlay
      />
      <View style={{marginTop: 20, marginLeft: 15}}>
        <Text style={{fontSize: 30, fontWeight: '900'}}> Add a Subject</Text>
        <TextInput
          style={{
            borderWidth: 1,
            width: 350,
            borderRadius: 20,
            marginTop: 25,

            alignItems: 'center',
            alignContent: 'center',
            fontSize: 19,
            justifyContent: 'center',
          }}
          placeholder="Subject Name"
          value={subject}
          onChangeText={text => setSubject(text)}></TextInput>
      </View>
      <View style={{marginTop: 20, marginLeft: 15}}>
        <TextInput
          style={{
            borderWidth: 1,
            width: 350,
            borderRadius: 20,
            marginTop: 10,
            alignItems: 'center',
            alignContent: 'center',
            fontSize: 19,
            justifyContent: 'center',
          }}
          placeholder="Total Present"
          value={present}
          onChangeText={text => setPresent(text)}></TextInput>
      </View>
      <View style={{marginTop: 20, marginLeft: 15}}>
        <TextInput
          style={{
            borderWidth: 1,
            width: 350,
            borderRadius: 20,
            marginTop: 10,
            alignItems: 'center',
            alignContent: 'center',
            fontSize: 19,
            justifyContent: 'center',
          }}
          placeholder="Total Classes"
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
    margin: 10,
  },
  buttonText: {
    padding: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
