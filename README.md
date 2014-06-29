RSlider
======

Simple javascript carousel which works with elements that have different or the same width.

#### Requirements
Requires [jQuery](http://jquery.com/)
 
 
#### Usage
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

3. Add `rslider.js` before your closing `<body>` tag.

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
 
#### Options
  TO DO
