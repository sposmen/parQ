export function UserCmp(plates: string[]) {
  return `
  <div class="user">
    <h2>User</h2>
    ${PlateFormCmp()}
    ${PlateListCmp(plates)}
  </div>
  `;
}

export function PlateFormCmp() {
  return `
  <form class="plate-form form">
    <label class="form__label">Plate</label>
    <input name="plate" class="form__control" type="text" placeholder="enter Licence plate, e.g.: abc123" pattern="\d*" maxlength="10">
    <div class="actions">
      <button class="btn btn--primary">Save</button>
    </div>
  </form>
  `;
}

export function PlateListCmp(plates: string[]) {
  return `
  <div class="plate-list">
    ${plates.map(it => PlateItCmp(it)).join('')}
  </div>
  `;
}

export function PlateItCmp(plate: string) {
  return `
  <div class="plate-it">${plate}</div>
  `;
}
