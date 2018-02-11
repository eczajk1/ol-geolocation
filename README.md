# ol-geolocation
Geolocation Control for OpenLayers

## Usage

```js
import Map from 'ol/map';
import View from 'ol/view';
import GeolocationToggle from 'ol-geolocation';

new Map({
   controls: [
     new GeolocationToggle(),
   ],
   target: 'map-container',
   view: new View({
     center: [0,0],
     zoom: 14
   })
 });
```

## Options

All parameters are optional.

| Parameter | Type | Description |
| --- | --- |
| `accuracyStyle` | `ol.style.Style`  | Style to apply to "accuracy" feature |
| `positionStyle` | `ol.style.Style` | Style to apply to "position" feature |
| `transformFn(geometry)` | Function | Geometry transformation function. |


CSS styles need to be included to style the control elements.

## Examples

TODO

## Test

TODO
