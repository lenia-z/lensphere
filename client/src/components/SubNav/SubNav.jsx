const SubNav = ({ title, handleRefresh, handleUpload }) => {
  return (
    <div className="w-full h-auto text-stone-100 font-light text-xs md:text-sm flex justify-between mt-16 py-2">
      <p className="inline-flex justify-center items-center text-2xl font-light text-stone-100">
        {title}
      </p>
      <div>
        <button
          className={`inline-flex justify-center items-center text-3xl text-stone-100 w-8 h-8 cursor-pointer ${title === "EVENTS" ? "hidden" : ""}`}
          onClick={handleRefresh}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
            width="24px"
            height="24px"
          >
            <g fill="#f5f5f4">
              <g transform="scale(8.53333,8.53333)">
                <path d="M15,3c-2.9686,0 -5.69718,1.08344 -7.79297,2.875c-0.28605,0.22772 -0.42503,0.59339 -0.36245,0.95363c0.06258,0.36023 0.31676,0.6576 0.66286,0.77549c0.3461,0.1179 0.72895,0.03753 0.99842,-0.20959c1.74821,-1.49444 4.01074,-2.39453 6.49414,-2.39453c5.19656,0 9.45099,3.93793 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.51129,-6.14834 -5.67138,-11 -11.94922,-11zM4,10l-4,6h3.05078c0.51129,6.14834 5.67138,11 11.94922,11c2.9686,0 5.69718,-1.08344 7.79297,-2.875c0.28605,-0.22772 0.42504,-0.59339 0.36245,-0.95363c-0.06258,-0.36023 -0.31676,-0.6576 -0.66286,-0.7755c-0.3461,-0.1179 -0.72895,-0.03753 -0.99842,0.20959c-1.74821,1.49444 -4.01074,2.39453 -6.49414,2.39453c-5.19656,0 -9.45099,-3.93793 -9.95117,-9h2.95117z"></path>
              </g>
            </g>
          </svg>
        </button>
        <button
          className="inline-flex justify-center items-center text-3xl font-extralight text-stone-100 w-8 h-8 cursor-pointer"
          onClick={handleUpload}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SubNav
