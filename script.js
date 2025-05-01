document.addEventListener('DOMContentLoaded', () => {
    // Task 1: Store browser/OS info in localStorage
    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
    };
    localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

    // Task 2: Display localStorage data in footer
    const footer = document.getElementById('browser-info');
    const storedInfo = JSON.parse(localStorage.getItem('browserInfo'));
    footer.innerHTML = `
        <p>Browser: ${storedInfo.userAgent}</p>
        <p>Platform: ${storedInfo.platform}</p>
        <p>Language: ${storedInfo.language}</p>
    `;

    // Task 3: Fetch and display comments from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(response => response.json())
        .then(comments => {
            const commentSection = document.getElementById('comments');
            comments.forEach(comment => {
                const p = document.createElement('p');
                p.textContent = `${comment.name}: ${comment.body}`;
                commentSection.appendChild(p);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));

    // Task 4: Feedback form modal after 1 minute
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <form action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Phone" required>
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit">Submit</button>
            </form>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }, 60000);

    // Task 5: Day/Night mode toggle
    const toggleButton = document.getElementById('theme-toggle');
    function setTheme() {
        const hour = new Date().getHours();
        const isDay = hour >= 7 && hour < 21;
        document.body.className = isDay ? '' : 'night';
    }

    toggleButton.addEventListener('click', () => {
        document.body.className = document.body.className === 'night' ? '' : 'night';
    });

    setTheme(); // Set initial theme
});
