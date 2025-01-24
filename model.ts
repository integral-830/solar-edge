const MultivariateLinearRegression = require('ml-regression-multivariate-linear');

export interface TrainingData {
    ghi: number; // Global Horizontal Irradiance
    dni: number; // Direct Normal Irradiance
    temperature: number; // Ambient temperature
    powerOutput: number; // Actual power output
}

export class SolarPowerModel {
    private model!: typeof MultivariateLinearRegression;

    train(data: TrainingData[]) {
        const inputs = data.map((point) => [point.ghi, point.dni, point.temperature]);
        const outputs = data.map((point) => [point.powerOutput]);

        this.model = new MultivariateLinearRegression(inputs, outputs);
        console.log("Model trained successfully.");
    }

    predict(ghi: number, dni: number, temperature: number): number {
        if (!this.model) {
            throw new Error("Model is not trained yet. Please train the model before making predictions.");
        }

        // Predict power output using the trained model
        const prediction = this.model.predict([ghi, dni, temperature]);
        return prediction[0]; // Extract single value from result array
    }
}