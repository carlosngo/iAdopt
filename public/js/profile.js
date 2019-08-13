$(document).ready(() => {
    
    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();
    $("#back-btn").on('click', function() {
        window.history.back();
    })
    $("#contEdit").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        $("#pwConfirmationField").val("");
        $("#profileheader").text("Edit Profile");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#editCancelBtn").on('click', function() {
        $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#saveBtn").on('click', function() {
        console.log("I am here");
        let email = $("#changeEmail").val();
        let un = $("#changeUsername").val();
        let pw = $("#changePassword").val();
        let cpw = $("#changeCPassword").val();

        console.log(email+un+pw+cpw);

        if(email != "" && un != "" && pw != "" && cpw != ""){
            console.log(email+un+pw+cpw);
            if(pw == cpw){
                console.log(email+un+pw+cpw);
                $.ajax({
                    url: "updateUser",
                    method: "POST",
                    data: {
                        un: un,
                        pw: pw,
                        email: email
                    },
                    success: function() {
                        $(".toggle-show").show();
                        $(".toggle-edit").hide();
                        document.location.reload();
                    }                    
                })
            }else{
                if($(".editError").length == 0){
                    $(".editErrorMessage").append("<label class='editError' style='color: red;'>Wrong Repeated Password</label>");
                }else{
                    $(".editErrorMessage .editError").remove();
                    $(".editErrorMessage").append("<label class='editError' style='color: red;'>Wrong Repeated Password</label>");
                }
            }

        }else{
            if($(".editError").length == 0){
                    $(".editErrorMessage").append("<label class='editError' style='color: red;'>Fields cannot be Empty</label>");
                }else{
                    $(".editErrorMessage .editError").remove();
                    $(".editErrorMessage").append("<label class='editError' style='color: red;'>Fields cannot be Empty</label>");
                }
        }
        $("#profileheader").text("Profile");
    })

    $("#pwConfirmationCancel").on('click', function() {
        $("#pwConfirmationField").val("");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })
})