# Weather Card App

Hi, so I made this little Weather Card app with Next.js, and it's actually pretty cool if I do say so myself! It's a simple one: you open it up, and it tries to figure out where you are from your browser's geolocation. Then it retrieves the weather for there and shows it to you in a sweet card with some nice animations. If it can't get your location (or you refuse to grant it), it simply defaults to Helsinki—why not, then?

## What's Going On
- **Frontend**: It's on the client-side and includes React and Framer Motion for those slick fade-ins and bouncy effects. You have a search field to type in whatever city you want, and it'll get the weather for that too.
- **Backend**: There is a server-side API route (`route.ts`) which does the heavy lifting. It talks to OpenWeatherMap for weather data and Nominatim for reverse geocoding (lat/lon to a city name). Stores the API key safe and in one piece on the server.
- **Flow**: The client takes your coordinates and sends them to the server, and the server computes the city and weather. If you query manually, it skips the geolocation aspect and just retrieves the weather directly.

## How It Looks
You get a card with the city name, country, temp (in Celsius), how it feels, humidity, and even the coordinates if you’re curious. The temp pulses a bit for that extra flair. If something goes wrong—like no geolocation or a bad city name—it’ll throw up an error message but still show Helsinki’s weather as a backup.

## Tech Stuff
- **Next.js**: App Router setup using a mix of client and server treats.
- **APIs**: OpenWeatherMap for weather, Nominatim for place names.
- **Framer Motion**: That makes everything look alive and snappy.

It's simple but works. The animations are a nice touch, and separating things between client and server seems clean. Could I make it prettier? Sure, but for now, it's a calming little project that tells you if you need a jacket or not!
