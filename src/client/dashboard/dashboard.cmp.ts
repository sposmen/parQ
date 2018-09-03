import { CellAssign, User } from "../shared/models/generic";

export function DashboardCmp(assigns: CellAssign[], user?: User) {
  return `
    <div class="dashboard card-list">

      <h1>Dashboard</h1>

      ${subscribeCmp(user)}

      ${cellAssignsCmp(assigns, user)}

    </div>
  `;
}

function subscribeCmp(user?: User) {

  if (!user) {
    return '';
  }

  return `
  <div>
    <label class="subscribe switch" tooltip="Subscribe / Unsubscribe">
      <input type="checkbox" value="${user.subscription}" ${user.subscription ? 'checked' : ''}>
      <span class="slider round"></span>
    </label>
    <span class="switch-text">${user.subscription ? 'Unsubscribe' : 'Subscribe'}</span>
  </div>
  `;
}

function cellAssignsCmp(assigns: any, user?: User) {
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
