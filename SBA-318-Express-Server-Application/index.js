

import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());


// Categories note: muscles, exercises, custom  workouts




app.get('/api/work', async (req, res) => {
    const muscleGroup = req.query.muscle || 'biceps'; // default 

    const options = {
        method: 'GET',
        url: 'https://${process.env.RAPIDAPI_HOST}/search',
        params: { Muscles: muscleGroup },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch(e) {
        console.log('Error fetching data from Work Out API:', error.message)
        res.status(500).json({ error: 'Failed to fetch workout data' })
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
})