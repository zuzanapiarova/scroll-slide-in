const images = document.querySelectorAll('.slide-in');

function debounce(func, wait = 20, immediate = true) {  //debounce takes in a function and executes it only every 20ms, or whatever wait is set to , often used with scroll event listener to wait
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

function checkSlide(e){
    //console.log(window.scrollY); //window.scrollY shows us where the top of the page is at Y axis of the page everytime we scroll
    images.forEach(image => {
        const imageMiddle = (window.scrollY + window.innerHeight) - image.height / 2; //this is in teh middle of each image, at this point we slide the image in
            //we add innerHeight to show Y coordinate of our position at the bottom of the page, not at top
            //we substract image height to get the coordinate of the bottom of the image
            //BUT we want to target the slide animation in the moddle of the image so we add /2 to the image height 
        //console.log(imageMiddle);
        const imageBottom = image.offsetTop + image.height; // this is the bottom of each image, at this point we slide the image out
        
        //these two variables are values in px, and if the window for each image is between them, the image is showing thanks to added class active, otherwise the class active is removed and image is not visible 
        const isHalfShown = imageMiddle > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if(isHalfShown && isNotScrolledPast){
            image.classList.add('active')
        } else {
            image.classList.remove('active')
        }
    })  
};

  window.addEventListener('scroll', debounce(checkSlide)); //we use debounce to execute checkSlide, so it only executes every 20ms of scrolling and not every single milisecond of scrolling
