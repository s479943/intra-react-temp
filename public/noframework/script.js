$(document).ready(function() {
    const initialTasks = [
        { id: 1, title: 'Task 1', description: "ww", completed: false, tags: ['work', 'important'] },
        { id: 2, title: 'Task 2', description: "ww", completed: true, tags: ['work', 'important'] },
        { id: 3, title: 'Task 3', description: "ww", completed: false, tags: ['work', 'important'] },
    ];

    let taskList = [...initialTasks];
    let currentTask = null;

    const renderTasks = () => {
        $('#taskList').empty();
        taskList.forEach(task => {
            const taskDiv = $(`
                <div style="width: calc(80vw / 3 - 20px); height: 200px; border: 1px solid #00ffcc; background-color: ${task.completed ? '#ffcc44' : '#ffffff'}; border-radius: 10px; margin: 5px; position: relative; cursor: pointer;">
                    <h2 style="font-size: 20px; font-weight: bold; color: ${task.completed ? '#fff' : '#00ddaa'}; line-height: 0.9; text-align: start; padding: 0.5rem 1.4rem 0 1.4rem;">${task.title}</h2>
                    <div style="position: absolute; top: 1.2rem; right: 1.1rem;">${task.completed ? '已完成' : '未完成'}</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin: 0.3rem 0.7rem;">
                        ${task.tags.map(tag => `<div style="background-color: #00ffcc; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.8rem;">${tag}</div>`).join('')}
                    </div>
                    <div style="padding: 0.5rem 1.4rem 0 1.4rem; text-align: start;">
                        <p>${task.description}</p>
                    </div>
                </div>
            `);
            taskDiv.on('click', () => showTaskForm(task.id));
            $('#taskList').append(taskDiv);
        });
    };

    const showTaskForm = (id) => {
        currentTask = taskList.find(task => task.id === id) || { title: '', description: '', completed: false, tags: [] };
        $('#taskFormContent [name="title"]').val(currentTask.title);
        $('#taskFormContent [name="completed"]').prop('checked', currentTask.completed);
        $('#taskFormContent [name="tags"]').val(currentTask.tags.join(', '));
        $('#taskFormContent [name="description"]').val(currentTask.description);
        $('#taskForm').show();
    };

    const hideTaskForm = () => {
        $('#taskForm').hide();
    };

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            id: taskList.length + 1,
            title: $('#taskFormContent [name="title"]').val(),
            description: $('#taskFormContent [name="description"]').val(),
            completed: $('#taskFormContent [name="completed"]').is(':checked'),
            tags: $('#taskFormContent [name="tags"]').val().split(',').map(tag => tag.trim())
        };
        taskList.push(newTask);
        renderTasks();
        hideTaskForm();
    };

    $('#addTaskButton').on('click', () => showTaskForm());
    $('#closeFormButton').on('click', hideTaskForm);
    $('#cancelButton').on('click', hideTaskForm);
    $('#taskFormContent').on('submit', addTask);

    renderTasks();
});