import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [directorId, setDirectorId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const correctId = 'admin';
    const correctPassword = '123';

    if (directorId === correctId && password === correctPassword) {
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Login Failed', 'Incorrect Director ID or Password.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainSection}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Login to account</Text>
        <Text style={styles.subtitle}>
          Enter your ID and password to login.
        </Text>

        <View style={styles.inputContainer}>
          <AntDesign name="user" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Director ID"
            placeholderTextColor="#999"
            value={directorId}
            onChangeText={setDirectorId}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mainSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
