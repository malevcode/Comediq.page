import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card');
    const form = document.querySelector('.signup-form');
    
    // Create message elements
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 'padding: 15px; margin: 10px 0; border-radius: 5px; display: none;';
    form.appendChild(messageDiv);

    function showMessage(message, isError = false) {
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
        messageDiv.style.color = isError ? '#c62828' : '#2e7d32';
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
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
            console.log('Attempting to save to waitlist:', { email, metrics });
            
            // Save to Firebase
            const docRef = await addDoc(collection(db, 'waitlist'), {
                email,
                metrics,
                timestamp: serverTimestamp()
            });

            console.log('Successfully saved to waitlist with ID:', docRef.id);
            
            // Show success message
            showMessage('🎉 Thanks for joining! We\'ll email you when the beta release is ready. Get ready to revolutionize your comedy journey!');
            form.reset();
        } catch (error) {
            console.error('Error saving to waitlist:', error);
            showMessage('There was an error joining the waitlist. Please try again.', true);
        }
    });
});
