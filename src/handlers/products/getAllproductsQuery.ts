import fetch from 'node-fetch';

const url = 'http://localhost:9200/products/_search?size=1000';

const getAllProducts = async (req, res): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'Get',
      headers: { 'Content-Type': 'application/json' },
    });
    const products = await response.json();

    return res.json({ products });
  } catch (error) {
    return res.json({ error });
  }
};

export default getAllProducts;
