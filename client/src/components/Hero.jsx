import React from "react";

const Hero = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] mb-4">
          Creater amazing content <br /> with{" "}
          <span className="text-primary"> AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Leverage the power of AI to write articles, generate images, create
          blog titles and more.
        </p>
      </div>
    </div>
  );
};

export default Hero;
