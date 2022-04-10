import { Datepicker } from 'vanillajs-datepicker';
import { DateRangePicker } from 'vanillajs-datepicker';

const initRangeDatepicker = () => {
  const container = document.querySelector('.range-datepicker');

  if (!container) return;

  const options = {
    maxDate: new Date(2099, 0, 1),
    minDate: new Date(),
    format: 'mm.dd.yyyy',
    todayHighlight: true,

    language: 'ru',

    nextArrow: `<span class="material-icons">arrow_forward</span>`,
    prevArrow: `<span class="material-icons">arrow_back</span>`,

    clearBtn: true,
  };

  Datepicker.locales.ru = {
    days: [
      'Воскресение',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    daysShort: ['Вос', 'Пон', 'Втор', 'Ср', 'Чет', 'Пят', 'Суб'],
    daysMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthsShort: [
      'Янв',
      'Февр',
      'Март',
      'Апр',
      'Май',
      'Июнь',
      'Июль',
      'Авг',
      'Сент',
      'Окт',
      'Нояб',
      'Дек',
    ],
  };

  const dp = new DateRangePicker(container, options);
  editDatepickerControls();
};

const editDatepickerControls = () => {
  const createSaveButton = () => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('btn-default');
    btn.textContent = 'Применить';

    return btn;
  };

  const changeClearButtonText = (parent) => {
    const clearButton = parent.querySelector('.clear-btn');
    clearButton.classList.add('btn-default');
    clearButton.textContent = 'Очистить';
  };

  const disableViewSwitch = (parent) => {
    const viewSwitch = parent.querySelector('.view-switch');
    viewSwitch.disabled = true;
  };

  const dateDropdowns = document.querySelectorAll('.date-dropdown');

  dateDropdowns.forEach((dropdown) => {
    const dp = dropdown.querySelector('.datepicker');
    const footerControls = dp.querySelector(
      '.datepicker-footer .datepicker-controls'
    );
    const headerControls = dp.querySelector(
      '.datepicker-header .datepicker-controls'
    );

    changeClearButtonText(footerControls);
    disableViewSwitch(headerControls);

    // const saveButton = createSaveButton();
    // footerControls.appendChild(saveButton);
    // saveButton.addEventListener('click', (e) => {
    //   // Code to close the datepicker when save button is clicked
    // });
  });
};

initRangeDatepicker();
