"use client"

import '@/styles/commons/reset.css'
import '@/styles/commons/font.css'
import '@/styles/commons/commons.css'

import { Subtitle, Video } from "@/styles/park/moviePlayPageCSS";
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/commons/loadingSpinner/page';
import { useStores } from '@/stores/StoreContext';

const MoviePlayPage = () => {
    const { loginStore, movieDetailStore, profileStore } = useStores();
    const [canSubtitles, setCanSubtitles] = useState([]);
    const country = ["ko", "ja", "zh", "en", "fr", "de", "es", "it", "pt", "ru", "hi"];
    const labels = {
        ko: "한국어",
        ja: "日本語",
        zh: "中文",
        en: "English",
        fr: "Français",
        de: "Deutsch",
        es: "Español",
        it: "Italiano",
        pt: "Português",
        ru: "Русский",
        hi: "हिन्दी"
      };
    
    // 영화 재생 정보
    const [moviePlay, setMoviePlay] = useState({});

    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    // 처음 렌더링 될 때 실행
    useEffect(() => {
        movie_detail()
    }, []);

    const API_URL = "/movie/"
    const API_URL_2 = "/profile/"

    // 영화 재생 정보 가져오기
    async function movie_detail() {
        setIsLoading(true); // 데이터를 로드하기 전에 로딩 상태로 설정

        try {
            const response = await axios.get(API_URL + "movie_detail", {
                params: {
                    movie_idx: movieDetailStore.movie_idx
                }
            });

            if (response.data) {
                setMoviePlay(response.data);
            }

            // 영화 시청자 프로필 가져오기
            const response2 = await axios.post(API_URL_2 + "profile_detail",
                {
                    profile_idx: loginStore.profile_idx
                },
                {
                    headers: {
                        Authorization: `Bearer ${loginStore.token}`
                    }
                }
            );

            // 영화 시청자 데이터
            const response3 = await axios.get(API_URL + "watch_movie", {
                params: {
                    gender: response2.data.gender,
                    age: response2.data.age,
                    movie_idx: movieDetailStore.movie_idx,
                    profile_idx: loginStore.profile_idx
                }
            });
            console.log("tsts",response.data.movie_url);
            checkSubtitles(response.data.movie_url)
        } catch (error) {
            console.error('상세 정보 가져오기 실패 : ', error);
        } finally {
            setIsLoading(false); // 데이터를 로드한 후 로딩 상태 해제
        }
    }

    // 로딩중일 때
    if (isLoading) {
        return <LoadingSpinner />
    }

    async function checkSubtitles(name){
        const chk = [];
        for (const k of country) {
          try {
            const response = await axios.head(`/storage/${name}_${k}.vtt`);
            if (response.status === 200) {
                console.log("in",k);
                chk.push(k);
            }
        } catch (error) {
        }
        }
        setCanSubtitles(chk);
    };
    return (
        <>
            <Video
                src={`/storage/${moviePlay.movie_url}.mp4`}
                controls
                autoPlay
                muted
                controlsList="nodownload"
                >
                {canSubtitles.map((k) => (
                    <Subtitle
                      key={k}
                      kind="subtitles"
                      src={`/storage/${moviePlay.movie_url}_${k}.vtt`}
                      srcLang={k}
                      label={labels[k] || k}
                      default={k === "ko"}
                    />
                ))
                }
            </Video>
        </>
    )
}

export default MoviePlayPage;