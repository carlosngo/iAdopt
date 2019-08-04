$(document).ready(() => {
    $("#toggleLogIn").on('click', function() {
        $("#loginUsername").val("")
        $("#loginPassword").val("")
        $("#signupEmail").val("")
        $("#signupUsername").val("")
        $("#signupPassword").val("")
        $("#signupRPassword").val("")
    })

    $("#logInTab").on('click', function() {
        $("#loginUsername").val("")
        $("#loginPassword").val("")
    })

    $("#signUpTab").on('click', function() {
        $("#signupEmail").val("")
        $("#signupUsername").val("")
        $("#signupPassword").val("")
        $("#signupRPassword").val("")
    })

    $("#btn-login").on('click', function() {
        let un = $("#loginUsername").val()
        let pw = $("#loginPassword").val()
        $.ajax({
            url: "login",
            method: "POST",
            data: {
                un: un,
                pw: pw
            },
            success: function(result) {
                console.log(result);
                if (result === "OK") {
                    document.location.reload();
                } else {
                    if($(".loginError").length == 0){
                        $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                    }
                }

            }                    
        })
    })
    $("#btn-signup").on('click', function() {

        let email = $("#signupEmail").val()
        let un = $("#signupUsername").val()
        let pw = $("#signupPassword").val()
        $.ajax({
            url: "signup",
            method: "POST",
            data: {
                un: un,
                pw: pw,
                email: email
            },
            success: function(result) {
                console.log(result);
                if (result === "OK") {
                    document.location.reload();
                } else {
                    if($(".loginError").length == 0){
                        $(".signUpErrorMessage").append("<label class='loginError' style='color: red;'>Username is already taken.</label>");
                    }
                }
            }                    
        })
    })
    $("#btn-logout").on('click', function() {
        $.ajax({
            url: "logout",
            method: "POST",
            success: function(result) {
                window.location = "/"
            }
        })
    })
})