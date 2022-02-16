# NativeScript senzor aplikacija

NativeScript Android aplikacija sa senzorima.

## Postavljanje projekta

Prije svega, pametno je uvjeriti se da je NativeScript dobro postavljen prije početka rada na projektu:

``` shell
ns doctor android
```

Prvo je potrebno otvoriti novi udaljeni GitHub repozitorij na kojemu će se nalaziti projekt. Nakon otvaranja, u željeni lokalni direktorij kloniramo repozitorij naredbom:

``` shell
git clone https://github.com/proto-forma/nativescript-sensor-app.git
```

Nakon kloniranja, pozicioniramo se u novostvoreni direktorij aplikacije:

``` shell
cd nativescript-sensor-app/
```

Zatim pokrećemo naredbu koja stvara novu NativeScript aplikaciju na temelju predloška:

``` shell
tns create nativescript-sensor-app --template @nativescript/template-drawer-navigation
```

Opet se pozicioniramo u novostvoreni direktorij:

``` shell
cd nativescript-sensor-app/
```

Sada možemo pokrenuti aplikaciju na našem Android uređaju kako bi se uvjerili da je postavljanje uspješno:

``` shell
ns run android
```

Ako sve radi, slijedi i podizanje aplikacije na udaljeni repozitorij:

``` shell
git remote add nativescript-sensor-app https://github.com/proto-forma/nativescript-sensor-app.git
git add -A
git commit -m "Inicijalno podizanje projekta."
git push nativescript-sensor-app main
```
