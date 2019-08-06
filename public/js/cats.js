$(document).ready(() => {
    $("#cat-nav-link").attr('class', 'nav-link active')
    $(".viewCatCard").on('click', function() {
        $("#cat-id").val($(this).attr('data-id'))
        $("#cat-id-form").submit()
    })
    $("#locationOptions").val($("#location").val())
    $("#ageOptions").val($("#age").val())
    $("#sexOptions").val($("#gender").val())
    $("#furPatternOptions").val($("#furPattern").val())
})