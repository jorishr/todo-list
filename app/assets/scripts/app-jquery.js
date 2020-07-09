import $ from 'jquery';
/* 
    Note: event listeners needs to account for elements that can be added by 
    the user    
*/
$('ul').on('click', '.btnDone', handleStatusChange);

$('button#update').on('click', function() {
    const checkedBoxes = $('input:checked:not(#checkAll)');
    checkedBoxes.each(function() {
        handleStatusChange(event, $(this));
        $(this).prop('checked', false);
    })
    $('#checkAll').prop('checked', false);
})

$('ul > li > input').on('click', handleSelect);

//  input new to-do's
$('#newForm').keypress(function(event){
    if(event.which === 13){
        //  capture the input value and reset input field
        let textInput = $(this).val().trim();
        $(this).val('');
        $('ul').append(`<li><span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${textInput}<input class="task__box" type="checkbox"></li>`);
        $('ul > li > input').on('click', handleSelect);
    }
});
/*  
    edit btn
    - capture original task text and show it inside the input elem
    - class added for reference in the update code below
    - unhide the input elem
*/
$('ul').on('click', '.btnEdit', function(event) {
    let taskText = $(this).parent().text().trim();
    $(this).parent().addClass('selected');   
    $('#editForm').fadeToggle(500, function(){
        $(this).val(taskText);
    });
    event.stopPropagation();
});

//  update task text value
$('#editForm').keypress(handleUpdate);

function handleUpdate(){
    if(event.which === 13){
        //  capture the input value and reset field on enter
        let newInput = $(this).val().trim();
        $(this).val('');
        $('.selected').html(`<span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${newInput}<input class="task__box" type="checkbox">`);
        $('.selected').removeClass('selected');
        $(this).fadeOut(500);
    };
}

//  delete button
$('ul').on('click', '.btnDelete', function(event) {
    //  parent of the .btnDelete is the <li>. <li> gets faded out, then removed
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$('button#del').on('click', function() {
    const checkedBoxes = $('input:checked:not(#checkAll)');
    checkedBoxes.each(function() {
        handleDel(event, $(this));
        $(this).prop('checked', false);
    })
    $('#checkAll').prop('checked', false);
})

function handleDel(event, elem){
    const current = elem ? elem : $(this);
    current.parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
}

//  toggle visibilty new task input element
$('.btnAdd').on('click', function(){
    $('#newForm').fadeToggle();
});

$("#checkAll").click(function () {
    if ($("#checkAll").is(':checked')) {
        $("input[type=checkbox]").each(function () {
            $(this).prop("checked", true);
            $('button').fadeIn();
        });

    } else {
        $("input[type=checkbox]").each(function () {
            $(this).prop("checked", false);
            $('button').fadeOut(500);
        });
    }
});

function handleStatusChange(event, elem){
    //fn can be triggered by update btn on individual task or bulk update
    const current = elem ? elem : $(this);
    current.parent().toggleClass('doneStyles');
}
let lastChecked = null;
function handleSelect(){
    //let lastChecked = null;
    let checkboxes = $('input:checkbox:not(#checkAll)');
   
    $('button').fadeIn();
    //console.log("checkbox clicked");
    if(!lastChecked) {
        //console.log("This was the first checkbox clicked");
        lastChecked = this;
        return;
    }
    if(event.shiftKey) {
        console.log(lastChecked)
        //console.log("Shift held");
        let start = checkboxes.index(this);
        let end   = checkboxes.index(lastChecked);
        checkboxes.slice(Math.min(start, end), Math.max(start, end) + 1)
            .prop('checked', lastChecked.checked);
        lastChecked = null;    
    }
    lastChecked = this;
    //show/hide removeBtn
    if($('input:checked').length === 0){
        $('button').fadeOut();
    } 
}