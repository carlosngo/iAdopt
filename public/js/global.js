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

        if(un != "" && pw != ""){
            $.ajax({
                url: "login",
                method: "POST",
                data: {
                    un: un,
                    pw: pw
                },
                success: function(result) {
                    if (result === "OK") {
                        window.location = "/"
                    } else {
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }
                    }

                }                    
                })
        }else{
            if($(".loginError").length == 0){
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }else{
                $(".logInErrorMessage .loginError").remove();
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }
        }
    })  

    $("#btn-signup").on('click', function() {

        let email = $("#signupEmail").val()
        let un = $("#signupUsername").val()
        let pw = $("#signupPassword").val()
        let dpw = $("#signupRPassword").val()

        if(email != "" && un != "" && pw != "" && dpw != ""){
            if(pw == dpw){
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
                            window.location = "/"
                        } else {
                            if($(".signUpError").length == 0){
                                $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Username is already taken.</label>");
                            }else{
                                $(".signUpErrorMessage .signUpError").remove();
                                $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Username is already taken.</label>");
                            }
                        }
                    }                    
                })
            }else{
                if($(".signUpError").length == 0){
                    $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Wrong Repeated Password</label>");
                }else{
                    $(".signUpErrorMessage .signUpError").remove();
                    $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Wrong Repeated Password</label>");
                }
            }

        }else{
            if($(".signUpError").length == 0){
                    $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Fields cannot be Empty</label>");
                }else{
                    $(".signUpErrorMessage .signUpError").remove();
                    $(".signUpErrorMessage").append("<label class='signUpError' style='color: red;'>Fields cannot be Empty</label>");
                }
        }
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

    $("#btn-profile").on('click', function() {
        $("#username-form").submit();
    })
})
