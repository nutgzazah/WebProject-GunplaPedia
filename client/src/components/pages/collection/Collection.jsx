import React, { useEffect, useState } from 'react';
import Topcollect from './topcollect/Topcollect'
import Gsearch from '../../comp/gsearch/Gsearch'
import Guidegrade from '../../comp/guidegrade/Guidegrade'
import Product from '../../comp/showgun/Product'
import { getCollection } from '../../../functions/product'


//same Card component
import Card from '../../comp/showcom/Cards';

const Collection = () => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const authtoken = getAuthToken();
        if (!authtoken) {
          throw new Error('No auth token found');
        }
        const response = await getCollection(authtoken);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch collection');
        setLoading(false);
      }
    };

    fetchCollection();
  }, []);

  //input filter
  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product) => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  //radio filter
  const handleChange = event => {
    setSelectedSeries(event.target.value);
  };

  //buttons filter
  const handleClick = event => {
    setSelectedSeries(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ serie, grade, name }) =>
          serie === selected ||
          grade === selected ||
          name === selected
      );
    }

    return filteredProducts.map(({baselink, _id, file, name, totalrating, ratings }) => (
      <Card 
      key={_id}
        baselink='collection'
        id={_id}
        img={`${process.env.REACT_APP_API}/uploads/${file}`}
        name={name}
        star={totalrating}
        totalrating={totalrating}
        ratings={ratings}
      />
    ));
  }

  const result = filteredData(products, selectedSeries, query);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      <Topcollect />
      <Gsearch query={query} handleInputChange={handleInputChange}/>
      <Guidegrade handleClick={handleClick}/>
      <Product result={result} handleChange={handleChange}  />
    </div>
  )
}

export default Collection
