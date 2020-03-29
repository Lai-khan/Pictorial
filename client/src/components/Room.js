import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useRoom from '../hooks/useRoom';

import Stars from '../svgs/Stars.svg';
import Circle from '../svgs/circle.svg';
import SmallCircle from '../svgs/small_circle.svg';
import AlienL1 from '../svgs/alienL1.svg';
import AlienL2 from '../svgs/alienL2.svg';
import AlienL3 from '../svgs/alienL3.svg';
import AlienL4 from '../svgs/alienL4.svg';
import AlienL5 from '../svgs/alienL5.svg';
import AlienL6 from '../svgs/alienL6.svg';
import AlienL7 from '../svgs/alienL7.svg';
import AlienL8 from '../svgs/alienL8.svg';
import LinkShareBtn from '../svgs/link-share-btn.svg';
import { ReactComponent as Left } from '../svgs/left.svg';
import { ReactComponent as Right } from '../svgs/right.svg';
import { ReactComponent as Loading } from '../svgs/loading.svg';
import { ReactComponent as Ready } from '../svgs/check.svg';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${Stars});
    background-position: center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
  `,
  Lobby: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Name: styled.h2`
    font-size: 42px;
    color: #ffffff;
    margin: 45px 0;
  `,
  CharacterSelectContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: left;
    margin-bottom: 64px;
  `,
  SelectButton: styled.span`
    display: inline-flex;
    cursor: pointer;
    margin-right: ${props => props.left && '64px'};
    margin-left: ${props => props.right && '47px'};
  `,
  AlienContainer: styled.div`
    width: 244px;
    height: 244px;
    background-image: url(${Circle});
    background-size: 100% 100%;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Alien: styled.div`
    background-image: url(${props => props.alien});
    background-size: 100% 100%;
    background-position: center;
    width: 200px;
    height: 200px;
  `,
  MiddleContainer: styled.div`
    width: 90%;
    max-width: 1024px;
    height: 155px;
    border-radius: 10px;
    background-image: linear-gradient(to right, #5728e2, #ec2c6f);
    text-align: center;
  `,
  StartButton: styled.button`
    position: relative;
    width: 215px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.25);
    border: solid 3px #ffffff;
    background-image: linear-gradient(to top, #5728e2, #210081);
    letter-spacing: 7.2px;
    color: #ffffff;
    font-family: inherit;
    font-weight: 800;
    font-size: 30px;
    bottom: 35px;
    cursor: pointer;
  `,
  OptionContainer: styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: left;
  `,
  Option: styled.div`
    font-family: inherit;
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 3px;
    color: #ffffff;
  `,
  ListCircle: styled.div`
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    margin-right: 12px;
    display: inline-flex;
  `,
  Select: styled.select`
    width: 170px;
    height: 45px;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    font-size: 30px;
    color: #210081;
    font-family: inherit;
    font-weight: 800;
    padding: 6px 16px;
    margin-left: 24px;
  `,
  UserListContainer: styled.div`
    margin-top: 61px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: left;
  `,
  UserContainer: styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 17px;
  `,
  UserAlienContainer: styled.div`
    width: 140px;
    height: 140px;
    background-image: url(${SmallCircle});
    background-size: 100% 100%;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UserAlien: styled.div`
    width: 114px;
    height: 114px;
    background-image: url(${props => props.alien});
    background-size: 100% 100%;
    background-position: center;
  `,
  UserName: styled.h3`
    font-size: 30px;
    color: #ffffff;
    margin: 28px 0 6px 0;
  `,
  UserStatus: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 58px;
  `,
  LinkShareButton: styled.div`
    background-image: ${`url(${LinkShareBtn})`};
    position: absolute;
    top: 40px;
    left: 40px;
    width: 278px;
    height: 66px;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
  `,
}

function Room() {
  const { code } = useParams();
  const { name, connected, round, timeLimit, userList, profile,
    onSetRound, onSetTimeLimit, onSetGameStart, onSetProfile } = useRoom();

  const handleLinkShare = () => {
    const url = `https://pictorial.surge.sh/${code}`;
    const textareaElement = document.createElement('textarea');
    textareaElement.value = url;
    document.body.appendChild(textareaElement);
    textareaElement.select();
    document.execCommand('copy');
    document.body.removeChild(textareaElement);
  }

  const handleChangeProfile = (to) => {
    const PROFILE_MAX_NUM = 8;
    if (to === 'left') {
      if (profile <= 1) {
        onSetProfile(PROFILE_MAX_NUM);
      } else {
        onSetProfile(profile - 1);
      }
    } else {
      if (profile >= PROFILE_MAX_NUM) {
        onSetProfile(1);
      } else {
        onSetProfile(profile + 1);
      }
    }
  }

  const handleChangeRound = (e) => {
    const value = parseInt(e.target.value);
    onSetRound(value);
  }

  const handleChangeTimeLimit = (e) => {
    const value = parseInt(e.target.value);
    onSetTimeLimit(value);
  }

  const handleClickStart = () => {
    if (userList.length > 1) {
      onSetGameStart(true);
    }
  }

  return (
    <Styled.Container>
      {
        !connected &&
        <Redirect to="/"></Redirect>
      }
      <Styled.LinkShareButton onClick={handleLinkShare} />
      <Styled.Lobby>
        <Styled.Name>{ name }</Styled.Name>
        <Styled.CharacterSelectContainer>
          <Styled.SelectButton left onClick={() => handleChangeProfile('left')}>
            <Left />
          </Styled.SelectButton>
          <Styled.AlienContainer>
            { profile === 1 && <Styled.Alien alien={AlienL1} /> }
            { profile === 2 && <Styled.Alien alien={AlienL2} /> }
            { profile === 3 && <Styled.Alien alien={AlienL3} /> }
            { profile === 4 && <Styled.Alien alien={AlienL4} /> }
            { profile === 5 && <Styled.Alien alien={AlienL5} /> }
            { profile === 6 && <Styled.Alien alien={AlienL6} /> }
            { profile === 7 && <Styled.Alien alien={AlienL7} /> }
            { profile === 8 && <Styled.Alien alien={AlienL8} /> }
          </Styled.AlienContainer>
          <Styled.SelectButton right onClick={() => handleChangeProfile('right')}>
            <Right />
          </Styled.SelectButton>
        </Styled.CharacterSelectContainer>
        <Styled.MiddleContainer>
          <Styled.StartButton onClick={handleClickStart}>
            START
          </Styled.StartButton>
          <Styled.OptionContainer>
            <Styled.Option>
              <Styled.ListCircle />
              라운드 수
              <Styled.Select value={round} onChange={handleChangeRound}>
                <option value={2} defaultValue>
                  2
                </option>
                <option value={3}>
                  3
                </option>
                <option value={5}>
                  5
                </option>
              </Styled.Select>
            </Styled.Option>
            <Styled.Option>
              <Styled.ListCircle />
              제한 시간
              <Styled.Select value={timeLimit} onChange={handleChangeTimeLimit}>
                <option value={3} defaultValue>
                  3s
                </option>
                <option value={5}>
                  5s
                </option>
                <option value={10}>
                  10s
                </option>
              </Styled.Select>
            </Styled.Option>
          </Styled.OptionContainer>
        </Styled.MiddleContainer>
        <Styled.UserListContainer>
          { 
            userList.filter(user => user.name !== name).map((user) => (
              <Styled.UserContainer key={user.id}>
                <Styled.UserAlienContainer>
                  { user.profile === 1 && <Styled.UserAlien alien={AlienL1} /> }
                  { user.profile === 2 && <Styled.UserAlien alien={AlienL2} /> }
                  { user.profile === 3 && <Styled.UserAlien alien={AlienL3} /> }
                  { user.profile === 4 && <Styled.UserAlien alien={AlienL4} /> }
                  { user.profile === 5 && <Styled.UserAlien alien={AlienL5} /> }
                  { user.profile === 6 && <Styled.UserAlien alien={AlienL6} /> }
                  { user.profile === 7 && <Styled.UserAlien alien={AlienL7} /> }
                  { user.profile === 8 && <Styled.UserAlien alien={AlienL8} /> }
                </Styled.UserAlienContainer>
                <Styled.UserName>{ user.name }</Styled.UserName>
                <Styled.UserStatus>
                  { 
                    user.isReady ?
                    <Ready />
                    :
                    <Loading />
                  }
                </Styled.UserStatus>
              </Styled.UserContainer>
            ))
          }
        </Styled.UserListContainer>
      </Styled.Lobby>
    </Styled.Container>
  )
}

export default Room;