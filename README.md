mouseover_detect
----------------

This library detects if browser supports mouseover event.

For a long time had been assumed that all browser will have mouseover events, 
but with the not so late introduction to mobile devices and also computers 
with touchscreen this assumption causes undesired behaviors.

These are some of the issues you might experience:

- Mobile Devices
  - When styles are added for `:hover` on links, this causes on mobile that 
    the first touch (click), won't fire the desired action, it will instead 
    activate the hover state of the link, and a second click will be needed 
    to get the desired click behavior, this is solved by removing the CSS 
    style `:hover` from the link, therefore the first click will result in 
    the real click behavior.
- Remove :hover only from Mobile Devices:
  - There are some libraries that try to detect if the browser is using a 
  Mobile devices, either by measuring width of the browser or by inspecting 
  on Javascript the navigator.userAgent value, the problem with this, is 
  that this would't work with existing known mobile devices, but as soon as 
  a new browser or mobile device were to be promoted, this approach wouldn't 
  work, also, this doesn't take into consideration, that you might use a 
  Mouse connected through bluetooth, in which case, you would trigger 
  `mouseover` events.
- Rely on Width:
  - Similar to the above approach, this doesn't take into account that you 
  can actually resize your desktop browser width, neither you would have a 
  way to predict all mobile devices width's.

Solution
--------

The approach we use is to actually detect mouseover event, as soon as the 
user moves the mouse, class `has-mouseover` will be added to `html` tag.

Now, instead of adding styles to links as this:
```
a:hover{
  text-decoration: underline;
}
```
You would do it as:
```
html.has-mouseover a:hover{
  text-decoration: underline;
}
```
With this approach you cover the following situations:

- If user has a mobile device, mouseover won't be triggered, therefore the 
  `a:hover` rule won't be present, and the first click on the link will 
  trigger the desired behavior.
- If user has a mouse connected to desktop computer, tablet, mobile, or any 
  kind of device, has-mouseover will be added as soon as mouse is moved inside 
  the website, therefore all `:hover` or rules that you prefix with 
  `html.has-mouseover` will be present.

How to use
----------

  1. Install this package through composer:
```
composer require cristian100/mouseover_detect
```
  2. Load library file `/libraries/mouseover_detect/dist/mouseover_detect.min.js` into your <header> tag.

Once this library is load, you will see has-mouseover class in the html tag, 
from here you can create `:hover` styles that depend on this class, so that 
it works only when mouseover has been detected.
