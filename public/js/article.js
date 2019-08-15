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
    storage.ref().child('/images/articles/' + $("#articleId").val()).getDownloadURL().then(function(url) {
        console.log(url)
        $("#img-article").attr("src", url)
    }).catch(function(error) {
        console.log(error.code)
        if (error.code === "storage/object-not-found") {
            $("#img-article").attr("src", "../assets/images/website.png")
        }
    })
    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();

    $("#back-btn").on('click', function() {
        window.location = $("#referer").val()
    })

    $("#editBtn").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        // $("#profileheader").text("Edit Profile");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#editCancelBtn").on('click', function() {
        // $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#saveBtn").on('click', function() {
        let content = $("#contentField").val();
        let title = $("#titleField").val();
        let id = $("#articleId").val()
        $.ajax({
            url: "updateArticle",
            method: "POST",
            data: {
                id, content, title
            },
            success: function (result) {
                $(".toggle-show").show();
                $(".toggle-edit").hide();
                $("#content").text(content);
                $("#title").text(title);
            }
        })
        // $("#profileheader").text("Profile");
    })
})