var prevSearchObj = {
    Type: "Both",
    Genre: "Action",
    Actor: "None",
    RunningTime: 120,
    Rating: 75
}
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


// function searchExpand(){
//   $('.search')
//     .bind('click', function(event) {
//         console.log("We clicked the search button");
//       $(".search-field").toggleClass("expand-search");

//       // if the search field is expanded, focus on it
//       if ($(".search-field").hasClass("expand-search")) {
//           console.log("Here is the sitch where the expand-class is already applied");
//         $(".search-field").focus();
//       }
//     })
// };

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


requiredChecbox();
loadPrevSearch();
// searchExpand();