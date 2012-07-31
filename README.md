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

Don't forget to include the css! Included is a less file with a mixin for
generating the overlay. 

##Less Mixin explained
The mixin has 4 parameters: bg-color, width, height, and iconOffset. The width
and height are whatever you defined when instantiating the overlay, so in this
case it's 546px and 544px, respectively. The iconOffset compensates for the height
of the icon, so that way when the overlay is present it doesn't look offcenter.

[1]: http://leaflet.cloudemade.com
[2]: http://fightthecurrent.org/leaflet-focus-overlay
