import { useEffect, useState } from "react";
import api from "@/utils/api";

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

interface ReviewSectionProps {
  propertyId: string | string[] | undefined;
}

export default function ReviewSection({ propertyId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchReviews = async () => {
      try {
        const response = await api.get(`/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to leave one!</p>;
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-3 border rounded-md shadow-sm">
            <p className="font-bold">{review.user}</p>
            <p className="text-yellow-500">⭐ {review.rating}/5</p>
            <p className="text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
