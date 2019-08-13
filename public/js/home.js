let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var firebaseConfig = {
    apiKey: "AIzaSyAsTMmESGmIn3fx7i4IUrmwARc8EoUwf0Y",
    authDomain: "iadopt-159ff.firebaseapp.com",
    databaseURL: "https://iadopt-159ff.firebaseio.com",
    projectId: "iadopt-159ff",
    storageBucket: "iadopt-159ff.appspot.com",
    messagingSenderId: "705005534813",
    appId: "1:705005534813:web:96e980b96db033a3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

$(document).ready(() => {
    $(".img-article").each(function() {
        let articleId = $(this).attr('data-id');
        console.log(articleId)
        let img = $(this);
        storage.ref().child('/images/articles/' + articleId).getDownloadURL().then(function(url) {
            console.log(url)
            img.attr("src", url)
        }).catch(function(error) {
            console.log(error.code)
            if (error.code === "storage/object-not-found") {
                img.attr("src", "../assets/images/defaultArticle.png")
            }
        })
    })

    $(".btn-article").on('click', function() {
        $("#article-id").val($(this).attr("data-id"))
        $("#article-id-form").submit()
    })

    $(".viewCatCard").on('click', function() {
        $("#cat-id").val($(this).attr('data-id'))
        $("#cat-id-form").submit()
    })
    
    $("#btn-addArticle").on('click', function() {
        let title = $("#title-field").val();
        let content = $("#content-field").val();
        let files = document.getElementById('image-file').files
        let now = new Date();
        let minutes = now.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let timestamp = months[now.getMonth()] + " " + now.getDate() + " at " + now.getHours() + ":" + minutes
        let author = $("#username").text()
        $.ajax({
            url: "addArticle",
            method: "POST",
            data: {
                title,
                content,
                author,
                timestamp,
            },
            success: (result) => {
                if (result != "FAIL") {
                    if (files && files[0]) {
                        let file = files[0]
                        storage.ref().child('/images/articles/' + result).put(file).then(function(snapshot) {
                            console.log("successfully uploaded image.")
                        });
                    } 
                    document.location.reload();
                }
            }            
        })
        
    })
})
