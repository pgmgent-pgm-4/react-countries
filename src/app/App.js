import { useState } from 'react';

import './App.css';
import { CountriesDropDownList, CountriesMap } from './components/countries';

import { CountriesService } from './services';

function App() {
  const [selectedCountry, setSelectedCountry] = useState();
  const countries = CountriesService.getCountries();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  }

  return (
    <div className="App">
      <CountriesDropDownList onDDLChange={handleCountryChange} />
      <CountriesMap countries={countries} selectedCountry={selectedCountry} />
    </div>
  );
}

export default App;
