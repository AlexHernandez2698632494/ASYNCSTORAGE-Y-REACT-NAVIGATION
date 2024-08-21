import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('');
  const [section, setSection] = useState('Non-Smoking');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      const formatted = cleaned.replace(/(\d{4})(\d{0,4})/, '$1-$2');
      setPhone(formatted);
    }
  };

  const handleSubmit = () => {
    const reservation = {
      name,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0].substring(0, 5),
      phone,
      people,
      section,
    };
    
    // Submit the reservation
    onSubmit(reservation);

    // Clear the form fields
    setName('');
    setDate(new Date());
    setTime(new Date());
    setPhone('');
    setPeople('');
    setSection('Non-Smoking');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Date:</Text>
      <Button title={`Select Date: ${date.toISOString().split('T')[0]}`} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Time:</Text>
      <Button title={`Select Time: ${time.toTimeString().split(' ')[0].substring(0, 5)}`} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={time}
          onChange={handleTimeChange}
        />
      )}
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="numeric"
        maxLength={9} // Limit input length to accommodate the format 1234-5678
      />
      <Text style={styles.label}>Number of People:</Text>
      <TextInput
        style={styles.input}
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Section:</Text>
      <Picker
        selectedValue={section}
        style={styles.picker}
        onValueChange={(itemValue) => setSection(itemValue)}
      >
        <Picker.Item label="Non-Smoking" value="Non-Smoking" />
        <Picker.Item label="Smoking" value="Smoking" />
      </Picker>
      <Button title="Reserve" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});

export default ReservationForm;
