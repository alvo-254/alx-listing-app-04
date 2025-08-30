type PropertyDetailProps = {
  property: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    location: string;
  };
};

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-blue-600 font-bold mt-2">${property.price}/night</p>
      <p className="mt-4">{property.description}</p>
    </div>
  );
}
