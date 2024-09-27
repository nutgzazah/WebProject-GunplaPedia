import axios from 'axios'


export const remove = async (id) =>
    await axios.delete(process.env.REACT_APP_API + '/product/' + id)

export const create = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/product', data)
    
export const getdata = async () => {
    return await axios.get(process.env.REACT_APP_API + '/product')
}
export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}
export const update = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + '/product/' + id, data)
}

export const rateProduct = async (ratingData, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/rating`, ratingData, {
      headers:{
        authtoken
    }
    });
  };

export const addToCollection = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/collection/add`,
    { productId },
    {
      headers:{
        authtoken
    }
    }
  );
};

export const removeFromCollection = async (productId, authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/collection/remove`,
      { productId },
      {
        headers:{
          authtoken
      }
      }
    );
  };

  export const getCollection = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/collection`, {
        headers: {
            authtoken
        }
    });
};