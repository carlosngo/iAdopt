$(document).ready(() => {
    $("#ageOptions").val($("#age").text())
    $("#sexOptions").val($("#gender").text())
    $("#locationOptions").val($("#location").text())
    $("#furPatternOptions").val($("#furPattern").text())
    $("#ageOptions").val($("#age").text())
    let state = $("#state").val();
    if (state === "edit") $(".toggle-show").hide();
    else $(".toggle-edit").hide();
    $("#back-btn").on('click', function() {
        window.history.back();
    })
    $("#btn-edit-cat").on('click', function() {
        // $(".label-field").attr('class', 'editable-field');
        $("#info-header").text("Editing cat:");
        $(".toggle-show").hide();
        $(".toggle-edit").show();
    })

    $("#btn-cancel-edit").on('click', function() {
        
        $("#info-header").val("Hi, my name is:");
        $(".toggle-show").show();
        $(".toggle-edit").hide();
    })

    $("#btn-adopt").on('click', function() {
        let username = $("#username").text()
        let catId = $("#cat-id").val();
        $.ajax({
            url: "adopt",
            method: "POST",
            data: {
                username,
                catId
            },
            success: function(result) {
                if (result === "OK") {
                    document.location.reload();
                } else {
                }
            }
        })
    })

    $("#btn-cancel-request").on('click', function() {
        let requestId = $("#requestId").val()
        $.ajax({
            url: "deleteRequest",
            method: "POST",
            data: {
                id: requestId
            },
            success: function(result) {
                if (result === "OK") {
                    document.location.reload();
                } else {
                }

            }
        })
    })
})