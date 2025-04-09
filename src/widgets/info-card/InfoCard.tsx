// import { ReactNode } from "react";
// // @ts-ignore
// import classnames from "classnames";
// import styles from './styles.module.scss';

// export type InfoCardProps = {
//   title: string;
//   imageSrc: string;
//   imagePosition: 'left' | 'right';
//   children?: ReactNode;
//   className?: string;
//   contentClassName?: string;
// }

// export const InfoCard = ({ imagePosition, imageSrc, title, children, className, contentClassName }: InfoCardProps) => {
//   return (
//     // @ts-ignore
//     <div className={classnames(styles.root, className, {[styles.imageRight]: imagePosition === 'right'})}>
//       {/* // @ts-ignore */}
//       <img className={classnames(styles.image)} src={imageSrc} />
//       <div className={contentClassName}>
//         <h3 className="text-[20px] font-semibold">{title}</h3>
//         {children}
//       </div>
//     </div>
//   )
// }