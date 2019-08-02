$(document).ready(() => {
    $(".cardContainer").on('click', function() {
        $("#cat-id").val($(this).attr('data-id'))
        $("#cat-id-form").submit()
    })
})