    let isDataLoaded = false;

    const loadBtn = document.getElementById('loadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const tableBody = document.getElementById('todoTableBody');

    
    async function fetchTodos() {
      if (isDataLoaded) {
        alert("You can only generate the data once, the program will not load again the data once it is loaded in your first try");
        return;
      }

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const data = await response.json();

       
        data.forEach(todo => {
          const row = document.createElement('tr');

          const userIdTd = document.createElement('td');
          userIdTd.className = 'col-user-id';
          userIdTd.textContent = todo.userId;

          const taskIdTd = document.createElement('td');
          taskIdTd.className = 'col-task-id';
          taskIdTd.textContent = todo.id;

          const titleTd = document.createElement('td');
          titleTd.textContent = todo.title;

          const statusTd = document.createElement('td');
          if (todo.completed) {
            statusTd.textContent = 'Completed';
            statusTd.className = 'status-completed';
          } else {
            statusTd.textContent = 'Not yet Completed';
            statusTd.className = 'status-pending';
          }

          row.appendChild(userIdTd);
          row.appendChild(taskIdTd);
          row.appendChild(titleTd);
          row.appendChild(statusTd);

          tableBody.appendChild(row);
        });

        isDataLoaded = true; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function clearTable() {
      tableBody.innerHTML = '';
      isDataLoaded = false; 
    }

    loadBtn.addEventListener('click', fetchTodos);
    clearBtn.addEventListener('click', clearTable);