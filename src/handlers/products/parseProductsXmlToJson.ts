import request from 'request';
import saxStream from 'sax-stream';

const parseProductsXmlToJson = (urlXmlFile: XMLDocument): any => new Promise((resolve, reject) => {
  const stream = saxStream({
    strict: true,
    tag: 'product',
  });
  const products: object[] = [];

  request(urlXmlFile).pipe(stream)
    .on('data', ({ attribs }) => {
      products.push(attribs);
    })
    .on('error', (error) => {
      reject(error);
    })
    .on('finish', () => {
      resolve(products);
    });
});

export default parseProductsXmlToJson;
