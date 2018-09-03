let taskCount = 0;


export function show() {

  taskCount++;

  let spinner = document.querySelector('.spinner');

  if (!spinner) {
    const html = SpinnerCmp();
    document.body.insertAdjacentHTML('afterbegin', html);
    spinner = document.querySelector('.spinner');
  }

  spinner.classList.remove('hidden');
}


export function hide() {

  taskCount--;

  if (taskCount > 0) {
    return;
  }

  const spinner = document.querySelector('.spinner');

  if (!spinner) {
    return;
  }

  spinner.classList.add('hidden');
}


function SpinnerCmp() {
  return `
  <div class="spinner hidden">
    <div class="spinner__ring"></div>
    <div class="spinner__ring"></div>
  </div>
  `;
}
