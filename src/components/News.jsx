import React, {useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/CrpytoApi';
import Loader from "./Loader"

const { Text, Title } = Typography;
const { Option } = Select;

function News({simplified}) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory , count: simplified? 6 : 12});
  const { data } = useGetCryptosQuery(100);
  
  if(!cryptoNews?.value) return <Loader />;

  const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

  return (
    <Row gutter={[24, 24]} >
      {!simplified && (
        <>
        <Col span={8}></Col>
        <Col span={8}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            size="large">
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
        <Col span={8}></Col>
        </>
      )}

      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card"
          cover={<img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" className="socialMediaImage"/>}>
            <a href={news.url} target="_blank" rel="noreferrer">
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` :
                news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News