import music from './music-data.js';

const shuffle = (arr) => {
  let map = arr;
  let currentIndex = map.length;
  let temporaryValue;
  let randomIndex;
  for (let i = 0; i < map.length; i++) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = map[currentIndex];
    map[currentIndex] = map[randomIndex];
    map[randomIndex] = temporaryValue;
  }
  return map;
};

const generateTrackGenre = (arr, genre) => {
  const answer = genre;
  if (arr.length < 4) {
    return null;
  }
  let map = shuffle(arr).slice(0);
  for (const it of map) {
    if (it.genre === answer) {
      const current = it;
      map.splice(map.indexOf(it), 1);
      const srcMap = shuffle([current, ...map.slice(0, 3)]);
      return {
        trueAnswer: answer,
        quest: `Выберите ` + answer + ` треки`,
        tracks: generateTracks(srcMap),
        answers: generateTrackAnswersGenre(srcMap),
      };
    }
  }
  return null;
};

const generateAnswerMap = (arr, artist) => {
  const answer = artist;
  if (arr.length < 3) {
    return null;
  }
  let map = shuffle(arr).slice(0);
  for (const it of map) {
    if (it.artist === answer) {
      const current = it;
      map.splice(map.indexOf(it), 1);
      const srcMap = shuffle([current, ...map.slice(0, 2)]);
      return {
        trueAnswer: answer.replace(/\s/g, ``),
        quest: `Кто исполняет эту песню?`,
        answers: generateTrackAnswers(srcMap),
        images: generateTrackImg(srcMap),
        track: current.src};
    }
  }
  return null;
};

const generateTrackAnswers = (arr) => {
  const srcMap = [];
  arr.forEach((element) => {
    srcMap.push(element.artist);
  });
  return srcMap;
};

const generateTrackAnswersGenre = (arr) => {
  const srcMap = [];
  arr.forEach((element) => {
    srcMap.push(element.genre);
  });
  return srcMap;
};

const generateTrackImg = (arr) => {
  const srcMap = [];
  arr.forEach((element) => {
    srcMap.push(element.image);
  });
  return srcMap;
};

const generateTracks = (arr) => {
  const srcMap = [];
  arr.forEach((element) => {
    srcMap.push(element.src);
  });
  return srcMap;
};

/* создаю массивы вопросов двух типо*/

const QUEST_TYPE_ARTIST_MAP = [generateAnswerMap(music, `Kevin MacLeod`), generateAnswerMap(music, `Audionautix`), generateAnswerMap(music, `Riot`), generateAnswerMap(music, `Jingle Punks`), generateAnswerMap(music, `Quincas Moreira`)];
const QUEST_TYPE_GENRE_MAP = [generateTrackGenre(music, `Rock`), generateTrackGenre(music, `Electronic`), generateTrackGenre(music, `Pop`), generateTrackGenre(music, `Jazz`), generateTrackGenre(music, `Country`)];

const pack = [];

const packaging = (arr, dataOne, dataTwo) => {
  let numb = dataOne.length + dataTwo.length;
  let i = 0;
  let c = 0;
  while (numb--) {
    if (numb % 2 === 0) {
      arr.push(dataTwo[i]);
      i++;
    } else {
      arr.push(dataOne[c]);
      c++;
    }
  }
  return arr;
};

/* создаю один чередующий вопросы массив, который буду шифтить*/

packaging(pack, QUEST_TYPE_GENRE_MAP, QUEST_TYPE_ARTIST_MAP);

export default pack;
