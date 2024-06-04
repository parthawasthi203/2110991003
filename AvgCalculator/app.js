const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

const WINDOW_SIZE = 10;
const THIRD_PARTY_API_URLS = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
};

let numberStore = [];

const fetchNumbers = async (numberId) => {
    const url = THIRD_PARTY_API_URLS[numberId];
    if (!url) return [];
    
    try {
        const response = await axios.get(url, { timeout: 500 });
        if (response.status === 200) {
            return response.data.numbers;
        }
    } catch (error) {
        return [];
    }
    return [];
};

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    if (!THIRD_PARTY_API_URLS[numberId]) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const windowPrevState = [...numberStore];
    const newNumbers = await fetchNumbers(numberId);

    newNumbers.forEach(num => {
        if (!numberStore.includes(num)) {
            numberStore.push(num);
            if (numberStore.length > WINDOW_SIZE) {
                numberStore.shift();
            }
        }
    });

    const avg = calculateAverage(numberStore);

    res.json({
        windowPrevState: windowPrevState,
        windowCurrState: numberStore,
        numbers: newNumbers,
        avg: avg.toFixed(2)
    });
});

app.listen(port, () => {
    console.log(`Average Calculator microservice running on http://localhost:${port}`);
});