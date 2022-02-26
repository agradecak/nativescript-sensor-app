import { Observable } from '@nativescript/core'
import { SelectedPageService } from '../shared/selected-page-service'
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';



export function SenzoriViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Senzori')

    const viewModel = new Observable()
    viewModel.x = 10
    viewModel.y = 20
    viewModel.z = 30
    viewModel.dev_sens = 0

    var sensors = new AndroidSensors();
    var accelerometerSensor;

    var sensorListener = new AndroidSensorListener({
        onAccuracyChanged: function (sensor, accuracy) {
            console.log('accuracy', accuracy);
        },
        onSensorChanged: function (result) {
            // result is being returned as a string currently
            var parsedData = JSON.parse(result);
            var rawSensorData = parsedData.data;
            var sensor = parsedData.sensor;
            var time = parsedData.time;

            viewModel.set('x', result)
            viewModel.set('y', rawSensorData.y)
            viewModel.set('z', rawSensorData.z)
        }
    });

    sensors.setListener(sensorListener);

    const deviceSensors = sensors.getDeviceSensors()

    var sensorsData = ""

    deviceSensors.forEach((sensor) => {
        sensorsData = sensorsData + sensor + "\n";
    });

    viewModel.set('dev_sens', sensorsData)

    accelerometerSensor = sensors.startSensor(android.hardware.Sensor.TYPE_AMBIENT_TEMPERATURE, SensorDelay.NORMAL);

    return viewModel
}


