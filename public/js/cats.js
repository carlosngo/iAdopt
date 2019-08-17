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

// var idSelected;

// function submitform(){
//     console.log("Id being submitted: " + idSelected);
//     $("#form" + idSelected).submit();
// };

$(document).ready(() => {
    
    let location = $("#location").val();
    let pattern = $("#furPattern").val();
    let gender = $("#gender").val();
    let age = $("#age").val();
    let adoption = $("#adoption").val()

    console.log(location);
    console.log(pattern);
    console.log(gender);
    console.log(age);
    console.log(adoption);

    if (location != "All") {
        $("#locationFilter").addClass("filtered")
        $("#locationFilter .dropdown-toggle").text(location)
        let str = "[data-id='" + location + "']";
        $(str).addClass("active");
    }
    if (pattern != "All") {
        $("#patternFilter").addClass("filtered")
        $("#patternFilter .dropdown-toggle").text(pattern)
        let str = "[data-id='" + pattern + "']";
        $(str).addClass("active");
    }

    if (gender != "All") {
        $("#genderFilter").addClass("filtered")
        $("#genderFilter .dropdown-toggle").text(gender)
        let str = "[data-id='" + gender + "']";
        $(str).addClass("active");
    }

    if (age != "All") {
        $("#ageFilter").addClass("filtered")
        $("#ageFilter .dropdown-toggle").text(age)
        let str = "[data-id='" + age + "']";
        $(str).addClass("active");
    }

    if (adoption != "All") {
        $("#adoptionFilter").addClass("filtered");
        $("#adoptionFilter .dropdown-toggle").text(adoption)
        let str = "[data-id='" + location + "']";
        $(str).addClass("active");
    }

    $(".clear-filter").on('click', function() {
        let filter = $(this).attr("data-filter");
        console.log(filter)
        if (filter == "location") $("#location").val("All");
        if (filter == "furPattern") $("#furPattern").val("All") ;
        if (filter == "gender") $("#gender").val("All") ;
        if (filter == "age") $("#age").val("All") ;
        if (filter == "adoption") $("#adoption").val("All") ;
        $("#search-form").submit();
    })

    $("#locationFilter .dropdown-item:not(.clear-filter)").on('click', function() {
        $("#location").val($(this).attr("data-id"))
        $("#search-form").submit();
    })

    $("#patternFilter .dropdown-item:not(.clear-filter)").on('click', function() {
        $("#furPattern").val($(this).attr("data-id"))
        $("#search-form").submit();
    })

    $("#genderFilter .dropdown-item:not(.clear-filter)").on('click', function() {
        $("#gender").val($(this).attr("data-id"))
        $("#search-form").submit();
    })

    $("#ageFilter .dropdown-item:not(.clear-filter)").on('click', function() {
        $("#age").val($(this).attr("data-id"))
        $("#search-form").submit();
    })

    $("#adoptionFilter .dropdown-item:not(.clear-filter)").on('click', function() {
        $("#adoption").val($(this).attr("data-id"))
        $("#search-form").submit();
    })
    
    // $(".removeBtn").click(function(){
    //     let id = $(this).attr("data-id")
    //     idSelected = id;
    //     console.log("Was here with the id: " + idSelected);
    // });

    $("#button-addon3").on('click', function() {
        console.log('clicked');
        $("#name").val($("#search-field").val());
        $("#search-form").submit();
    })

    $("#cat-nav-link").attr('class', 'nav-link active')
    $(".viewCatCard").on('click', function() {
        $("#cat-id").val($(this).attr('data-id'))
        $("#cat-id-form").submit()
    })
    $(".btn-delete").hide();
    $(".viewCatCard").mouseenter(function() {
        $(this).find('.btn-delete').show();
    })
    $(".viewCatCard").mouseleave(function() {
        $(this).find('.btn-delete').hide();
    })


    // $(".btn-delete").on('hover', function() {
    //     $(this).css("background-image", "url(/myimage.jpg)")
    // })




    $(".img-cat").each(function() {
        let catId = $(this).attr('data-id');
        let img = $(this);
        storage.ref().child('/images/cats/' + catId + "_0").getDownloadURL().then(function(url) {
            console.log(url)
            img.attr("src", url)
        }).catch(function(error) {
            console.log(error.code)
            if (error.code === "storage/object-not-found") {
                img.attr("src", "../assets/images/defaultCat.jpg")
            }
        })
    })

    $("#btn-add-cat").on('click', function() {
        $.ajax({
            url: "addCat",
            method: "POST",
            data: {
                name : $("#addName").val(),
                age : $("#addAge :selected").text(),
                location : $("#addLocation :selected").text(),
                gender : $("#addGender :selected").text(),
                furPattern : $("#addFurPattern :selected").text(),
                complications : $("#addComp").val(),
                medProcedures : $("#addMed").val(),
                notes : $("#addNotes").val(),
                adoption : $("#addAdoption").is(":checked"),
                numOfPics: document.getElementById('addPictures').files.length
            },
            success: (result) => {
                if (result != "FAIL") {
                    let files = document.getElementById('addPictures').files
                    console.log(files);
                    if (files && files.length > 0) {
                        var total = files.length;
                        var count = 0;
                        for (let i = 0; i < files.length; i++) {
                            storage.ref().child('/images/cats/' + result + "_" + i).put(files[i]).then(function(snapshot) {
                                console.log("successfully uploaded image.")
                                count++;
                                if (count > total - 1) {
                                    $(document.body).css({'cursor' : 'default'});
                                    window.location.reload();
                                }
                            });
                        }
                        $(document.body).css({'cursor' : 'wait'});
                    } else {
                        window.location.reload();
                    }
                } 
            }            
        })
        

        
    })

    $("#resetBtn").on('click', function() {
        $('#locationOptions').get(0).selectedIndex = 0;
        $('#furPatternOptions').get(0).selectedIndex = 0;
        $('#sexOptions').get(0).selectedIndex = 0;
        $('#ageOptions').get(0).selectedIndex = 0;
    })
})