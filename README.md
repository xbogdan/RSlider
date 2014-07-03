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
2. Copy `rslider` folder into your project
 
3. Add `rslider.css` to your `<head>` tag.

  ```html
  <link rel="stylesheet" type="text/css" href="rslider/rslider.css"/>
  ```

4. Add `rslider.js` before your closing `<body>` tag.

  ```html
  <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <script type="text/javascript" src="rslider/rslider.js"></script>
  ```

5. Initialize the slider.

  ```javascript
  $(document).ready(function() {
    $('.slider').rslider(/* Options */);
  });
  ```
  Example with options:
  ```javascript
  $(document).ready(function() {
    $('.slider').rslider({
      width: 600,
      arrows: true,
      initialSlide: 3
    });
  });
  ```
 
#### Options
  Option | Type | Default | Description
  ------ | ---- | ------- | -----------
  width  | int  | 500     | Sliders mask width
  arrows  | string | 'sides' | 'sides' or 'bottom' 
  dots  | boolean | false | Dots under the slider 
  initialSlide | int | number of elements / 2 | Which element to be centered
  overlay | boolean | false | Overlay container
  overlayClass | string | empty string | Class for overlay container


#### Methods
  Method | Arguments | Description
  ------ | --------- | -----------
  rsNext() | | Next slide
  rsPrev() | | Previous slide
  rsResetSlide() | | Reset to initial slide
  rsJumpTo() | int | Jump to slide
 
#### License
  [MIT](LICENSE)
 
