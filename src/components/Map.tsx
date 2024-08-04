import React from 'react';

const Map:React.FC = () => {
  return (
    <div className="w-full my-8 py-4 px-8 lg:px-20 bg-transparent flex justify-center items-center">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.233198020273!2d144.9630579155045!3d-37.81410797975169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727dbf4b02a5c2!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1626368729483!5m2!1sen!2sau"
        className="w-3/5 h-48 md:h-96"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
