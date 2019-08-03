$(document).ready(() => {
    $("#btn-login").on('click', function() {
        let un = $("#loginEmail").val()
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
                        $(".errorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                    }
                }

            }                    
        })
    })
})