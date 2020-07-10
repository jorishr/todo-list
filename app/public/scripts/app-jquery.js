import $ from 'jquery';
import { 
    addTodo, handleStatusChange, 
    handleSelect, handleDel, 
    handleEdit } from './handlers';
//load from db
$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(todos => {
        //console.log(todos)
        todos.forEach(todo => addTodo(todo))
    })
    .catch(function(err){console.log(err)});
});

$('ul').on('click', '.btnDone', handleStatusChange);

//mark as done all selected
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
        let textInput = $(this).val().trim();
        $.post('/api/todos', {name: textInput})
        .then(function(newTodo){
            addTodo(newTodo);
        })
        .catch(function(err){console.log(err)});
        //  capture the input value and reset input field
        $(this).val('');
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

//  edit task text value
$('#editForm').keypress(handleEdit);

//  delete button
$('ul').on('click', '.btnDelete', handleDel);

$('button#del').on('click', function() {
    const checkedBoxes = $('input:checked:not(#checkAll)');
    checkedBoxes.each(function() {
        handleDel(event, $(this));
        $(this).prop('checked', false);
    })
    $('#checkAll').prop('checked', false);
})

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