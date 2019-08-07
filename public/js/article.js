$(document).ready(() => {
    // $("#back-btn").on('click', function() {
    //     window.history.back();
    // })

    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();

    $("#back-btn").on('click', function() {
        window.history.back();
    })

    $("#editBtn").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        // $("#profileheader").text("Edit Profile");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#editCancelBtn").on('click', function() {
        // $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#saveBtn").on('click', function() {
        // $("#profileheader").text("Profile");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })
})