import { Observable } from '@nativescript/core'
import { SelectedPageService } from '../shared/selected-page-service'
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';



export function ZiroskopViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Ziroskop')

    const viewModel = new Observable()
    viewModel.ime = 0
    viewModel.x = 0
    viewModel.y = 0
    viewModel.z = 0

    var senzori = new AndroidSensors()
    var ziroskop

    var slusateljSenzora = new AndroidSensorListener({
        onAccuracyChanged: function (senzor, preciznost) {
            console.log('Senzor:', senzor)
            console.log('Preciznost:', preciznost)
        },
        onSensorChanged: function (rezultat) {
            var parsiraniPodaci = JSON.parse(rezultat)
            var siroviPodaci = parsiraniPodaci.data
            var senzor = parsiraniPodaci.sensor
            // var vrijeme = parsiraniPodaci.time

            // izuzima dio stringa: 'android.sensor'; ispisuje samo ime senzora
            const senzorIme = (senzor.toString()).split(".")
            const ime = senzorIme[2]

            // zaokruzivanje izmjerenih vrijednosti 
            const x = (Math.round(siroviPodaci.x * 100) / 100).toFixed(2)
            const y = (Math.round(siroviPodaci.y * 100) / 100).toFixed(2)
            const z = (Math.round(siroviPodaci.z * 100) / 100).toFixed(2)

            viewModel.set('ime', ime)
            viewModel.set('x', x)
            viewModel.set('y', y)
            viewModel.set('z', z)
        }
    });

    senzori.setListener(slusateljSenzora)
    ziroskop = senzori.startSensor(android.hardware.Sensor.TYPE_GYROSCOPE, SensorDelay.UI)

    return viewModel
}
