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
        
       
        data.forEach(item => {
           
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item);
                numbers.push(item);
                
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            }
            
            else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });
        
       
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercase = lowercaseAlphabets.length > 0 ? 
            [lowercaseAlphabets.reduce((max, char) => char > max ? char : max)] : [];
        
   
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

