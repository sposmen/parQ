import { AlertType, AlertOptions, ModalOptions } from '../models/generic';

const defaultModalOpts: ModalOptions = {
  maxWidth: '40rem'
};

const defaultAlertOpts: AlertOptions = {
  type: 'success',
  maxWidth: '40rem',
  wait: 4000
};

export function openModal(content: string, options: ModalOptions = {}) {

  const opts = {
    ...defaultModalOpts,
    ...options
  };

  const html = ModalCmp(content);

  document.body.insertAdjacentHTML('beforeend', html);

  const modalEl = document.querySelector('.modal') as HTMLElement;
  const modalBody = modalEl.querySelector('.modal__body') as HTMLElement;

  modalBody.style.maxWidth = opts.maxWidth;

  modalEl.querySelector('.modal__close').addEventListener('click', () => {
    closeModal(modalEl);
  });

  modalEl.addEventListener('click', evt => {
    const target = evt.target as Element;
    const mBody = target.closest('.modal__body');
    // do nothing if clicked inside modal body
    if (mBody) {
      return;
    }
    // destroy if clicked outside of modal body (i.e. in the backdrop)
    closeModal(modalEl);
  });

  modalEl.addEventListener('keydown', (evt: KeyboardEvent) => {
    // close if escape key
    if (evt.keyCode === 27) {
      closeModal(modalEl);
    }
  });

  modalEl.classList.remove('hidden');

  modalEl.focus();

  return modalEl;
}

export function confirmAction(message: string, options?: ModalOptions) {
  return new Promise((resolve, reject) => {

    const content = `
      ${message}
      <div class="actions actions--large">
        <button class="confirm-action__ok btn btn--primary" type="submit">OK</button>
      </div>
    `;

    const modalEl = openModal(content, options);

    modalEl.querySelector('.confirm-action__ok').addEventListener('click', () => {
      resolve(true);
      closeModal(modalEl);
    });

    modalEl.querySelector('.modal__close').addEventListener('click', () => {
      resolve(false);
    });
  });
}

export function closeModal(modalEl: Element) {
  modalEl.classList.add('hidden');
  if (!modalEl.parentElement) {
    return;
  }
  modalEl.parentElement.removeChild(modalEl);
}

export function openAlert(content: string, options: AlertOptions = {}) {

  const opts = {
    ...defaultAlertOpts,
    ...options
  };

  const html = AlertCmp(content, opts.type);

  document.body.insertAdjacentHTML('beforeend', html);

  const alertEl = document.querySelector('.alert') as HTMLElement;

  alertEl.style.maxWidth = opts.maxWidth;

  alertEl.querySelector('.alert__close').addEventListener('click', () => {
    closeModal(alertEl);
  });

  alertEl.focus();
  alertEl.classList.remove('hidden');

  if (opts.wait > 0) {
    setTimeout(() => {
      closeModal(alertEl);
    }, opts.wait);
  }

  return alertEl;
}

function AlertCmp(content: string, type: AlertType) {
  return `
  <div class="alert alert--${type} hidden">
    <div class="alert__body">
      <span class="alert__close">&times;</span>
      <p class="alert__content">${content}</p>
    </div>
  </div>
  `;
}

function ModalCmp(content: string) {
  return `
  <div class="modal hidden">
    <div class="modal__body">
      <span class="modal__close">&times;</span>
      <p class="modal__content">${content}</p>
    </div>
  </div>
  `;
}
