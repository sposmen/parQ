import { User, Plate } from "../shared/models/generic";

export function UserDetailCmp(user: User) {
  return `
  <div class="user">
    <h2>User</h2>
    ${PlateFormCmp()}
    ${PlateListCmp(user.plates)}
  </div>
  `;
}

export function PlateFormCmp() {
  return `
  <form class="plate-form form">
    <label class="form__label">Plate</label>
    <input name="plate" class="form__control" type="text" placeholder="enter plate, e.g.: abc123" required>
    <div class="actions">
      <button class="btn btn--primary">Add</button>
    </div>
  </form>
  `;
}

export function PlateListCmp(plates: Plate[]) {
  return `
  <div class="plate-list">
    ${plates ? plates.map(it => PlateItCmp(it)).join('') : ''}
  </div>
  `;
}

export function PlateItCmp(plate: Plate) {
  return `
  <div class="plate-it card-it card-list--sm">${plate.plate}</div>
  `;
}
