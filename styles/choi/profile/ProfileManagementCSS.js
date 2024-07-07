import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';

export const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular', sans-serif;
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 1080px;
  display: flex;
  flex-direction: column;
  
  align-items: center;
  box-sizing: border-box;
  background-color: black;
`;

export const Wrapper_box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 147px;
  width: 1150px;
  height: 616px;
  
`

export const Title = styled.div`
  width: auto;
  height: 36px;
  font-size: 30px;
  font-weight: 600;
  color: #FFFFFF;
`

export const Profile_All_Box = styled.div`
  margin-top: 112px;
  width: 1080px;
  height: 336px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
`

export const Profile_Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 336px;
  align-items: center;
`

export const Profile_Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: all 0.3s ease; /* hover 효과를 부드럽게 만들기 위한 transition */

  &:hover {
    filter: brightness(50%); /* 이미지를 어둡게 만드는 효과 */

  }
`;

export const Profile_Name = styled.span`
  width: 130px;
  height: 36px;
  font-size: 30px;
  text-align: center;
  color: #FFFFFF;
`

export const New_Profile_Create = styled.div`
  width: 250px;
  height: 250px;
  background-color: #252525;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Plus = styled.img`

`


export const New_Profile_Info = styled.div`
  width: 190px;
  height: 36px;
`

export const Ok_Button = styled.input`
  width: 180px;
  height: 50px;
  color:#FFFFFF;
  background-color: #F29A2E;
  border-radius: 50px;
  font-size: 20px;
  
`





