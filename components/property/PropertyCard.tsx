type PropertyCardProps = {
  property: {
    id: string;
    title: string;
    image: string;
    price: number;
    location: string;
  };
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-500">{property.location}</p>
        <p className="text-blue-600 font-bold">${property.price}/night</p>
      </div>
    </div>
  );
}
