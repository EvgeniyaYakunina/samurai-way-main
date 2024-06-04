import s from "./Pagination.module.css";
import React from "react";

type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Pagination = ({pageSize, onPageChanged, currentPage, totalUsersCount}: PaginationPropsType) => {

    let pagesCount = Math.ceil(totalUsersCount/pageSize);
    let pages = [];
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    }

    return <div>
            {pages.map(p => {
                return <span key={p} className={currentPage === p ? s.selectedPage : ''}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })
            }
    </div>
}