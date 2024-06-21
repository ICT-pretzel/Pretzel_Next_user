// 프로필 선택 페이지

"use client";

import React from 'react';
import { Global } from '@emotion/react';

import {
  globalStyles , Background , Title ,Wrapper_box , Profile_All_Box , Profile_Box,
  Profile_Image, Profile_Name , New_Profile_Create , New_Profile_Info ,Plus , Management_Button
} from '../../../styles/choi/profile/ProfileSelectCSS';

const ProfileSelect = () =>{

  return(
    <>
      <Global styles={globalStyles} />
        <Background>
          <Wrapper_box>
            <Title>pretzel을 시청할 프로필을 선택하세요</Title>
            <Profile_All_Box>

              <Profile_Box>
                <Profile_Image src='/images/icons/profile.jpg'/>
                <Profile_Name>진돗개</Profile_Name>
              </Profile_Box>

              <Profile_Box>
                <Profile_Image src='/images/icons/profile.jpg'/>
                <Profile_Name>진돗개</Profile_Name>
              </Profile_Box>

              <Profile_Box>
                <Profile_Image src='/images/icons/profile.jpg'/>
                <Profile_Name>진돗개</Profile_Name>
              </Profile_Box>
              
              <Profile_Box>
                <New_Profile_Create>
                  <Plus src='/images/icons/Plus.png'/>
                </New_Profile_Create>
                <New_Profile_Info></New_Profile_Info>
              </Profile_Box>

            </Profile_All_Box>
            <Management_Button type='button' value={"프로필 관리"}/>
          </Wrapper_box>
        </Background>
    </>
  )
}

export default ProfileSelect;