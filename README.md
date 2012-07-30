Leaflet Focus Overlay
=====================

##Description
Leaflet Focus Overlay is a plugin for the fantastic [Leaflet][1] javascript library.
It's designed to draw special attention to whatever marker has been clicked by
the user. [Give it a test drive][2].

##Using the plugin
Here's how you instantiate the plugin:
```
L.focusOverlay('overlay-small.png', new L.Point(546, 544)).addTo(map);
```

First you define the overlay image url. It's relative to the url of the site.
Second, you define how large the image is in pixels. The image provided is
546px wide by 544px tall. Lastly, you add it to the map by chaining .addTo(map)
at the end! (map being the variable containing the map you created) Enjoy!


[1]: http://leaflet.cloudemade.com
[2]: http://fightthecurrent.org/leaflet-focus-overlay
