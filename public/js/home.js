
$(document).ready(() => {
    $(".btn-article").on('click', function() {
        $("#article-id").val($(this).attr("data-id"))
        $("#article-id-form").submit()
    })

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
})