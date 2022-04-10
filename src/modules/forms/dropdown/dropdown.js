class Dropdown {
  constructor(el, type) {
    this.dropdown = el;
    this.type = type;
    this.storage = null;
    this.fields = null;
    this.mainField = null;
  }

  init() {
    if (!this.dropdown) return;
    this.createStorage();

    this.initFields();
    this.initMainField();
    this.initControlButtons();
    this.initDropdown();
  }

  initDropdown() {
    this.mainField.addEventListener('click', () => {
      if (!this.dropdown.classList.contains('dropdown--expanded')) {
        this.addActiveClass();
      } else {
        this.removeActiveClass();
      }
    });

    if (this.type === 'features') {
      this.dropdown.addEventListener('click', () => this.displayTotalValue());
    }
  }

  createStorage() {
    const storageObject = {};

    const fields = this.dropdown.querySelectorAll('.dropdown__collapsible-row');
    fields.forEach((item) => {
      const type = item.dataset.type;
      const min = +item.dataset.min;
      const max = +item.dataset.max;

      storageObject[type] = {
        count: 0,
        min: min,
        max: max,
      };
    });

    const dropdownStorageInstance = new DropdownStorage(storageObject);
    this.storage = dropdownStorageInstance.storage;
  }

  initMainField() {
    this.mainField = this.dropdown.querySelector('.dropdown__field');
  }

  initFields() {
    const fields = this.dropdown.querySelectorAll('.dropdown__collapsible-row');
    const fieldInstances = [];

    fields.forEach((item) => {
      const type = item.dataset.type;
      const fieldInstance = new DropdownField(item, type, this.storage);
      fieldInstances.push(fieldInstance);
      fieldInstance.init();
    });

    this.fields = fieldInstances;
  }

  initControlButtons() {
    const controls = this.dropdown.querySelector(
      '.dropdown__collapsible-controls'
    );

    if (!controls) return;

    const resetButton = this.dropdown.querySelector(
      '.dropdown__collapsible-control--reset'
    );
    const saveButton = this.dropdown.querySelector(
      '.dropdown__collapsible-control--save'
    );

    resetButton.addEventListener('click', () => {
      this.reset();
    });

    saveButton.addEventListener('click', () => {
      this.save();
    });
  }

  addActiveClass() {
    this.dropdown.classList.add('dropdown--expanded');
  }

  removeActiveClass() {
    this.dropdown.classList.remove('dropdown--expanded');
  }

  displayTotalValue() {
    const displayForFeatures = () => {
      let total = {};
      let resultStr;

      for (let key in this.storage) {
        total[key] = this.storage[key]['count'];
      }

      resultStr = makeFeaturesWords(total);
      return resultStr;
    };

    const displayForGuests = () => {
      let totalValue = 0;
      let resultStr;

      for (let key in this.storage) {
        totalValue += this.storage[key]['count'];
      }

      resultStr = makeGuestWord(totalValue);
      return resultStr;
    };

    let resultStr;

    if (this.type === 'features') {
      resultStr = displayForFeatures();
    } else if (this.type === 'guests') {
      resultStr = displayForGuests();
    }

    this.mainField.placeholder = resultStr;
  }

  reset() {
    for (const key in this.storage) {
      this.storage[key]['count'] = 0;
    }

    this.fields.forEach((item) => {
      item.resetValue();
      item.updateValue();
      item.resetButtons();
    });
  }

  save() {
    this.displayTotalValue();
    this.removeActiveClass();
  }
}

class DropdownStorage {
  constructor(storage) {
    this.storage = storage;
  }
}

class DropdownField {
  constructor(field, type, storage) {
    this.field = field;
    this.type = type;
    this.storage = storage;

    this.minValue = null;
    this.maxValue = null;
    this.currentValue = null;

    this.dec = null;
    this.inc = null;
    this.counterElement = null;
  }

  init() {
    if (!this.field || !this.storage) return;

    this.setInitialValues();
    this.setElements();

    this.initDec();
    this.initInc();

    this.updateValue();
  }

