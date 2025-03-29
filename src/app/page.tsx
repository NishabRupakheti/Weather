import WeatherCard from "@/components/WeatherCard";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <WeatherCard />
    </div>
  );
}
