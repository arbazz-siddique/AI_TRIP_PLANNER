import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const PROMPT = `You are an AI Trip Planner Agent.  
Your goal is to help the user design their perfect trip by asking **one clear and relevant travel-related question at a time**.  
Always maintain a **friendly, conversational, and professional tone** while guiding the user through their trip planning journey.  

Ask questions in this order (one at a time, wait for user response before moving to the next):  
1. Starting location (source)  
2. Destination city or country  
3. Group size (Solo, Couple, Family, Friends)  
4. Budget level (Low, Medium, High)  
5. Trip duration (number of days)  
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation, hidden gems)  
7. Special requirements or preferences (if any, e.g., accessibility needs, pet-friendly, vegetarian options)  

⚠️ Rules:  
- Never ask multiple questions at once.  
- If an answer is unclear or incomplete, politely ask for clarification.  
- Keep responses short, natural, and engaging (avoid robotic or repetitive wording).  
- Focus on **personalized suggestions** like hotels, restaurants, hidden gems, activities, and unique experiences within the user’s budget.  

Once all required details are collected, generate and return a **strict JSON response only** (no explanations or extra text).  

JSON Schema:  
{
-  resp: "Your natural conversational text response to user",
-  ui: "budget / groupSize / tripDuration / final"
+  resp: "Your natural conversational text response to user",
+  ui: "startingLocation / destination / groupSize / budget / tripDuration / travelInterests / specialRequirements / final"
}

Where 'ui': indicates which component to render in the frontend:  
- 'startingLocation' → Ask for source location  
- 'destination' → Ask for destination city/country  
- 'groupSize' → Ask for group size  
- 'budget' → Ask for budget  
- 'tripDuration' → Ask for number of days  
- 'travelInterests' → Ask for interests (adventure, food, culture, etc.)  
- 'specialRequirements' → Ask for preferences (optional)  
- 'final' → Only when **all info is collected**, return trip plan with hotels, activities, hidden gems, restaurants, and cost breakdown.  

⚠️ Important: Always set 'ui' to the **next missing detail**, not 'final', until every step above is completed.

`

const FINAL_PROMPT = `Generate a detailed travel plan with the given details.  
Include a list of hotel options with the following fields:  
- Hotel name, hotel address, price per night, hotel image URL, geo-coordinates (latitude & longitude), rating, and description.  

Also, suggest a complete itinerary with the following details:  
- Day-wise plan including activities, best time to visit each day.  
- For each activity/place: place name, place details, place image URL, geo-coordinates (latitude & longitude), place address, ticket pricing, estimated travel time to reach the location, and best time to visit.  

Return the output strictly in **valid JSON format** following this schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}

`

export async function POST(req:NextRequest) {
    const {messages, isFinal} = await req.json();
    try {
    const completion = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    response_format:{type:'json_object'},
    messages: [
        {
            role:'system',
            content: isFinal ? FINAL_PROMPT : PROMPT
        },
      ...messages
    ],
  });
  console.log(completion.choices[0].message);
  const message = completion.choices[0].message
  return NextResponse.json(JSON.parse(message.content??''));
    } catch (error) {
        return NextResponse.json(error)
    }
    
}