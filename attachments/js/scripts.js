
   // Masonry corner stamp modifications
$.Mason.prototype.resize = function() {
this._getColumns();
this._reLayout();
};
$.Mason.prototype._reLayout = function( callback ) {
var freeCols = this.cols;
if ( this.options.cornerStampSelector ) {
var $cornerStamp = this.element.find( this.options.cornerStampSelector ),
cornerStampX = $cornerStamp.offset().left -
( this.element.offset().left + this.offset.x + parseInt($cornerStamp.css('marginLeft')) );
freeCols = Math.floor( cornerStampX / this.columnWidth );
}
// reset columns
var i = this.cols;
this.colYs = [];
while (i--) {
this.colYs.push( this.offset.y );
}
for ( i = freeCols; i < this.cols; i++ ) {
this.colYs[i] = this.offset.y + $cornerStamp.outerHeight(true);
}
// apply layout logic to all bricks
this.layout( this.$bricks, callback );
}; 
  
  $(function(){
    
    var $container = $('#food');
    
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector: '.panel',
         columnWidth: 160,
  gutterWidth: 25,
  isAnimated: true,
  animationOptions: {
    duration: 600,
	easing: 'linear',
    queue: false,
	cornerStampSelector: '.featured-panel'
	
  }
      });
    });
    
    $container.infinitescroll({
      navSelector  : '#page-nav',    // selector for the paged navigation 
      nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
      itemSelector : '.panel',     // selector for all items you'll retrieve
      loading: {
          finishedMsg: 'No more pages to load.',
          img: 'http://i.imgur.com/6RMhx.gif'
        }
      },
      // trigger Masonry as a callback
      function( newElements ) {
        // hide new items while they are loading
        var $newElems = $( newElements ).css({ opacity: 0 });
        // ensure that images load before adding to masonry layout
        $newElems.imagesLoaded(function(){
          // show elems now they're ready
          $newElems.animate({ opacity: 1 });
          $container.masonry( 'appended', $newElems, isAnimatedFromBottom); 
        });
      }
    );
    
  });
  


$('.dropdown-toggle').dropdown()