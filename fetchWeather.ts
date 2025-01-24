import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = process.env.WEATHER_API_KEY;

interface irradianceResponse {
    date: string;
    ghi: number; // Global Horizontal Irradiance (W/m²)
    dni: number; // Direct Normal Irradiance (W/m²)
    temperature: number; // Ambient temperature (°C)
}

export async function fetchIrradianceData(latitude: number, longitude: number): Promise<irradianceResponse[]> {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                latitude,
                longitude,
                exclude: "minutely,hourly",
                units: "metric",
                appid: API_KEY,
            },
        });

        return response.data.daily.map((item: any) => ({
            date: new Date(item.dt * 1000).toISOString().split("T")[0],
            ghi: item.uvi * 100, // Approximation for GHI, replace with actual GHI if available
            dni: item.uvi * 50,  // Approximation for DNI, replace with actual DNI if available
            temperature: item.temp.day,
        }));
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}
