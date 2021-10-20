import React from 'react'

export const Layer1 = (props): JSX.Element => {
  const { data } = props
  const { chainId, avgBlockGasLimit, nodeInfo } = data

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
  const { data } = props
  const {
    maxBlockSize,
    maxValidationGas,
    challengePeriod,
    minimumStake,
    maxUtxoDepth,
  } = data
  const minimumStakeEther = minimumStake / 10 ** 18 // to Ether

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

// export const Coordinator = (props) = {
//   const {}

// }
