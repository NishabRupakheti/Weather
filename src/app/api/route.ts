import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Helsinki";
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  try {
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(geocodeUrl);

    if (!response.ok) throw new Error("City not found or API error");

    const data = await response.json();

    return NextResponse.json({
      condition: data.weather[0].main,
      description: data.weather[0].description,
      temperature: (data.main.temp - 273.15).toFixed(1),
      feelsLike: (data.main.feels_like - 273.15).toFixed(1),
      humidity: data.main.humidity,
      country: data.sys.country,
      placeName: data.name,
      longitude: data.coord.lon,
      latitude: data.coord.lat,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
