import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST,
});

export default esClient;
