//static previous search from user data
var prevSearchObj = {
    Type: "Both",
    Genre: "Action",
    Actor: "None",
    RunningTime: 120,
    Rating: 75
}

// static movie selection data object
var currentMovie = {
    title: "Shrek",
    type: "Movie",
    genre: "Animated",
    synopsis: "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
    runningTime: 90,
    posterURL: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
    rating: "56%"
}

function loadPrevSearch(){
    if(prevSearchObj.Type === "Both"){
        document.getElementById("prevType").innerHTML = "Movie / Show";
    }
    else{
        document.getElementById("prevType").innerHTML = prevSearchObj.Type;
    }
    document.getElementById("prevGenre").innerHTML = prevSearchObj.Genre;
    document.getElementById("prevActor").innerHTML = prevSearchObj.Actor;
    document.getElementById("prevTime").innerHTML = prevSearchObj.RunningTime + " mins";
    document.getElementById("prevRating").innerHTML = prevSearchObj.Rating + "%";
}

// function requiredChecbox(){

//     var requiredCheckboxes = $(':checkbox[required]');

//     requiredCheckboxes.change(function(){

//         if(requiredCheckboxes.is(':checked')) {
//             requiredCheckboxes.removeAttr('required');
//         }

//         else {
//             requiredCheckboxes.attr('required', 'required');
//         }
//     });
// }




function switchSingleView(){
    console.log("we clicked the button");
    if($("#leftView").css("display") != "none"){
        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#singleView").css("display", "block");
        $("#moviePoster").attr('src', currentMovie.posterURL);
    
        document.getElementById("singleRating").innerHTML = currentMovie.rating;
        document.getElementById("movieTitle").innerHTML = currentMovie.title;
        document.getElementById("runningTime").innerHTML = currentMovie.runningTime + " minutes";
        document.getElementById("synopsis").innerHTML = currentMovie.synopsis;
    }

}


//requiredChecbox();
loadPrevSearch();
// searchExpand();


//requiredChecbox();


function movie(){

    $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#singleView").css("display", "block");

    var API = "2215e66d3770fa7ff283fdf766c88f8c"
    var title = document.querySelector('#movie-title').value;
    console.log("Title is read as ",title);
    var poster = document.querySelector('#moviePoster');

    fetch ("https://api.themoviedb.org/3/search/movie?api_key="
    + API + "&query=" + title)
    .then(function(response) {return response.json()})
    .then(function(response) {
    
        console.log(response);
    

    var id = (response.results[0].id);
    console.log("id is :",id);

    
    fetch ("https://api.themoviedb.org/3/movie/"
    + id
    + "?api_key="
    + API )

    .then(function(detail) {return detail.json()})
    .then(function(detail) {

        console.log("Detail info ",detail);

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
    if (output === "action") {
        genre = 28
    }
    else if (output === "drama") {
        genre = 18
    }
    else if (output === "comedy") {
        genre = 35
    }
    else if (output==="family") {
        genre = 10751
    }
    else if (output==="sci-fi") {
        genre = 878
    }
    else if (output==="thriller") {
        genre = 53
    }
    else if (output==="adventure") {
        genre = 12
    }
    else if (output==="romance") {
        genre = 10749
    }
    else if (output==="horror") {
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

