let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
$(document).ready(() => {
    $(".btn-article").on('click', function() {
        $("#article-id").val($(this).attr("data-id"))
        $("#article-id-form").submit()
    })

    $("#btn-addArticle").on('click', function() {
        let title = $("#title-field").val();
        let content = $("#content-field").val();
        let files = document.getElementById('image-file').files
        alert(files);
        if (files && files[0]) {
            let file = files[0]
            var reader = new FileReader();
            reader.onloadend = function() {
                // $("#add-article-image").attr('src', reader.result)
                var now = new Date();
                var timestamp = months[now.getMonth()] + " " + now.getDate() + " at " + now.getHours() + ":" + now.getMinutes()
                let author = $("#username").text()
                $.ajax({
                    url: "addArticle",
                    method: "POST",
                    data: {
                        title,
                        content,
                        author,
                        timestamp,
                        imgBase64: reader.result,
                        imgFileType: file.type
                    },
                    success: function(result) {
                        console.log(result);
                        if (result === "OK") {
                            document.location.reload();
                        } else {
                        }
        
                    }                    
                })
            };
            reader.onerror = function() {
                alert("There was an error reading the file!");
            };
            reader.readAsDataURL(file);
        } else {

        }
        
    })
})