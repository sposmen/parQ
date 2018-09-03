export function DashboardCmp(assigns: any) {
  return `
    <div class="dashboard card-list">

      <h1>Dashboard</h1>

      <label class="subscribe switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>

      ${renderAssigns(assigns)}

    </div>
  `;
}

function renderAssigns(assigns: any) {
  return assigns.map((assign: any) => {
    return `<div class="card-it">
        <div class="dashboard-card-left">
          <p><b>User: </b>${assign.name}</p>
          <p><b>License Plate: </b>${assign.plate}</p>
          <p><b>Assigned cell: </b>${assign.slot < 9 ? '0' + assign.slot : assign.slot}</p>
          <p><b>Car model: </b>${assign.model}</p>
        </div>
        <div class="dashboard-card-right">
          <button class="btn">Release</button>
        </div>
      </div>`;
  }
  ).join('');
}
