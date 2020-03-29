// action types
export const UPLOAD_IMAGE = 'imageUpload/UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'imageUpload/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'imageUpload/UPLOAD_IMAGE_FAILURE';

export const INIT_IMAGE = 'imageUpload/INIT_IMAGE';

export const SET_NOW_PAGE = 'imageUpload/SET_NOW_PAGE';

// action
export const uploadImage = (name, code, image) => ({
  type: UPLOAD_IMAGE,
  payload: {
    name, code, image,
  },
});

export const uploadImageSuccess = (response) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: response,
});

export const uploadImageFailure = (response) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: response,
});

export const initImage = () => ({
  type: INIT_IMAGE,
});

export const setNowPage = (page) => ({
  type: SET_NOW_PAGE,
  payload: page,
});

const initialState = {
  nowPage: 'upload',
  encodedImg: null,
  answer: null,
  status: 'ready',
  error: false,
  possibles: null,
}

// reducer
function imageUpload(state = initialState, { type, payload }) {
  switch (type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        status: 'uploading',
        nowPage: 'auto',
        error: false,
        errorMessage: '',
      };

    case UPLOAD_IMAGE_SUCCESS: 
      return {
        ...state,
        ...payload.data,
        status: 'uploaded',
        nowPage: 'auto',
        error: false,
        errorMessage: '',
      };

    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: payload.response.data.message,
      };
    
    case INIT_IMAGE:
      return {
        ...state,
        nowPage: 'upload',
        status: 'ready',
        encodedImg: null,
        answer: null,
        possibles: null,
      }

    case SET_NOW_PAGE:
      return {
        ...state,
        nowPage: payload,
      }

    default:
      return state;
  }
}

export default imageUpload;