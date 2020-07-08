function requiredChecbox(){

    var requiredCheckboxes = $(':checkbox[required]');

    requiredCheckboxes.change(function(){

        if(requiredCheckboxes.is(':checked')) {
            requiredCheckboxes.removeAttr('required');
        }

        else {
            requiredCheckboxes.attr('required', 'required');
        }
    });

}

requiredChecbox();


function movie(){

    var API = "2215e66d3770fa7ff283fdf766c88f8c"
    var title = document.querySelector('#movie-title').value;
    var poster = document.querySelector('#poster');

    fetch ("https://api.themoviedb.org/3/search/movie?api_key="
    + API + "&query=" + title)
    .then(function(response) {return response.json()})
    .then(function(response) {
    
        console.log(response);
    

    var id = (response.results[0].id);
    console.log(id);

    
    fetch ("https://api.themoviedb.org/3/movie/"
    + id
    + "?api_key="
    + API )

    .then(function(detail) {return detail.json()})
    .then(function(detail) {

        console.log(detail);

        var title = (detail.title)
        console.log(title);

        var imgUrl = "https://image.tmdb.org/t/p/w185//" + (detail.poster_path)
        poster.src = ""
        poster.src = imgUrl

        var imdbID = (detail.imdb_id)


        fetch("https://imdb8.p.rapidapi.com/title/get-taglines?tconst=" + imdbID, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "5cd2f671a2msh72b310a2732290bp1bff51jsna9b4db70046c"
	    }
        })

        .then(function(tagline) {return tagline.json()})
        .then(function(tagline) {

            console.log(tagline)
        })

    })
    })
}


function topFive (){

    var API = "2215e66d3770fa7ff283fdf766c88f8c"

    fetch("https://api.themoviedb.org/3/discover/movie?api_key=" +
    API +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")

    .then(function(top) {return top.json()})
    .then(function(top) {

        console.log(top);
        var posterArray = []

        
        for (i=0; i < 5; i++) {
            
            randomNum = Math.floor(Math.random() * 20)
            console.log(randomNum)
            console.log([top.results[randomNum].poster_path]);

            var posterPath = (top.results[randomNum].poster_path)

            if (posterArray.includes(posterPath)) {
                
            }
            else {posterArray.push("https://image.tmdb.org/t/p/w185//" + posterPath);}
            
            
        }

        $("#poster1").attr("src", posterArray[0])
        $("#poster2").attr("src", posterArray[1])
        $("#poster3").attr("src", posterArray[2])
        $("#poster4").attr("src", posterArray[3])
        $("#poster5").attr("src", posterArray[4])

        console.log(posterArray);


        

    })
    
}
function search() {
    console.log("you clicked search")
    var genreSelector = document.querySelector('#genre-select'); 
      
    var output = genreSelector.value; 

    var API = "2215e66d3770fa7ff283fdf766c88f8c"
    var genre = 0
    if (output="action") {
        genre = 28
    }
    else if (output="drama") {
        genre = 18
    }
    else if (output="comedy") {
        genre = 35
    }
    else if (output="family") {
        genre = 10751
    }
    else if (output="sci-fi") {
        genre = 878
    }
    else if (output="thriller") {
        genre = 53
    }
    else if (output="adventure") {
        genre = 12
    }
    else if (output="romance") {
        genre = 10749
    }
    else if (output="horror") {
        genre = 27
    }

    fetch("https://api.themoviedb.org/3/discover/movie?api_key=" +
    API +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=" +
    genre +
    "&page=1")
    .then(function(movieSearch) {return movieSearch.json()})
    .then(function(movieSearch) {
    
        console.log(movieSearch)
        


})}

topFive();

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

