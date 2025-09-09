require("dotenv").config();
const express = require('express');
const axios = require('axios');
const { createClient } = require('redis');
const cors = require('cors');
const rateLimit = require('express-rate-limit')

const app = express();
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
const port = process.env.PORT || 10001;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minute
    max: 20,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(cors());
app.use(limiter)

function getTodayDate(){
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var currentDate = `${yyyy}-${mm}-${dd}`;
    return currentDate
}

app.get('/', (req, res) => {
    res.send('Hello from Weather API');
})

app.get('/weather', async (req,res) => {
    const city = req.query.city.toLowerCase();
    const today = getTodayDate();
    const cachedKey = `weather:${city}:${today}`;

    if(!city){
        return res.status(400).json({message: 'bad request, no city provided'})
    }

    try {
        //check cache in redis
        const cachedData = await redisClient.get(cachedKey);
        if(cachedData){
            console.log('[Cache Hit]', cachedKey)
            return res.status(200).json({
                message: 'success',
                city: city,
                date: today,
                data: JSON.parse(cachedData),
            })
        }

        //make request to external api
        url = `${process.env.WEATHER_APP_BASE_URL}/${city}/${today}`
        const resp = await axios.get(url, {
            params: {
                key: process.env.WEATHER_API_KEY,
                include: 'current'
            }
        }).catch(error => {
            return res.status(404).json({message: 'City not found'})
        })

        weatherData = resp.data;

        await redisClient.setEx(cachedKey, 600, JSON.stringify(weatherData));
        console.log('[Cache Miss] - Fetch to External API', cachedKey);

        res.status(200).json({
            message: 'success',
            city: city,
            date: today,
            data: weatherData,
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:'failed to fetch external API'})
    }
})

redisClient.on("error", (err) => 
    console.error("Redis Client Error", err)
);

(async () => {
    await redisClient.connect();
    console.log('Connected to Redis');
})();

app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})