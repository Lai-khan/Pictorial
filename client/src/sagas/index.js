import { fork } from 'redux-saga/effects';
import roomSaga from './room';
import imageUploadSaga from './imageUpload';

export default function* rootSaga() {
  yield fork(roomSaga);
  yield fork(imageUploadSaga);
}
