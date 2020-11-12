// BAD PRACTICE - not proper MVC. Should be separated to files.
const render = function (todos) {

    $("#todos").empty()

    todos.forEach(todo => {
        $("#todos").append(`
        <div data-id=${todo.id} class="todo ${todo.complete ? 'complete' : ''}"> 
                <input type="radio" " name="priority${todo.id}" value="HIGH">
                <label for="HIGH">HIGH</label><br>
                <input type="radio" name="priority${todo.id}" value="MED">
                <label for="MED">MED</label><br>
                <input type="radio" name="priority${todo.id}" value="LOW">
                <label for="LOW">LOW</label>
            <i class="fas fa-check-circle"></i>
            <span class=text>${todo.text}</span>
            <span class="delete"><i class="fas fa-trash"></i></span>
        </div>
        `)
    })
}

$("#todos").on("click", "input", function () {
    if($(this).val() == 'HIGH'){
        $(this).closest('.todo').css('background-color', 'red')
    }
    if($(this).val() == 'MED'){
        $(this).closest('.todo').css('background-color', 'orange')
        
    }
    if($(this).val() == 'LOW'){
        $(this).closest('.todo').css('background-color', 'green')
    }
    // $.ajax({
    //     method: "PUT",
    //     url: "/todo/" + id,
    //     success: todos => render(todos)
    // })
})

const add = function () {
    $.post('/todo', { text: $("#todo-input").val() }, function (todos) {
        render(todos)
        console.log(todos)
        $("#todo-input").val("")
    })
}

$("#todos").on("click", ".fa-check-circle", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "PUT",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$("#todos").on("click", ".fa-trash", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "DELETE",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$.get('/todos', todos => render(todos))