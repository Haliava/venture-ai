import { ReactNode } from "react";
import classNames from "classNames";
import styles from './styles.module.scss';

export type InfoCardProps = {
  title: string;
  imageSrc: string;
  imagePosition: 'left' | 'right';
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const InfoCard = ({ imagePosition, imageSrc, title, children, className, contentClassName }: InfoCardProps) => {
  return (
    <div className={classNames(styles.root, className, {[styles.imageRight]: imagePosition === 'right'})}>
      <img className={classNames(styles.image)} src={imageSrc} />
      <div className={contentClassName}>
        <h3 className="text-[20px] font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  )
}