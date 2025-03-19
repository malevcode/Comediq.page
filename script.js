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
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Joining...';
        
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
            submitButton.textContent = '✓ Joined!';
            submitButton.style.backgroundColor = '#4CAF50';
            form.reset();
            
            // Create and show a success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #4CAF50;
                color: white;
                padding: 15px 30px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            `;
            successMessage.textContent = 'Thanks for joining! We\'ll be in touch soon.';
            document.body.appendChild(successMessage);

            // Remove the message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease';
                setTimeout(() => successMessage.remove(), 500);
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 5000);

        } catch (error) {
            console.error('Error saving to waitlist:', error);
            submitButton.textContent = 'Error - Try Again';
            submitButton.style.backgroundColor = '#f44336';
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
});
