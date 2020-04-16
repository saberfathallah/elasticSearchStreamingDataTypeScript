import createTemplate from '../../createTemple';
import producTemplate from '../../templates/product.json';
import insertDataToEs from '../../insertDataToEs';
import data from '../../data/data.json';

const insertProductsToEs = async (req, res): Promise<any> => {
  try {
    const putTemplate = await createTemplate(producTemplate, res);
    const { indexName } = req.body;
    if (putTemplate.acknowledged) {
      const response = await insertDataToEs(data, indexName, res);
      return res.json({ response });
    }
    return res.json({ error: 'An error happen when updating template' });
  } catch (error) {
    return res.json({ error });
  }
};

export default insertProductsToEs;
