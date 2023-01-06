import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PieChart from 'react-native-pie-chart';
import {ScrollView} from 'react-native-gesture-handler';
// import Lottie from 'lottie-react-native';
// const [loading, setLoading] = useState(true);

const Result = () => {
  const [num, setNum] = useState(0);
  const [den, setDen] = useState(0);
  const [record, setRecord] = useState([]);

  const getData = () => {
    let numerator = 0;
    let denominator = 0;

    firestore()
      .collection('Attendance')
      .doc(auth().currentUser.uid)
      .collection('haajri')
      .onSnapshot(query => {
        // console.log(query);

        let data = [];
        query.forEach(documentSnapshot => {
          data.push({...documentSnapshot.data(), id: documentSnapshot.id});
          numerator += parseInt(documentSnapshot._data.Present);
          denominator += parseInt(documentSnapshot._data.Total);
        });

        setNum(numerator);
        setDen(denominator);

        setRecord(data);
        // setLoading(false);
      });
  };
  const sliceColor = ['red', 'green'];
  const series = [120, 34];
  useEffect(() => {
    getData();
  }, []);
  // if (loading) {
  //   return <Lottie source={require('../Images/loader.json')} autoPlay />;
  // }
  return (
    <ScrollView>
      <View style={{flex: 1}}>
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
            console.log(student);
            return (
              <TouchableOpacity
                key={student.id}
                style={{
                  marginTop: 20,
                  height: 150,
                  width: 350,
                  backgroundColor: 'white',
                  borderRadius: 35,

                  elevation: 10,

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
                    }}>
                    {student.Subject}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginTop: 12,
                      fontSize: 17,
                      fontWeight: '700',
                    }}>
                    Attendance : {student.Present + '/' + student.Total}
                  </Text>
                </View>
                {/* <View style={{padding: 5, position: 'absolute', right: 40}}> */}
                {/* <PieChart
                    widthAndHeight={100}
                    series={[student.Present, student.Total]}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.6}
                    coverFill={'#FFF'}
                    style={{alignSelf: 'center', marginTop: 20}}
                  /> */}
                {/* </View> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Result;
