import { takeLatest, take, delay, fork, call, put, apply, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  FETCH_ROOM_CODE, CONNECT_ROOM, CHECK_ROOM_CODE, IMAGE_READY, 
  SET_ROUND, SET_TIME_LIMIT, SET_PROFILE, SET_NEXT_ROUND,
  SET_GAME_READY, SET_GAME_START, SET_GAME_START_SUCCESS,
  SET_GAME_IMAGE_DOWNLOADED, SET_GAME_IN_PROGRESS, SET_NOW_COUNTDOWN_TIME,
  CLICKED_WRONG, CLICKED_ANSWER, SET_SHOW_ANSWER, 
  SET_NOW_IMAGE, SET_NEXT_IMAGE, SET_SHOW_SCOREBOARD,
  RETURN_TO_LOBBY, 
  fetchRoomCodeSuccess, fetchRoomCodeFailure,
  connectRoomSuccess, connectRoomFailure,
  checkRoomCodeSuccess, checkRoomCodeFailure,
  imageReady, imageReadySuccess, imageReadyFailure, 
  setUserList, setRoomData, setGameStartSuccess, 
  setGameImageDownloaded, setGameInProgress,
  setNowCountdownTime, setNowTime,
  setShowHelp, setNowRound, setNextRound, setNowImage, setNextImage,
  setShowAnswer, setShowImage, setShowScoreboard,
  setResultUserList, setShowResult, setRoundStartedTime, setRoundStartedUserList, setScoreboardUserList, setUserCountWhenGameStarted, 
} from '../modules/room';
import { initImage } from '../modules/imageUpload';
import { push } from 'connected-react-router';
import { createRoom, checkRoomCode, connectRoom, imageReadyRequest } from '../apis';
import socketConnection from '../libs/socketConnection';
import { calcDateDiff } from '../libs/utils';

function subscribe(socket) {
  return eventChannel(emit => {
    // const emitter = message => emit(message);

    // socket.on(eventType, emitter);
    // return function unsubscribe() {
    //   socket.off(eventType, emitter);
    // }

    socket.on('message', ({ text }) => {
      // 소켓 메시지 오면 수신
    });

    // 현재 유저 정보 받아옴
    socket.on('userData', ({ userList }) => {
      emit(setUserList(userList));
      // emit(setGameReadyUserList(userList));
    });

    // 방 정보 변경
    socket.on('roomData', ({ roomData }) => {      
      emit(setRoomData({ round: roomData.round, timeLimit: roomData.time }));
    });

    // 게임 시작 버튼을 누군가 눌러 이미지 업로드 화면으로 다 같이 전환
    socket.on('gameStart', () => {
      emit(setGameStartSuccess());
    });

    // 이미지 업로드가 다 되어 준비가 완료된 유저 데이터
    socket.on('readyUserData', ({ userList }) => {
      emit(setUserList(userList));
      // emit(setGameReadyUserList(userList));
    });

    // 모든 유저가 이미지 업로드를 마친 상태
    socket.on('allUserReady', () => {
      emit(imageReady());
    });

    // 모든 유저가 게임에 사용될 이미지 다운로드를 마친 상태
    socket.on('allUserDownload', () => {
      emit(setGameInProgress(true));
    });

    // 이미지 문제 표시 전 카운트다운
    socket.on('countdown', ({ time }) => {
      emit(setNowCountdownTime(time));
    });

    // 문제를 맞추어야 하는 제한 시간
    socket.on('timer', ({ time }) => {
      emit(setNowTime(time - 1));
    });

    socket.on('updateUserData', ({ userList }) => {
      emit(setUserList(userList));
      // emit(setGameReadyUserList(userList));
    })

    socket.on('updateScore', ({ userList }) => {
      emit(setUserList(userList));
      // emit(setGameReadyUserList(userList));
    });

    socket.on('roundFinish', () => {
      emit(setShowAnswer(true));
    });


    return function unsubscribe() {
      socket.off('message');
      socket.off('userData');
      socket.off('roomData');
      socket.off('gameStart');
      socket.off('readyUserData');
      socket.off('allUserReady');
      socket.off('allUserDownload');
      socket.off('countdown');
      socket.off('timer');
      socket.off('updateUserData');
      socket.off('updateScore');
      socket.off('roundFinish');
    }
  });
}


