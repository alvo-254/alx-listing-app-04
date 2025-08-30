import { useState } from "react";
import api from "@/utils/api";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post("/bookings", formData);
      setSuccess("Booking successful!");
      setFormData({ name: "", email: "", date: "", guests: 1 });
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to submit booking. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Book a Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          min={1}
          value={formData.guests}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Book Now"}
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">{success}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
