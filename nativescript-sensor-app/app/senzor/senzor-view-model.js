import { Observable } from '@nativescript/core'
import { SelectedPageService } from '../shared/selected-page-service'
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';



export function SenzorViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Senzor')

    const viewModel = new Observable()
    viewModel.ime = 0
    viewModel.x = 0
    viewModel.y = 0
    viewModel.z = 0
    viewModel.x_vel = 0
    viewModel.y_vel = 0
    viewModel.z_vel = 0
    viewModel.vrijeme = 0
    

    var senzori = new AndroidSensors()
    var senzorMagnetskogPolja

    var slusateljSenzora = new AndroidSensorListener({
        onAccuracyChanged: function (senzor, preciznost) {
            console.log('Senzor:', senzor)
            console.log('Preciznost:', preciznost)
        },
        onSensorChanged: function (rezultat) {
            // result is being returned as a string currently
            var parsiraniPodaci = JSON.parse(rezultat)
            var siroviPodaci = parsiraniPodaci.data
            var senzor = parsiraniPodaci.sensor
            var vrijeme = parsiraniPodaci.time

            // zaokruzivanje izmjerenih vrijednosti 
            const x = (Math.round(siroviPodaci.x * 10) / 10).toFixed(1)
            const y = (Math.round(siroviPodaci.y * 10) / 10).toFixed(1)
            const z = (Math.round(siroviPodaci.z * 10) / 10).toFixed(1)

            const x_font = Math.abs(x) / 4
            const y_font = Math.abs(y) / 4
            const z_font = Math.abs(z) / 4
            
            // izuzima 'android.sensor', ispisuje ime samog senzora
            const senzorIme = (senzor.toString()).split(".")
            const ime = senzorIme[2]

            viewModel.set('ime', ime)
            viewModel.set('x', x)
            viewModel.set('y', y)
            viewModel.set('z', z)
            viewModel.set('x_vel', x_font)
            viewModel.set('y_vel', y_font)
            viewModel.set('z_vel', z_font)
            viewModel.set('vrijeme', vrijeme)
            
        }
    });

    senzori.setListener(slusateljSenzora)

    // const deviceSensors = sensors.getDeviceSensors()
    // var sensorsData = ""
    // deviceSensors.forEach((sensor) => {
    //     sensorsData = sensorsData + sensor + "\n";
    // });
    // viewModel.set('dev_sens', sensorsData)

    senzorMagnetskogPolja = senzori.startSensor(android.hardware.Sensor.TYPE_MAGNETIC_FIELD, SensorDelay.UI)

    return viewModel
}


