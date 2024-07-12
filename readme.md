NLW Journey API
Welcome to the NLW Journey API! This API allows you to manage trips, participants, activities, and more for your journey-planning applications.

Table of Contents
Overview
Authentication
Endpoints
Trips
Participants
Activities
Links
Error Handling
Examples
Contributing
License
Overview
The NLW Journey API is designed to help you create and manage journey-based applications. Whether you are developing a travel planner or an event organizer, this API provides the necessary endpoints to handle various aspects of journeys, including trips, participants, and activities.

Authentication
To use the NLW Journey API, you need to authenticate your requests using an API key. Include your API key in the Authorization header of each request:

makefile
Copiar código
Authorization: Bearer YOUR_API_KEY
Endpoints
Trips
Manage trips and their details.

Create a Trip

bash
Copiar código
POST /trips
Create a new trip with the provided details.

Get a Trip

bash
Copiar código
GET /trips/{tripId}
Retrieve details of a specific trip by its ID.

Update a Trip

bash
Copiar código
PATCH /trips/{tripId}
Update the details of an existing trip.

Delete a Trip

bash
Copiar código
DELETE /trips/{tripId}
Delete a trip by its ID.

Participants
Manage participants in your journeys.

Add a Participant

bash
Copiar código
POST /participants
Add a new participant to the journey.

Get a Participant

bash
Copiar código
GET /participants/{participantId}
Retrieve details of a specific participant by their ID.

Update a Participant

bash
Copiar código
PATCH /participants/{participantId}
Update details of an existing participant.

Remove a Participant

bash
Copiar código
DELETE /participants/{participantId}
Remove a participant from the journey.

Activities
Handle activities within trips.

Create an Activity

bash
Copiar código
POST /activities
Add a new activity to a trip.

Get an Activity

bash
Copiar código
GET /activities/{activityId}
Retrieve details of a specific activity by its ID.

Update an Activity

bash
Copiar código
PATCH /activities/{activityId}
Update the details of an existing activity.

Delete an Activity

bash
Copiar código
DELETE /activities/{activityId}
Remove an activity from a trip.

Links
Manage links related to trips and activities.

Add a Link

bash
Copiar código
POST /links
Create a new link associated with a trip or activity.

Get a Link

bash
Copiar código
GET /links/{linkId}
Retrieve details of a specific link by its ID.

Update a Link

bash
Copiar código
PATCH /links/{linkId}
Update an existing link's details.

Delete a Link

bash
Copiar código
DELETE /links/{linkId}
Remove a link from a trip or activity.

Error Handling
The API uses standard HTTP status codes to indicate success or failure of API requests. Here are some common responses:

200 OK - The request was successful.
201 Created - A new resource was created successfully.
400 Bad Request - The request was invalid or cannot be processed.
401 Unauthorized - Authentication failed or was not provided.
404 Not Found - The requested resource does not exist.
500 Internal Server Error - An error occurred on the server.
Examples
Creating a Trip
bash
Copiar código
curl -X POST https://api.nlw-journey.com/trips \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Vacation",
    "startDate": "2024-07-01",
    "endDate": "2024-07-15",
    "destination": "Hawaii"
  }'
Adding a Participant
bash
Copiar código
curl -X POST https://api.nlw-journey.com/participants \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tripId": "123",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
Contributing
We welcome contributions to improve the NLW Journey API. Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License.