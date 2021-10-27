import React from 'react'

export const Layer1 = (props): JSX.Element => {
  const { chainId, avgBlockGasLimit, nodeInfo } = props.data
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chain ID</td>
            <td>{chainId}</td>
          </tr>
          <tr>
            <td>Avg Block Gas Limit</td>
            <td>{avgBlockGasLimit.toLocaleString(`en-US`)}</td>
          </tr>
          <tr>
            <td>Node</td>
            <td>{nodeInfo}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export const ZkopruConfig = (props): JSX.Element => {
  const {
    maxBlockSize,
    maxValidationGas,
    challengePeriod,
    minimumStake,
    maxUtxoDepth,
  } = props.data

  // Wei to Ether
  const minimumStakeEther = minimumStake / 10 ** 18

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max Block Size</td>
            <td>{maxBlockSize.toLocaleString(`en-US`)}</td>
          </tr>
          <tr>
            <td>Max Validation Gas</td>
            <td>{maxValidationGas.toLocaleString(`en-US`)}</td>
          </tr>
          <tr>
            <td>Challenge Period</td>
            <td>{challengePeriod.toLocaleString(`en-US`)}</td>
          </tr>
          <tr>
            <td>Minimum Stake (Ether)</td>
            <td>{minimumStakeEther}</td>
          </tr>
          <tr>
            <td>Max Utxo Tree Depth</td>
            <td>{maxUtxoDepth}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export const Coordinators = (props): JSX.Element => {
  const { coordinatorConfig } = props.data

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Max Bytes</th>
            <th>Price Multiplier</th>
            <th>Max Bid</th>
          </tr>
        </thead>
        <tbody>
          {coordinatorConfig &&
            coordinatorConfig.map((coordinator) => (
              <tr>
                <td>coordinator_{coordinator.id}</td>
                <td>{coordinator.from}</td>
                <td>{coordinator.maxBytes}</td>
                <td>{coordinator.priceMultiplier}</td>
                <td>{coordinator.maxBid}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
