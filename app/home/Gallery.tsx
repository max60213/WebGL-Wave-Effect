import Image from "next/image";

const Gallery = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center items-center lg:grid-cols-3 gap-12 p-20 min-h-[200vh]">
      {
        Array.from({ length: 9 }).map((_, index) => (
          <div className="flex flex-col gap-2 w-fit" key={index}>
            <Image data-webgl-media src={`/images/${index + 1}.webp`} alt="test" width={400} height={300} />
            <h2>Image Title</h2>
            <p className="max-w-[400px] break-words">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, facilis.</p>
          </div>
        ))
      }
    </section>
  );
};

export default Gallery;