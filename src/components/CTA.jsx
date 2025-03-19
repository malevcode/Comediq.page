import React, { useState } from 'react';
import { db } from '../firebase-config'; // Make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const CTA = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    metrics: {
      openMicsPerWeek: 0,
      weeklyMicSpend: 0,
      nonMicSpotsPer: 0
    },
    affiliate: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firebase
      await addDoc(collection(db, "Waitlist"), formData);
      setIsSubmitted(true);
      
      // Clear form
      setFormData({
        email: '',
        metrics: {
          openMicsPerWeek: 0,
          weeklyMicSpend: 0,
          nonMicSpotsPer: 0
        },
        affiliate: false
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.startsWith('metrics.')) {
      const metricName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          [metricName]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? e.target.checked : value
      }));
    }
  };

  return (
    <div className="cta-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          // ... existing form fields ...
          <button type="submit">Join the Comedy Revolution</button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Thanks for joining! 🎭</h3>
          <p>We'll email you when the beta release is ready!</p>
        </div>
      )}
    </div>
  );
};

export default CTA; 