function* read(socket, type) {
  const channel = yield call(subscribe, socket, type);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* setRoundSaga(socket) {
  while (true) {
    const { payload } = yield take(SET_ROUND);
    const code = yield select(state => state.room.code);
    const time = yield select(state => state.room.timeLimit);
  
    yield apply(socket, socket.emit, ['setRoom', code, payload, time]);
  }
}

function* setGameStartSaga(socket) {
  while (true) {
    // payload === true면 'gameStart', payload === false면 'gameFinish'
    const { payload } = yield take(SET_GAME_START);
    const code = yield select(state => state.room.code);
    
    yield apply(socket, socket.emit, ['setGameStart', code, payload]);
  }
}

function* setTimeLimitSaga(socket) {
  while (true) {
    const { payload } = yield take(SET_TIME_LIMIT);
    const code = yield select(state => state.room.code);
    const round = yield select(state => state.room.round);

    yield apply(socket, socket.emit, ['setRoom', code, round, payload]);
  }
}

function* setProfileSaga(socket) {
  while (true) {
    const { payload }  = yield take(SET_PROFILE);
    
    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);
    
    yield apply(socket, socket.emit, ['profileChange', name, code, payload]);
  }
}

function* setGameReadySaga(socket) {
  while (true) {
    yield take(SET_GAME_READY);

    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);
    
    yield apply(socket, socket.emit, ['ready', name, code]);
  }
}

function* setGameStartSuccessSaga() {
  while (true) {
    yield take(SET_GAME_START_SUCCESS);

    const code = yield select(state => state.room.code);
    
    yield put(initImage());
    yield put(push(`/room/${code}/upload`));
  }
}

function* setGameImageDownloadedSaga(socket) {
  while (true) {
    yield take(SET_GAME_IMAGE_DOWNLOADED);

    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);

    yield apply(socket, socket.emit, ['imageDownload', name, code]);
  }
}

function* setGameInProgressSaga() {
  while (true) {
    yield take(SET_GAME_IN_PROGRESS);

    const userList = yield select(state => state.room.userList);
    const gameReadyUserList = yield userList.filter(user => user.isReady);

    // 라운드 체크를 위해 이미지 업로드를 완료한 유저 수 체크
    yield put(setUserCountWhenGameStarted(gameReadyUserList.length));

    // 게임 시작 전 도움말 표시
    yield put(setShowHelp(true));

    // 3초 대기 후
    yield delay(3000);

    // 게임 시작 전 도움말 숨기고 시작 설정
    yield put(setShowHelp(false));
    yield put(setNowImage(1));
    yield put(setNowRound(1));
  }
}

function* setNowImageSaga(socket) {
  while (true) {
    yield take(SET_NOW_IMAGE);

    const code = yield select(state => state.room.code);
    
    yield apply(socket, socket.emit, ['roundReady', code]);
  }
}

function* returnToLobbySaga(socket) {
  while (true){
    yield take(RETURN_TO_LOBBY);
    const code = yield select(state => state.room.code);

    yield apply(socket, socket.emit, ['setGameStart', code, false]);
    yield put(push(`/room/${code}`));
  }
}

