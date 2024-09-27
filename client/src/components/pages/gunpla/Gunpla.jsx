import React, { useState, useEffect } from 'react';
import Grades from '../../comp/grades/Grades'
import Topgunpla from '../topgunpla/Topgunpla'
import Newslide from '../../comp/newslider/Newslide'
import Gsearch from '../../comp/gsearch/Gsearch'
import Guidegrade from '../../comp/guidegrade/Guidegrade'
import Product from '../../comp/showgun/Product'
import Recommends from '../../comp/recommends/Recommends'

//mockup database this will change to actual database
// import products from '../../db/data'
// Card Component of product
import Card from '../../comp/showcom/Cards';

import { getdata } from '../../../functions/product'


const Gunpla = () => {
  const [products, setProducts] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getdata();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
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

    return filteredProducts.map(({ _id, file, name, totalrating, ratings }) => (
      <Card 
        baselink='gunpla'
        key={_id}
        id={_id}
        img={`${process.env.REACT_APP_API}/uploads/${file}`}
        name={name}
        star={totalrating}
        totalrating={totalrating}
        ratings={ratings}
      />
    ));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const result = filteredData(products, selectedSeries, query);
  return (
    <div>
      <Topgunpla/>
      <Newslide/>
      <Grades />
      <Recommends/>
      <Topgunpla/>
      <Gsearch query={query} handleInputChange={handleInputChange}/>
      <Guidegrade handleClick={handleClick}/>
      <Product result={result} handleChange={handleChange}  />
    </div>
  )
}

export default Gunpla
