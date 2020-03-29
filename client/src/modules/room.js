// action types
export const FETCH_ROOM_CODE = 'room/FETCH_ROOM_CODE';
export const FETCH_ROOM_CODE_SUCCESS = 'room/FETCH_ROOM_CODE_SUCCESS';
export const FETCH_ROOM_CODE_FAILURE = 'room/FETCH_ROOM_CODE_FAILURE';

export const CONNECT_ROOM = 'room/CONNECT_ROOM';
export const CONNECT_ROOM_SUCCESS = 'room/CONNECT_ROOM_SUCCESS';
export const CONNECT_ROOM_FAILURE = 'room/CONNECT_ROOM_FAILURE';

export const CHECK_ROOM_CODE = 'room/CHECK_ROOM_CODE';
export const CHECK_ROOM_CODE_SUCCESS = 'room/CHECK_ROOM_CODE_SUCCESS';
export const CHECK_ROOM_CODE_FAILURE = 'room/CHECK_ROOM_CODE_FAILURE';

export const SET_NAME = 'room/SET_NAME';
export const SET_CODE = 'room/SET_CODE';
export const SET_PROFILE = 'room/SET_PROFILE';
export const SET_ERROR_MESSAGE = 'room/SET_ERROR_MESSAGE';

export const SET_ROUND = 'room/SET_ROUND';
export const SET_TIME_LIMIT = 'room/SET_TIME_LIMIT';
export const SET_ROOM_DATA = 'room/SET_ROOM_DATA';

export const SET_USER_LIST = 'room/SET_USER_LIST';

export const IMAGE_READY = 'room/IMAGE_READY';
export const IMAGE_READY_SUCCESS = 'room/IMAGE_READY_SUCCESS';
export const IMAGE_READY_FAILURE = 'room/IMAGE_READY_FAILURE';

export const SET_GAME_READY = 'room/SET_GAME_READY';
export const SET_GAME_START = 'room/SET_GAME_START';
export const SET_GAME_START_SUCCESS = 'room/SET_GAME_START_SUCCESS';

export const SET_GAME_IMAGE_DOWNLOADED = 'room/SET_GAME_IMAGE_DOWNLOADED';

export const SET_NOW_COUNTDOWN_TIME = 'room/SET_NOW_COUNTDOWN_TIME';
export const SET_NOW_TIME = 'room/SET_NOW_TIME';

export const SET_GAME_IN_PROGRESS = 'room/SET_GAME_IN_PROGRESS';

export const SET_NOW_ROUND = 'room/SET_NOW_ROUND';
export const SET_NEXT_ROUND = 'room/SET_NEXT_ROUND';
export const SET_ROUND_STARTED_TIME = 'room/SET_ROUND_STARTED_TIME';
export const SET_ROUND_STARTED_USER_LIST = 'room/SET_ROUND_STARTED_USER_LIST';
export const SET_SCOREBOARD_USER_LIST = 'room/SET_SCOREBOARD_USER_LIST';

export const SET_SHOW_HELP = 'room/SET_SHOW_HELP';
export const SET_NOW_IMAGE = 'room/SET_NOW_IMAGE';
export const SET_NEXT_IMAGE = 'room/SET_NEXT_IMAGE';
export const SET_SHOW_IMAGE = 'room/SET_SHOW_IMAGE';
export const SET_USER_COUNT_WHEN_GAME_STARTED = 'room/SET_USER_COUNT_WHEN_GAME_STARTED';

export const SET_SHOW_ANSWER = 'room/SET_SHOW_ANSWER';
export const SET_SHOW_SCOREBOARD = 'room/SET_SHOW_SCOREBOARD';
export const SET_SHOW_RESULT = 'room/SET_SHOW_RESULT';

export const CLICKED_WRONG = 'room/CLICKED_WRONG';
export const CLICKED_ANSWER = 'room/CLICKED_ANSWER';

export const SET_RESULT_USER_LIST = 'room/SET_RESULT_USER_LIST';
export const RETURN_TO_LOBBY = 'room/RETURN_TO_LOBBY';


// action
export const fetchRoomCode = (name) => ({
  type: FETCH_ROOM_CODE,
  payload: {
    name: name,
  },
});

export const fetchRoomCodeSuccess = (response) => ({
  type: FETCH_ROOM_CODE_SUCCESS,
  payload: response,
});

export const fetchRoomCodeFailure = (error) => ({
  type: FETCH_ROOM_CODE_FAILURE,
  payload: error,
});



export const connectRoom = (name, code) => ({
  type: CONNECT_ROOM,
  payload: {
    name,
    code,
  },
});

export const connectRoomSuccess = (response) => ({
  type: CONNECT_ROOM_SUCCESS,
  payload: response,
});