function* setNowCountdownTimeSaga(socket) {
  while (true) {
    // socket.on 으로 받아온 nowCountdownTime 값
    const { payload } = yield take(SET_NOW_COUNTDOWN_TIME); 

    // 현재 설정되어 있는 nowCountdown 값 
    // const nowCountdownTime = yield select(state => state.room.nowCountdownTime);

    const code = yield select(state => state.room.code);
    const timeLimit = yield select(state => state.room.timeLimit);
    const userList = yield select(state => state.room.userList);
    const gameReadyUserList = yield userList.filter(user => user.isReady);

    if (payload <= 0) {
      // 카운트다운이 0이면 문제 이미지를 보여준다
      yield put(setShowImage(true));

      yield put(setNowTime(timeLimit));

      // 점수 변화 계산을 위해 라운드 시작 전 유저 리스트를 저장한다
      yield put(setRoundStartedUserList(gameReadyUserList));
      
      // 라운드 시작 후 시간을 계산하기 위해 라운드 시작 직전 시간을 저장한다
      yield put(setRoundStartedTime(new Date()));

      yield apply(socket, socket.emit, ['roundStart', code, 0]);
    }
  }
}

function* clickedWrongSaga(socket) {
  while (true) {
    yield take(CLICKED_WRONG);

    const nowTime = new Date();
    const roundStartedTime = yield select(state => state.room.roundStartedTime);

    const time = calcDateDiff(roundStartedTime, nowTime);

    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);

    yield apply(socket, socket.emit, ['score', name, code, false, time]);
  }
}

function* clickedAnswerSaga(socket) {
  while (true) {
    yield take(CLICKED_ANSWER);

    const nowTime = new Date();
    const roundStartedTime = yield select(state => state.room.roundStartedTime);

    const time = calcDateDiff(roundStartedTime, nowTime);

    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);

    yield apply(socket, socket.emit, ['score', name, code, true, time]);
  }
}

function* setNextImageSaga() {
  while (true) {
    yield take(SET_NEXT_IMAGE);
    
    const round = yield select(state => state.room.round);
    const nowImage = yield select(state => state.room.nowImage);
    const userCountWhenGameStarted = yield select(state => state.room.userCountWhenGameStarted);

    // TODO: 라운드 수 잘 올라가는지 체크
    if ((nowImage % userCountWhenGameStarted) <= 0 || (userCountWhenGameStarted === 1)) { 
      yield put(setNextRound());
    }
    if ((nowImage + 1) <= (userCountWhenGameStarted * round)) {
      // 문제 내야할 이미지가 남아 있다면 다음 이미지 선택
      yield put(setNowImage(nowImage + 1));
      yield put(setShowScoreboard(false));
    } else {
      // 남아 있지 않다면
    }
  }
}

function* setNextRoundSaga() {
  while (true) {
    yield take(SET_NEXT_ROUND);

    const nowRound = yield select(state => state.room.nowRound);
    const round = yield select(state => state.room.round);
    const nowImage = yield select(state => state.room.nowImage);
    const userList = yield select(state => state.room.userList);
    const gameReadyUserList = yield userList.filter(user => user.isReady);
    const userCountWhenGameStarted = yield select(state => state.room.userCountWhenGameStarted);

    if ((nowImage + 1) > userCountWhenGameStarted * round) {
      // 게임이 끝나면 유저 리스트를 점수 순으로 정렬하여 배치하고 결과를 띄운다.
      
      let resultUserList = [ ...gameReadyUserList ];

      resultUserList.sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        return 0;
      });
      
      yield put(setResultUserList(resultUserList));
      yield put(setShowResult(true));
    } else {
      yield put(setNowRound(nowRound + 1));
    }
  }
}

function* setShowAnswerSaga() {
  while (true) {
    const { payload } = yield take(SET_SHOW_ANSWER);

    if (payload) {
      yield delay(2000);
      yield put(setShowScoreboard(true));
    }
  }
}

