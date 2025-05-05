
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const TicketDetailPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, 'tickets', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTicket(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Issue: {ticket.issue}</p>
      <p>Submitted by: {ticket.userId}</p>
      <p>Wait time: {/*
::contentReference[oaicite:0]{index=0}
 
