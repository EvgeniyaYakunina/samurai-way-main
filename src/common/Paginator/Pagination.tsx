import s from "./Pagination.module.css";
import React, {useState} from "react";
import cn from 'classnames'

type PaginationPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

export const Pagination = ({
                               pageSize,
                               onPageChanged = x => x,
                               currentPage = 1,
                               totalItemsCount,
                               portionSize = 10
                           }: PaginationPropsType) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.pagination}>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p} className={cn({[s.selectedPage]: currentPage === p}, s.pageNumber)}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}

        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
    </div>
}