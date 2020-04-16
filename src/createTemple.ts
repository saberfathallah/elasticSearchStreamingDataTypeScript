import fetch from 'node-fetch';

const url = 'http://localhost:9200/_template/products';

const createTemplate = async (template, res): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return res.json({ error });
  }
};

export default createTemplate;
