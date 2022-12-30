import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = async () => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => response.json())
        .catch(err => Alert.alert('Warning !', 'Invalid email or password'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StatusBar backgroundColor="orange" />
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('../Images/Login.png')}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>Login</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={text => setEmail(text)}></TextInput>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="passowrd"
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.lastText}>
          {' '}
          Don't have an account?
          <TouchableOpacity style={styles.signup}>
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Register')}>
              Signup
            </Text>
          </TouchableOpacity>{' '}
        </Text>
      </View>
    </>
  );
};

export default Login;
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
    margin: 20,
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
