// ReportScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = ({ route }) => {
  const { student } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Report</Text>
      <Text style={styles.detail}>Name: {student.name}</Text>
      <Text style={styles.detail}>Registration Number: {student.regNumber}</Text>
      <Text style={styles.detail}>Attendance Percentage: {student.attendancePercentage}%</Text>
      <Text style={styles.detail}>Marks Percentage: {student.marksPercentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ReportScreen;
