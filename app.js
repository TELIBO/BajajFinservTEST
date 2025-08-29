const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                "is_success": false,
                "error": "Invalid input"
            });
        }

        const numbers = [];
        const alphabets = [];
        const oddNumbers = [];
        const evenNumbers = [];
        const specialCharacters = [];

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item);
                numbers.push(item);
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item);
            } else if (typeof item === 'string' && item.length === 1 && !/^[a-zA-Z0-9]$/.test(item)) {
                specialCharacters.push(item);
            }
        });

        const sum = numbers.reduce((total, num) => total + parseInt(num), 0).toString();

        const uppercaseAlphabets = alphabets.filter(ch => ch === ch.toUpperCase());
        const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
        const orderedAlphabets = [...uppercaseAlphabets, ...lowercaseAlphabets];
        const concatString = orderedAlphabets.join('');

        const response = {
            "is_success": true,
            "user_id": "sanjay_sajnani_24012004",
            "email": "sanjay.22bce8541@vitapstudent.ac.in",
            "roll_number": "22BCE8541",
            "odd_numbers": oddNumbers,
            "even_numbers": evenNumbers,
            "alphabets": orderedAlphabets,
            "special_characters": specialCharacters,
            "sum": sum,
            "concat_string": concatString
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            "is_success": false,
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
