import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/admin/users/paymentstatuu');
                setImages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h1>Image Gallery</h1>
            <div className="image-gallery">
                {images.map(media => {
                    const imageUrl = `http://localhost:3001/api/v1/admin/users/image/${media.hash}.${media.extension}`;
                    return (
                        <img
                            key={media.id}
                            src={imageUrl}
                            alt={JSON.parse(media.meta).original.name}
                            className="gallery-image"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ImageGallery;