// Category popup
var Categoryy = document.querySelector('.left-2');
var CategoryyPopup = document.querySelector('.popup');
Categoryy.addEventListener("click", function() {
    CategoryyPopup.style.display = (CategoryyPopup.style.display == "block") ? "none" : "block";
});

// Add and cancel task popup
var AddTaskButton = document.querySelector('.add-task');
var CancelTaskButton = document.querySelector('.Task-cancel');
AddTaskButton.addEventListener("click", function() {
    var TaskPopup = document.querySelector('.task-popup');
    TaskPopup.style.display = "block";
});
CancelTaskButton.addEventListener("click", function() {
    var TaskPopup = document.querySelector('.task-popup');
    TaskPopup.style.display = "none";
});

var TaskAddButton = document.querySelector('.Task-add');
TaskAddButton.addEventListener("click", function() {
    var taskName = document.querySelector('.task-popup input[type="text"]').value;
    var categorySelect = document.querySelector('.task-popup select');
    var selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;

    var newTask = {
        id: Date.now(), 
        name: taskName,
        category: selectedCategory,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(newTask);

    document.querySelector('.task-popup input[type="text"]').value = '';
    categorySelect.selectedIndex = 0;
    document.querySelector('.task-popup').style.display = "none";
});


function renderTask(task) {
    var newTask = document.createElement('div');
    newTask.classList.add('middle');
    newTask.dataset.id = task.id; // Set task ID as data attribute

    var checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('flex-1');
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add('check');
    checkbox.checked = task.completed;
    var checkboxSpan = document.createElement('span');
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxSpan);

    var taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add('flex-2');
    var taskNameElement = document.createElement('h5');
    taskNameElement.textContent = task.name;
    if (task.completed) {
        taskNameElement.style.textDecoration = "line-through";
        taskNameElement.style.color = "grey";
    }
    var ImgCateg = document.createElement('div');
    ImgCateg.classList.add('middle-flex');
    var categoryImage = document.createElement('img');
    categoryImage.src = getCategoryImage(task.category);
    categoryImage.classList.add('imgg');
    var categoryNameElement = document.createElement('p');
    categoryNameElement.textContent = task.category;
    ImgCateg.appendChild(categoryImage);
    ImgCateg.appendChild(categoryNameElement);

    taskInfoContainer.appendChild(taskNameElement);
    taskInfoContainer.appendChild(ImgCateg);

    var editDeleteContainer = document.createElement('div');
    editDeleteContainer.classList.add('edit-delete');
    var editButton = document.createElement('img');
    editButton.src = "images/edit.jfif";
    editButton.classList.add('edit');
    var deleteButton = document.createElement('img');
    deleteButton.src = "images/delete.jfif";
    deleteButton.classList.add('delete');

    editDeleteContainer.appendChild(editButton);
    editDeleteContainer.appendChild(deleteButton);

    newTask.appendChild(checkboxContainer);
    newTask.appendChild(taskInfoContainer);
    newTask.appendChild(editDeleteContainer);

    var referenceElement = document.querySelector('.add-task');
    referenceElement.parentNode.insertBefore(newTask, referenceElement);

    DeleteTask();
    Check();
    editTask();
}


