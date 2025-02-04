// 마이페이지 - 리뷰
"use client";

import LoadingSpinner from "@/app/commons/loadingSpinner/page";
import { useStores } from "@/stores/StoreContext";
import { Empty_Data } from "@/styles/park/commons/commonsCSS";
import { OneMovieContainer } from "@/styles/park/myPage/movieWishListCSS";
import { Background, Cards, MovieTitle, MyReviewContainer, ReviewContent, StarRating } from "@/styles/park/myPage/myReviewCSS";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyReview = () => {
    const { loginStore, movieDetailStore } = useStores();
    const router = useRouter();

    // 영화 리뷰 내역
    const [myReview, setMyReview] = useState({});

    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    // 처음 렌더링 될 때 실행
    useEffect(() => {
        reviewlist()
    }, []);

    const API_URL = "/mypage/"

    // 리뷰 내역 가져오기
    async function reviewlist() {
        setIsLoading(true); // 데이터를 로드하기 전에 로딩 상태로 설정

        try {
            const response = await axios.get(API_URL + "reviewlist",
                {
                    params: {
                        profile_idx: loginStore.profile_idx,
                    },
                    headers: {
                        Authorization: `Bearer ${loginStore.token}`
                    }
                });
            if (response.data) {
                setMyReview(response.data);
            }
        } catch (error) {
            console.error('리뷰내역 가져오기 실패 : ', error);
        } finally {
            setIsLoading(false); // 데이터를 로드한 후 로딩 상태 해제
        }
    }

    // 로딩중일 때
    if (isLoading) {
        return <LoadingSpinner />
    }

    // 별점 색상
    const Inactive = ({ children }) => {
        return <span style={{ color: '#3d3d3d' }}>{children}</span>;
    };

    const onClickReview = (movie_idx) => {
        movieDetailStore.setMoiveIdx(movie_idx)
        router.push("/park/detail/detailPage")
    }

    return (
        <>
            {myReview.length > 0 ?
                <>
                    <MyReviewContainer>
                        {myReview.map((k) => (
                            <OneMovieContainer key={k.review_idx} onClick={() => onClickReview(k.movie_idx)}>
                                <Cards>
                                    <ReviewContent>{k.content}</ReviewContent>
                                    <Background src={`https://image.tmdb.org/t/p/w500/${k.movie.poster_url}`}></Background>
                                </Cards>
                                <MovieTitle>{k.movie.korea_title}</MovieTitle>
                                <StarRating>
                                    {k.rating === '5' ? (
                                        '★★★★★'
                                    ) : k.rating === '4' ? (
                                        <>
                                            {'★★★★'}<Inactive>★</Inactive>
                                        </>
                                    ) : k.rating === '3' ? (
                                        <>
                                            {'★★★'}<Inactive>★★</Inactive>
                                        </>
                                    ) : k.rating === '2' ? (
                                        <>
                                            {'★★'}<Inactive>★★★</Inactive>
                                        </>
                                    ) : (
                                        <>
                                            {'★'}<Inactive>★★★★</Inactive>
                                        </>
                                    )}
                                </StarRating>
                            </OneMovieContainer>
                        ))}
                    </MyReviewContainer>
                </>
                :
                <Empty_Data>리뷰 내역이 없습니다.</Empty_Data>
            }
        </>
    )
}

export default MyReview;