import countriesData from '../../_data/countries.json';

class CountriesService {

  static getCountries = (countryCode) => {
    let data = countriesData.filter(c => c.region.id !== 'NA');
    data = data.filter(c => c.latitude !== '');
    data = data.filter(c => c.longitude !== '');
    data = data.filter(c => c.capitalCity !== '');
    data.sort((d1, d2) => {
      if (d1.name > d2.name) {
        return 1;
      } else if (d1.name < d2.name) {
        return -1;
      } else {
        return 0;
      }
    });
    data = data.map(c => {
      return {
        ...c,
        longitude: parseFloat(c.longitude),
        latitude: parseFloat(c.latitude),
      }
    });
    return data;
  };
};

export default CountriesService;