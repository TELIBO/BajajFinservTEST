const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                "is_success": false,
                "error": "Invalid input"
            });
        }
        
        // Initialize arrays
        const numbers = [];
        const alphabets = [];
        const oddNumbers = [];
        const evenNumbers = [];
        
        // Process the input array
        data.forEach(item => {
            // Check if it's a number
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item);
                numbers.push(item);
                
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            }
            // Check if it's a single alphabet character
            else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });
        
        // Find highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercase = lowercaseAlphabets.length > 0 ? 
            [lowercaseAlphabets.reduce((max, char) => char > max ? char : max)] : [];
        
        // Response
        const response = {
            "is_success": true,
            "user_id": "john_doe_17091999", // Replace with your format: firstname_lastname_ddmmyyyy
            "email": "john@xyz.com",        // Replace with your email
            "roll_number": "ABCD123",       // Replace with your roll number
            "odd_numbers": oddNumbers,
            "even_numbers": evenNumbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highestLowercase
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({
            "is_success": false,
            "error": error.message
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        "message": "Bajaj Finserv Health Challenge API",
        "endpoints": {
            "GET /bfhl": "Returns operation code",
            "POST /bfhl": "Processes array data"
        }
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;