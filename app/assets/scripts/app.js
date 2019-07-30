import $ from 'jquery';

/* 
    Note: event listeners needs to account for elements that can be added by 
    the user    
*/
$('ul').on('click', '.btnDone', function(){
    $(this).parent().toggleClass('doneStyles');
});

//  input new to-do's
$('#newForm').keypress(function(event){
    if(event.which === 13){
        //  capture the input value
        let textInput = $(this).val();
        $(this).val('');    // reset input field
        $('ul').append(`<li><span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${textInput}</li>`);
    }
});

//  edit btn
$('ul').on('click', '.btnEdit', function(event) {
    //  capture original task text and show it inside the input elem
    let taskText = $(this).parent().text().trim();
    //  class added for reference in the update code
    $(this).parent().addClass('selected');   
    $('#editForm').fadeToggle(500, function(){
        $(this).val(taskText);
    });
    event.stopPropagation();
});

//  update task text value
$('#editForm').keypress(function(event){
    if(event.which === 13){
        //  capture the input value
        let newInput = $(this).val();
        $(this).val('');    // reset
        $('.selected').html(`<span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${newInput}`);
        $('.selected').removeClass('selected');
        $(this).fadeOut(500);
    };
});

//  delete button
$('ul').on('click', '.btnDelete', function(event) {
    //  parent of the .btnDelete is the <li>. <li> gets faded out, then removed
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

//  toggle visibilty new task input element
$('.btnAdd').on('click', function(){
    $('#newForm').fadeToggle();
});