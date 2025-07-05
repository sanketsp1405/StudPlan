document.addEventListener('DOMContentLoaded', function() {
  // Generate table header for dates
  const theadRow = document.querySelector('thead tr');
  theadRow.innerHTML = `
    <th>Task</th>
    <th>Target Frequency</th>
    <th>Daily Time</th>
    ${[...Array(12)].map((_, i) => `<th>${i + 5}</th>`).join('')}
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

  // Generate table body with radio buttons
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = tasks.map((taskArr, rowIndex) => `
    <tr>
      <td class="task-col">${taskArr[0]}</td>
      <td>${taskArr[1]}</td>
      <td>${taskArr[2]}</td>
      ${[...Array(12)].map((_, colIndex) => {
        const groupName = `t${rowIndex}_d${colIndex}`;
        return `
          <td>
            <div class="checkbox-group">
              <label><input type="radio" name="${groupName}" id="${groupName}_c"> ✅</label>
              <label><input type="radio" name="${groupName}" id="${groupName}_i"> ❌</label>
            </div>
          </td>
        `;
      }).join('')}
    </tr>
  `).join('');
});
