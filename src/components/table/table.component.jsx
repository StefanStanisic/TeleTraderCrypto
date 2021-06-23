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

    const isPopulated = Object.entries(pairRefs.current).filter((p) => p[1] === 0)

    if (isPopulated.length > 0) {
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
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const ws = await new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        ws.onopen = function () {
          let btcToUSD = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tBTCUSD'
          })
          let btcToEUR = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tBTCEUR'
          })
          let ethToUSD = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tETHUSD'
          })
          let ethToEUR = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tETHEUR'
          })
          let eosToUSD = JSON.stringify({
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
      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, []);

  let btcToUSDData = {
    current_value: (btcToUSD[6] * 1).toFixed(2),
    volume: (btcToUSD[7] * btcToUSD[6]).toFixed(2),
    daily_change: (btcToUSD[5] * 100).toFixed(2)
  }

  let btcToEURData = {
    current_value: (btcToEUR[6] * 1).toFixed(2),
    volume: (btcToEUR[7] * btcToEUR[6]).toFixed(2),
    daily_change:(btcToEUR[5] * 100).toFixed(2)
  }

  let ethToUSDData = {
    current_value: (ethToUSD[6] * 1).toFixed(2),
    volume: (ethToUSD[7] * ethToUSD[6]).toFixed(2),
    daily_change: (ethToUSD[5] * 100).toFixed(2)
  }

  let ethToEURData = {
    current_value: (ethToEUR[6] * 1).toFixed(2),
    volume: (ethToEUR[7] * ethToEUR[6]).toFixed(2),
    daily_change: (ethToEUR[5] * 100).toFixed(2)
  }

  let eosToUSDData = {
    current_value: (eosToUSD[6] * 1).toFixed(2),
    volume: (eosToUSD[7] * eosToUSD[6]).toFixed(2),
    daily_change: (eosToUSD[5] * 100).toFixed(2)
  }

  return (
    <Table striped bordered hover className='table' responsive="sm">
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
          <td>{btcToUSDData.daily_change}%</td>
          <td>{btcToUSDData.volume}</td>
          <td>{btcToUSDData.current_value}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>BTCEUR</td>
          <td>{btcToEURData.daily_change}%</td>
          <td>{btcToEURData.volume}</td>
          <td>{btcToEURData.current_value}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>ETHUSD</td>
          <td>{ethToUSDData.daily_change}%</td>
          <td>{ethToUSDData.volume}</td>
          <td>{ethToUSDData.current_value}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>ETHEUR</td>
          <td>{ethToEURData.daily_change}%</td>
          <td>{ethToEURData.volume}</td>
          <td>{ethToEURData.current_value}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>EOSUSD</td>
          <td>{eosToUSDData.daily_change}%</td>
          <td>{eosToUSDData.volume}</td>
          <td>{eosToUSDData.current_value}</td>
        </tr>
      </tbody>
    </Table>
  )
};

export default TableComponent;