  setElements() {
    this.counterElement = this.field.querySelector(
      '.dropdown__collapsible-counter'
    );

    // Decrement and Increment button elements
    this.dec = this.field.querySelector('.dropdown__collapsible-btn--dec');
    this.inc = this.field.querySelector('.dropdown__collapsible-btn--inc');
  }

  setInitialValues() {
    this.minValue = +this.storage[this.type]['min'];
    this.maxValue = +this.storage[this.type]['max'];
    this.currentValue = +this.storage[this.type]['min'];
  }

  initDec() {
    // Initial check when dropdown is initiated for the first time. If initial value for a field is already equal to min value, the increment button will be disabled.
    if (this.currentValue === this.minValue) {
      this.disableButton(this.dec);
    }

    this.dec.addEventListener('click', () => {
      this.currentValue--;
      this.updateValue();

      if (this.checkForMin(this.currentValue)) {
        this.disableButton(this.dec);
      }
      if (this.currentValue === this.maxValue - 1) {
        this.enableButton(this.inc);
      }
    });
  }

  initInc() {
    // Initial check when dropdown is initiated for the first time. If initial value for a field is already equal to max value, the increment button will be disabled.
    if (this.currentValue === this.maxValue) {
      this.disableButton(this.inc);
    }

    this.inc.addEventListener('click', () => {
      this.currentValue++;
      this.updateValue();

      if (this.checkForMax(this.currentValue)) {
        this.disableButton(this.inc);
      }
      if (this.currentValue === this.minValue + 1) {
        this.enableButton(this.dec);
      }
    });
  }

  checkForMin(value) {
    if (value === this.minValue) {
      return true;
    }
    return false;
  }

  checkForMax(value) {
    if (value === this.maxValue) {
      return true;
    }
    return false;
  }

  enableButton(btn) {
    btn.disabled = false;
  }

  disableButton(btn) {
    btn.disabled = true;
  }

  resetButtons() {
    this.disableButton(this.dec);
    this.enableButton(this.inc);
  }

  updateValue() {
    this.counterElement.textContent = this.currentValue;
    this.storage[this.type]['count'] = this.currentValue;
  }

  getCurrentValue() {
    return this.currentValue;
  }

  resetValue() {
    this.currentValue = 0;
  }
}

const makeGuestWord = (value) => {
  let str;

  if (value === 0) {
    str = `Сколько гостей`;
  } else if (value === 1) {
    str = `${value} Гость`;
  } else if (value > 1 && value <= 4) {
    str = `${value} Гостя`;
  } else if (value > 4) {
    str = `${value} Гостей`;
  }

  return str;
};

const makeFeaturesWords = (types) => {
  const makeWordForBATHROOMS = (count) => {
    let result;

    if (count === 1) {
      result = `${count} ванна`;
    } else if (count > 1 && count <= 4) {
      result = `${count} ванные`;
    } else if (count > 4) {
      result = `${count} ванн`;
    }
    return result;
  };

  const makeWordForBEDROOMS = (count) => {
    let result;

    if (count === 1) {
      result = `${count} спальня`;
    } else if (count > 1 && count <= 4) {
      result = `${count} спальни`;
    } else if (count > 4) {
      result = `${count} спален`;
    }
    return result;
  };

  const makeWordForBEDS = (count) => {
    let result;

    if (count === 1) {
      result = `${count} кровать`;
    } else if (count > 1 && count <= 4) {
      result = `${count} кровати`;
    } else if (count > 4) {
      result = `${count} кроватей`;
    }
    return result;
  };

  let result = [];

  for (let key in types) {
    const count = types[key];
    if (key === 'bathrooms') {
      result.push(makeWordForBATHROOMS(count));
    } else if (key === 'bedrooms') {
      result.push(makeWordForBEDROOMS(count));
    } else if (key === 'beds') {
      result.push(makeWordForBEDS(count));
    }
  }

  return result.join(', ');
};

const initDropdown = (() => {
  const elements = document.querySelectorAll('.dropdown');

  if (!elements.length) return;

  elements.forEach((el) => {
    const dropdownType = el.dataset.type;
    const dropdown = new Dropdown(el, dropdownType);
    dropdown.init();
  });
})();
