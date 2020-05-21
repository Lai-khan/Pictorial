import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { uploadImage, initImage, setNowPage, reuploadRequest } from '../modules/imageUpload'

export default function useImageUpload() {
  const nowPage = useSelector((state) => state.imageUpload.nowPage);
  const encodedImg = useSelector((state) => state.imageUpload.encodedImg);
  const answer = useSelector((state) => state.imageUpload.answer);
  const status = useSelector((state) => state.imageUpload.status);
  const possibles = useSelector((state) => state.imageUpload.possibles);
  const error = useSelector((state) => state.imageUpload.error);
  const errorMessage = useSelector((state) => state.imageUpload.errorMessage);
  const dispatch = useDispatch();

  const onUploadImage = useCallback(
    (name, code, image) => dispatch(uploadImage(name, code, image)),
    [dispatch]
  );

  const onInitImage = useCallback(
    () => dispatch(initImage()),
    [dispatch]
  );
  
  const onSetNowPage = useCallback(
    (page) => dispatch(setNowPage(page)),
    [dispatch]
  );

  const onReuploadRequest = useCallback(
    () => dispatch(reuploadRequest()),
    [dispatch]
  )

  return {
    nowPage, encodedImg, answer, status, possibles, error, errorMessage,
    onUploadImage, onInitImage, onSetNowPage, onReuploadRequest,
  };
}