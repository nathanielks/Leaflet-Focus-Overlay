Leaflet Focus Overlay
=====================

##Description
Leaflet Focus Overlay is a plugin for the fantastic [Leaflet][1] javascript library.
It's designed to draw special attention to whatever marker has been clicked by
the user. [Give it a test drive][2].

##Using the plugin
Here's how you instantiate the plugin:
```
L.focusOverlay().addTo(map);
```

That's it!  Well, you're *almost* done. You need to define somethings in your
stylesheet as well. On to the next section! 

( Btw, `map` is the variable you instantiated L.map() with. )

##Less Mixin explained
The mixin has 5 parameters: bg-color, width, height, iconOffset. The width
and height are however big you want the overlay to be, so in this case I chose
550px and 550px, respectively. The iconOffset compensates for the height of the
icon, so that way when the overlay is present it doesn't look offcenter.
fallbackImage is the image you'd like to fallback to in case the browser
doesn't support CSS3 Radial gradients.

All that being said, Enjoy!

[1]: http://leaflet.cloudemade.com
[2]: http://fightthecurrent.org/leaflet-focus-overlay/example/map.html
