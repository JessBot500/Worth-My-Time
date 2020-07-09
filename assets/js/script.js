var searchBar = document.querySelector("#search-form");
var searchInputEl = document.querySelector(".search-field");
var watchTrailerEl = document.querySelector("#watch-trailer");
var watchedMovies = JSON.parse(localStorage.getItem('watchedMovieList')) || [{
    title: "Shrek",
    type: "Movie",
    genre: "Animated",
    synopsis: "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
    runningTime: 90,
    posterURL: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
    rating: "56%"
}];


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

function loadPrevSearch() {
        var prevSearchObj = JSON.parse(localStorage.getItem('prevSearch')) || {
            Type: "Movie / Show",
            Genre: "Action",
            Actor: "None",
            RunningTime: 120,
            Rating: 75
        };
        console.log("currentprevSearch is: ", prevSearchObj);
        document.getElementById("prevType").innerHTML = prevSearchObj.Type;
        document.getElementById("prevGenre").innerHTML = prevSearchObj.Genre;
        document.getElementById("prevActor").innerHTML = prevSearchObj.Actor;
        document.getElementById("prevTime").innerHTML = prevSearchObj.RunningTime + " mins";
        document.getElementById("prevRating").innerHTML = prevSearchObj.Rating + "%";
    }


function loadWatchedMovies(){
    
    console.log("loading watched movie list");
    if ($("#singleView").css("display") != "none") {
        $("#singleView").css("display", "none");
        $("#viewWatchedList").css("display", "block");
    }
    else if($("#leftView").css("display") != "none"){
        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#viewWatchedList").css("display", "block");
    }
    var latest = watchedMovies.length -1;
    console.group(watchedMovies[0]);
    $("#watchedPoster").attr("src",watchedMovies[latest].posterURL);
    document.getElementById("watchedTitle").innerHTML = watchedMovies[latest].title;
    document.getElementById("watchedType").innerHTML = watchedMovies[latest].type;
    document.getElementById("watchedGenre").innerHTML = watchedMovies[latest].genre;
    document.getElementById("watchedRating").innerHTML = watchedMovies[latest].rating;
    document.getElementById("watchedTime").innerHTML = watchedMovies[latest].runningTime + " mins";
    document.getElementById("watchedSynopsis").innerHTML = watchedMovies[latest].synopsis;
}

