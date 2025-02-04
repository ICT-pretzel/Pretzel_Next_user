'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../../commons/loadingSpinner/page';

import {
    Contents, Contents_Title, Contents_Box, PosterWrapper, Poster, Movie_Title
} from '@/styles/choi/main/mainThemaCSS';

import { useStores } from '@/stores/StoreContext';
import { useRouter } from 'next/navigation';

const ThemaList = observer(() => {
    const [thema_list, setThema_list] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // isLoading 상태 추가
    const { movieDetailStore } = useStores();
    const postersPerPage = 5; // 페이지당 포스터 수
    const router = useRouter();

    const API_URL = "/main/";

    useEffect(() => {
        chart_data();
    }, []);

    // 장르 리스트 가져오기
    async function chart_data() {
        setIsLoading(true); // 데이터를 로드하기 전에 로딩 상태로 설정
        try {
            const response = await axios.post(API_URL + "thema_list");
            if (response.data) {
                setThema_list(response.data);
            }
        } catch (error) {
            console.error('상세 정보 가져오기 실패 : ', error);
        } finally {
            setIsLoading(false); // 데이터를 로드한 후 로딩 상태 해제
        }
    }

    // 로딩
    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handlePosterClick = (movie_idx) => {
        movieDetailStore.setMoiveIdx(movie_idx);
        router.push("/park/detail/detailPage");
    };

    return (
        <>
            {/* 공포 , 로맨스 , 범죄/스릴러 , 액션 , 애니메이션 순으로 장르 가져오기 */}
            {['공포', '로맨스', '범죄/스릴러', '액션', '애니메이션'].map((genre, index) => (
                <Contents key={index}>
                    <Contents_Title>
                        {genre}
                    </Contents_Title>
                    <Contents_Box>
                        {thema_list[genre].slice(0, postersPerPage).map((k) => (  // 장르 당 5개씩 가져오기
                            <PosterWrapper key={k.movie_idx} onClick={() => handlePosterClick(k.movie_idx)}>
                                <Poster src={`https://image.tmdb.org/t/p/w500${k.poster_url}`} className="poster-image" />
                                <Movie_Title className="poster-title">
                                    {k.korea_title}
                                </Movie_Title>
                            </PosterWrapper>
                        ))}
                    </Contents_Box>
                </Contents>
            ))}
        </>
    );
});

export default ThemaList;