function Check() {
    var checkButtons = document.querySelectorAll('.check');
    checkButtons.forEach(function(checkButton, index) { 
        checkButton.addEventListener('click', function() {
            var taskNameElement = this.closest('.middle').querySelector('h5');
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            if (this.checked) {
                taskNameElement.style.textDecoration = "line-through";
                taskNameElement.style.color = "grey";
                tasks[index].completed = true; 
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {
                taskNameElement.style.textDecoration = "none";
                taskNameElement.style.color = "black";
                tasks[index].completed = false; 
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });
    });
}

// Edit task
function editTask() {
    var editIcons = document.querySelectorAll('.edit');
    editIcons.forEach(function(editIcon) {
        editIcon.addEventListener("click", function() {
            var parentTask = editIcon.closest('.middle');
            var taskNameElement = parentTask.querySelector('h5');
            var taskCategoryElement = parentTask.querySelector('.middle-flex p');
            var taskId = parentTask.dataset.id; // Use dataset to store task ID

            var editTaskPopup = document.querySelector('.edit-task');
            var editNameInput = editTaskPopup.querySelector('input[type="text"]');
            var editCategorySelect = editTaskPopup.querySelector('select');

            // Set current task details in edit popup
            editNameInput.value = taskNameElement.textContent;
            editCategorySelect.value = taskCategoryElement.textContent;

            editTaskPopup.style.display = "block";

            //editing
            var editButton = editTaskPopup.querySelector('.edit-add');
            editButton.onclick = function() {
                var updatedTaskName = editNameInput.value;
                var updatedCategory = editCategorySelect.value;

                // Update the task in the DOM
                taskNameElement.textContent = updatedTaskName;
                taskCategoryElement.textContent = updatedCategory;
                taskCategoryElement.previousSibling.src = getCategoryImage(updatedCategory);

                // Update the task in local storage
                let tasks = JSON.parse(localStorage.getItem('tasks'));
                let taskIndex = tasks.findIndex(task => task.id == taskId);
                if (taskIndex !== -1) {
                    tasks[taskIndex].name = updatedTaskName;
                    tasks[taskIndex].category = updatedCategory;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }

                editTaskPopup.style.display = "none";
            };

            //cancel the edit
            var cancelButton = editTaskPopup.querySelector('.edit-cancel');
            cancelButton.onclick = function() {
                editTaskPopup.style.display = "none";
            };
        });
    });
}


//function to get category image
function getCategoryImage(category) {
    if (category === "None") {
        return "images/1.webp";
    } else if (category === "Home") {
        return "images/2.jpg";
    } else if (category === "School") {
        return "images/3.jfif";
    } else if (category === "Shopping list") {
        return "images/4.png";
    } else {
        return "";
    }
}

function DeleteTask() {
    var deleteIcons = document.querySelectorAll('.delete');
    deleteIcons.forEach(function(deleteIcon) {
        deleteIcon.addEventListener("click", function() {
            var deleteTaskPopup = document.querySelector('.delete-task');
            deleteTaskPopup.style.display = "block";
            var parentTask = deleteIcon.closest('.middle');
            var taskName = parentTask.querySelector('h5').textContent;
            var deleteButton = document.querySelector('.delete-delete');
            deleteButton.addEventListener("click", function() {
                let tasks = JSON.parse(localStorage.getItem('tasks'));
                tasks = tasks.filter(t => t.name !== taskName);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                parentTask.remove();
                deleteTaskPopup.style.display = "none";
            });
        });
    });
}

var cancelTaskPopup = document.querySelector('.delete-cancel');
cancelTaskPopup.addEventListener("click", function() {
    var deleteTaskPopup = document.querySelector('.delete-task');
    deleteTaskPopup.style.display = "none";
});

// Filter tasks
var filterButtons = document.querySelectorAll('.top-1-right button');
filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var filterType = this.textContent;
        updateTaskStatus(filterType);
        var tasks = document.querySelectorAll('.middle');
        tasks.forEach(function(task) {
            var taskNameElement = task.querySelector('h5');
            if (filterType === 'All' || (filterType === 'Done' && taskNameElement.style.textDecoration === 'line-through') || (filterType === 'Not Done' && taskNameElement.style.textDecoration !== 'line-through')) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
});

function updateTaskStatus(status) {
    var nameEle = document.querySelector('.top h1');
    nameEle.textContent = status + " Tasks";
}

// Filter category
var categoryItems = document.querySelectorAll('#popup-list li');
categoryItems.forEach(function(categoryItem) {
    categoryItem.addEventListener('click', function() {
        var selectedCategory = categoryItem.querySelector('p').textContent;
        CategoryStatus(selectedCategory);
        var tasks = document.querySelectorAll('.middle');
        tasks.forEach(function(task) {
            var taskCategoryElement = task.querySelector('.middle-flex p');
            if (taskCategoryElement.textContent.toLowerCase() === selectedCategory.toLowerCase()) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
});

function CategoryStatus(status) {
    var nameEle = document.querySelector('.top h1');
    nameEle.textContent = status;
}

// Clicking on "Tasks"
document.querySelector('.left-1').addEventListener('click', () => {
    var tasks = document.querySelectorAll('.middle');
    tasks.forEach(function(task) {
        var NameEle = document.querySelector('.top h1');
        task.style.display = 'flex';
        NameEle.textContent = "All Tasks";
    });
});

// Displaying username
var storedName = JSON.parse(localStorage.getItem("display"));
var username = document.getElementById('usernameDisplay');
username.innerHTML = storedName.name;

document.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
});
