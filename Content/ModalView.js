import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Lottie from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const ModalView = ({closeModal, userId}) => {
  const [subject, setSubject] = useState('');
  console.log(userId);
  const subjectInfo = () => {
    firestore()
      .collection('Attendance')
      .doc(auth().currentUser.uid)
      .collection('haajri')
      .doc(userId)
      .get()
      .then(documentSnapshot => setSubject(documentSnapshot.data().Subject));
  };
  useEffect(() => {
    subjectInfo();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.modalViewContainer}>
        <Lottie
          style={{alignSelf: 'center', height: 280}}
          source={require('../Images/present.json')}
          autoPlay
        />
        <View style={{padding: 5}}>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              fontWeight: '600',
              fontStyle: 'italic',
            }}>
            {' '}
            You are marked present in {subject} 🏆 🏆
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              fontWeight: '600',
              marginTop: 20,
              fontStyle: 'italic',
            }}>
            Atttend classes regulary to get an 'A' 🎓 🎓
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            width: 250,
            height: 40,
            marginTop: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={() => closeModal()}>
          <Text
            style={{
              padding: 6,
              alignSelf: 'center',
              fontWeight: '500',
              color: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalView;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 500,
    padding: 10,
    width: '85%',
    height: '70%',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    elevation: 10,
  },
});
