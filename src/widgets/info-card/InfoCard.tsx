import { ReactNode } from "react";
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
    <div className={`${styles.root} ${className} ${imagePosition === 'right' ? 'styles.imageRight': ''}`}>
      <img className={`${styles.image}`} src={imageSrc} />
      <div className={contentClassName}>
        <h3 className="text-[20px] font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  )
}