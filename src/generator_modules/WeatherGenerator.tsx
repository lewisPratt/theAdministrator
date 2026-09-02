import { CloudFog, CloudHail, CloudRain, CloudSun, Sun, ThermometerSnowflake, Tornado, WavesVertical } from "lucide-react";
import type { weatherShape } from "../interfaces";

const weatherConditions = [
  {weather : "Clear Skies", icon: <Sun />},
  {weather: "Overcast", icon: <CloudSun />},
  {weather: "Acid Rain", icon: <CloudRain />},
  {weather: "Smog Haze", icon: <WavesVertical />},
  {weather: "Heavy Fog", icon: <CloudFog />},
  {weather: "Ash Fall", icon: <CloudHail />},
  {weather: "Cold Snap", icon: <ThermometerSnowflake />},
  {weather: "Dust Storm", icon: <Tornado />}
];

function shuffleArray(a: weatherShape[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
export default function generateWeather(){
shuffleArray(weatherConditions)

return weatherConditions[0]

}