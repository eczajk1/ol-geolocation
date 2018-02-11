import Geolocation from 'ol/geolocation';
import Control from 'ol/control/control';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';

export default class GeolocationToggle extends Control {
  constructor(opts) {
    const options = opts || {};

    const element = document.createElement('div');
    element.className = 'geolocation-toggle';

    super({
      element,
      target: options.target,
    });

    const geoToggle = this;
    this.accuracyFeature = new Feature();
    this.positionFeature = new Feature();

    if (options.accuracyStyle) {
      this.accuracyFeature.setStyle(options.accuracyStyle);
    }
    if (options.positionStyle) {
      this.positionFeature.setStyle(options.positionStyle);
    } else {
      const positionStyle = new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: '#3399CC' }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
      this.positionFeature.setStyle(positionStyle);
    }

    this.transformFn = options.transformFn;

    const button = document.createElement('button');
    button.className = 'geolocation-button';

    element.appendChild(button);
    const geolocation = new Geolocation({
      projection: options.projection,
    });

    geoToggle.toggled = false;
    button.onclick = () => {
      geoToggle.toggled = !geoToggle.toggled;
      geolocation.setTracking(geoToggle.toggled);
    };

    geolocation.on('change:accuracyGeometry', () => {
      let accuracy = geolocation.getAccuracyGeometry();
      accuracy = geoToggle.transformFn ? geoToggle.transformFn(accuracy) : accuracy;
      geoToggle.accuracyFeature.setGeometry(accuracy);
    });

    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition();
      let newPoint = coordinates ? new Point(coordinates) : null;
      newPoint = geoToggle.transformFn ? geoToggle.transformFn(newPoint) : newPoint;
      geoToggle.positionFeature.setGeometry(newPoint);
    });
  }
}
