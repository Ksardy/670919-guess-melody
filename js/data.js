
import {rand, shuffle} from './utils.js';

const NUMB_QUESTS = 10;

const generateTrackGenre = (arr) => {
  const genres = [];
  for (const it of arr) {
    genres.push(it.genre);
  }
  const answer = genres[rand(genres)];
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

const generateAnswerMap = (arr) => {
  const artists = [];
  for (const it of arr) {
    artists.push(it.artist);
  }
  const answer = artists[rand(artists)];
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

const createPack = (data) => {
  const arr = [];
  let numb = NUMB_QUESTS;
  while (numb--) {
    if (numb % 2 === 0) {
      arr.push(generateAnswerMap(data));
    } else {
      arr.push(generateTrackGenre(data));
    }
  }
  return arr;
};

export default createPack;
