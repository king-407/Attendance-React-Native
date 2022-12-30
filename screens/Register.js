import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onRegister = async () => {
    if (!email && !password) {
      return;
    }
    try {
      const {
        user: {uid},
      } = await auth().createUserWithEmailAndPassword(email, password);

      firestore()
        .collection('users')
        .doc(uid)
        .set({email, name})
        .then(() => console.log('Done'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StatusBar backgroundColor="orange" />
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={require('../Images/Login.png')}
          />
          <View style={styles.heading}>
            <Text style={styles.headingText}>Register</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setName(text)}></TextInput>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setEmail(text)}></TextInput>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Passowrd"
              onChangeText={text => setPassword(text)}></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Register;
const styles = StyleSheet.create({
  signUpText: {
    color: 'blue',
  },
  lastText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  status: {
    height: 200,
  },
  container: {
    flex: 1,
  },
  signup: {
    marginTop: 5,
    marginLeft: 12,
  },
  input: {
    borderBottomWidth: 1,
    width: 350,
    alignSelf: 'center',
    borderRadius: 20,
    alignText: 'center',
  },
  form: {
    margin: 15,
  },
  headingText: {
    fontSize: 45,
    fontWeight: '900',
    marginLeft: 20,
  },
  tinyLogo: {
    alignSelf: 'center',
    height: 320,
    width: 320,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    width: 350,
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
