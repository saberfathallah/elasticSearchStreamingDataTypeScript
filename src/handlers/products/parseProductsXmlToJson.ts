/* eslint-disable max-len */
import request from 'request';
import saxStream from 'sax-stream';

import PRODUCTS_PER_BATCH from '../../constants/products';
import insertDataToEs from '../../insertDataToEs';

const parseProductsXmlToJson = (urlXmlFile: XMLDocument, indexName: string, res): any => new Promise((resolve, reject) => {
  const stream = saxStream({
    strict: true,
    tag: 'product',
  });

  let products: object[] = [];
  let compter = 0;
  const req = request(urlXmlFile);
  req.pipe(stream)
    .on('data', ({ attribs }) => {
      compter += 1;
      products.push(attribs);
      if (products.length === PRODUCTS_PER_BATCH) {
        req.pause();
        try {
          insertDataToEs(products, indexName, res);
          req.resume();
          console.log(`insert ${PRODUCTS_PER_BATCH} products total products ${compter}`);
        } catch (error) {
          req.resume();
          console.log(`error insering ${error}`);
        }
        products = [];
      }
    })
    .on('error', (error) => {
      console.log('error', error);
      reject(error);
    })
    .on('finish', () => {
      if (products.length > 0) {
        try {
          console.log(`insert ${PRODUCTS_PER_BATCH} products total products ${compter}`);
          insertDataToEs(products, indexName, res);
        } catch (error) {
          console.log(`error insering ${error}`);
        }
      }
      resolve(compter);
    });
});

export default parseProductsXmlToJson;
