import { Icon } from "./icon"

export type StarsRatingProps = {
  className?: string;
  starCount?: number
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}

export const StarsRating = ({ starCount = 5, rating, setRating, className }: StarsRatingProps) => {
  return (
    <div className="flex gap-3.5">
      {Array.from({length: starCount}).map((_, i) => (
        <Icon
          className={`${i <= rating ? "fill-danger": "fill-check"} ${className}`}
          type="star"
          onClick={() => setRating(i)}
        />
      ))}
    </div>
  )
}