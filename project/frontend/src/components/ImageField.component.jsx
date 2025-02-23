import { useEffect, useState } from 'react';
import getImageFromUrl from '../services/images.service';

const ImageFieldComponent = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const callFunction = async () => {
      const data = await getImageFromUrl();
      setImage(URL.createObjectURL(data));
    };
    callFunction();

    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, []);

  return (
    <>
      <h2>Hi and welcome</h2>
      {!image && <div>Loading Image...</div>}
      {image && <img src={image} alt='Image' />}
    </>
  );
};

export default ImageFieldComponent;
