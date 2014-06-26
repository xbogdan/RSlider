$(document).ready(function() {
  var slider = $('.slider-elements-box');
  var current = $('.se-cur');
  var centerLine = $('.slider-container').width()/2;
  
  if (current) {
    var leftSpace = (current.width()/2) + parseInt(current.css('margin-left'), 10) + parseInt(current.css('padding-left'), 10);
    if (centerLine - current.position().left < 0) {
      var add = Math.abs(centerLine - current.position().left) + leftSpace;
      slider.css('margin-left', -add+'px');
    } else {
      var add = leftSpace - Math.abs(centerLine - current.position().left);
      slider.css('margin-left', -add+'px');
    }
  } else {
    return;
  }
  
  $('a.right').click(function(e) {
    e.preventDefault();
    var next = current.next();
    if (next) {
      var leftSpace = (next.width()/2) + parseInt(next.css('margin-left'), 10) + parseInt(next.css('padding-left'), 10);
      var add = Math.abs(centerLine - next.position().left) + leftSpace;
      slider.animate({'margin-left': '-='+add+'px'}, 300, 'swing');
      current.removeClass('se-cur');
      current = next.addClass('se-cur');
    }
  });
  
  $('a.left').click(function(e) {
    e.preventDefault();
    var prev = current.prev();
    if (prev) {
      var leftSpace = (prev.width()/2) + parseInt(prev.css('margin-left'), 10) + parseInt(prev.css('padding-left'), 10);
      var add = Math.abs(centerLine - prev.position().left) - leftSpace;
      slider.animate({'margin-left': '+='+add+'px'}, 300, 'swing');
      current.removeClass('se-cur');
      current = prev.addClass('se-cur');
    }
  });
  
});