const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 62101985;


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults() {
    return fetch(`${SERVER_URL}/stats/:${APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data) {
    const element = {time: data.state.time,
      points: data.playerBall};
    const requestSettings = {
      body: JSON.stringify(element),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/:${APP_ID}`, requestSettings).then(checkStatus);
  }
}
