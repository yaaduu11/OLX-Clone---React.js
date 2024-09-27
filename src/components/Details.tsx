import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const data = location?.state?.data;

  return (
    <div className="flex flex-col p-6 md:flex-row md:space-x-8 md:p-10">
      <div className="w-full mb-6 md:w-1/3 md:mb-0">
        <div className="p-4 border rounded-lg shadow-md">
          <img
            src={data?.imageUrl}
            alt={data?.title}
            className="object-cover w-full h-auto rounded-md"
          />
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">{data?.title}</h1>
        <p className="mb-6 text-4xl font-bold text-green-600">${data?.price}</p>
        <h2 className="mb-3 text-lg text-gray-700">
          <span className="font-semibold">Description:</span> {data?.description}
        </h2>
        <h2 className="mb-3 text-lg text-gray-700">
          <span className="font-semibold">Category:</span> {data?.category}
        </h2>
        <h2 className="mb-3 text-lg text-gray-700">
          <span className="font-semibold">Contact Number:</span> {data?.mobileNumber}
        </h2>
      </div>
    </div>
  );
};

export default Details;
