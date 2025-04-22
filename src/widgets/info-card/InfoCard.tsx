import { ReactNode } from "react";
import styles from './styles.module.scss';

export type InfoCardProps = {
  title?: string;
  imageSrc: string;
  imagePosition: 'left' | 'right';
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const InfoCard = ({ imagePosition, imageSrc, title, children, className, contentClassName }: InfoCardProps) => {
  return (
    <div className={`${styles.root} ${className} ${imagePosition === 'right' ? styles.imageRight: ''} gap-[10vmin] xs:gap-[18px] lg:gap-[5vmin] lg:items-center`}>
      <img className={`${styles.image} w-[-webkit-fill-available]`} src={imageSrc} />
      <div className={contentClassName}>
        <h3 className="xs:text-[20px] text-ai-lg font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  )
}