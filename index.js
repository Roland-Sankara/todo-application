let todoInput = document.querySelector('input');
let todoContainer = document.querySelector('#todo-container');

// <i class="fa-solid fa-trash-can"></i>

const toDos = JSON.parse(localStorage.getItem('toDoItems'));
// ['<li>go to church</li>','visit the mall']
if(toDos){
    let toDoNodeList = toDos.map((item,index)=>{
        let listElement = document.createElement('li');
        let spanElement = document.createElement('span')
        spanElement.innerText = item;
        listElement.id = index;
        listElement.classList.add('list-item');
        
        let iconElement = document.createElement('i');
        iconElement.classList.add('fa-solid');
        iconElement.classList.add('fa-trash-can');

        // add event listener
        iconElement.addEventListener('click',()=>{
            iconElement.parentNode.remove();
            updateLocalStorage();
        })

        listElement.append(spanElement,iconElement);
        return listElement;
    });

    todoContainer.append(...toDoNodeList);
}



function addItem(){
    let toDo = todoInput.value;

    let listElement = document.createElement('li');
    let spanElement = document.createElement('span')
    spanElement.innerText =  toDo;
    listElement.classList.add('list-item');
    // create icon element
    let iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid');
    iconElement.classList.add('fa-trash-can');
    // add event listener to delete task
    iconElement.addEventListener('click',()=>{
        updateLocalStorage();
        iconElement.parentNode.remove();
    })
    // add span and icon to list element 
    listElement.append(spanElement,iconElement);
    // add it to the todoContainer
    todoContainer.prepend(listElement);
    todoInput.value = "";
    addToLocalStorage(toDo);
}

todoInput.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        addItem();
    }
});


function addToLocalStorage(todo){
    const toDos = JSON.parse(localStorage.getItem('toDoItems'));
    if(toDos){
        toDos.unshift(todo);
        localStorage.setItem('toDoItems',JSON.stringify(toDos));
    }else{
        localStorage.setItem('toDoItems',JSON.stringify([todo]))
    }
}

function updateLocalStorage(){
    let listNodes = Array.from(todoContainer.childNodes);
    let newList = listNodes.map((task)=>{
        return task.childNodes[0].innerText;
    })
    
    localStorage.setItem('toDoItems',JSON.stringify(newList));
}


