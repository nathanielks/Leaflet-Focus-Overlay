L.FocusOverlay = L.Class.extend({
    includes: L.Mixin.Events,

    initialize: function (size, options) { // (String, LatLngBounds, Object)
        this._size = L.point(size);
        this._positionSet = false;
        this._opacity = 0;

        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._overlay) {
            this._initOverlay();
        }

        map._panes.overlayPane.appendChild(this._overlay);

        map.on('viewreset dragend', this._reset, this);
        map.on('popupopen', this._setViewToPopup, this);
        map.on('popupopen', this.fadeIn, this);
        map.on('dragstart click popupclose', this.fadeOut, this );
        map.on('dragstart click', this._removeTransition, this);

        this._reset();
    },

    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this._overlay);
        map.off('viewreset', this._reset, this);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    setOpacity: function (opacity) {
        this._opacity = opacity;
        this._updateOpacity();
        return this;
    },

    fadeIn: function(){
        this
            .setOpacity(1)
            .moveToPoint()
            ._addTransition();
        return this;
    },

    fadeOut: function(){
        this.setOpacity(0);
        return this;
    },

    moveToPoint: function(){
        var point = this._map.latLngToLayerPoint(this._map.currentPoint);
        this._moveToPoint(point);
        return this;
    },

    _addTransition: function(){
            L.DomUtil.addClass(this._overlay, 'add-transition');
    },

    _removeTransition: function(){
            L.DomUtil.removeClass(this._overlay, 'add-transition');
    },

    _moveToPoint: function(point){
        L.DomUtil.setPosition(this._overlay, point);
        return this;
    },

    _initOverlay: function () {
        this._overlay = L.DomUtil.create('div', 'leaflet-focus-overlay');
        this._overlay.top = L.DomUtil.create('div', 'overlay-top', this._overlay);
        this._overlay.middle = L.DomUtil.create('div', 'overlay-middle', this._overlay);
            this._overlay.middle.left = L.DomUtil.create('div', 'overlay-left', this._overlay.middle);
            this._overlay.image = L.DomUtil.create('div', 'overlay-center', this._overlay.middle);
            this._overlay.middle.right = L.DomUtil.create('div', 'overlay-right', this._overlay.middle);
        this._overlay.bottom = L.DomUtil.create('div', 'overlay-bottom', this._overlay);


        this._updateOpacity();
    },

    _getViewCenter: function(){
        this._map.viewCenter = this._map.getCenter();
    },

    _reset: function () {
        L.DomUtil.setPosition(this._overlay, this._map.latLngToLayerPoint(this._map.getCenter()));
    },

    _setViewToPopup: function(e){
        var lat = e.popup._latlng.lat,
            lng = e.popup._latlng.lng,
            latLng = new L.LatLng(lat, lng);
        this._map.setView(latLng, this._map.getZoom() );
        this._map.currentPoint = latLng;
    },

    _onOverlayLoad: function () {
        this.fire('load');
    },

    _updateOpacity: function () {
        L.DomUtil.setOpacity(this._overlay, this._opacity);
    }
});

L.focusOverlay = function () {
    return new L.FocusOverlay();
};
