const JobCardLoading = () => {
  return (
    <div className="animate-pulse space-y-2 w-full h-32 shadow-2xl ring-2 ring-gray-200 rounded-sm p-4">
      <div className="flex items-start space-x-4">
        <div className="h-10 w-10 gradient-purple-pink-red rounded-full"></div>
        <div className="flex-grow space-y-2">
          <div className="h-4 gradient-purple-pink-red rounded-full w-5/6"></div>
          <div className="h-4 gradient-purple-pink-red rounded-full w-4/6"></div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="h-4 gradient-purple-pink-red rounded-full w-5/12"></div>
        <div className="h-4 gradient-purple-pink-red rounded-full w-2/6"></div>
      </div>
      <div className="flex justify-end">
        <div className="h-4 gradient-purple-pink-red rounded-full w-2/6"></div>
      </div>
    </div>
  );
};

export default JobCardLoading;
