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
    $("#cat-nav-link").attr('class', 'nav-link active')
    $(".viewCatCard").on('click', function() {
        $("#cat-id").val($(this).attr('data-id'))
        $("#cat-id-form").submit()
    })
    $("#locationOptions").val($("#location").val())
    $("#ageOptions").val($("#age").val())
    $("#sexOptions").val($("#gender").val())
    $("#furPatternOptions").val($("#furPattern").val())

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
})