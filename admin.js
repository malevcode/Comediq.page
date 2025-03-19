import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBIt5uAwX3jL4B55u4fp1iPFjlkx1JJDMM",
    authDomain: "comediq.firebaseapp.com",
    projectId: "comediq",
    storageBucket: "comediq.firebasestorage.app",
    messagingSenderId: "651174044928",
    appId: "1:651174044928:web:80561523af676920f5ffe5",
    measurementId: "G-NL8PHY5GCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Format date for display
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Calculate averages
function calculateAverages(submissions) {
    const totals = submissions.reduce((acc, sub) => {
        const metrics = sub.metrics || {};
        acc.openMics += metrics.openMicsPerWeek || 0;
        acc.writingHours += metrics.writingHoursPerWeek || 0;
        return acc;
    }, { openMics: 0, writingHours: 0 });

    return {
        avgOpenMics: (totals.openMics / submissions.length).toFixed(1),
        avgWritingHours: (totals.writingHours / submissions.length).toFixed(1)
    };
}

// Convert data to CSV
function convertToCSV(submissions) {
    const headers = ['Email', 'Open Mics/Week', 'Non-Mic Spots/Week', 'Writing Hours/Week', 'Watching Hours/Week', 'Submission Date'];
    const rows = submissions.map(sub => {
        const metrics = sub.metrics || {};
        return [
            sub.email,
            metrics.openMicsPerWeek || 0,
            metrics.nonMicSpotsPerWeek || 0,
            metrics.writingHoursPerWeek || 0,
            metrics.watchingHoursPerWeek || 0,
            formatDate(sub.timestamp)
        ];
    });
    
    return [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
}

// Download CSV file
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Render submissions table
function renderSubmissionsTable(submissions) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Email</th>
                <th>Open Mics/Week</th>
                <th>Non-Mic Spots/Week</th>
                <th>Writing Hours/Week</th>
                <th>Watching Hours/Week</th>
                <th>Submission Date</th>
            </tr>
        </thead>
        <tbody>
            ${submissions.map(sub => `
                <tr>
                    <td>${sub.email}</td>
                    <td>${sub.metrics?.openMicsPerWeek || 0}</td>
                    <td>${sub.metrics?.nonMicSpotsPerWeek || 0}</td>
                    <td>${sub.metrics?.writingHoursPerWeek || 0}</td>
                    <td>${sub.metrics?.watchingHoursPerWeek || 0}</td>
                    <td>${formatDate(sub.timestamp)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    document.getElementById('submissionsTable').innerHTML = '';
    document.getElementById('submissionsTable').appendChild(table);
}

// Update stats
function updateStats(submissions) {
    const { avgOpenMics, avgWritingHours } = calculateAverages(submissions);
    document.getElementById('totalSubmissions').textContent = submissions.length;
    document.getElementById('avgOpenMics').textContent = avgOpenMics;
    document.getElementById('avgWritingHours').textContent = avgWritingHours;
}

// Main function to load and display data
async function loadData() {
    try {
        const q = query(collection(db, 'waitlist'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const submissions = [];
        
        querySnapshot.forEach((doc) => {
            submissions.push(doc.data());
        });

        // Update UI
        updateStats(submissions);
        renderSubmissionsTable(submissions);

        // Set up export button
        document.getElementById('exportCsv').addEventListener('click', () => {
            const csvContent = convertToCSV(submissions);
            const filename = `comediq-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
            downloadCSV(csvContent, filename);
        });

    } catch (error) {
        console.error('Error loading submissions:', error);
        document.getElementById('submissionsTable').innerHTML = 
            '<div class="loading">Error loading submissions. Please check your connection and try again.</div>';
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);
