export default function Loading() {
  const messages: string[] = [
    "Warming up the engines...",
    "Fetching awesomeness...",
    "Almost there, hold tight!",
    "Loading your app with magic...",
  ];

  const randomMessage: string =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 border-4 border-t-transparent border-white rounded-full animate-spin" />

        <p className="text-2xl font-semibold text-white drop-shadow-lg">
          {randomMessage}
        </p>
      </div>
    </div>
  );
}