export const connectRoomFailure = (error) => ({
  type: CONNECT_ROOM_FAILURE,
  payload: error,
});



export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setCode = (code) => ({
  type: SET_CODE,
  payload: code,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
})

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});



export const checkRoomCode = (code) => ({
  type: CHECK_ROOM_CODE,
  payload: code,
});

export const checkRoomCodeSuccess = (response) => ({
  type: CHECK_ROOM_CODE_SUCCESS,
  payload: response,
});

export const checkRoomCodeFailure = (error) => ({
  type: CHECK_ROOM_CODE_FAILURE,
  payload: error,
});

export const setRound = (round) => ({
  type: SET_ROUND,
  payload: round,
});

export const setTimeLimit = (time) => ({
  type: SET_TIME_LIMIT,
  payload: time,
});

// setRound와 setTimeLimit가 성공했으면 setRoomData로 
export const setRoomData = (response) => ({
  type: SET_ROOM_DATA,
  payload: response,
});

export const setUserList = (list) => ({
  type: SET_USER_LIST,
  payload: list,
});

export const imageReady = (code) => ({
  type: IMAGE_READY,
  payload: code,
});

export const imageReadySuccess = (response) => ({
  type: IMAGE_READY_SUCCESS,
  payload: response,
});

export const imageReadyFailure = (error) => ({
  type: IMAGE_READY_FAILURE,
  payload: error,
});

export const setGameStart = (status) => ({
  type: SET_GAME_START,
  payload: status,
});

export const setGameStartSuccess = () => ({
  type: SET_GAME_START_SUCCESS,
});

export const setGameReady = () => ({
  type: SET_GAME_READY,
});

export const setGameImageDownloaded = () => ({
  type: SET_GAME_IMAGE_DOWNLOADED,
});

export const setGameInProgress = (status) => ({
  type: SET_GAME_IN_PROGRESS,
  payload: status,
});

export const setNowCountdownTime = (time) => ({
  type: SET_NOW_COUNTDOWN_TIME,
  payload: time,
});

export const setNowTime = (time) => ({
  type: SET_NOW_TIME,
  payload: time,
});

export const setNowRound = (round) => ({
  type: SET_NOW_ROUND,
  payload: round,
});

export const setNextRound = () => ({
  type: SET_NEXT_ROUND,
});

export const setRoundStartedTime = (time) => ({
  type: SET_ROUND_STARTED_TIME,
  payload: time,
});

export const setRoundStartedUserList = (list) => ({
  type: SET_ROUND_STARTED_USER_LIST,
  payload: list,
});

export const setScoreboardUserList = (list) => ({
  type: SET_SCOREBOARD_USER_LIST,
  payload: list,
});

export const setShowHelp = (status) => ({
  type: SET_SHOW_HELP,
  payload: status,
});

export const setNowImage = (imageIndex) => ({
  type: SET_NOW_IMAGE,
  payload: imageIndex,
});

export const setNextImage = () => ({
  type: SET_NEXT_IMAGE,
});

export const setShowImage = (status) => ({
  type: SET_SHOW_IMAGE,
  payload: status,
});

export const setUserCountWhenGameStarted = (count) => ({
  type: SET_USER_COUNT_WHEN_GAME_STARTED,
  payload: count,
})

export const setShowAnswer = (status) => ({
  type: SET_SHOW_ANSWER,
  payload: status,
});

export const setShowScoreboard = (status) => ({
  type: SET_SHOW_SCOREBOARD,
  payload: status,
});

export const clickedWrong = () => ({
  type: CLICKED_WRONG,
});

export const clickedAnswer = () => ({
  type: CLICKED_ANSWER,
});

export const setShowResult = (status) => ({
  type: SET_SHOW_RESULT,
  payload: status,
});

export const setResultUserList = (list) => ({
  type: SET_RESULT_USER_LIST,
  payload: list,
});

export const returnToLobby = () => ({
  type: RETURN_TO_LOBBY,
});

const initialState = {
  code: '',
  name: '',
  profile: 1,
  round: 2,
  timeLimit: 3,
  status: null,
  connected: false,
  userList: [],
  images: [],
  gameReady: false,
  scoreboardUserList: [],
  userCountWhenGameStarted: null,
  inProgress: false,
  nowImage: null,
  nowRound: null,
  showImage: false,
  showAnswer: false,
  showScoreboard: false,
  showResult: false,
  resultUserList: [],
  roundStartedTime: null,
  roundStartedUserList: [],
  countdown: null,
  timer: null,
}

