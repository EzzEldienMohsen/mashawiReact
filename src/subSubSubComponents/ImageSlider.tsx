import React from 'react';
import fallbackImage from '../assets/svg/imageGuard.svg';

interface ImageSliderProps {
  gallery: string[] | undefined;
  isLangArabic: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ gallery, isLangArabic }) => {
  const [selected, setSelected] = React.useState<string>('1');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setSelected(hash || '1');
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initialize with current hash
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleImageClick = (index: number) => {
    const newSelected = `${index + 1}`;
    setSelected(newSelected);
    window.location.hash = newSelected;
  };

  return (
    <div className="w-full relative">
      <div
        className={`w-full carousel md:h-[348px] ${
          isLangArabic
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        }`}
      >
        {gallery?.map((img, index) => (
          <div
            key={index}
            id={`${index + 1}`}
            className={`carousel-item w-full $`}
          >
            <img
              alt="gallery"
              src={img}
              className="w-full h-full object-fit"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
        ))}
      </div>
      {gallery && gallery.length > 1 && (
        <div className="flex w-full absolute bottom-4 justify-center gap-3 py-2">
          {gallery.map((_, index) => (
            <a
              onClick={() => handleImageClick(index)}
              key={index}
              href={`#${index + 1}`}
              className={`w-4 h-4 rounded-full ${
                selected === `${index + 1}` ? 'bg-newRed' : 'bg-white'
              }`}
            ></a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
