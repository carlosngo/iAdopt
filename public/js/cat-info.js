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
    let catId = $("#cat-id").val();
    let numOfPics = parseInt($("#numOfPics").val());
    console.log(numOfPics)
    let mainPictures = $("#mainPictures");
    let thumbnails = $("#thumbnails");
    if (numOfPics == 0) {
        let i = 0;
        let carouselItem = $("<div></div>")
        carouselItem.addClass("carousel-item");
        if (i == 0) carouselItem.addClass("active")
        let catImg = $("<img>");
        catImg.addClass("d-block")
        catImg.addClass("w-100")
        carouselItem.append(catImg);
        mainPictures.append(carouselItem)
        let thumb = $("<li></li>")
        thumb.attr('data-target', "#carousel-thumb")
        thumb.attr('data-slide-to', "" + i);
        if (i == 0) thumb.addClass("active")
        let thumbPic = $("<img>");
        thumbPic.addClass("d-block")
        thumbPic.addClass("w-100")
        thumbPic.addClass("img-fluid")
        thumb.append(thumbPic);
        thumbnails.append(thumb);
        catImg.attr("src", "../assets/images/defaultCat.jpg")
        thumbPic.attr("src", "../assets/images/defaultCat.jpg")
    }
    for (let i = 0; i < numOfPics; i++) {
        console.log("hi")
        let carouselItem = $("<div></div>")
        carouselItem.addClass("carousel-item");
        if (i == 0) carouselItem.addClass("active")
        let catImg = $("<img>");
        catImg.addClass("d-block")
        catImg.addClass("w-100")
        carouselItem.append(catImg);
        mainPictures.append(carouselItem)
        let thumb = $("<li></li>")
        thumb.attr('data-target', "#carousel-thumb")
        thumb.attr('data-slide-to', "" + i);
        if (i == 0) thumb.addClass("active")
        let thumbPic = $("<img>");
        thumbPic.addClass("d-block")
        thumbPic.addClass("w-100")
        thumbPic.addClass("img-fluid")
        thumb.append(thumbPic);
        thumbnails.append(thumb);
        storage.ref().child('/images/cats/' + catId + "_" + i).getDownloadURL().then(function(url) {
            console.log(url)
            catImg.attr("src", url)
            thumbPic.attr("src", url)
        }).catch(function(error) {
            console.log(error.code)
            if (error.code === "storage/object-not-found") {
                catImg.attr("src", "../assets/images/defaultCat.jpg")
                thumbPic.attr("src", "../assets/images/defaultCat.jpg")
            }
        })
        
    }

    $("#ageOptions").val($("#age").text())
    $("#sexOptions").val($("#gender").text())
    $("#locationOptions").val($("#location").text())
    $("#furPatternOptions").val($("#furPattern").text())
    $("#ageOptions").val($("#age").text())
    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();
    $("#back-btn").on('click', function() {
        window.history.back();
    })
    $("#btn-edit-cat").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        $("#info-header").text("Editing cat:");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#btn-cancel-edit").on('click', function() {
        
        $("#info-header").val("Hi, my name is:");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#btn-adopt").on('click', function() {
        let username = $("#username").text()
        $.ajax({
            url: "adopt",
            method: "POST",
            data: {
                username,
                catId
            },
            success: function(result) {
                if (result === "OK") {
                    document.location.reload();
                } else {
                }
            }
        })
    })

    $("#btn-cancel-request").on('click', function() {
        let requestId = $("#requestId").val()
        $.ajax({
            url: "deleteRequest",
            method: "POST",
            data: {
                id: requestId
            },
            success: function(result) {
                if (result === "OK") {
                    document.location.reload();
                } else {
                }

            }
        })
    })
})