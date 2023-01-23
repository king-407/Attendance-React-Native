import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PieChart from 'react-native-pie-chart';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import Lottie from 'lottie-react-native';
import ModalView from './ModalView';
const Result = () => {
  const [num, setNum] = useState(0);
  const [den, setDen] = useState(0);
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModaOpen] = useState(false);
  const [sid, setId] = useState('');
  const handleDelete = student => {
    firestore()
      .collection('Attendance')
      .doc(auth().currentUser.uid)
      .collection('haajri')
      .doc(student.id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    setLoading(true);
  };
  const handlePresent = student => {
    firestore()
      .collection('Attendance')
      .doc(auth().currentUser.uid)
      .collection('haajri')
      .doc(student.id)
      .update({
        Present: parseInt(student.Present) + 1,
        Total: parseInt(student.Total) + 1,
      })
      .then(() => {
        console.log('User deleted!');
      });
    setModaOpen(true);
    setId(student.id);
  };
  const getData = () => {
    numerator = 0;
    let denominator = 0;
    firestore()
      .collection('Attendance')
      .doc(auth().currentUser.uid)
      .collection('haajri')
      .onSnapshot(query => {
        let data = [];
        query.forEach(documentSnapshot => {
          data.push({...documentSnapshot.data(), id: documentSnapshot.id});
          numerator += parseInt(documentSnapshot._data.Present);
          denominator += parseInt(documentSnapshot._data.Total);
        });

        setNum(numerator);
        setDen(denominator);

        setRecord(data);
        setLoading(false);
      });
  };
  const sliceColor = ['red', 'green'];
  const series = [num, den];
  const closeModal = () => {
    setModaOpen(false);
    setId(' ');
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Lottie source={require('../Images/loader.json')} autoPlay />;
  }
  console.log(num, den);
  return (
    <ScrollView>
      <StatusBar animated={true} backgroundColor="white" />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Modal visible={modalOpen} animationType="fade" transparent={true}>
          <ModalView closeModal={closeModal} userId={sid} />
        </Modal>
        <PieChart
          widthAndHeight={250}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.6}
          coverFill={'#FFF'}
          style={{alignSelf: 'center', marginTop: 30}}
        />
        <Text style={{position: 'absolute', top: 138, left: 165, fontSize: 35}}>
          {Math.round((num / den) * 100)}%
        </Text>
        <View>
          {record.map(student => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  Alert.alert(
                    'Do you want to delete the subject',
                    ' ',
                    [
                      {
                        text: 'Yes',
                        onPress: () => handleDelete(student),
                      },

                      {
                        text: 'No',
                        onPress: () => console.log('No button clicked'),
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                }}
                key={student.id}
                style={{
                  marginTop: 20,
                  height: 190,
                  width: 350,
                  backgroundColor: 'white',
                  borderRadius: 35,

                  elevation: 20,

                  alignSelf: 'center',
                  // flexDirection: 'row',
                }}>
                <View>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                      color: 'black',
                    }}>
                    {student.Subject}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginTop: 12,
                      fontSize: 17,
                      fontWeight: '700',
                      fontStyle: 'italic',
                      color: 'black',
                    }}>
                    Your Attendance
                    {' ' + student.Present + '/' + student.Total}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginTop: 12,
                      fontSize: 17,
                      fontWeight: '700',
                      fontStyle: 'italic',
                      color: 'black',
                    }}>
                    Attendance :
                    {Math.round((student.Present / student.Total) * 100)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      marginTop: 10,
                      margin: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: 'green',
                        borderRadius: 5,
                        marginLeft: 15,
                      }}
                      onPress={() => {
                        handlePresent(student);
                      }}>
                      <Text
                        style={{color: 'white', fontWeight: '800', padding: 5}}>
                        Present
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: 'red',
                        borderRadius: 5,
                        marginLeft: 15,
                      }}
                      onPress={() => handleAbsent(student)}>
                      <Text
                        style={{color: 'white', fontWeight: '800', padding: 5}}>
                        Absent
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{padding: 5, position: 'absolute', right: 40}}>
                  <PieChart
                    widthAndHeight={100}
                    series={[student.Present, student.Total]}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.6}
                    coverFill={'#FFF'}
                    style={{alignSelf: 'center', marginTop: 20}}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Result;
