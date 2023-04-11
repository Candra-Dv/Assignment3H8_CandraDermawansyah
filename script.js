const Url = 'https://covid-193.p.rapidapi.com';

const countriesSelect = document.getElementById('countries');
const btnShow = document.getElementById('btn-show');
const activeCasesText = document.getElementById('active-case');
const newCaseText = document.getElementById('new-case');
const recoveryCaseText = document.getElementById('recovery-case');
const totalCaseText = document.getElementById('total-case');
const totalDeathText = document.getElementById('death-total');
const totaltestText = document.getElementById('test-total');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '07aa601b8amshf4b083649e4e48bp128a2cjsn3bfc44ebbb4b',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

fetch(`${Url}/countries`, options)
  .then(response => response.json())
  .then(response => {
    const countries = response.response;

    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.text = country;
      countriesSelect.add(option);
    });
  })
  .catch(err => console.error(err));

btnShow.addEventListener('click', () => {
  const selectedCountry = countriesSelect.value;

  fetch(`${Url}/statistics?country=${selectedCountry}`, options)
    .then(response => response.json())
    .then(response => {
      const activeCases = response.response[0].cases.active || 0;
      const newCases = response.response[0].cases.new || 0;
      const recoveryCases = response.response[0].cases.recovered || 0;
      const totalCases = response.response[0].cases.total || 0;
      const totalDeath = response.response[0].deaths.total || 0;
      const totalTest = response.response[0].tests.total || 0;

      activeCasesText.textContent = activeCases;
      newCaseText.textContent = newCases;
      recoveryCaseText.textContent = recoveryCases;
      totalCaseText.textContent = totalCases;
      totalDeathText.textContent = totalDeath;
      totaltestText.textContent = totalTest;
    })
    .catch(err => console.error(err));

});