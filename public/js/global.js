$(document).ready(() => {
    $("#btn-login").on('click', function() {
        let un = $("#modalLRInput10").val()
        let pw = $("#modalLRInput11").val()
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
                    alert("something went wrong")
                }

            }                    
        })
    })
    $("#btn-signup").on('click', function() {
        let email = $("#modalLRInput12").val()
        let un = $("#modalLRInput13").val()
        let pw = $("#modalLRInput14").val()
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
                    alert("something went wrong")
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