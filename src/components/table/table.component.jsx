import React, { useEffect, useRef, useState } from 'react';

import { Table } from 'react-bootstrap';

import './table.styles.css'



const TableComponent = () => {
  const [btcToUSD, setBTCToUSD] = useState([]);
  const [btcToEUR, setBTCToEUR] = useState([]);
  const [ethToUSD, setETHToUSD] = useState([]);
  const [ethToEUR, setETHToEUR] = useState([]);
  const [eosToUSD, setEOSToUSD] = useState([]);

  const pairRefs = useRef({
    BTCEUR: 0,
    ETHUSD: 0,
    BTCUSD: 0,
    ETHEUR: 0,
    EOSUSD: 0
  })

  function eventMessage({ data }) {
    let object = JSON.parse(data)
    let type = object.pair

    const isPopulated = Object.entries(pairRefs.current).filter((p, i) => p[1] === 0)

    if (isPopulated.length > 0) { // setuje refs sve dok ne popuni i zadnji
      if (type === "BTCEUR") pairRefs.current.BTCEUR = object.chanId
      if (type === "ETHUSD") pairRefs.current.ETHUSD = object.chanId
      if (type === "BTCUSD") pairRefs.current.BTCUSD = object.chanId
      if (type === "ETHEUR") pairRefs.current.ETHEUR = object.chanId
      if (type === "EOSUSD") pairRefs.current.EOSUSD = object.chanId
    }

    if(Array.isArray(object[1])) {
      switch(object[0]) {
        case pairRefs.current.BTCEUR:
          setBTCToEUR(object[1]);
          break;
        case pairRefs.current.ETHUSD:
          setETHToUSD(object[1]);
          break;
        case pairRefs.current.BTCUSD:
          setBTCToUSD(object[1]);
          break;
        case pairRefs.current.ETHEUR:
          setETHToEUR(object[1]);
          break;
        case pairRefs.current.EOSUSD:
          setEOSToUSD(object[1]);
          break;
        default:
      }
    }

    if (Array.isArray(object[1]) && pairRefs.current.BTCEUR === object[0]) setBTCToEUR(object[1])
    if (Array.isArray(object[1]) && pairRefs.current.ETHUSD === object[0]) setETHToUSD(object[1]) 
    if (Array.isArray(object[1]) && pairRefs.current.BTCUSD === object[0]) setBTCToUSD(object[1])
    if (Array.isArray(object[1]) && pairRefs.current.ETHEUR === object[0]) setETHToEUR(object[1])
    if (Array.isArray(object[1]) && pairRefs.current.EOSUSD === object[0]) setEOSToUSD(object[1])
  }

  useEffect(() => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.onopen = function () {
      let btcToUSD = JSON.stringify({
        type: 'btcToUSD',
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
      })
      let btcToEUR = JSON.stringify({
        type: 'btcToEUR',
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCEUR'
      })
      let ethToUSD = JSON.stringify({
        type: 'ethToUSD',
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHUSD'
      })
      let ethToEUR = JSON.stringify({
        type: 'ethToEUR',
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHEUR'
      })
      let eosToUSD = JSON.stringify({
        type: 'eosToUSD',
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tEOSUSD'
      })

      ws.send(btcToUSD)
      ws.send(btcToEUR)
      ws.send(ethToUSD)
      ws.send(ethToEUR)
      ws.send(eosToUSD)
    }

    ws.addEventListener("message", eventMessage)

    return () => {
      ws.removeEventListener("message", eventMessage)
      pairRefs.current = {
        BTCEUR: 0,
        ETHUSD: 0,
        BTCUSD: 0,
        ETHEUR: 0,
        EOSUSD: 0
      }
    }
  }, []);

  return (
    <Table striped bordered hover className='table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Symbol</th>
          <th>Daily change</th>
          <th>Volume</th>
          <th>Last price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>BTCUSD</td>
          <td>{btcToUSD[0]}</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>BTCEUR</td>
          <td>{btcToEUR[0]}</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>ETHUSD</td>
          <td>{ethToUSD[0]}</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>4</td>
          <td>ETHEUR</td>
          <td>{ethToEUR[0]}</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>5</td>
          <td>EOSUSD</td>
          <td>{eosToUSD[0]}</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
  )
};

export default TableComponent;