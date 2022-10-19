import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'components/api.jsx';
import { ProblemNotification } from './Styles';

export const App = () =>  {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function dataImages() {
      if (query === '') {
        return;
      }
      setIsLoading(true);
      const data = await fetchImages(query, page);

      if (page === 1) {
        setTotal(data.total);
        setImages([...data.hits]);
        setIsLoading(false);
      } else {
        setImages(images => [...images, ...data.hits]);
        setIsLoading(false);
      }
    }
    dataImages();
  }, [query, page]);

  const handleInput = e => {
    setPage(1);
    setQuery(e.searchQuery);
    setImages(null);
  };
  const loadMore = () => {
 
      setPage(page + 1);
      setIsLoading(true);
    
  }

 


  
  return (
    <div>
      <Searchbar onSubmit={handleInput}/>
      {isLoading && <Loader>Loading</Loader>}
      {images && (
        <div>
          {images.length === 0 && <ProblemNotification>No pictures Found</ProblemNotification>}
       
    
      <ImageGallery items = {images}/>
      {isLoading && <Loader>Loading</Loader>}
      {images.length > 0 && images.length < total && (
      <Button onLoadMore = {loadMore}/>
      )}
      {isLoading && <Loader>Loading</Loader>}
      {images.length === total && !!images.length && (
              <ProblemNotification>No more pictures</ProblemNotification>
            )}
      </div>
     )}
    </div>
  );
  }

