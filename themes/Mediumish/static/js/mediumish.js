jQuery(document).ready(function($){

    var offset = 1250; 
    var duration = 800; 
    jQuery(window).scroll(function() { 
        if (jQuery(this).scrollTop() > offset) { 
        jQuery('.back-to-top').fadeIn(duration); 
        } else { 
        jQuery('.back-to-top').fadeOut(duration); 
        }
    });
    jQuery('.back-to-top').click(function(event) { 
    event.preventDefault(); 
    jQuery('html, body').animate({scrollTop: 0}, duration); 
    return false; 
    })


    // alertbar later
    $(document).scroll(function () {
        var maxScroll = $(document).height() - $(window).height();
        var y = $(this).scrollTop();
        if (y > 350 || y + 100 > maxScroll) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });


    // Smooth on external page
    $(function() {
      setTimeout(function() {
        if (location.hash) {
          /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
          window.scrollTo(0, 0);
          target = location.hash.split('#');
          smoothScrollTo($('#'+target[1]));
        }
      }, 1);

      // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
      $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          smoothScrollTo($(this.hash));
          return false;
        }
      });

      function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
    });
    
    
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('nav').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
           
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');             
            }
        }

        lastScrollTop = st;
    }
    
    
    //$('.site-content').css('margin-top', $('header').outerHeight() + 'px');

    // The debounce function receives our function as a parameter
    const debounce = (fn) => {

      // This holds the requestAnimationFrame reference, so we can cancel it if we wish
      let frame;

      // The debounce function returns a new function that can receive a variable number of arguments
      return (...params) => {
        
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) { 
          cancelAnimationFrame(frame);
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
          
          // Call our function and pass any params we received
          fn(...params);
        });

      } 
    };


    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY;
    }

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();

});
