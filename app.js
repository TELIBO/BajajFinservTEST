const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                "is_success": false,
                "user_id": "sanjay_sajnani_24012004",
                "error": "Invalid input: 'data' must be an array."
            });
        }
        
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        const allAlphabeticChars = [];

        data.forEach(item => {
            if (!isNaN(item) && item.trim() !== '') {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            } 
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                for (const char of item) {
                    allAlphabeticChars.push(char);
                }
            } 
            else if (typeof item === 'string') {
                specialCharacters.push(item);
            }
        });

        const concatString = [...allAlphabeticChars].reverse().map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');

        const response = {
            "is_success": true,
            "user_id": "sanjay_sajnani_24012004",
            "email": "sanjay.22bce8541@vitapstudent.ac.in",
            "roll_number": "22BCE8541",
            "odd_numbers": oddNumbers,
            "even_numbers": evenNumbers,
            "alphabets": alphabets,
            "special_characters": specialCharacters,
            "sum": sum.toString(),
            "concat_string": concatString
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({
            "is_success": false,
            "user_id": "sanjay_sajnani_24012004",
            "error": error.message
        });
    }
});

app.get('/', (req, res) => {
    res.json({
        "message": "Bajaj Finserv Health Challenge API",
        "endpoints": {
            "GET /bfhl": "Returns operation code",
            "POST /bfhl": "Processes array data"
        }
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;