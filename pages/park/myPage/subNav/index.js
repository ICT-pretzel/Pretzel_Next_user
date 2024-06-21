"use client";

const { SubNavContainer, Menus } = require("@/styles/park/myPage/subNav");

const SubNav = () => {
    return(
        <SubNavContainer>
            <Menus>시청 내역</Menus>
            <Menus>보고싶은 리스트</Menus>
            <Menus>문의 내역</Menus>
            <Menus>리뷰</Menus>
        </SubNavContainer>
    )
}

export default SubNav;