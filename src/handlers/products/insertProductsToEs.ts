import createTemplate from '../../createTemple';
import producTemplate from '../../templates/product.json';

import parseProductsXmlToJson from './parseProductsXmlToJson';

const insertProductsToEs = async (req, res): Promise<any> => {
  try {
    const putTemplate = await createTemplate(producTemplate, res);
    const { indexName, urlXmlFile } = req.body;
    if (putTemplate.acknowledged) {
      const numberProducts = await parseProductsXmlToJson(urlXmlFile, indexName, res);
      return res.json({ numberProducts });
    }
    return res.json({ error: 'An error happen when updating template' });
  } catch (error) {
    return res.json({ error });
  }
};

export default insertProductsToEs;
