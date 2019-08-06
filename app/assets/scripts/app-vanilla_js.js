const   ul          = document.querySelector('ul'),
        btnAdd      = document.querySelector('.btnAdd'),
        btnDelete   = document.querySelectorAll('.btnDelete')
        btnDone     = document.querySelectorAll('.btnDone'),
        btnEdit     = document.querySelectorAll('.btnEdit'),
        newForm     = document.querySelector('#newForm'),
        editForm    = document.querySelector('#editForm');
//  note: the parent element of the btns is the <li>

//  apply styling for tasks marked as completed
function done(elem){
    elem.parentNode.classList.toggle('doneStyles');
}

btnDone.forEach(btn => {
    btn.addEventListener('click', function(event){
        done(this);
    })
});
/*  
    input new to-do task: 
    - when hit enter capture input value and reset input field
    - create new <li> and add eventlisteners to all three btns created inside 
    the <li> 
*/
newForm.addEventListener('keypress', function(){
    if(event.which === 13){
        let textInput = this.value.trim();
        this.value = '';
        let newLi = document.createElement('li')
        newLi.innerHTML = `<span class="btnDone"><i class="far fa-check-square"></i></span><span class="btnEdit"><i class='fas fa-edit'></i></span><span class="btnDelete"><i class='fas fa-trash-alt'></i></span>${textInput}`
        ul.appendChild(newLi);
        for(let i = 0; i < newLi.children.length; i++){
            newLi.children[i].addEventListener('click', function(){
                if(newLi.children[i].classList.contains('btnDone')){done(this);};
                if(newLi.children[i].classList.contains('btnDelete')){del(this);};
                if(newLi.children[i].classList.contains('btnEdit')){edit(this);};
            })
        };

    }
});
/*  
    edit btn
    - on click capture original task text and show it inside the input elem 
    which is hidden by default (display:none)
    - transform effect comes after applying the class that sets display: block;
    - time out ensures the effect is better visible
    - class is added for reference in the update code below
*/
function edit(elem){
    let taskText = elem.parentNode.textContent.trim();
    editForm.value = taskText;   
    elem.parentNode.classList.add('selected');   
    editForm.classList.remove('fadeOut');
    editForm.classList.add('fadeIn');
    setTimeout(() => {
        editForm.classList.add('transform');
    }, 10);
};

btnEdit.forEach(btn => {
    btn.addEventListener('click', function(){
        edit(this);
        event.stopPropagation();
    });
});

/* 
    update task text value
    - on keypress enter: capture the input value and reset the input field
    - select the correct <li> using the class added when the edit btn was
    clicked
    - IMPORTANT, updating <li> text: since we know the fixed order of the 
    childNodes in the <li> we can update the text value without using 
    innerHTML. 
    - hide the editForm input field 
*/
editForm.addEventListener('keypress', function(event){
    if(event.which === 13){
        let newInput = this.value.trim();
        this.value = '';    // reset
        document.querySelector('.selected').childNodes[3].nodeValue = `${newInput}`;
        document.querySelector('.selected').classList.remove('selected');
        this.classList.add('fadeOut');
        setTimeout(() => {
            this.classList.remove('fadeIn');
            this.classList.remove('transform');
        }, 1000)

    };
});

//  delete button: remove the element from the dom after the fadeOut transition
function del(elem){
    elem.parentNode.classList.add('fadeOut');
    setTimeout(() => {
        ul.removeChild(elem.parentNode);
    }, 1000);
};

btnDelete.forEach(btn => {
    btn.addEventListener('click', function(event) {
        del(this);
    })
});

//  toggle visibilty new task input element
btnAdd.addEventListener('click', () => {
    newForm.classList.toggle('fadeIn');
    setTimeout(() => {
        newForm.classList.toggle('transform');
    }, 10)
});