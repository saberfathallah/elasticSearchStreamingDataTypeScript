import createTemplate from '../../createTemple';
import producTemplate from '../../templates/product.json';
import insertDataToEs from '../../insertDataToEs';

import parseProductsXmlToJson from './parseProductsXmlToJson';

const insertProductsToEs = async (req, res): Promise<any> => {
  try {
    const putTemplate = await createTemplate(producTemplate, res);
    const { indexName, urlXmlFile } = req.body;
    if (putTemplate.acknowledged) {
      const products = await parseProductsXmlToJson(urlXmlFile);
      const response = await insertDataToEs(products, indexName, res);
      return res.json({ response });
    }
    return res.json({ error: 'An error happen when updating template' });
  } catch (error) {
    return res.json({ error });
  }
};

export default insertProductsToEs;