function* setShowScoreboardSaga() {
  while (true) {
    const { payload } = yield take(SET_SHOW_SCOREBOARD);
    
    // 점수 차이 계산해서 scoreboardUserList 에 넣기
    const roundStartedUserList = yield select(state => state.room.roundStartedUserList);
    const userList = yield select(state => state.room.userList);
    const gameReadyUserList = yield userList.filter(user => user.isReady);
    let tempUserList = JSON.parse(JSON.stringify(gameReadyUserList));

    for (let i = 0; i < roundStartedUserList.length; i++) {
      tempUserList[i].score = gameReadyUserList[i].score - roundStartedUserList[i].score;
    }

    yield put(setScoreboardUserList(tempUserList));

    if (payload) {
      yield delay(2000);

      yield put(setNextImage());
      yield put(setShowScoreboard(false));
    }
  }
}

function* handleSocket(socket) {
  yield fork(read, socket);

  yield fork(setRoundSaga, socket);
  yield fork(setTimeLimitSaga, socket);
  yield fork(setProfileSaga, socket);
  yield fork(setGameReadySaga, socket);
  yield fork(setGameStartSaga, socket);
  yield fork(setGameStartSuccessSaga);
  yield fork(setGameImageDownloadedSaga, socket);
  yield fork(setGameInProgressSaga, socket);
  yield fork(setNowCountdownTimeSaga, socket);
  yield fork(clickedWrongSaga, socket);
  yield fork(clickedAnswerSaga, socket);
  yield fork(setNowImageSaga, socket);
  yield fork(setShowAnswerSaga);
  yield fork(setShowScoreboardSaga, socket);
  yield fork(setNextImageSaga);
  yield fork(setNextRoundSaga);
  yield fork(returnToLobbySaga, socket);
}

function* fetchRoomCodeSaga() {
  while (true) {
    try {
      const actions = yield take(FETCH_ROOM_CODE);
      const payload = actions.payload;

      const response = yield call(createRoom, payload);
      const socket = yield call(socketConnection);

      yield fork(handleSocket, socket);
      yield apply(socket, socket.emit, ['join', payload.name, response.data.roomCode]);
      
      yield put(fetchRoomCodeSuccess({ ...response, ...payload }));
      yield put(push(`/room/${response.data.roomCode}`, { code: response.data.roomCode }));
    } catch (error) {
      yield put(fetchRoomCodeFailure(error));
    }
  }
  
}

function* checkRoomCodeSaga(action) {
  const { payload } = action;
  if (!payload) return;

  try {
    const response = yield call(checkRoomCode, payload);
    yield put(checkRoomCodeSuccess({ ...response, ...payload }));
  } catch (error) {
    yield put(checkRoomCodeFailure(error));
    yield put(push(`/`));
  }
  
}


function* connectRoomSaga() {
  while (true) {
    try {
      const { payload } = yield take(CONNECT_ROOM);
      
      const response = yield call(connectRoom, payload);
      const socket = yield call(socketConnection);

      yield fork(handleSocket, socket);
      yield apply(socket, socket.emit, ['join', payload.name, payload.code]); 
  
      yield put(connectRoomSuccess({ ...response, ...payload }));
      yield put(push(`/room/${payload.code}`, { name: payload.name, code: payload.code }));
  
    } catch (error) {
      yield put(connectRoomFailure({ ...error }));
      yield put(push(`/`));
    }
  }
}

function* imageReadySaga() {
  while (true) {
    try {
      yield take(IMAGE_READY);

      const code = yield select(state => state.room.code);
  
      const response = yield call(imageReadyRequest, code);
      const { data } = yield response;
      let { answerList } = yield data;
      yield answerList.forEach((answer) => {
        answer.answerAuto = JSON.parse(answer.answerAuto);
      });
      const answer = yield answerList;
      
      yield put(imageReadySuccess(answer));
      yield put(setGameImageDownloaded());
    } catch (error) {
      yield put(imageReadyFailure({ ...error }));
    }
  }
}

export default function* roomSaga() {
  yield fork(fetchRoomCodeSaga);
  yield fork(connectRoomSaga);
  yield takeLatest(CHECK_ROOM_CODE, checkRoomCodeSaga);
  yield fork(imageReadySaga);
}