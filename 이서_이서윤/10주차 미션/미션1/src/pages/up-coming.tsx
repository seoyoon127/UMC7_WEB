import MovieCard from "../components/movieCard";
import { MovieGrid } from "../layout/movieGrid";
import MovieFetchError from "../components/movieFetchError";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../components/skeleton";
import { useState } from "react";
import PaginationBar from "../components/PaginationBar";

interface Movie {
    id:number,
    poster_path:string,
    title:string,
    release_date:string
}

const UpComing = () => {
    const [pageNum, setPageNum]=useState(1);
    const [prevDisabled,setPrevDisabled]=useState(true);
    
    const {data, isPending, isError} = useQuery({
        queryFn:()=>useGetMovies({category:'upcoming'}),
        queryKey:['movies','up_coming', pageNum],
        cacheTime:10000,
        staleTime:10000
    })
    const handlePrevPage=()=>{
        if(pageNum==2){
            setPrevDisabled(true);
        }
        setPageNum((prev)=>prev-1);
    }
    const handleNextPage=()=>{
        setPrevDisabled(false);
        setPageNum((prev)=>prev+1);
    }

    if(isPending){
        return (
            <MovieGrid>
                {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} />))}
            </MovieGrid>
        );
    }
    if(isError){
        return <MovieFetchError/>
    }

    return (
        <>
            <MovieGrid>
                {data.results.map((movie:Movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie}
                    />
                ))}
            </MovieGrid>
            <PaginationBar 
                pageNum={pageNum} 
                handlePrevPage={handlePrevPage} 
                handleNextPage={handleNextPage}
                prevDisabled={prevDisabled}
            />
        </>
    );
};

export default UpComing;
