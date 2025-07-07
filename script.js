document.addEventListener('DOMContentLoaded', function() {
  // Generate table header for dates
  const theadRow = document.querySelector('thead tr');
  theadRow.innerHTML = `
    <th>Task</th>
    <th>Target Frequency</th>
    <th>Daily Time</th>
    ${[...Array(12)].map((_, i) => `<th>${i + 9}</th>`).join('')}
  `;

  // Task data
  const tasks = [
    ["🧪 Daily Tests", "5 Tests per Day", "1 hour"],
    ["☕ Core Java Revision", "2 Revisions per Day", "1.5 hours"],
    ["🔧 Advanced Java Revision", "2 Revisions per Day", "1.5 hours"],
    ["💻 Coding Practice", "Daily", "3 hours"],
    ["🗄️ Database Practice", "Daily", "1 hour"],
    ["👨‍💼 HR Interview Prep", "Daily", "30 mins"],
    ["🧠 Project Explanation Prep", "Daily", "1 hour"],
    ["🗣️ English Speaking Practice", "Daily", "30 mins"]
  ];

  // Load saved responses from localStorage
  let savedResponses = JSON.parse(localStorage.getItem('studyTaskResponses') || 'null');
  if (!savedResponses || !Array.isArray(savedResponses) || savedResponses.length !== tasks.length) {
    savedResponses = Array.from({length: tasks.length}, () => Array(12).fill(''));
  }

  // Generate table body with radio buttons
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = tasks.map((taskArr, rowIndex) => `
    <tr>
      <td class="task-col">${taskArr[0]}</td>
      <td>${taskArr[1]}</td>
      <td>${taskArr[2]}</td>
      ${[...Array(12)].map((_, colIndex) => {
        const groupName = `t${rowIndex}_d${colIndex}`;
        const checkedYes = savedResponses[rowIndex][colIndex] === 'yes' ? 'checked' : '';
        const checkedNo = savedResponses[rowIndex][colIndex] === 'no' ? 'checked' : '';
        return `
          <td>
            <div class="checkbox-group">
              <label><input type="radio" name="${groupName}" id="${groupName}_c" ${checkedYes}> ✅</label>
              <label><input type="radio" name="${groupName}" id="${groupName}_i" ${checkedNo}> ❌</label>
            </div>
          </td>
        `;
      }).join('')}
    </tr>
  `).join('');

  // Add event listeners to save on change
  for (let rowIndex = 0; rowIndex < tasks.length; rowIndex++) {
    for (let colIndex = 0; colIndex < 12; colIndex++) {
      const yesRadio = document.getElementById(`t${rowIndex}_d${colIndex}_c`);
      const noRadio = document.getElementById(`t${rowIndex}_d${colIndex}_i`);
      yesRadio.addEventListener('change', function() {
        savedResponses[rowIndex][colIndex] = yesRadio.checked ? 'yes' : (noRadio.checked ? 'no' : '');
        localStorage.setItem('studyTaskResponses', JSON.stringify(savedResponses));
      });
      noRadio.addEventListener('change', function() {
        savedResponses[rowIndex][colIndex] = noRadio.checked ? 'no' : (yesRadio.checked ? 'yes' : '');
        localStorage.setItem('studyTaskResponses', JSON.stringify(savedResponses));
      });
    }
  }
});
