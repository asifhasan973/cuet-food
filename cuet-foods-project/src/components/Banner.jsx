const Banner = () => {
  return (
    
    <div
      className="hero min-h-[700px]"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1625425753502-f5cae7bb45dd?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="md:w-3/4">
          <h2 className="md:text-2xl font-semibold text-[#a1df5f]">
            HAPPY HOUR SELL
          </h2>
          <h1 className="mb-5 text-5xl md:text-8xl font-bold">
            We Serve <span className="text-[#89b758]">Delicious </span>
            Fast Foods
          </h1>

          <button className="btn bg-[#89b758] text-white border-0 text-lg px-10 hover:text-black ">
            Order Now
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Banner;
