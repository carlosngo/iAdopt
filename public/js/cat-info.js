$(document).ready(() => {
    $(".toggle-edit").hide();
    $("#back-btn").on('click', function() {
        window.history.back();
    })

    $("#btn-edit-cat").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        $("#info-header").val("Editing cat:");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#btn-cancel-edit").on('click', function() {
        
        $("#info-header").val("Hi, my name is:");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })
})