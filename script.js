import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card');
    const form = document.querySelector('.signup-form');
    
    // Feature card interaction
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                }
            });
            this.classList.toggle('active');
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.feature-card')) {
            cards.forEach(card => card.classList.remove('active'));
        }
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const metrics = {
            openMicsPerWeek: parseInt(form.querySelector('input[type="number"]:nth-of-type(1)').value) || 0,
            nonMicSpotsPerWeek: parseInt(form.querySelector('input[type="number"]:nth-of-type(2)').value) || 0,
            writingHoursPerWeek: parseInt(form.querySelector('input[type="number"]:nth-of-type(3)').value) || 0,
            watchingHoursPerWeek: parseInt(form.querySelector('input[type="number"]:nth-of-type(4)').value) || 0
        };

        const email = form.querySelector('input[type="email"]').value;
        
        try {
            // Save to Firebase
            await addDoc(collection(db, 'waitlist'), {
                email,
                metrics,
                timestamp: serverTimestamp()
            });

            // Show success message
            alert('Thanks for joining the waitlist! We\'ll be in touch soon.');
            form.reset();
        } catch (error) {
            console.error('Error saving to waitlist:', error);
            alert('There was an error joining the waitlist. Please try again.');
        }
    });
});
