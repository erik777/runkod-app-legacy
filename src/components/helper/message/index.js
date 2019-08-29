import ReactDOMServer from 'react-dom/server';

import {errorSvg, doneSvg} from '../../../svg';

const errorIcon = ReactDOMServer.renderToStaticMarkup(errorSvg);
const successIcon = ReactDOMServer.renderToStaticMarkup(doneSvg);

const TYPE_SUCCESS = 'success';
const TYPE_ERROR = 'error';
const INT = 4000; // Default interval to disappear message

let wrapper = document.querySelector('#message-wrapper');

if (!wrapper) {
  wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'message-wrapper');
  wrapper.setAttribute('class', 'message-wrapper');
  document.body.appendChild(wrapper);
}

const toggleWrapper = () => {
  const items = document.querySelectorAll('.message-item');
  wrapper.style.display = items.length ? 'block' : 'hidden';
};

const createItem = (id, msg, type) => {
  const item = document.createElement('div');
  item.setAttribute('class', `message-item message-item-${type}`);
  item.setAttribute('data-id', id);
  item.setAttribute('id', `message-item-${id}`);

  let icon;
  let cls;
  switch (type) {
    case TYPE_SUCCESS:
      icon = successIcon;
      cls = 'alert alert-success';
      break;
    case TYPE_ERROR:
      icon = errorIcon;
      cls = 'alert alert-danger';
      break;
    default:
      icon = '';
  }


  item.innerHTML = `<div class="${cls}" role="alert"><span class="icon">${icon}</span> ${msg}</div>`;

  return item;
};

const addMessage = (msg, type, timeout) => {

  const id = Math.max.apply(null, [0, ...[...document.querySelectorAll('.message-item')].map(i => parseInt(i.getAttribute('data-id')))]) + 1;
  const item = createItem(id, msg, type);

  wrapper.insertBefore(item, wrapper.firstChild);

  toggleWrapper();

  setTimeout(() => {
    const e = document.querySelector(`#message-item-${id}`);

    if (e) {
      e.parentNode.removeChild(e);
    }

    toggleWrapper();

  }, timeout);
};

const error = (msg, timeout = INT) => {
  addMessage(msg, TYPE_ERROR, timeout);
};


const success = (msg, timeout = INT) => {
  addMessage(msg, TYPE_SUCCESS, timeout);
};

export default {
  error,
  success
}
