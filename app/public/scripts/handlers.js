import $ from 'jquery';
export function addTodo(todo){
    let newLi = $(`<li><span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${todo.name}<input class="task__box" type="checkbox"></li>`);
    newLi.data('id', todo._id);
    newLi.data('completed', todo.completed);
    if(todo.completed){
        newLi.addClass('doneStyles');
    }
    $('ul').append(newLi);   
    $('ul > li > input').on('click', handleSelect);
}

export function handleEdit(){
    if(event.which === 13){
        const current = $('.selected');
        const id = current.data('id');
        const newName = event.target.value; 
        $.ajax({
            method: 'PUT',
            url: `/api/todos/${id}`,
            data: { name: newName }
        })
        .then(function(editedTodo){
            //console.log(editedTodo)
            $('.selected').html(`<span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${newName}<input class="task__box" type="checkbox">`);
            $('.selected').removeClass('selected');
            $('#editForm').val('');
            $('#editForm').fadeOut(500);
        })
        .catch(function(err){console.log(err)});
    };
}

export function handleDel(event, elem){
    const current = elem ? elem : $(this);
    $.ajax({
        method: 'DELETE',
        url: `/api/todos/${current.parent().data('id')}`
    })
    .then(function(){
        current.parent().fadeOut(500, function(){
            $(this).remove();
        })
    })
    .catch(function(err){console.log(err)});
    event.stopPropagation();
}

export function handleStatusChange(event, elem){
    //fn can be triggered by update btn on individual task or bulk update
    const current = elem ? elem : $(this);
    let isDone    = current.parent().data('completed');
    const updateData = { completed: !isDone };
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${current.parent().data('id')}`,
        data: updateData
    })
    .then(function(){
        //update styles
        const p = current.parent().children().first();
        p.toggleClass('done');
        //update the hidden data attribute
        current.parent().data('completed', !isDone);
        current.parent().toggleClass('doneStyles');
    })
    .catch(function(err){console.log(err)});
}

export let lastChecked = null;
export function handleSelect(){
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
        //console.log(lastChecked)
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