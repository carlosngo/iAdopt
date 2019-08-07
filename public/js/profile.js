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
        $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#pwConfirmationCancel").on('click', function() {
        $("#pwConfirmationField").val("");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })
})