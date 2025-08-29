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
            "user_id": "sanjay_sajnani_24012000", // Replace with your format: firstname_lastname_ddmmyyyy
            "email": "sanjay.22bce8541@vitapstudent.ac.in",        // Replace with your email
            "roll_number": "22BCE8541",       // Replace with your roll number
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

/* 
To set up and run:

1. Create package.json:
npm init -y

2. Install Express:
npm install express

3. Save this as app.js or server.js

4. Run:
node app.js

5. Test with curl or Postman:

POST http://localhost:3000/bfhl
Content-Type: application/json
{
    "data": ["M","1","334","4","B","Z","a","7"]
}

GET http://localhost:3000/bfhl

Expected POST response:
{
    "is_success": true,
    "user_id": "john_doe_17091999",
    "email": "john@xyz.com", 
    "roll_number": "ABCD123",
    "odd_numbers": ["1","7"],
    "even_numbers": ["334","4"],
    "alphabets": ["M","B","Z","a"],
    "highest_lowercase_alphabet": ["a"]
}
*/