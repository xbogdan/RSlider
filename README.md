RSlider
======

Carousel that works with different width for each element.

Requires [jQuery](http://jquery.com/)
 
####Usage
1. Setup your HTML.

  ```html
  <div class="slider">
    <div class="slider-element">content</div>
    <div class="slider-element">content</div>
    <div class="slider-element">content</div>
    <div class="slider-element">content</div>
  </div>
  ```

2. Add `rslider.css` to your `<head>` tag.

  ```html
  <link rel="stylesheet" type="text/css" href="css/rslider.css"/>
  ```

3. Add `rslider.js` before your `<body>` tag.

  ```html
  <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <script type="text/javascript" src="js/rslider.js"></script>
  ```

4. Initialize the slider.

  ```javascript
  $(document).ready(function() {
    $('.slider').rslider(/* Options */);
  });
  ```
