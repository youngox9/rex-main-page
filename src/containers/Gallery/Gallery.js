import React, { useEffect, useState, useContext } from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import classnames from 'classnames';
import { useTrail, animated, config } from 'react-spring';
// import { Trail } from 'react-spring/renderprops';
import { v4 as uuid } from 'uuid';
import { Context } from '~~src/Store';
import data from './data.json';
import GalleryItem from './GalleryItem';

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  padding: 0 12px;
  margin: 0 auto;
  .content {
    transition: 0.3s ease all;
    /* transform: translate3d(0px, 5%, 12px) skew(0deg, -4deg); */
    &.active {
      filter: blur(4px);
    }
  }
`;

function Gallery(props) {
  const [state, dispatch] = useContext(Context);

  const { modalOpen } = state;
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const newData = data.map(o => ({ key: uuid(), ...o }));
    setGalleryData(newData);
  }, []);

  const masonryOptions = {
    transitionDuration: 300,
    gutter: 0,
  };

  const imagesLoadedOptions = {};

  return (
    <Container>
      <div className={classnames('content', { active: modalOpen })}>
        <Masonry
          className="gallery-container"
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad
          imagesLoadedOptions={imagesLoadedOptions}
        >
          {galleryData.map((obj, index) => {
            return (
              <GalleryItem obj={obj} key={obj.key} />
            );
          })}
        </Masonry>
      </div>
    </Container>
  );
}

export default Gallery;
