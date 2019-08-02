
$(document).ready(() => {
    $(".btn-article").on('click', function() {
        $("#article-id").val($(this).attr("data-id"))
        $("#article-id-form").submit()
    })
})