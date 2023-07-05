import React from "react";
import s from './Post.module.css'

type PostTypeProps = {
    message: string
    count: number

}

export const Post: React.FC<PostTypeProps> = (props) => {

    return (
        <div className={s.item}>
            <img src="https://shapka-youtube.ru/wp-content/uploads/2021/03/patsanskaya-kartinka-na-avu.jpg" alt=""/>
            {props.message}
            <div>
                <span>{props.count} likes</span>
            </div>
        </div>
    )
}