let allTasks_array = [
    // {
    //     task:"delete this",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"hello this is the second work",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"hello this is the second work",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"delete this",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"hello this is the second work",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"deone this",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"hello this is the second work",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"hello this is the second work",
    //     date:"8-30-2026"
    // },
    // {
    //     task:"done this",
    //     date:"8-30-2026"
    // },
] || []


let deletedIndexes = []
let doneIndexes =  []

function handleKeyDown(event){
    if(event.key==='Enter') handleAdd(event)
}

function handleAdd(event){
    event.preventDefault()

    const task_box = document.querySelector('#input-box-text')
    const task = task_box.value

    const task_date = document.querySelector('#input-date')
    const date = task_date.value

    if(task==="" || date==="") {
        return
    }

    const id = crypto.randomUUID()

    task_box.value=""
    task_date.value=null

    allTasks_array.push({task,date,id})
    renderTasks()
}

renderTasks()

function renderTasks(){
    const container = document.querySelector('.render-tasks')
    container.innerHTML=""
    for(let i=allTasks_array.length-1;i>=0;i--){

        const isDeleted = deletedIndexes.includes(allTasks_array[i].id);
        const isDone = doneIndexes.includes(allTasks_array[i].id);
        if(isDeleted) {
            container.innerHTML = container.innerHTML + `<section id="id${allTasks_array[i].id}" class="task-container task-container-deleted">
                    <div class="task-inside-container">
                       <div class="task-text">${allTasks_array[i].task}</div>
                    </div>
                    <div class="task-inside-container">
                        <div class="task-date">${allTasks_array[i].date}</div>
                    </div>
                    <div class="task-inside-container task-inside-container-button">
                        <section class="task-button-container ">
                            <button id="delete-btn${allTasks_array[i].id}" onClick="handleDelete(${allTasks_array[i].id})" class=" task-button-disabled" disabled>Delete</button>
                            <button id="done-btn${allTasks_array[i].id}" onClick="handleDone(${allTasks_array[i].id})" class=" task-button-disabled" disabled>Done</button>
                        </section>
                    </div>
                </section>`
            
        }
        else if(isDone){
            container.innerHTML = container.innerHTML + `<section id="id${allTasks_array[i].id}" class="task-container task-container-done">
                    <div class="task-inside-container">
                        <div class="task-text">${allTasks_array[i].task}</div>
                    </div>
                    <div class="task-inside-container">
                        <div class="task-date">${allTasks_array[i].date}</div>
                    </div>
                    <div class="task-inside-container task-inside-container-button">
                        <section class="task-button-container">
                            <button id="delete-btn${allTasks_array[i].id}" onClick="handleDelete(${allTasks_array[i].id})" class=" task-button-disabled" disabled>Delete</button>
                            <button id="done-btn${allTasks_array[i].id}" onClick="handleDone(${allTasks_array[i].id})" class=" task-button-disabled" disabled>Done</button>
                        </section>
                    </div>
                </section>`
        }
        else{
            container.innerHTML = container.innerHTML + `<section id="id${allTasks_array[i].id}" class="task-container task-container-alive">
                    <div class="task-inside-container">
                        <div class="task-text">${allTasks_array[i].task}</div>
                    </div>
                    <div class="task-inside-container">
                        <div class="task-date">${allTasks_array[i].date}</div>
                    </div>
                    <div class="task-inside-container task-inside-container-button">
                        <section class="task-button-container">
                            <button id="delete-btn${allTasks_array[i].id}" onClick="handleDelete('${allTasks_array[i].id}')" class="task-delete-button">Delete</button>
                            <button id="done-btn${allTasks_array[i].id}" onClick="handleDone('${allTasks_array[i].id}')" class="task-done-button" >Done</button>
                        </section> 
                    </div>
                </section>`
        }
    }
}

function handleDelete(i){
    deletedIndexes.push(i)
    const id = "#id"+i;
    const iddl = "#delete-btn"+i;
    const iddn = "#done-btn"+i;

    const container = document.querySelector(id)
    container.classList.add('task-container-deleted')
    container.classList.remove('task-container-alive')

    const delete_btn = document.querySelector(iddl)
    delete_btn.disabled=true;
    delete_btn.classList.add('task-button-disabled')
    delete_btn.classList.remove('task-delete-button')

    const done_btn = document.querySelector(iddn)
    done_btn.disabled=true;
    done_btn.classList.add('task-button-disabled')
    done_btn.classList.remove('task-done-button')

}

function handleDone(i){
    doneIndexes.push(i)
    const id = "#id"+i;
    const iddl = "#delete-btn"+i;
    const iddn = "#done-btn"+i;

    const container = document.querySelector(id)
    container.classList.add('task-container-done')
    container.classList.remove('task-container-alive')

    const delete_btn = document.querySelector(iddl)
    delete_btn.disabled=true;
    delete_btn.classList.add('task-button-disabled')
    delete_btn.classList.remove('task-delete-button')

    const done_btn = document.querySelector(iddn)
    done_btn.disabled=true;
    done_btn.classList.add('task-button-disabled')
    done_btn.classList.remove('task-done-button')

}

function handleClearDeleted(){
    const newtasks = allTasks_array.filter((val)=>{
        const isDeleted = deletedIndexes.includes(val.id)
        if(!isDeleted) return val
    })

    allTasks_array = newtasks
    deletedIndexes=[]
    renderTasks()
}

function handleClearDone(){
    const newtasks = allTasks_array.filter((val)=>{
        const isDone = doneIndexes.includes(val.id)
        if(!isDone) return val
    })

    allTasks_array = newtasks
    doneIndexes=[] 
    renderTasks()
}