import { Observable } from '@nativescript/core'
import { SelectedPageService } from '../shared/selected-page-service'
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';



export function SvjetlostViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Svjetlost')

    const viewModel = new Observable()
    viewModel.ime = 0
    viewModel.x = 0
    viewModel.y = 0
    viewModel.z = 0

    var senzori = new AndroidSensors()
    var senzorSvjetlosti

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
            const light_level = siroviPodaci.light_level

            viewModel.set('ime', ime)
            viewModel.set('light_level', light_level)
        }
    });

    senzori.setListener(slusateljSenzora)

    senzorSvjetlosti = senzori.startSensor(android.hardware.Sensor.TYPE_LIGHT, SensorDelay.UI)

    return viewModel
}
