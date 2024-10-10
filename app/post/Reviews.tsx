import Review from "@components/Review";

interface ReviewType {
  user: {
    _id: string;
    name: string;
    image: string;
  };
  content: string;
  stars: number;
}

async function Reviews({ postId }: { postId: string }) {
  const res = await fetch(`${process.env.Url}/api/review?postId=${postId}`);
  const reviews: ReviewType[] = await res.json();
  if (!reviews.length) return <p>nothing</p>;
  return (
    <div>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  );
}

export default Reviews;
