import { DateTime } from './luxon.min.js';

const dateTime = document.getElementById('dateTime');

const setInitialTime = () => {
  const dt = DateTime.now();
  const getCurrentTime = () => `${dt.hour}:${dt.minute}:${dt.second}`;
  const f = { month: 'long', day: 'numeric' };
  dateTime.innerHTML = `${dt.setLocale('en-US').toLocaleString(f)} ${dt.year}, <span>${getCurrentTime()}</span>`;
};

export default setInitialTime;
