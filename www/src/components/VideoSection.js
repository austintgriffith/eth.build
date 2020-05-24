import React from 'react';
import AngleShape from '../components/AngleShape';

function VideoSection({ className, videoId, videoFirst, content, graySection }) {
  return (
    <>
      {graySection && <AngleShape className="hidden md:block text-gray-200" reverse />}
      <div
        className={`py-12 lg:py-24 text-gray-900 ${graySection ? 'bg-gray-200' : ''} ${className}`}
      >
        <div
          className={`flex flex-col flex-col-reverse lg:flex-row items-center ${
            videoFirst ? '' : 'lg:flex-row-reverse'
          }`}
        >
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-16x9">
              <iframe
                className="absolute pin"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-6 xl:px-16 mb-12 lg:mb-0">{content}</div>
        </div>
      </div>
      {graySection && <AngleShape className="hidden md:block text-gray-200" />}
    </>
  );
}

export default VideoSection;
