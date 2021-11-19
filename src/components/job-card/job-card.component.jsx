import clsx from 'clsx';
import React from 'react';
import styles from './job-card.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatSquareFill } from 'react-icons/bs';

const JobCard = ({ title, likes, order, image }) => {
  return (
    <div className={clsx([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img src={image} className={styles.image} alt="" />
        </div>
        <div className={styles.badgeWrapper}>
          <div className={clsx([styles.dangerBadge, styles.badgeAnime])}>
            <AiFillHeart />
          </div>
          <div
            className={clsx([styles.primaryBadge, styles.badgeAnime, 'group'])}
          >
            <BsChatSquareFill />
            <span className={clsx([styles.counter, 'group-hover:text-white'])}>
              {likes}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>{`${order}. ${title}`}</h1>
      </div>
    </div>
  );
};

export default JobCard;
