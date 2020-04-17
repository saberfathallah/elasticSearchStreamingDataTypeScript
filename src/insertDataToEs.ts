import { flattenDeep } from 'lodash';

import esClient from './connection';

const insertDataToEs = async (data, index, res): Promise<any> => {
  const bulk = flattenDeep(
    data.map((item) => [
      { index: { _index: index } },
      item,
    ]),
  );

  try {
    const response = await esClient.bulk({ body: bulk });

    return response;
  } catch (error) {
    return res.json({ error });
  }
};
export default insertDataToEs;
