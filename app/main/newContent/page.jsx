// 메인페이지 트레일러
"use client";

import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../../commons/loadingSpinner/page';

import {
        New_Contents , Contents_Title , Contents_Box , PosterWrapper , Poster
    } from '@/styles/choi/main/mainNewCotentCSS';

const NewContent = observer(() => {
    const [recent_list, setRecent_list] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // isLoading 상태 추가
    const postersPerPage = 5; // 페이지당 포스터 수

    const API_URL = "/main/";

    useEffect(() => {
        chart_data();
    }, []);


    // 새로 올라온 콘텐츠 리스트 가져오기
    async function chart_data() {
        setIsLoading(true); // 데이터를 로드하기 전에 로딩 상태로 설정
        console.log(API_URL);
        try {
            const response = await axios.post(API_URL + "recent_list");
            if (response.data) {
                setRecent_list(response.data);
            }
            } catch (error) {
            console.error('상세 정보 가져오기 실패 : ', error)
            } finally {
            setIsLoading(false); // 데이터를 로드한 후 로딩 상태 해제
            }
        }

        // 로딩
        if (isLoading) {
            return <LoadingSpinner />
        }

    return (
        <>
            <New_Contents>
                <Contents_Title>새로 올라온 콘텐츠</Contents_Title>
                <Contents_Box>
                {recent_list.slice(0, postersPerPage).map((k) => (  // 첫 5개의 포스터만 렌더링
                <PosterWrapper key={k.movie_idx} onClick={() => handlePosterClick(k.movie_idx)}>
                    <Poster src={`https://image.tmdb.org/t/p/w500${k.poster_url}`} />
                </PosterWrapper>
                ))}
                </Contents_Box>
            </New_Contents>
        </>
    );
});

export default NewContent;
