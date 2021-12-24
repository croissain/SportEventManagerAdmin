$("#selectAll").click(function(){
    $('.select-row-checkbox').not(this).prop('checked', this.checked);
});

$('#resetBtn').click(function (){
    console.log("sang");
    $('input[type=text]').val("");
    $('input[type=number]').val("");
    $('input[type=date]').val("");
    $('#limit').val('10');
    if(""){ console.log("true")}
    else{ console.log("false")}
})


$(".edit").click(function() {
    const id = $(this).children('input').val();
    console.log(id);
    $("#editID").val(id);
});

$(".delete").click(function() {
    const id = $(this).children('input').val();
    console.log(id);
    $("#deleteID").val(id);
});
