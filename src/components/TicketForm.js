
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

const TicketForm = () => {
  const [issue, setIssue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (issue.trim() === '') return;

    try {
      await addDoc(collection(db, 'tickets'), {
        issue,
        userId: auth.currentUser.uid,
        timeOpen: serverTimestamp(),
      });
      setIssue('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe your issue"
      />
      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