// reducer
function room(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ROOM_CODE:
      return {
        ...state,
      };

    case FETCH_ROOM_CODE_SUCCESS: 
      return {
        ...state,
        name: payload.name,
        code: payload.data.roomCode,
        connected: true,
      };

    case FETCH_ROOM_CODE_FAILURE:
      return {
        ...state,
        ...payload.data,
        code: '',
        name: '',
        showError: true,
        connected: false,
      };

    case CONNECT_ROOM:
      return {
        ...state,
      };
    
    case CONNECT_ROOM_SUCCESS:
      return {
        ...state,
        ...payload,
        connected: true,
        code: payload.code,
      };

    case CONNECT_ROOM_FAILURE:
      return {
        ...state,
        ...payload,
        errorMessage: payload.response.data.message,
        connected: false,
        showError: true,
      };

    case SET_NAME:
      return {
        ...state,
        name: payload.name,
      };
    
    case SET_CODE:
      return {
        ...state,
        code: payload.code,
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
      }

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload,
      }

    case CHECK_ROOM_CODE:
      return {
        ...state,
      };

    case CHECK_ROOM_CODE_SUCCESS:
      return {
        ...state,
        code: payload.code,
      };

    case CHECK_ROOM_CODE_FAILURE:
      return {
        ...state,
        errorMessage: payload.response.data.message,
        connected: false,
        showError: true,
      };

    case SET_ROUND:
      return {
        ...state,
        round: payload,
      };
    
    case SET_TIME_LIMIT:
      return {
        ...state,
        timeLimit: payload,
      };

    case SET_USER_LIST:
      return {
        ...state,
        userList: payload,
      }
    
    case SET_ROOM_DATA:
      return {
        ...state,
        ...payload,
      }
    
    case SET_GAME_READY:
      return {
        ...state,
        gameReady: true,
      }

    case SET_SCOREBOARD_USER_LIST:
      return {
        ...state,
        scoreboardUserList: payload,
      }

    case SET_GAME_START:
      return {
        ...state,
      }

    case SET_GAME_START_SUCCESS:
      return {
        ...state,
      }

    case IMAGE_READY:
      return {
        ...state,
      }

    case IMAGE_READY_SUCCESS:
      return {
        ...state,
        images: payload,
      }
    
    case IMAGE_READY_FAILURE:
      return {
        ...state,
        images: [],
        showError: true,
      }

    case SET_GAME_IMAGE_DOWNLOADED:
      return {
        ...state,
      }

    case SET_GAME_IN_PROGRESS:
      return {
        ...state,
        inProgress: payload,
      }
    
    case SET_NOW_COUNTDOWN_TIME:
      return {
        ...state,
        countdown: payload,
      }

    case SET_NOW_TIME:
      return {
        ...state,
        timer: payload,
      }

    case SET_NOW_ROUND:
      return {
        ...state,
        nowRound: payload,
      }

    case SET_NEXT_ROUND:
      return {
        ...state,
        showImage: false,
        showAnswer: false,
        countdown: null,
        timer: null,
      }

    case SET_ROUND_STARTED_TIME:
      return {
        ...state,
        roundStartedTime: payload,
      }

    case SET_ROUND_STARTED_USER_LIST:
      return {
        ...state,
        roundStartedUserList: payload,
      }

    case SET_SHOW_HELP:
      return {
        ...state,
        showHelp: payload,
      }

    case SET_NOW_IMAGE:
      return {
        ...state,
        nowImage: payload,
      }

    case SET_NEXT_IMAGE:
      return {
        ...state,
        showImage: false,
        showAnswer: false,
        countdown: null,
        timer: null,
      }

    case SET_SHOW_IMAGE:
      return {
        ...state,
        showImage: payload,
      }

    case SET_USER_COUNT_WHEN_GAME_STARTED:
      return {
        ...state,
        userCountWhenGameStarted: payload,
      }

    case SET_SHOW_ANSWER:
      return {
        ...state,
        showAnswer: payload,
      }

    case SET_SHOW_SCOREBOARD:
      return {
        ...state,
        showScoreboard: payload,
      }

    case CLICKED_WRONG:
      return {
        ...state,
      }

    case CLICKED_ANSWER:
      return {
        ...state,
        showAnswer: true,
      }

    case SET_SHOW_RESULT:
      return {
        ...state,
        showResult: payload,
      }

    case SET_RESULT_USER_LIST:
      return {
        ...state,
        resultUserList: payload,
      }
    
    case RETURN_TO_LOBBY:
      return {
        ...state,
        gameReady: false,
        inProgress: false,
        showResult: false,
        nowImage: null,
        nowRound: null,
        images: [],
        resultUserList: [],
        userCountWhenGameStarted: null,
      }

    default:
      return state;
  }
}

export default room;