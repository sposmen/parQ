export function DashboardCmp(assigns: any) {
  return `
    <div class="dashboard card-list">
      <h1>Dashboard</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Plate</th>
          <th>Slot</th>
        </tr>
        ${renderAssigns(assigns)}
      </table>
    </div>
  `;
}

function renderAssigns(assigns: any) {
  return assigns.map((assign: any) => {
    return `<tr class="card-it">
      <td>${assign.name}</td>
      <td>${assign.plate}</td>
      <td>${assign.slot < 9 ? '0' + assign.slot : assign.slot}</td>
      </tr>`;
  }
  ).join('\n');
}
