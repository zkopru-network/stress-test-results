import BN from 'bn.js'
import React from 'react'
import StatChart from './StatChart'

const GREEN = `rgb(40, 167, 69)`

export const Performance = (props): JSX.Element => {
  const { performance, recentProposedBlocks, coordinatorInfo } = props.data
  const { firstProposeTime, lastProposeTime, txCount } = performance

  // TODO: use data from 'tps-data' endpoint.

  const diffTime = lastProposeTime - firstProposeTime

  const tps = {
    avgTPS: txCount.total / Math.floor(diffTime / 1000),
    last24hTPS: txCount.last24h / (24 * 3600),
    last1hTPS: txCount.last01h / 3600,
  }

  const coordinators = Object.keys(coordinatorInfo)
  let coordinatorEarnedFee = new BN(0)
  coordinators.forEach((coordinator) => {
    coordinatorEarnedFee = coordinatorEarnedFee.add(
      new BN(coordinatorInfo[coordinator].totalPaidFee.slice(2, -1), 16),
    )
  })

  const feePerTx = coordinatorEarnedFee.div(new BN(txCount.total))

  // generate data for TPS chart
  let previousTimestamp = 0
  const tpsData = recentProposedBlocks
    .filter((block) => block)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((propose) => {
      const timeDiff = propose.timestamp - previousTimestamp
      const calcTPS = propose.txcount / Math.floor(timeDiff / 1000)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      previousTimestamp = propose.timestamp
      return { timestamp: propose.timestamp, tps: calcTPS }
    })

  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <StatChart
          title="TPS"
          data={tpsData.slice(1, -1)}
          yKey="tps"
          yMax={props.targetTPS}
          color={GREEN}
        />
      </div>
      <table role="table">
        <tbody>
          <tr>
            <td>Target TPS</td>
            <td>{props.targetTPS.toFixed(2)} tx/s</td>
          </tr>
          <tr>
            <td>Average TPS</td>
            <td>{tps.avgTPS.toFixed(2)} tx/s</td>
          </tr>
          <tr>
            <td>Average Fee per Tx</td>
            <td>{feePerTx.toString(10)}</td>
          </tr>
          <tr>
            <td>Last 24 Hours TPS</td>
            <td>{tps.last24hTPS.toFixed(2)} tx/s</td>
          </tr>
          <tr>
            <td>Last 1 Hour TPS</td>
            <td>{tps.last1hTPS.toFixed(2)} tx/s</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export const CoordinatorInfo = (props): JSX.Element => {
  const { coordinatorInfo } = props.data
  const coordinators = Object.keys(coordinatorInfo)

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Proposed</th>
            <th>Processed Tx Count</th>
            <th>Total Spent for Bid</th>
            <th>Total Earn Fee</th>
          </tr>
        </thead>
        <tbody>
          {coordinators.map((coordinator) => {
            const info = coordinatorInfo[coordinator]
            return (
              <tr>
                <td>{info.name}</td>
                <td>{coordinator}</td>
                <td>{info.proposedCount}</td>
                <td>{info.totalTxCount}</td>
                <td>
                  {new BN(info.totalPaidFee.slice(2, -1), 16).toString(10)}
                </td>
                <td>
                  {new BN(info.totalSpentForBid.slice(2, -1), 16).toString(10)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export const WalletInfo = (props): JSX.Element => {
  const { walletInfo } = props.data

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Generated Tx</th>
            <th>Total Spent Fee (wei)</th>
          </tr>
        </thead>
        <tbody>
          {walletInfo.map((wallet) => {
            const spentFee = new BN(wallet.totalSpentFee, 16)
            return (
              <tr>
                <td>wallet_{wallet.id}</td>
                <td>{wallet.from}</td>
                <td>{wallet.generatedTx}</td>
                <td>{spentFee.toString(10)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export const Layer1Blocks = (props): JSX.Element => {
  const { recentTxData } = props.data
  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txs</th>
            <th>Zkopru Related Txs*</th>
            <th>Block Hashes</th>
          </tr>
        </thead>
        <tbody>
          {recentTxData.slice(0, 10).map((txData) => (
            <tr>
              <td>{txData.blockNumber}</td>
              <td>{txData.transactions.length}</td>
              <td>{txData.zkopruTxCount}</td>
              <td>{txData.blockHash}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        <li>
          Zkopru Related Txs : Transactions from stress-test participant,
          coordinators, wallets.
        </li>
      </ul>
    </>
  )
}

export const ZkopruBlocks = (props): JSX.Element => {
  const { recentProposedBlocks, coordinatorInfo } = props.data

  let prevTimestamp = 0
  const processedBlockData = []
  // eslint-disable-next-line no-restricted-syntax
  for (const block of recentProposedBlocks.sort(
    (a, b) => a.timestamp - b.timestamp,
  )) {
    let duration = 0
    if (prevTimestamp !== 0) {
      duration = block.timestamp - prevTimestamp
    }
    prevTimestamp = block.timestamp
    processedBlockData.unshift({
      ...block,
      duration: `${(duration / 1000).toFixed(1)}s`,
    })
  }

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Propose Number</th>
            <th>Duration</th>
            <th>ZkTx Count</th>
            <th>Proposal Tx Hash</th>
            <th>Proposer</th>
          </tr>
        </thead>
        <tbody>
          {processedBlockData
            .filter((data) => data)
            .map((block) => (
              <tr>
                <td>{block.proposeNum}</td>
                <td>{block.duration}</td>
                <td>{block.txcount}</td>
                <td>{block.layer1TxHash}</td>
                <td>{coordinatorInfo[block.from].name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export const AuctionData = (props): JSX.Element => {
  const { recentAuctionData } = props.data

  return (
    <>
      <table style={{ marginTop: 0 }} role="table">
        <thead>
          <tr>
            <th>Round Number</th>
            <th>Round Start At</th>
            <th>Highest Bidder</th>
            <th>Highest Bid Amount</th>
            <th>Total Bid Counts</th>
          </tr>
        </thead>
        <tbody>
          {recentAuctionData.slice(0, 10).map((data) => {
            const { bidder, bidAmount, startBlock } = data.highestBid

            return (
              <tr>
                <td>{Math.floor(startBlock / 40)}</td>
                <td>{startBlock}</td>
                <td>{bidder}</td>
                <td>{bidAmount}</td>
                <td>{data.totalBidCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ paddingLeft: 20 }}>
        {/* <p style={{ textAlign: `rightp` }}> More </p> */}
        <p>
          - Round Start At : Each round has starting point(block number) on
          layer1
        </p>
      </div>
    </>
  )
}
