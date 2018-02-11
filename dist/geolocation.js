'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geolocation = require('ol/geolocation');

var _geolocation2 = _interopRequireDefault(_geolocation);

var _control = require('ol/control/control');

var _control2 = _interopRequireDefault(_control);

var _feature = require('ol/feature');

var _feature2 = _interopRequireDefault(_feature);

var _point = require('ol/geom/point');

var _point2 = _interopRequireDefault(_point);

var _style = require('ol/style/style');

var _style2 = _interopRequireDefault(_style);

var _circle = require('ol/style/circle');

var _circle2 = _interopRequireDefault(_circle);

var _fill = require('ol/style/fill');

var _fill2 = _interopRequireDefault(_fill);

var _stroke = require('ol/style/stroke');

var _stroke2 = _interopRequireDefault(_stroke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeolocationToggle = function (_Control) {
  _inherits(GeolocationToggle, _Control);

  function GeolocationToggle(opts) {
    _classCallCheck(this, GeolocationToggle);

    var options = opts || {};

    var element = document.createElement('div');
    element.className = 'geolocation-toggle';

    var _this = _possibleConstructorReturn(this, (GeolocationToggle.__proto__ || Object.getPrototypeOf(GeolocationToggle)).call(this, {
      element: element,
      target: options.target
    }));

    var geoToggle = _this;
    _this.accuracyFeature = new _feature2.default();
    _this.positionFeature = new _feature2.default();

    if (options.accuracyStyle) {
      _this.accuracyFeature.setStyle(options.accuracyStyle);
    }
    if (options.positionStyle) {
      _this.positionFeature.setStyle(options.positionStyle);
    } else {
      var positionStyle = new _style2.default({
        image: new _circle2.default({
          radius: 6,
          fill: new _fill2.default({ color: '#3399CC' }),
          stroke: new _stroke2.default({
            color: '#fff',
            width: 2
          })
        })
      });
      _this.positionFeature.setStyle(positionStyle);
    }

    _this.transformFn = options.transformFn;

    var button = document.createElement('button');
    button.className = 'geolocation-button';

    element.appendChild(button);
    var geolocation = new _geolocation2.default({
      projection: options.projection
    });

    geoToggle.toggled = false;
    button.onclick = function () {
      geoToggle.toggled = !geoToggle.toggled;
      geolocation.setTracking(geoToggle.toggled);
    };

    geolocation.on('change:accuracyGeometry', function () {
      var accuracy = geolocation.getAccuracyGeometry();
      accuracy = geoToggle.transformFn ? geoToggle.transformFn(accuracy) : accuracy;
      geoToggle.accuracyFeature.setGeometry(accuracy);
    });

    geolocation.on('change:position', function () {
      var coordinates = geolocation.getPosition();
      var newPoint = coordinates ? new _point2.default(coordinates) : null;
      newPoint = geoToggle.transformFn ? geoToggle.transformFn(newPoint) : newPoint;
      geoToggle.positionFeature.setGeometry(newPoint);
    });
    return _this;
  }

  return GeolocationToggle;
}(_control2.default);

exports.default = GeolocationToggle;