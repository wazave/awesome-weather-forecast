const service = new window.google.maps.places.AutocompleteService();

const types = ['(cities)'];

function getCityPredictions(input) {
  return new Promise((resolve, reject) => {
    service.getPlacePredictions({ input, types }, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        reject(status);
      } else {
        resolve(predictions);
      }
    })
  });
}

export default getCityPredictions;
