const axios = require('axios');
const cheerio = require('cheerio');
import { NextResponse } from 'next/server';

export async function getIndiaTodayHeadlines() {
    const url = 'https://www.indiatoday.in/';
    
    try {
        // Send a GET request to fetch the HTML content of the website
        const response = await axios.get(url);
        //console.log(response.data);
        // Load the HTML into cheerio for parsing
        const $ = cheerio.load(response.data);
        
        // Find all headlines by looking for specific elements and classes (update the selector if necessary)
        const headlines = [];
        console.log(headlines);
        $('h2.headline').each((index, element) => {
            const headline = $(element).text().trim();
            if (headline) {
                headlines.push(headline);
            }
        });
        
        // Output the headlines
        console.log("India Today Headlines:");
        headlines.forEach((headline, idx) => {
            console.log(`${idx + 1}. ${headline}`);
        });
    } catch (error) {
        console.error('Error fetching the headlines:', error);
    }
}

// Call the function to fetch and print the headlines
getIndiaTodayHeadlines();
