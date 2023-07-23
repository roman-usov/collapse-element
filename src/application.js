/* eslint-disable no-param-reassign */
// @ts-check

// BEGIN (write your solution here) (write your solution here)
class View {
  constructor() {
    this.containerEl = document.querySelector('.container');
    this.descriptionEl = null;
  }

  generateUI(state) {
    state.companies.forEach((company) => {
      const buttonEl = document.createElement('button');
      buttonEl.textContent = company.name;
      buttonEl.classList.add('btn', 'btn-primary');
      buttonEl.dataset.companyId = company.id;
      this.containerEl.append(buttonEl);
    });
  }

  addDescriptionToUI(state) {
    if (this.descriptionEl) this.descriptionEl.remove();

    const clickedBtn = state.uiState.buttons.find((btn) => btn.clicked);

    if (clickedBtn) {
      const clickedCompany = state.companies.find(
        (company) => clickedBtn.companyId === company.id
      );

      this.descriptionEl = document.createElement('div');
      this.descriptionEl.classList.add('description');
      this.descriptionEl.textContent = clickedCompany.description;

      this.containerEl.append(this.descriptionEl);
    }
  }
}

function updateClickedState(state, id) {
  state.uiState.buttons.forEach((btn) => {
    btn.clicked = btn.companyId === id && !btn.clicked;
  });
}

export default function app(companies) {
  const state = {
    companies,
    uiState: {
      buttons: companies.map((company) => ({
        companyId: company.id,
        clicked: false,
      })),
    },
  };

  const view = new View();

  view.generateUI(state);

  function handle(e) {
    const clickedEl = e.target;

    if (!clickedEl.matches('button')) return;

    const clickedCompanyId = Number(clickedEl.dataset.companyId);

    updateClickedState(state, clickedCompanyId);

    view.addDescriptionToUI(state);
  }

  view.containerEl.addEventListener('click', handle);
}

// END
