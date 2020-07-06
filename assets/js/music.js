// lastfm API
var apiKey = "79fdfd2b7dc1438e52917deee02db68d"

// search albums
var getAlbums = function(album) {
    var apiUrl = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + "&api_key=" + apiKey + "&format=json";
    
    fetch(apiUrl).then(function(response) {
        // request successful 
        if (response.ok) {
            response.json().then(function(data) {
                console.log("albums: ", data);
            })
        }
        else {
            document.location.replace("./index.html");
        }
    })
    .catch(function(error) {
        console.log("unable to find album")
    })
};

// search tracks
var getTracks = function(track) {

    var apiUrl = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + track + "&api_key=" + apiKey + "&format=json";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("track: ", data)
            })
        }
        else {
            document.location.replace("./index.html");
        }
    })
    .catch(function(error){
        console.log("unable to find track")
    })
}

getAlbums("frozen");
getTracks("Let it go");