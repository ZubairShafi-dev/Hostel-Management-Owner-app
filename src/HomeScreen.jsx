import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'attendance', title: 'Attendance'},
    {key: 'results', title: 'Results'},
    {key: 'students', title: 'Students'},
  ]);

  const [attendanceData, setAttendanceData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [resultPercentage, setResultPercentage] = useState(0);

  useEffect(() => {
    fetchAttendanceData();
    fetchResultData();
    fetchStudentsData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const snapshot = await firestore().collection('attendance').get();
      const data = snapshot.docs.map(doc => doc.data());
      setAttendanceData(data);
      calculateAttendancePercentage(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const fetchResultData = async () => {
    try {
      const snapshot = await firestore().collection('results').get();
      const data = snapshot.docs.map(doc => doc.data());
      setResultData(data);
      calculateResultPercentage(data);
    } catch (error) {
      console.error('Error fetching result data:', error);
    }
  };

  const fetchStudentsData = async () => {
    try {
      const snapshot = await firestore().collection('students').get();
      const data = snapshot.docs.map(doc => doc.data());
      setStudentsData(data);
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  const calculateAttendancePercentage = data => {
    if (data.length > 0) {
      const percentage =
        (data.filter(student => student.status === 'Present').length /
          data.length) *
        100;
      setAttendancePercentage(percentage);
    } else {
      setAttendancePercentage(0);
    }
  };

  const calculateResultPercentage = data => {
    if (data.length > 0) {
      const totalMarks = data.reduce(
        (total, student) => total + student.marksPercentage,
        0,
      );
      const percentage = totalMarks / data.length;
      setResultPercentage(percentage);
    } else {
      setResultPercentage(0);
    }
  };

  const renderScene = SceneMap({
    attendance: () => (
      <View style={styles.tabView}>
        <FlatList
          data={attendanceData}
          keyExtractor={item => item.regNumber.toString()}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {item.name} - {item.regNumber}
              </Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    ),
    results: () => (
      <View style={styles.tabView}>
        <FlatList
          data={resultData}
          keyExtractor={item => item.regNumber.toString()}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {item.name} - {item.regNumber}
              </Text>
              <Text style={styles.statusText}>{item.marksPercentage}%</Text>
            </View>
          )}
        />
      </View>
    ),
    students: () => (
      <View style={styles.tabView}>
        <FlatList
          data={studentsData}
          keyExtractor={item =>
            item.regNumber
              ? item.regNumber.toString()
              : Math.random().toString()
          } // Use regNumber if available, otherwise a random key
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {item.name} - {item.regNumber || 'N/A'}
              </Text>
            </View>
          )}
        />
      </View>
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <Text style={styles.mainCardText}>
          Attendance: {attendancePercentage.toFixed(2)}%
        </Text>
        <Text style={styles.mainCardText}>
          Result: {resultPercentage.toFixed(2)}%
        </Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.tabView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tabView: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default HomeScreen;
