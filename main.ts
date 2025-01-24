import { fetchIrradianceData } from "./fetchWeather";
import { SolarPowerModel } from "./model";
import { historicalData } from "./historicalData";

async function calculateRealtimeWithRegression() {
    const lat = 28.6139;
    const lon = 77.2090;

    // Initialization and training of the model
    const model = new SolarPowerModel();
    model.train(historicalData);

    while (true) {
        try {
            const realtimeData = await fetchIrradianceData(lat, lon);

            console.log("Real-time Solar Predictions:");
            realtimeData.forEach((entry) => {
                const predictedPower = model.predict(entry.ghi, entry.dni, entry.temperature);
                console.log(
                    `Date: ${entry.date}, GHI: ${entry.ghi} W/m², DNI: ${entry.dni} W/m², Temp: ${entry.temperature}°C, Predicted Power: ${predictedPower.toFixed(
                        2
                    )} W`
                );
            });

            // Wait for a specific interval (e.g., 1 minute)
            await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 minute
        } catch (error) {
            console.error("Error in real-time prediction:", error);
        }
    }
}

calculateRealtimeWithRegression();
