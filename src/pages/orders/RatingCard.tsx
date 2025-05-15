import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
// import { OrderReviewItem } from '../../types/order.types';

function RatingCard({
  data,
  submitReview,
}: {
  data: any;
  submitReview: (
    item: any,
    type: 'Completed' | 'Leave',
    comment: string,
    rating: number
  ) => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg p-4 outline outline-2 outline-gray-300">
      <IconButton
        onClick={() => submitReview(data, 'Leave', '', 0)}
        className="absolute -right-4 -top-4 bg-primary text-foreground"
      >
        <ClearIcon />
      </IconButton>
      <img
        className="mb-4 aspect-square w-32"
        src={data.homeCatItem.icon}
        alt=""
      />
      <div className="self-start text-base font-semibold">
        {data.homeCatItem.name}
      </div>
      <div className="mb-4 flex self-stretch">
        <div className="text-base font-semibold">Rating:</div>
        <div className="flex-grow"> </div>
        <Rating
          name="rating"
          id="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue ?? 0);
          }}
        />
      </div>
      <textarea
        className="mb-4 w-full resize-none rounded-md p-2 outline outline-1"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        name="comment"
        id="comment"
        placeholder="Write a review"
        rows={3}
      />
      <button
        type="button"
        className="w-full rounded-md bg-primary py-1 text-base font-semibold text-foreground"
        onClick={() => submitReview(data, 'Completed', comment, rating ?? 1)}
      >
        Submit
      </button>
    </div>
  );
}

export default RatingCard;
