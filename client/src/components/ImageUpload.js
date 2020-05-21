import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useImageUpload from '../hooks/useImageUpload';
import useRoom from '../hooks/useRoom';

import Stars from '../svgs/Stars.svg';
import { ReactComponent as Plus } from '../svgs/plus.svg';
import { ReactComponent as LoadingWheel } from '../svgs/loading-wheel.svg';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${Stars});
    background-position: center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  `,
  FormContainer: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Count: styled.h2`
    font-weight: 800;
    font-size: 48px;
    color: white;
    letter-spacing: 11.52px;
    -webkit-text-stroke: 1px #ffffff;
  `,
  UploadBoxContainer: styled.div`
    width: 1030px;
    position: relative;
  `,
  UploadBox: styled.label`
    width: 1030px;
    height: 620px;
    box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.25);
    border-style: solid;
    border-width: 6px;
    border-image-source: linear-gradient(to right, #5728e2, #210081);
    border-image-slice: 1;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: ${props => props.selected === 'upload' && 'pointer'};
  `,
  UploadBoxInstruction: styled.div`
    font-size: 48px;
    font-weight: 300;
    color: #888888;
    display: ${props => props.show ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      margin-bottom: 38px;
    }
  `,
  UploadBoxMenuContainer: styled.div`
    position: absolute;
    top: 24px;
    right: -77px;
    display: flex;
    flex-direction: column;
    z-index: 2;
  `,
  UploadBoxMenu: styled.div`
    width: 70px;
    height: 180px;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: ${props => props.selected ? '#5728e2' : '#210081'};
    font-size: 32px;
    color: ${props => props.selected ? '#ffffff' : '#c4c4c4' };
    writing-mode: vertical-lr;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.23;
    font-weight: 700;
    margin-bottom: 19px;
    cursor: pointer;
    position: relative;
    z-index: 2;
  `,
  Button: styled.button`
    width: 255px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.25);
    border: solid 3px #ffffff;
    background-image: linear-gradient(to right, #5728e2, #210081);
    font-size: 30px;
    letter-spacing: 7.2px;
    color: #ffffff;
    font-weight: 800;
    font-family: inherit;
    margin-top: 45px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    -webkit-filter: ${props => props.disabled && 'grayscale(100%)'};
    filter: ${props => props.disabled && 'gray'};
  `,
  InputFile: styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  `,
  Loading: styled.div`
    position: absolute;
    svg {
      animation: rotation 2s linear infinite;
    }

    @keyframes rotation {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
    }
  `,
  UploadedImageContainer: styled.div`
    width: 100%;
    height: 100%;
    max-width: 1030px;
    max-height: 620px;
    position: relative;
  `,
  UploadedImage: styled.img`
    max-width: 1030px;
    max-height: 620px;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
  `,
  AreaBox: styled.div`
    position: absolute;
    width: ${props => {
      return `${(props.y2 - props.y1) * 100}%`
    }};
    height: ${props => {
      return `${(props.x2 - props.x1) * 100}%`
    }};
    top: ${props => `${props.x1 * 100}%`};
    left: ${props => `${props.y1 * 100}%`};
    z-index: 99;
    border: solid 6px #a806b5;
  `,
  AreaBoxLabel: styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -64px;
    top: -32px;
    width: 126px;
    height: 50px;
    background-color: #a806b5;
    font-size: 24px;
    color: white;
  `,
  ErrorMsg: styled.div`
    color: red;
    text-align: center;
    margin-bottom: 10px;
  `, 
  FlexHorizontalBox: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: left;

    & button {
      margin-left: 10px;
      margin-right: 10px;
    }
  ` 
}