function saveWatchedMovie(){
    var newMovie = {
        title: document.getElementById("movieTitle").innerHTML,
        type: document.getElementById("type").innerHTML,
        genre: document.getElementById("genre").innerHTML,
        synopsis: document.getElementById("synopsis").innerHTML,
        runningTime: document.getElementById("runningTime").innerHTML,
        posterURL: $("#moviePoster").attr("src"),
        rating: document.getElementById("singleRating").innerHTML
    }

    console.log(newMovie);
    
    watchedMovies.push(newMovie);
    localStorage.setItem("watchedMovieList", JSON.stringify(watchedMovies));
    loadWatchedMovies();
}

    function requiredChecbox() {

        var requiredCheckboxes = $(':checkbox[required]');

        requiredCheckboxes.change(function () {

            if (requiredCheckboxes.is(':checked')) {
                requiredCheckboxes.removeAttr('required');
            }

            else {
                requiredCheckboxes.attr('required', 'required');
            }
        });
    }




    function switchSingleView() {
        console.log("we clicked the button");
        if ($("#leftView").css("display") != "none") {
            $("#leftView").css("display", "none");
            $("#rightView").css("display", "none");
            $("#singleView").css("display", "block");
            $("#moviePoster").attr('src', currentMovie.posterURL);
            //if (current) 
                document.getElementById("singleRating").innerHTML = currentMovie.rating;
                document.getElementById("movieTitle").innerHTML = currentMovie.title;
                document.getElementById("runningTime").innerHTML = currentMovie.runningTime + " minutes";
                document.getElementById("synopsis").innerHTML = currentMovie.synopsis;

        }
    }


    requiredChecbox();
    loadPrevSearch();
    // searchExpand();


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




    function switchSingleView() {
        console.log("we clicked the button");
        if ($("#leftView").css("display") != "none") {
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
    /*var youtubeSearch = function(searchWord) {
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
                    // console.log(data);
    
                    // display trailer
                    watchTrailerEl.addEventListener("click", function(event) {
                        event.preventDefault();
    
                        for (var i = 0; i < data.items.length; i++) {
                            var trailerUrl = data.items[0].url
                            open(trailerUrl, "_blank");
                            // console.log(trailerUrl);
    
                        }
                    });
                })
            }
        })
        .catch(function(error){
            console.log(error);
        })
    };
    */
    // search function to link to api
    var searchSubmitHandler = function (event) {
        event.preventDefault();

        // get input value
        var searchWord = searchInputEl.value.trim();
        if (searchWord) {
            //youtubeSearch(searchWord)
            movie(searchWord)
            // switchSingleView(searchWord);
            searchInputEl.value = "";
        }

    }

    requiredChecbox();

    searchBar.addEventListener("submit", searchSubmitHandler);

    function movie() {

        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#singleView").css("display", "block");

        var API = "2215e66d3770fa7ff283fdf766c88f8c"
        var title = document.querySelector('#movie-title').value;
        console.log("Title is read as ", title);
        var poster = document.querySelector('#moviePoster');

        fetch("https://api.themoviedb.org/3/search/movie?api_key="
            + API + "&query=" + title)
            .then(function (response) { return response.json() })
            .then(function (response) {

                console.log(response);


                var id = (response.results[0].id);
                console.log("id is :", id);


                fetch("https://api.themoviedb.org/3/movie/"
                    + id
                    + "?api_key="
                    + API)

                    .then(function (detail) { return detail.json() })
                    .then(function (detail) {

                        console.log("Detail info ", detail);

                        var title = (detail.title)
                        var genreEl = document.getElementById("genre");
                        document.getElementById("movieTitle").innerHTML = title;
                        document.getElementById("runningTime").innerHTML = detail.runtime + " mins";
                        document.getElementById("synopsis").innerHTML = detail.overview;
                        document.getElementById("singleRating").innerHTML = ((detail.vote_average) * 10) + "%"
                        document.getElementById("type").innerHTML = "Movie";
                        console.log(detail.genres);
                        var genreList = detail.genres;
                        var innerGenreList = '';
                        for(var i = 0; i < genreList.length; i++){
                            innerGenreList += '<span class="primary badge" id="genre'+i+'">';
                            innerGenreList += genreList[i].name;
                            innerGenreList += '</span>';
                            console.log(innerGenreList);
                        }

                        genreEl.innerHTML = innerGenreList;
                        console.log(title);

                        var imgUrl = "https://image.tmdb.org/t/p/w780//" + (detail.poster_path)
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

                            .then(function (tagline) { return tagline.json() })
                            .then(function (tagline) {

                                console.log(tagline)
                            })

                    })
            })
    }

    function topFive() {

        var API = "2215e66d3770fa7ff283fdf766c88f8c"

        fetch("https://api.themoviedb.org/3/discover/movie?api_key=" +
            API +
            "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")

            .then(function (top) { return top.json() })
            .then(function (top) {

                console.log(top);
                var posterArray = []


                for (i = 0; i < 5; i++) {

                    var randomNum = Math.floor(Math.random() * 20)
                    console.log(randomNum)
                    console.log([top.results[randomNum].poster_path]);

                    var posterPath = (top.results[randomNum].poster_path)

                    if (posterArray.includes(posterPath)) {

                    }
                    else { posterArray.push("https://image.tmdb.org/t/p/w185//" + posterPath); }


                }

                $("#poster1").attr("src", posterArray[0])
                $("#poster2").attr("src", posterArray[1])
                $("#poster3").attr("src", posterArray[2])
                $("#poster4").attr("src", posterArray[3])
                $("#poster5").attr("src", posterArray[4])

                console.log(posterArray);




            })

    }

    function saveNewSearch() {
        var checkType = "";
        var movieCheck = document.getElementById("movieType").checked;
        var showCheck = document.getElementById("showType").checked;
        var genreSelect = document.getElementById("genre-select").value;
        var actorSelect = document.getElementById("actor").value;
        var runningTselect = document.getElementById("maxMins").value;
        var ratingSelect = document.getElementById("rating").value;
        document.getElementById("movieType").checked = false;
        document.getElementById("showType").checked = false;
        document.getElementById("genre-select").value = "Any";
        document.getElementById("actor").value = "";
        document.getElementById("maxMins").value = "";
        document.getElementById("minMins").value = "";
        document.getElementById("rating").value = "";


        var upper = genreSelect.charAt(0).toUpperCase();
        genreSelect = genreSelect.slice(1);
        genreSelect = upper + genreSelect;

        if (movieCheck && showCheck) {
            checkType = "Movie / Show"
        }
        else if (movieCheck) {
            checkType = "Movie"
        }
        else {
            checkType = "Show"
        }
        if (actorSelect === "" || actorSelect === undefined) {
            actorSelect = "None";
        }
        if (runningTselect === null || runningTselect === undefined) {
            runningTselect = 0;
        }
        if (ratingSelect === null || ratingSelect === undefined) {
            ratingSelect = 0;
        }
        prevSearchObj = {
            Type: checkType,
            Genre: genreSelect,
            Actor: actorSelect,
            RunningTime: runningTselect,
            Rating: ratingSelect
        }

        console.log("recent search is: ", prevSearchObj);
        localStorage.setItem("prevSearch", JSON.stringify(prevSearchObj));
    }

    function search() {
        console.log("you clicked search")
        saveNewSearch();
        loadPrevSearch();

        var genreSelector = document.querySelector('#genre-select');

        var output = genreSelector.value;
        console.log(output)

        var API = "2215e66d3770fa7ff283fdf766c88f8c"
        var genre = 0
        if (output === "action") {
            genre = 28
        }
        if (output === "drama") {
            genre = 18
        }
        if (output === "comedy") {
            genre = 35
        }
        if (output === "family") {
            genre = 10751
        }
        if (output === "sci-fi") {
            genre = 878
        }
        if (output === "thriller") {
            genre = 53
        }
        if (output === "adventure") {
            genre = 12
        }
        if (output === "romance") {
            genre = 10749
        }
        if (output === "horror") {
            genre = 27
        }

        fetch("https://api.themoviedb.org/3/discover/movie?api_key=" +
            API +
            "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=" +
            genre +
            "&page=1")
            .then(function (movieSearch) { return movieSearch.json() })
            .then(function (movieSearch) {

                console.log(movieSearch)



            })
    }

    topFive();
