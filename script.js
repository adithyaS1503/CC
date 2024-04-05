document.getElementById('urlForm').onsubmit = async function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const url = document.getElementById('urlInput').value;
    const responseElement = document.getElementById('result');

    try {
        // Updated to use the new API URL and the /test stage
        const response = await fetch('https://xuokspm6h9.execute-api.us-east-1.amazonaws.com/test/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }) // Assuming your Lambda expects {"url": "..."}
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseElement.textContent = `Shortened URL: ${data.shortUrl}`; // Ensure this matches your actual API response
    } catch (error) {
        console.error('Fetch error:', error);
        responseElement.textContent = 'Failed to shorten the URL.';
    }
};
