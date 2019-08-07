$(document).ready(() => {
    
    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();
    $("#back-btn").on('click', function() {
        window.history.back();
    })
    $("#contEdit").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
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
        /*
            somethings should be here
        */
        $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })
})