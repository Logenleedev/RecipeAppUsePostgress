$(document).ready(function () {
    $(".Delete-button").on('click',function(){
        var id = $(this).data('id');
        var url = '/delete/' + id;
        if(confirm('Delete Recipe?')){
            $.ajax({
                url: url,
                method: "DELETE",
                success: (result)=>{
                    console.log("successful!");
                    window.location.href = '/';
                },
                error:(err)=>{
                    console.log(err);
                    
                }
            })
        }
    $('.edit-button').on('click',function(){
        $("#edit-form-id").val($(this).data('id'));
        $("#edit-form-name").val($(this).data('name'));
        $("#edit-form-ingredient").val($(this).data('ingredient'));
        $("#edit-form-directions").val($(this).data('direction'));
    })    
    })
});