import { takeLatest, call, put, select, take, fork } from 'redux-saga/effects';
import { UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE, initImage, REUPLOAD_REQUEST, REUPLOAD_SUCCESS, REUPLOAD_FAILURE } from "../modules/imageUpload";
import { imageUpload, reuploadRequest } from '../apis'

function* uploadImage(action) {
  const { payload } = action;
  if (!payload) return;

  try {
    const name = yield select(state => state.room.name);
    const code = yield select(state => state.room.code);

    const response = yield call(imageUpload, { ...payload, name, code });
    yield put({ type: UPLOAD_IMAGE_SUCCESS, payload: { ...response, ...payload }});
  } catch (error) {
    yield put({ type: UPLOAD_IMAGE_FAILURE, payload: error });
    yield put(initImage());
  }

}

function* reuploadSaga() {
  while (true) {
    try {
      yield take(REUPLOAD_REQUEST);
      const name = yield select(state => state.room.name);
      const code = yield select(state => state.room.code);
      const payload = { name, code };

      yield call(reuploadRequest, { ...payload });
      yield put({ type: REUPLOAD_SUCCESS });
    } catch (error) {
      yield put({ type: REUPLOAD_FAILURE, payload: error });
    }
  }
}

export default function* imageUploadSaga() {
  yield takeLatest(UPLOAD_IMAGE, uploadImage);
  yield fork(reuploadSaga);
}
