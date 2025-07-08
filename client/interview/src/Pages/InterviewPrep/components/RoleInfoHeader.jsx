import React from 'react';

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative p-4">
      <div className="container mx-auto px-10 md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div className='p-2'>
                  <h3 className="text-2xl font-medium">{role?.replace(/\b\w/g, (char) => char.toUpperCase())}</h3>
                  <p className="text-sm text-medium text-gray-900 mt-1">
                    {topicsToFocus?.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                  <p className="text-sm text-gray-700 mt-1">{description?.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
              Experience: {experience} {experience == 1 ? 'year' : 'years'}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        <div className="w-[40vw] md:w-[30vw] h-[232px] flex items-center bg-white overflow-hidden absolute top-0 right-0">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
          <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3" />
          <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob1" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
