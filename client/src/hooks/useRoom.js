import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { fetchRoomCode, connectRoom, checkRoomCode,
  setName, setCode, setProfile, setErrorMessage,
  setRound, setTimeLimit, setUserList,
  imageReady, setGameReady, setGameStart, setNowCountdownTime,
  clickedWrong, clickedAnswer, returnToLobby,
} from '../modules/room'

export default function useRoom() {
  const name = useSelector((state) => state.room.name);
  const code = useSelector((state) => state.room.code);
  const profile = useSelector((state) => state.room.profile);
  const round = useSelector((state) => state.room.round);
  const timeLimit = useSelector((state) => state.room.timeLimit);
  const connected = useSelector((state) => state.room.connected);
  const errorMessage = useSelector((state) => state.room.errorMessage);
  const userList = useSelector((state) => state.room.userList);
  const scoreboardUserList = useSelector((state) => state.room.scoreboardUserList);
  const images = useSelector((state) => state.room.images);
  const inProgress = useSelector((state) => state.room.inProgress);
  const countdown = useSelector((state) => state.room.countdown);
  const timer = useSelector((state) => state.room.timer);
  const nowRound = useSelector((state) => state.room.nowRound);
  const nowImage = useSelector((state) => state.room.nowImage);
  const showImage = useSelector((state) => state.room.showImage);
  const showAnswer = useSelector((state) => state.room.showAnswer);
  const showScoreboard = useSelector((state) => state.room.showScoreboard);
  const showResult = useSelector((state) => state.room.showResult);
  const resultUserList = useSelector((state) => state.room.resultUserList);
  const showHelp = useSelector((state) => state.room.showHelp);
  
  const dispatch = useDispatch();

  const onFetchRoomID = useCallback(
    (name) => dispatch(fetchRoomCode(name)),
    [dispatch]
  );
  
  const onConnectRoom = useCallback(
    (name, code) => dispatch(connectRoom(name, code)),
    [dispatch]
  );

  const onSetName = useCallback(
    (name) => dispatch(setName(name)),
    [dispatch]
  );

  const onSetCode = useCallback(
    (code) => dispatch(setCode(code)),
    [dispatch]
  );

  const onSetProfile = useCallback(
    (profile) => dispatch(setProfile(profile)),
    [dispatch],
  )
  
  const onSetErrorMessage = useCallback(
    (message) => dispatch(setErrorMessage(message)),
    [dispatch]
  );

  const onCheckRoomCode = useCallback(
    (code) => dispatch(checkRoomCode(code)),
    [dispatch]
  );

  const onSetRound = useCallback(
    (round) => dispatch(setRound(round)),
    [dispatch]
  );

  const onSetTimeLimit = useCallback(
    (time) => dispatch(setTimeLimit(time)),
    [dispatch]
  );

  const onSetUserList = useCallback(
    (list) => dispatch(setUserList(list)),
    [dispatch]
  );

  const onSetGameReady = useCallback(
    () => dispatch(setGameReady()),
    [dispatch]
  );

  const onSetGameStart = useCallback(
    (status) => dispatch(setGameStart(status)),
    [dispatch]
  );

  const onImageReady = useCallback(
    (code) => dispatch(imageReady(code)),
    [dispatch]
  );

  const onSetNowCountdownTime = useCallback(
    (time) => dispatch(setNowCountdownTime(time)),
    [dispatch]
  );

  const onClickedWrong = useCallback(
    (time) => dispatch(clickedWrong()),
    [dispatch]
  );

  const onClickedAnswer = useCallback(
    (time) => dispatch(clickedAnswer()),
    [dispatch]
  );

  const onReturnToLobby = useCallback(
    () => dispatch(returnToLobby()),
    [dispatch]
  );

  return {
    name, code, profile, errorMessage, round, timeLimit, connected, userList, 
    images, inProgress, countdown, timer, nowRound, nowImage,
    scoreboardUserList, showImage, showAnswer, showScoreboard, showResult, resultUserList, showHelp,
    onFetchRoomID, onConnectRoom,
    onSetName, onSetCode, onSetProfile, onSetRound, onSetTimeLimit,
    onCheckRoomCode, onSetUserList, onImageReady,
    onSetErrorMessage, onSetGameReady, onSetGameStart, 
    onSetNowCountdownTime, onClickedWrong, onClickedAnswer, onReturnToLobby,
  };
}