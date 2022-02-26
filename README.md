# NativeScript senzor aplikacija

NativeScript Android aplikacija sa senzorima.

## 1. Postavljanje projekta

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

## 2. Instalacija sensor plugina

Izrađujemo aplikaciju koja sadrži senzore za svjetlost i blizinu. Kako bi dobivali podatke iz senzora potrebno je instalirati [plugin za korištenje Android senzora](https://market.nativescript.org/plugins/nativescript-android-sensors/):

``` shell
npm i --save nativescript-android-sensors
```

U slučaju da nakon instalacije dobijemo error

> minSdkVersion "X" cannot be smaller than version "Y"

potrebno je pozicionirati se u direktorij `/App_Resources/Android` te u datoteci `app.gradle` izmjenimo `minSdkVersion` sa `17` na `21`:

``` gradle
android {
  defaultConfig {
    minSdkVersion 21

    ...
}
```

## 3. Layout

Kada prvi puta pokrenemo aplikaciju, na nekim uređajima (uključujući moj) možemo uočiti da aplikacija ne uzima u obzir gornji dio zaslona ako ima usjek za prednju kameru. To možemo popraviti tako da se pozicioniramo u direktorij `/App_Resources/Android/src/main/res/values-v21` te u datoteci `styles.xml` izmjenimo slijedeći redak iz `true` u `false` u:

``` xml
<style name="AppThemeBase21" parent="AppThemeBase">
    ...

    <item name="android:windowTranslucentStatus">false</item>

    ...
</style>
```

Također je potrebno zakomentirati i slijedeći redak u istoj datoteci:

``` xml
<style name="NativeScriptToolbarStyle" parent="NativeScriptToolbarStyleBase">
    ...

    <!-- <item name="android:paddingTop">24dp</item> -->

    ...
</style>
```

Kako koristimo `template-drawer-navigation` layout, možemo izmjeniti što se sve i na koji način prikazuje u ladici. Prvo ćemo izmjeniti *header* koji trenutno prikazuje generičke podatke profila. Pozicioniramo se u direktorij `/app/app-root/` te u datoteci `app-root.xml` mijenjamo *header* na slijedeći način:

1. Ubacujemo [FontAwesome ikonu](https://fontawesome.com/icons/microchip?s=solid) koja simbolizira senzor

    - mičemo sve klase osim `fas t-36`
    - postavljamo `width` na `20%`

2. Sadržaj naslova mijenjamo u naziv aplikacije

    - postavljamo i gornju marginu `m-t-10` kako tekst ne bi bio tik do sličice

3. Sadržaj podnaslova mijenjamo u kratki opis aplikacije

    - postavljamo gornju marginu kako tekst ne bi bio tik do naslova 
    - postavljamo `textWrap` na `true` kako sadržaj ne bi izlazio van dimenzija komponente


``` xml
<StackLayout class="nt-drawer__header">
    <Image class="fas t-36" src="font://&#xf2db;" width="20%"/>
    <Label class="nt-drawer__header-brand m-t-10" text="Proximity Senzor App" />
    <Label class="nt-drawer__header-footnote m-t-5" textWrap="true" text="Aplikacija za dohvaćanje podataka iz senzora za blizinu." />
</StackLayout>
```

Također možemo izmjeniti/obrisati i elemente ladice koji nam nisu potrebni. Ostaviti ćemo `Home` za opis aplikacije, izmjeniti `Browse` ladicu u `Senzor` te izbrisati sve ostale. U istoj datoteci izbacujemo slijedeće komponente:

``` xml
<GridLayout
    columns="auto, *"
    class="{{ 'nt-drawer__list-item' + (selectedPage === 'Search' ? ' -selected': '') }}"
    route="search/search-page"
    title="Search"
    tap="onNavigationItemTap"
>
    <Label row="0" col="0" text="&#xf002;" class="nt-icon fas" />
    <Label row="0" col="1" text="Search" class="p-r-10" />
</GridLayout>

<GridLayout
    columns="auto, *"
    class="{{ 'nt-drawer__list-item' + (selectedPage === 'Featured' ? ' -selected': '') }}"
    route="featured/featured-page"
    title="Featured"
    tap="onNavigationItemTap"
>
    <Label row="0" col="0" text="&#xf005;" class="nt-icon fas" />
    <Label row="0" col="1" text="Featured" class="p-r-10" />
</GridLayout>

<StackLayout class="hr" />

<GridLayout
    columns="auto, *"
    class="{{ 'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected': '') }}"
    route="settings/settings-page"
    title="Settings"
    tap="onNavigationItemTap"
>
    <Label row="0" col="0" text="&#xf013;" class="nt-icon fas" />
    <Label row="0" col="1" text="Settings" class="p-r-10" />
</GridLayout>
```

Brišemo i pripadajuće direktorije koji sadržavaju kod za gore navedene aktivnosti. Za aktivnost `Browse` koju mijenjamo u `Senzor` moramo pažljivo izmjeniti naziv direktorija koji sadrži potrebne datoteke te nazive metoda, modula i varijabli koje povezuju ovu aktivnost sa aplikacijom.

Vraćamo se u datoteku `app-root.xml` te prijašnju komponentu `Browse` prenamjenjujemo u `Senzor` mijenjajući `title, route, class` te obje `Label` komponente:

``` xml
<GridLayout
    columns="auto, *"
    class="{{ 'nt-drawer__list-item' + (selectedPage === 'Senzori' ? ' -selected': '') }}"
    route="senzori/senzori-page"
    title="Senzori"
    tap="onNavigationItemTap"
>
    <Label row="0" col="0" text="&#xf2db;" class="nt-icon fas" />
    <Label row="0" col="1" text="Senzori" class="p-r-20" />
</GridLayout>

```



