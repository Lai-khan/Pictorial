import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useRoom from '../hooks/useRoom';

import Stars from '../svgs/Stars.svg';
import FindingMark from '../svgs/finding-mark.svg';
import FoundMark from '../svgs/found-mark.svg';
import ImageOwnerMark from '../svgs/image-owner-mark.svg';
import ScoreBoard from '../svgs/scoreboard.svg';
import Result from '../svgs/result.svg';
import Flakes from '../svgs/flakes.svg';
import GameStartWithHelp from '../svgs/gamestart-with-help.svg';
import { ReactComponent as Crown1 } from '../svgs/crown-1.svg';
import { ReactComponent as Crown2 } from '../svgs/crown-2.svg';
import { ReactComponent as Crown3 } from '../svgs/crown-3.svg';
import Alien1 from '../svgs/A1.png';
import Alien2 from '../svgs/A2.png';
import Alien3 from '../svgs/A3.png';
import Alien4 from '../svgs/A4.png';
import Alien5 from '../svgs/A5.png';
import Alien6 from '../svgs/A6.png';
import Alien7 from '../svgs/A7.png';
import Alien8 from '../svgs/A8.png';

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
  GameContainer: styled.div`
    width: 80%;
    margin: 0 auto;
  `,
  Help: styled.div`
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 1380px;
    height: 582px;
    background-image: ${`url(${GameStartWithHelp})`};
    background-position: center;
    background-size: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 34px;
    line-height: 1.3;
    letter-spacing: 0.34px;
    color: #303030;
    text-align: center;
    cursor: default;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Round: styled.h2`
    font-size: 48px; 
    letter-spacing: 4.8px;
    font-weight: 800;
    color: #ffffff;
  `,
  Keyword: styled.h2`
    font-size: 48px;
    letter-spacing: 11.52px;
    font-weight: 800;
    color: #ffffff;
  `,
  Author: styled.h3`
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 2.4px;
    color: #ffffff;
  `,
  ContentContainer: styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: top; */
    min-width: 1210px;
    height: 620px;
    text-align: center;
  `,
  UserList: styled.div`
    height: 100%;
    display: inline-block;
    vertical-align: top;
  `,
  UserStat: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: left;
    text-align: left;
    margin-bottom: 17px;

    &:last-child {
      margin-bottom: 0;
    }
  `,
  UserAlien: styled.div`
    background-image: ${props => `url(${props.alien})`};
    background-size: 100% 100%;
    background-position: center;
    width: 83px;
    height: 83px;
    margin-right: 14px;
  `,
  UserProfile: styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin-right: 25px;
    width: 200px;
  `,
  UserName: styled.h3`
    font-size: 20px;
    color: #c4c4c4;
    margin: 0;
  `,
  UserScore: styled.h3`
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 6.24px;
    color: #ffffff;
    margin: 0;
  `,
  UserStatus: styled.div`
    width: 81px;
    height: 32px;
    background-image: ${props => {
      if (props.finding) return `url(${FindingMark})`;
      else if (props.found) return`url(${FoundMark})`;
      else if (props.owner) return `url(${ImageOwnerMark})`;
    }};
    background-position: left;
    background-repeat: no-repeat;
  `,
  Game: styled.div`
    display: inline-block;
  `,
  ImageBox: styled.div`
    width: 800px;
    height: 620px;
    box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.25);
    border-style: solid;
    border-width: 6px;
    border-image-source: linear-gradient(to right, #5728e2, #210081);
    border-image-slice: 1;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: ${props => (
      props.image && `url(data:image/jpeg;base64,${props.image})`
    )};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    color: white;
    font-size: 5em;
    cursor: ${props => (props.owner ? 'default' : 'pointer')};
  `,
  AnswerArea: styled.div`
    position: absolute;
    width: ${props => {
      return `${(props.y2 - props.y1) * 100}%`
    }};
    height: ${props => {
      return `${(props.x2 - props.x1) * 100}%`
    }};
    top: ${props => `${props.x1 * 100}%`};
    left: ${props => `${props.y1 * 100}%`};
    border: ${props => props.show && `solid 6px #a806b5`};
  `,
  TimerContainer: styled.div`
    position: relative;
    top: 50px;
    width: 100%;
    float: none;
    clear: both;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  TimerText: styled.div`
    padding-right: 30px;
    font-size: 34px;
    color: #ffffff;
  `,
  TimerBar: styled.div`
    flex: 1;
    height: 30px;
    border-radius: 15px;
    background-color: #c4c4c4;
  `,
  TimerBarCurrent: styled.div`
    width: ${props => `${props.percentage}%`};
    height: 30px;
    border-radius: 15px;
    background-image: linear-gradient(to top, #a806b5, #5728e2);
  `,
  ScoreBoardContainer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 1556px;
    height: 972px;
    background-image: ${`url(${ScoreBoard})`};
    background-position: center;
    background-size: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ScoreBoard: styled.div`
    width: 652px;
    height: 440px;
  `,
  ScoreBoardItem: styled.div`
    width: 652px;
    height: 57px;
    border-radius: 10px;
    margin-bottom: 5px;
    background-image: linear-gradient(to right, #210081, #5728e2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ScoreBoardName: styled.span`
    font-weight: bold;
    font-size: 36px;
    line-height: 1.3;
    letter-spacing: 0.36px;
    color: #ffffff;
    display: block;
    margin-left: 35px;
  `,
  ScoreBoardScore: styled.span`
    font-weight: bold;
    font-size: 40px;
    line-height: 1.3;
    letter-spacing: 0.36px;
    color: #ffffff;
    display: block;
    margin-right: 32px;
  `,
  ResultContainer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 1304px;
    height: 891px;
    background-image: ${`url(${Result})`};
    background-position: center;
    background-size: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Result: styled.div`
    width: 670px;
    height: 500px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `,
  Flakes: styled.div`
    width: 569px;
    height: 246px;
    background-image: ${`url(${Flakes})`};
    position: absolute;
    top: 42px;
    left: 0;
    right: 0;
    margin: 0 auto;
  `,
  ResultTopItem: styled.div`
    color: #a806b5;
    position: absolute;
    left: ${props => props.second && '100px'};
    right: ${props => props.third && '100px'};
    top: ${props => props.first ? '50px' : '120px'};
    text-align: center;
    display: ${props => !props.first && 'inline-block'};
    /* float: ${props => props.second ? 'left' : props.third && 'right'}; */
  `,
  ResultTopItemName: styled.div`
    font-weight: bold;
    font-size: ${props => props.first ? '36px' : '24px'};
  `,
  ResultTopItemScore: styled.div`
    font-weight: 800;
    font-size: ${props => props.first ? '48px' : '36px'};
  `,
  ResultItemList: styled.div`
    margin-top: 100px;
  `,
  ResultItem: styled.div`
    width: 371px;
    display: flex;
    justify-content: space-between;
    margin-top: ${props => props.fourth ? '100px' : '10px'};
  `,
  ResultItemName: styled.span`
    font-weight: bold;
    font-size: 30px;
    color: #210081;
  `,
  ResultItemScore: styled.span`
    font-weight: bold;
    font-size: 30px;
    color: #210081;
  `,
  ResultBackButton: styled.button`
    position: absolute;
    width: 255px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.25);
    border: solid 3px #ffffff;
    background-image: linear-gradient(to top, #a806b5, #210081);
    letter-spacing: 7.2px;
    color: #ffffff;
    font-family: inherit;
    font-weight: 800;
    font-size: 30px;
    bottom: -70px;
    cursor: pointer;
  `,
}

function Game() {
  const { name, code, connected, userList, round, timeLimit, images, countdown, timer,
    nowRound, nowImage, showImage, showAnswer, showScoreboard, showResult, scoreboardUserList, showHelp,
    onSetGameReady, onClickedWrong, onClickedAnswer, resultUserList, onReturnToLobby } = useRoom();
  

  useEffect(() => {
    onSetGameReady(code);
  }, [onSetGameReady, code]);

  const handleClickAnswer = (e) => {
    if (showAnswer || !showImage) return;
    if (images[nowImage - 1].name === name) return;
    e.stopPropagation();
    onClickedAnswer();
  }

  const handleClickWrong = () => {
    if (showAnswer || !showImage) return;
    if (images[nowImage - 1].name === name) return;
    onClickedWrong();
  }

  return (
    <Styled.Container>
      {
        !connected &&
        <Redirect to="/"></Redirect>
      }
      {
        showHelp &&
        <Styled.Help>
          주어진 제시어에 맞는 물체를<br />
          남들보다 빠르게 찾아라!<br />
          빨리 맞출수록 높은 점수가 주어진다.
        </Styled.Help>
      }
      <Styled.GameContainer>
        <Styled.Header>
          { 
            nowRound && nowRound > 0 && 
            <Styled.Round>
              { nowRound } / { round } ROUND
            </Styled.Round>
          }
          <Styled.Keyword>
            {
              nowImage && nowImage > 0 ?
              <>
                { images[nowImage - 1].answerAuto.detection_names }
              </>
              : <>플레이어를 기다리는 중...</>
            }
          </Styled.Keyword>
          <Styled.Author>
            {
              nowImage && nowImage > 0 &&
              <>
                By { images[nowImage - 1].name }
              </>
            }
          </Styled.Author>
        </Styled.Header>
        <Styled.ContentContainer>
          <Styled.UserList>
            {
              userList.filter(user => user.isReady).map((user) => (
                <Styled.UserStat key={user.id}>
                  { user.profile === 1 && <Styled.UserAlien alien={Alien1} /> }
                  { user.profile === 2 && <Styled.UserAlien alien={Alien2} /> }
                  { user.profile === 3 && <Styled.UserAlien alien={Alien3} /> }
                  { user.profile === 4 && <Styled.UserAlien alien={Alien4} /> }
                  { user.profile === 5 && <Styled.UserAlien alien={Alien5} /> }
                  { user.profile === 6 && <Styled.UserAlien alien={Alien6} /> }
                  { user.profile === 7 && <Styled.UserAlien alien={Alien7} /> }
                  { user.profile === 8 && <Styled.UserAlien alien={Alien8} /> }
                  <Styled.UserProfile>
                    <Styled.UserName>{user.name}</Styled.UserName>
                    <Styled.UserScore>{user.score}</Styled.UserScore>
                  </Styled.UserProfile>
                  {
                    (nowImage > 0 && images[nowImage - 1].name === user.name) ?
                    <Styled.UserStatus owner />
                    : (user.isCorrect) ?
                    <Styled.UserStatus found />
                    :
                    <Styled.UserStatus finding />
                  }
                </Styled.UserStat>
              ))
            }
          </Styled.UserList>

          <Styled.Game>
            <Styled.ImageBox
              onClick={handleClickWrong}
              image={
                (nowImage && nowImage > 0 && showImage) &&
                images[nowImage - 1].base64Img
              }
              owner={
                nowImage > 0 && images[nowImage - 1].name === name &&
                true
              }
            >
              {
                (nowImage && nowImage > 0 && showImage) ?
                <Styled.AnswerArea
                  onClick={handleClickAnswer}
                  show={showAnswer}
                  x1={images[nowImage - 1].answerAuto.detection_boxes[0]}
                  y1={images[nowImage - 1].answerAuto.detection_boxes[1]}
                  x2={images[nowImage - 1].answerAuto.detection_boxes[2]}
                  y2={images[nowImage - 1].answerAuto.detection_boxes[3]}
                />
                :
                countdown
              }
            </Styled.ImageBox>
          </Styled.Game>
        </Styled.ContentContainer>
        {
          (timer > -1 && timer !== null) &&
          <Styled.TimerContainer>
            <Styled.TimerText>
              {timer} s
            </Styled.TimerText>
            <Styled.TimerBar>
              <Styled.TimerBarCurrent percentage={(100 / timeLimit) * timer} />
            </Styled.TimerBar>
          </Styled.TimerContainer>
        }
      </Styled.GameContainer>
      {
        (showScoreboard) &&
        <Styled.ScoreBoardContainer>
          <Styled.ScoreBoard>
            {
              scoreboardUserList.map((user) => (
                <Styled.ScoreBoardItem key={user.id}>
                  <Styled.ScoreBoardName>
                    { user.name }
                  </Styled.ScoreBoardName>
                  <Styled.ScoreBoardScore>
                    { user.score > 0 && '+ ' } 
                    { user.score }
                  </Styled.ScoreBoardScore>
                </Styled.ScoreBoardItem>
              ))
            }
          </Styled.ScoreBoard>
        </Styled.ScoreBoardContainer>
      }
      {
        (showResult && resultUserList.length > 0) &&
        <Styled.ResultContainer>
          <Styled.Result>
            <Styled.Flakes />
            {
              resultUserList.map((user, index) => (
                (index === 0) ?
                <Styled.ResultTopItem key={user.id} first>
                  <Crown1 />
                  <Styled.ResultTopItemName first>{user.name}</Styled.ResultTopItemName>
                  <Styled.ResultTopItemScore first>{user.score}점</Styled.ResultTopItemScore>
                </Styled.ResultTopItem>
                : (index === 1) ?
                <Styled.ResultTopItem key={user.id} second>
                  <Crown2 />
                  <Styled.ResultTopItemName second>{user.name}</Styled.ResultTopItemName>
                  <Styled.ResultTopItemScore second>{user.score}점</Styled.ResultTopItemScore>
                </Styled.ResultTopItem>
                : (index === 2) ?
                <Styled.ResultTopItem key={user.id} third>
                  <Crown3 />
                  <Styled.ResultTopItemName third>{user.name}</Styled.ResultTopItemName>
                  <Styled.ResultTopItemScore third>{user.score}점</Styled.ResultTopItemScore>
                </Styled.ResultTopItem>
                : 
                <Styled.ResultItem key={user.id} fourth={index === 3 && true}>
                  <Styled.ResultItemName>
                    {user.name}
                  </Styled.ResultItemName>
                  <Styled.ResultItemScore>
                    {user.score}
                  </Styled.ResultItemScore>
                </Styled.ResultItem>
              ))
            }
            <Styled.ResultBackButton onClick={onReturnToLobby}>돌아가기</Styled.ResultBackButton>
          </Styled.Result>
        </Styled.ResultContainer>
      }
    </Styled.Container>
  )
}

export default Game;