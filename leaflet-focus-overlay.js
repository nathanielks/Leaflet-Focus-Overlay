L.FocusOverlay = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        opacity: 0,
    },

    initialize: function (url, size, options) { // (String, LatLngBounds, Object)
        this._url = url;
        this._size = L.point(size);
        this._positionSet = false;

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
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
    },

    fadeIn: function(){
        this
            .setOpacity(1)
            .moveToPoint()
            ._addTransition();
        console.log('fade in');
        return this;
    },

    fadeOut: function(){
        this.setOpacity(0); 
        console.log('fade out');
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
            this._overlay.image = L.DomUtil.create('img', 'overlay-center', this._overlay.middle);
            this._overlay.middle.right = L.DomUtil.create('div', 'overlay-right', this._overlay.middle);
        this._overlay.bottom = L.DomUtil.create('div', 'overlay-bottom', this._overlay);


        if (this._map.options.zoomAnimation && L.Browser.any3d) {
            L.DomUtil.addClass(this._overlay, 'leaflet-zoom-animated');
        } else {
            L.DomUtil.addClass(this._overlay, 'leaflet-zoom-hide');
        }

        this._updateOpacity();

        //TODO createImage util method to remove duplication
        L.Util.extend(this._overlay.image, {
            galleryimg: 'no',
            onselectstart: L.Util.falseFn,
            onmousemove: L.Util.falseFn,
            onload: L.Util.bind(this._onOverlayLoad, this),
            src: this._url
        });

        this._overlay.image.style.width = this._size.x + 'px'; 
        this._overlay.image.style.height = this._size.y + 'px'; 
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
        L.DomUtil.setOpacity(this._overlay, this.options.opacity);
    }
});

L.focusOverlay = function (url, size, options) {
    return new L.FocusOverlay(url, size, options);
};
