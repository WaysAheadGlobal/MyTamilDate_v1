import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSwipeable } from 'react-swipeable';
import crousleone from '../../../../assets/images/crousleone.jpg';
import crousletwo from '../../../../assets/images/crousletwo.jpg';
import crouslethree from '../../../../assets/images/crouslethree.jpg';
import styles from './carousel.module.css';

const CarouselComponent = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => carouselRef.current.carousel('next'),
    onSwipedRight: () => carouselRef.current.carousel('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const carouselElement = carouselRef.current;
    const bootstrap = require('bootstrap');
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000,
    });

    const handleSlide = (event) => {
      setActiveIndex(event.to);
    };

    carouselElement.addEventListener('slide.bs.carousel', handleSlide);

    return () => {
      carouselElement.removeEventListener('slide.bs.carousel', handleSlide);
    };
  }, []);

  return (
    <div  className={`container ${styles.container}`}>
      <div className="row">
        <div className="col-lg-10 col-md-8 col-sm-12 mx-auto my-5">
          <div
            ref={carouselRef}
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <ol className="carousel-indicators" style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '20px' }}>
              {[0, 1, 2].map((index) => (
                <li
                  key={index}
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === activeIndex ? 'active' : ''}
                  style={{
                    width: index === activeIndex ? '50px' : '10px',
                    height: '10px',
                    backgroundColor: 'white',
                    borderRadius: index === activeIndex ? '12px' : '50%',

                    cursor: 'pointer',
                    transition: 'width 0.3s',
                  }}
                ></li>
              ))}
            </ol>

            <div className="carousel-inner">
              <div className={`carousel-item active ${styles.carouselItem}`}>
                <img src={crousleone} className="d-block w-100" alt="..." />
                <div className={styles.carouselCaption}>
                  <h5>Premium Membership Benefits</h5>
                  <li>Send & receive unlimited messages</li>
                  <li>See who liked you</li>
                </div>
              </div>
              <div className={`carousel-item ${styles.carouselItem}`}>
                <img src={crousletwo} className="d-block w-100" alt="..." />
                <div className={styles.carouselCaption}>
                  <h5>Premium Membership Benefits</h5>
                  <li>Send & receive special requests to members you haven’t matched with and stand out</li>
                  <li>Undo matches you’ve passed on if you change your mind</li>
                </div>
              </div>
              <div className={`carousel-item ${styles.carouselItem}`}>
                <img src={crouslethree} className="d-block w-100" alt="..." />
                <div className={styles.carouselCaption}>
                  <h5>Premium Membership Benefits</h5>
                  <li>Access all premium filters to help you zone in on the exact matches you’re looking for </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
