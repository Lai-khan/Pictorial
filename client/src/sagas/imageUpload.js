import { takeLatest, call, put, select } from 'redux-saga/effects';
import { UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE, initImage } from "../modules/imageUpload";
import { imageUpload } from '../apis'

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

export default function* imageUploadSaga() {
  yield takeLatest(UPLOAD_IMAGE, uploadImage);
}
