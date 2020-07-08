var searchBar = document.querySelector("#search-form");
var searchInputEl = document.querySelector(".search-field");
var watchTrailerEl = document.querySelector("#watch-trailer");

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




// function switchSingleView(current){
//     console.log(current)
//     console.log("we clicked the button");
//     if($("#leftView").css("display") != "none"){
//         $("#leftView").css("display", "none");
//         $("#rightView").css("display", "none");
//         $("#singleView").css("display", "block");
//         $("#moviePoster").attr('src', currentMovie.posterURL);
//         if (current)
//         document.getElementById("singleRating").innerHTML = currentMovie.rating;
//         document.getElementById("movieTitle").innerHTML = currentMovie.title;
//         document.getElementById("runningTime").innerHTML = currentMovie.runningTime + " minutes";
//         document.getElementById("synopsis").innerHTML = currentMovie.synopsis;
//     }

// }


// youtube search api
var youtubeSearch = function(searchWord) {
    fetch("https://youtube-search1.p.rapidapi.com/" + searchWord +"%2520trailer", {
	"method": "GET",
	"headers": {
        "x-rapidapi-host": "youtube-search1.p.rapidapi.com",
        // "x-rapidapi-key": "d8dba0f9admsh1a0fa6f762481c0p1728bbjsn3f5abe0fbc8f"
        
        // tester alt key
        "x-rapidapi-key": "ef2575cbcemsh2f0a67b88b9428cp1d1bafjsn5f5e11164e06"
	}
    })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                // display trailer
                watchTrailerEl.addEventListener("click", function(event) {
                    event.preventDefault();

                    for (var i = 0; i < data.items.length; i++) {
                        var trailerUrl = data.items[0].url
                        console.log(trailerUrl);

                    }
                });
            })
        }
    })
    .catch(function(error){
        console.log(error);
    })
};

// search function to link to api
var searchSubmitHandler = function(event) {
    event.preventDefault();

    // get input value
    var searchWord = searchInputEl.value.trim();
    if (searchWord) {
        youtubeSearch(searchWord)
        movie(searchWord)
        // switchSingleView(searchWord);
        searchInputEl.value = "";
    }
    
}


// search bar submit
searchBar.addEventListener("submit", searchSubmitHandler);

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
        document.getElementById("movieTitle").innerHTML = title;
        document.getElementById("runningTime").innerHTML = detail.runtime + " mins";
        document.getElementById("synopsis").innerHTML = detail.overview;
        //document.getElementById("singleRating").innerHTML = detail.
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




requiredChecbox();
loadPrevSearch();
// searchExpand();