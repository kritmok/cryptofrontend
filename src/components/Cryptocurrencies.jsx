import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';
import Loader from "./Loader"
import { toast } from 'react-toastify';

import { useGetCryptosQuery } from '../services/CrpytoApi';


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos ] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);

  }, [cryptosList, searchTerm])

  if(isFetching) return <Loader />;


  const addtowatchlist = async(e, name) => {
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const coin_name = name;
      const body = { coin_name } ;
      const response = await fetch("https://kritserver1.herokuapp.com/watchlist/add", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body)
      })

      toast.success("Sucessfully added " + name + " to your watchlist!");
      console.log(response);

  } catch (err) {
      console.log(err.message);
  }

    
    
  }

  return (
    <>
      {!simplified && (
      <div className="search-crypto">
        <Input.Search placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} size="large"/>
      </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`}
              extra={<img className="crypto-image" src={currency.iconUrl} alt="newim" />}
              hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
                <Button onClick={(e) => addtowatchlist(e, currency.name) }>Add to WatchList</Button>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies