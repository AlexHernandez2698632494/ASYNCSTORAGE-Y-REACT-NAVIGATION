// src/screens/Home.js
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';

const Home = () => {
  const [reservations, setReservations] = useState([]);

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  return (
    <View>
      <ReservationForm onSubmit={addReservation} />
      <ReservationList reservations={reservations} />
    </View>
  );
};

export default Home;