function ImageUpload() {
  const [nowCount, setNowCount] = useState(1);
  const [readyToGame, setReadyToGame] = useState(false);

  const { name, code, connected, round } = useRoom();
  const { onUploadImage, onInitImage, onSetNowPage, onReuploadRequest,
    encodedImg, answer, status, nowPage, errorMessage } = useImageUpload();

  const handleChangeFile = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      onInitImage();
      reader.readAsDataURL(e.target.files[0]);
      onUploadImage(name, code, e.target.files[0]);
      onSetNowPage('auto');
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    if (status === 'uploaded' && answer) {
      onInitImage();
      onReuploadRequest();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'uploaded' && answer) {
      if (nowCount >= round) {
        setReadyToGame(true);
      } else {
        onInitImage();
        onSetNowPage('upload');
        setNowCount(nowCount + 1);
      }
    }
  }

  const handleClickChangePage = (menu) => {
    // 현재 업로드하는 중이면 다른 메뉴 선택 불가
    // TODO: 이미지 업로드 도중에 선택했을 경우 API CALL BLOCK 할 것
    if (status === 'uploading') return;

    // 이미지가 업로드 된 것이 없으면 다른 메뉴 선택 불가
    if (status === 'ready') return;

    // 사진 등록 화면으로 다시 갈 때 이미지 정보 초기화 
    if (menu === 'upload') {
      // onInitImage();
    }

    if (menu === 'manual') {
      alert('수동출제는 준비 중입니다.');
      return;
    }
    
    onSetNowPage(menu);
  }


  return (
    <Styled.Container>
      {
        !connected &&
        <Redirect to="/"></Redirect>
      }
      {
        readyToGame &&
        <Redirect to={`/room/${code}/game`} />
      }
      <Styled.FormContainer onSubmit={handleSubmit}>
        <Styled.Count>
          {nowCount} / {round}
        </Styled.Count>
        <Styled.UploadBoxContainer>
          <Styled.ErrorMsg>
            { errorMessage }
          </Styled.ErrorMsg>
          {
            nowPage === 'upload' &&
            <Styled.InputFile type="file" id="image" name="IMG_FILE" accept="image/*" onChange={handleChangeFile}/>
          }
          <Styled.UploadBox image={nowPage !== 'upload' && `data:image/jpeg;base64,${encodedImg}`} htmlFor={"image"} selected={nowPage}>
            {
              answer && nowPage === 'auto' &&
              <Styled.AreaBox x1={answer.detection_boxes[0]} y1={answer.detection_boxes[1]} x2={answer.detection_boxes[2]} y2={answer.detection_boxes[3]}>
                <Styled.AreaBoxLabel>{answer.detection_names}</Styled.AreaBoxLabel>
              </Styled.AreaBox>
            }
            <Styled.UploadBoxInstruction show={nowPage === 'upload' ? false : true}>
              <Plus />
              Upload Image
            </Styled.UploadBoxInstruction>
            {
              status === 'uploading' &&
              <Styled.Loading>
                <LoadingWheel />
              </Styled.Loading>
            }
          </Styled.UploadBox>
          
          <Styled.UploadBoxMenuContainer>
            <Styled.UploadBoxMenu onClick={() => handleClickChangePage('upload')} selected={nowPage === 'upload'}>사진등록</Styled.UploadBoxMenu>
            <Styled.UploadBoxMenu onClick={() => handleClickChangePage('auto')} selected={nowPage === 'auto'}>자동출제</Styled.UploadBoxMenu>
            <Styled.UploadBoxMenu onClick={() => handleClickChangePage('manual')} selected={nowPage === 'manual'}>수동출제</Styled.UploadBoxMenu>
          </Styled.UploadBoxMenuContainer>
        </Styled.UploadBoxContainer>
        <Styled.FlexHorizontalBox>
          <Styled.Button type="button" disabled={status !== 'uploaded' && true} onClick={handleReset}>
            다시 올리기
          </Styled.Button>
          <Styled.Button disabled={status !== 'uploaded' && true}>
            제출하기
          </Styled.Button>
        </Styled.FlexHorizontalBox>
      </Styled.FormContainer>
    </Styled.Container>
  )
}

export default ImageUpload;