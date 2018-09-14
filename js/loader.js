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


  static preLoadSounds(data) {
    let myInit = {method: `GET`,
      mode: `no-cors`};

    for (const it of data) {
      if (it.type === `artist`) {
        console.log(it);
        fetch(new Request(it.src, myInit)).then((response) => response.blob()).then((blob) => {
          console.log(blob);
          it.src = blob;
          console.log(it.src);
          return it.src;
        });
      } else {
        for (const element of it.answers) {
          fetch(new Request(element.src, myInit)).then((response) => response.blob()).then((blob) => {
            element.src = blob;
            console.log(element.src);
            return element.src;
          });
        }
      }
    }
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
