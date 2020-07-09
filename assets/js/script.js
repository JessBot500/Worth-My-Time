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
    var newTitle = document.getElementById("movieTitle").innerHTML;
    var exists = false;
    for(var i =0; i < watchedMovies.length; i++){
        if(watchedMovies[i].title === newTitle){
            exists = true;
            break;
        }
    }

    if(!exists){
        console.log("This movie doesn't exist yet in our watched list!")
        var newMovie = {
            title: newTitle,
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
    }
    else{
        console.log("ahhh, we already watched this one!")
    }
    
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




    // function switchSingleView() {
    //     console.log("we clicked the button");
    //     if ($("#leftView").css("display") != "none") {
    //         $("#leftView").css("display", "none");
    //         $("#rightView").css("display", "none");
    //         $("#singleView").css("display", "block");
    //         $("#moviePoster").attr('src', currentMovie.posterURL);
    //         //if (current) 
    //             document.getElementById("singleRating").innerHTML = currentMovie.rating;
    //             document.getElementById("movieTitle").innerHTML = currentMovie.title;
    //             document.getElementById("runningTime").innerHTML = currentMovie.runningTime + " minutes";
    //             document.getElementById("synopsis").innerHTML = currentMovie.synopsis;

    //     }
    // }


    requiredChecbox();
    loadPrevSearch();
    // searchExpand();


    function switchSingleView(movieDiv){
        console.log("clicked on a specific movie");
        var imgURL = movieDiv.querySelector('.movie-poster').getAttribute('src');
        var ratingVal = movieDiv.querySelector('.movie-rating').innerHTML;
        var titleVal = movieDiv.querySelector('.movie-title').innerHTML;
        var runtimeVal = movieDiv.querySelector('.movie-runTime').innerHTML;
        var synopsisVal = movieDiv.querySelector('.movie-synopsis').innerHTML;
        var genresVal = movieDiv.querySelector('.movie-genres');
        if(genresVal === "" || genresVal === null || genresVal === undefined)
            genresVal = "";
        else
            genresVal = genresVal.innerHTML;

        if ($("#leftView").css("display") != "none" || $("#resultListView").css("display") != "none") {
            $("#leftView").css("display", "none");
            $("#rightView").css("display", "none");
            $("#viewWatchedList").css("display", "none");
            $("#resultListView").css("display", "none");
            $("#singleView").css("display", "block");
            $("#moviePoster").attr('src', imgURL);
            document.getElementById("singleRating").innerHTML = ratingVal;
            document.getElementById("movieTitle").innerHTML = titleVal;
            document.getElementById("runningTime").innerHTML = runtimeVal;
            document.getElementById("synopsis").innerHTML = synopsisVal;
            document.getElementById("type").innerHTML = "Movie";
            document.getElementById("genre").innerHTML = genresVal;
        }
    }


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
            multiMovie(searchWord);
            //movie(searchWord)
            // switchSingleView(searchWord);
            searchInputEl.value = "";
        }

    }


    searchBar.addEventListener("submit", searchSubmitHandler);

    function movie() {

        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#viewWatchedList").css("display", "none");
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

                console.log("Total number of related results is: ", response.results.length);

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
                        }

                        genreEl.innerHTML = innerGenreList;
                        console.log(title);

                        var imgUrl = "https://image.tmdb.org/t/p/w780//" + (detail.poster_path)
                        poster.src = ""
                        poster.src = imgUrl

                        var imdbID = (detail.imdb_id)


                    //     fetch("https://imdb8.p.rapidapi.com/title/get-taglines?tconst=" + imdbID, {
                    //         "method": "GET",
                    //         "headers": {
                    //             "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    //             "x-rapidapi-key": "5cd2f671a2msh72b310a2732290bp1bff51jsna9b4db70046c"
                    //         }
                    //     })

                    //         .then(function (tagline) { return tagline.json() })
                    //         .then(function (tagline) {

                    //             console.log(tagline)
                    //         })

                     })
            })
    }

    function multiMovie() {

        document.getElementById('listHeaderTitle').innerHTML = "These Might Be Worth Your Time";
        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#viewWatchedList").css("display", "none");
        $("#singleView").css("display", "none");
        $("#resultListView").css("display", "block");

        var exists = false;
        var titleArray = [];
    for(var i =0; i < watchedMovies.length; i++){
        titleArray.push(watchedMovies[i].title);
    }

        console.log("TitleArray is: ", titleArray);
        var API = "2215e66d3770fa7ff283fdf766c88f8c"
        var title = document.querySelector('#movie-title').value;
        console.log("Title is read as ", title);
        var poster = document.querySelector('#moviePoster');
        var innerResultString = "";
        var movieListEl = document.getElementById("movieList");

        fetch("https://api.themoviedb.org/3/search/movie?api_key="
            + API + "&query=" + title)
            .then(function (response) { return response.json() })
            .then(function (response) {

                console.log(response);

                console.log("Total number of related results is: ", response.results.length);
                
                for(var i = 0; i < response.results.length; i++){
                    var id = (response.results[i].id);
                    console.log("id is :", id);


                    fetch("https://api.themoviedb.org/3/movie/"
                        + id
                        + "?api_key="
                        + API)

                        .then(function (detail) { return detail.json() }
                    )
                    .then(function (detail) {

                        console.log("Detail info ", detail);

                        var title = (detail.title)
                        console.log("reported index showing possibility of already being watched is: ",titleArray.indexOf(title));
                        if(titleArray.indexOf(title) < 0){                            
                        
                            var posterURL = detail.poster_path;
                            var reportedRuntime = detail.runtime;
                            if(posterURL === null){
                                posterURL = "https://placehold.it/75";
                            }
                            else{
                                posterURL = "https://image.tmdb.org/t/p/w780//"+posterURL;
                            }
                            if(reportedRuntime === null || reportedRuntime === 0){
                                reportedRuntime = "No Runtime Recorded";
                            }
                            var genreList = detail.genres;
                                var innerGenreList = '';
                                for(var i = 0; i < genreList.length; i++){
                                    innerGenreList += '<span class="primary badge" id="genre'+i+'">';
                                    innerGenreList += genreList[i].name;
                                    innerGenreList += '</span>';
                                }

                                var reportedRating = ((detail.vote_average) * 10);
                                if (reportedRating === 0 || reportedRating === undefined || reportedRating === null){
                                    reportedRating = "No Reported Rating";
                                }

                                
                            innerResultString += '<div class="small-12 medium-9 columns about-people movieItem" onclick="switchSingleView(this)">'
                                + '<div class="about-people-avatar"><img class="avatar-image movie-poster"'
                                + ' src="'+posterURL+'"></div><div class="about-people-author">'
                                + '<span class="columns medium-12"><p class="author-name movie-title columns medium-8">'+title+'</p><p class="secondary movie-rating label">'
                                + reportedRating + '%</p></span>'
                                +  '<span class="movie-genres">' + innerGenreList + '</span>'
                                + '<p class="author-location movie-runTime">'+reportedRuntime+' mins</p>'
                                + '<p class="author-mutual movie-synopsis">'+detail.overview+'</p></div></div>'
                                + '<div class="small-12 medium-3 columns add-friend"><div class="add-friend-action">'
                                +  '<button class="button primary small">Watch Trailer</button>'
                                +  '<button class="button secondary small">'+"I'll Watch This!</button>"
                                +  '</div></div>';

                                

                            movieListEl.innerHTML = innerResultString;
                        }
                    })
                }
                
                
            })
    }
    
    function listWatchedMovies(){
        $("#leftView").css("display", "none");
        $("#rightView").css("display", "none");
        $("#viewWatchedList").css("display", "none");
        $("#singleView").css("display", "none");
        $("#resultListView").css("display", "block");

        document.getElementById('listHeaderTitle').innerHTML = "Watched List";

        var innerResultString = "";
        var movieListEl = document.getElementById("movieList");
        for(var i = 0; i< watchedMovies.length; i++){
            innerResultString += '<div class="small-12 medium-9 columns about-people movieItem" onclick="switchSingleView(this)">'
                            + '<div class="about-people-avatar"><img class="avatar-image movie-poster"'
                            + ' src="'+watchedMovies[i].posterURL+'"></div><div class="about-people-author">'
                            + '<span class="columns medium-12"><p class="author-name movie-title columns medium-8">'+watchedMovies[i].title+'</p><p class="secondary movie-rating label">'
                            + watchedMovies[i].rating + '%</p></span>'
                            +  '<span class="movie-genres">' + watchedMovies[i].genre + '</span>'
                            + '<p class="author-location movie-runTime">'+watchedMovies[i].runtime+' mins</p>'
                            + '<p class="author-mutual movie-synopsis">'+watchedMovies[i].synopsis+'</p></div></div>'
                            + '<div class="small-12 medium-3 columns add-friend"><div class="add-friend-action">'
                            +  '<button class="button primary small">Watch Trailer</button>'
                            +  '<button class="button secondary small">'+"I'll Watch This!</button>"
                            +  '</div></div>';
        }
                        movieListEl.innerHTML = innerResultString;

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
