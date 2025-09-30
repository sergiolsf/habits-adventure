document.addEventListener('DOMContentLoaded', () =>{
  const choreInput = document.getElementById('chore-input');
  const priorityInput = document.getElementById('priority-input');
  const addChoreBtn = document.getElementById('add-chore-btn');
  const pendingChoresList = document.getElementById('pending-chores-list');
  const completedChoresList = document.getElementById('completed-chores-list');

  let chores = [];

  addChoreBtn.addEventListener('click', addChore);

  function addChore() {
    const choreText = choreInput.value.trim(); //Remove the spaces in the beginning and in the end
    const priority = priorityInput.value;
    if (choreText === '') return;

    const chore = {
      id: Date.now(),
      text: choreText,
      priority: parseInt(priority),
      completed: false,
    };

    chores.push(chore);
    renderChores();
    choreInput.value = '';
  }

  function renderChores() {
    pendingChoresList.innerHTML = '';
    completedChoresList.innerHTML = '';

    chores.sort((a,b) => b.priority - a.priority);
    chores.forEach(chore => {
      const li = document.createElement('li');
      li.textContent = chore.text
      li.dataset.id = chore.id;

      if (chore.priority === 3) {
        li.classList.add('priority-high');
      } else if (chore.priority === 2) {
        li.classList.add('priority-medium');
      } else {
        li.classList.add('priority-low');
      }

      if (chore.completed) {
        li.classList.add('completed');
        li.addEventListener('click', toggleComplete);
        completedChoresList.appendChild(li);
      } else {
        li.addEventListener('click', toggleComplete);
        pendingChoresList.appendChild(li);
      }
    });
  }

  function toggleComplete(e) {
    const choreId = parseInt(e.target.dataset.id);
    const chore = chores.find(c => c.id === choreId);
    chore.completed = !chore.completed;
    renderChores();
  }
});