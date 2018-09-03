export function DashboardCmp(assigns: any) {
  return `
    <div class="about">
      <h1>Dashboard</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Plate</th>
        </tr>
        ${renderAssigns(assigns)}
      </table>
    </div>
  `;
}

function renderAssigns(assigns: any) {
  return assigns.map((assign: any) => {
    return `<tr>
      <th>${assign.name}</th>
      <th>${assign.plate}</th>
      </tr> `;
  }
  ).join('\n');

}
