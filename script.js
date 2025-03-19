document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all other cards
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                }
            });
            
            // Toggle active class on clicked card
            this.classList.toggle('active');
        });

        // Handle keyboard navigation
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
});
