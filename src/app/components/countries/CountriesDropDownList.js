import { useState, useEffect } from 'react';
import { CountriesService } from '../../services';

const CountriesDropDownList = ({onDDLChange}) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (ev) => {
    setSelectedCountry(ev.target.value);
  }

  useEffect(() => {
    if (typeof onDDLChange === 'function') {
      onDDLChange(selectedCountry);
    }
  }, [selectedCountry])

  return (
    <select value={selectedCountry} onChange={handleChange}>
      {
        CountriesService.getCountries().map(c => {
          return (
            <option key={c.id} value={c.iso2Code}>{c.name}</option>
          )
        })
      }
    </select>
  )
};

export default CountriesDropDownList;