
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { formatDistanceToNow } from 'date-fns';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tickets'), orderBy('timeOpen', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ticketsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <p>{ticket.issue}</p>
          <p>
            Wait time: {formatDistanceToNow(ticket.timeOpen?.toDate(), { addSuffix: true })}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TicketList;
