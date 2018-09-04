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

function cellAssignsCmp(assigns: CellAssign[], user?: User) {
  return assigns.map(assign => {
    return `<div class="card-it">
        <div class="dashboard-card-left">
          <p><b>User: </b>${assign.name}</p>
          <p><b>Licence Plates: </b>${assign.plates.join(', ')}</p>
          <p><b>Car models: </b>${assign.models.join(', ')}</p>
          <p><b>Assigned cell: </b>${assign.slot < 9 ? '0' + assign.slot : assign.slot}</p>
        </div>
        ${releaseBtn(assign, user)}
      </div>`;
  }).join('');
}

function releaseBtn(assign: CellAssign, user?: User) {

  if (!user) {
    return '';
  }

  const found = assign.plates.some(plate => {
    return user.plates.some(userPlate => {
      return plate === userPlate.plate;
    });
  });

  if (!found) {
    return '';
  }

  return `
  <div class="dashboard-card-right">
    <button class="btn">Release</button>
  </div>
  `;
}
