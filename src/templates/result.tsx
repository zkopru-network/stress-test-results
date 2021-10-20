import React from 'react'
import OperationInfo from '../components/BasicInfo'
import { Layer1, ZkopruConfig } from '../components/Configuration'

const PageTemplate = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { info = null, configuration = null } = props.pageContext
  return (
    <>
      <main>
        <div className="container">
          <h1>Zkopru Stress Test #1</h1>
          <h2>Information</h2>
          <OperationInfo data={info} />
          <h2>Configuration</h2>
          <h3>Layer1</h3>
          <Layer1 data={configuration.layer1} />
          <h3>Zkopru Contract</h3>
          <ZkopruConfig data={configuration.zkopruConfig} />
          <h3>Coordinators</h3>
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
              <tr>
                <td>coordinator_1</td>
                <td>0x123456789</td>
                <td>131072</td>
                <td>48</td>
                <td>2000</td>
              </tr>
              <tr>
                <td>coordinator_2</td>
                <td>0x23456789A</td>
                <td>131072</td>
                <td>48</td>
                <td>1000</td>
              </tr>
            </tbody>
          </table>
          <h2>Test Result</h2>
          <h3>Performances</h3>
          <table role="table">
            <thead>
              <tr>
                <th>Keys</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average TPS</td>
                <td>15.3 tx/s</td>
              </tr>
              <tr>
                <td>Average Fee per Tx</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>Last 24 Hours TPS</td>
                <td>10.12 tx/s</td>
              </tr>
              <tr>
                <td>Las 1 Hour TPS</td>
                <td>8.8 tx/s</td>
              </tr>
            </tbody>
          </table>
          <h3>Coordinators</h3>
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
              <tr>
                <td>coordinator_1</td>
                <td>0x123456789</td>
                <td>12</td>
                <td>120</td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td>coordinator_2</td>
                <td>0x23456789A</td>
                <td>0</td>
                <td>0</td>
                <td> </td>
                <td> </td>
              </tr>
            </tbody>
          </table>
          <h3>Wallets</h3>
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
              <tr>
                <td>wallet_1</td>
                <td>0x012345678</td>
                <td>128</td>
                <td>1280000</td>
              </tr>
              <tr>
                <td>wallet_2</td>
                <td>0x023456789</td>
                <td>21</td>
                <td>210000</td>
              </tr>
            </tbody>
          </table>
          <h3>Layer1 Blocks</h3>
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
              <tr>
                <td>230</td>
                <td>12</td>
                <td>1</td>
                <td>0xdead</td>
              </tr>
              <tr>
                <td>247</td>
                <td>12</td>
                <td>2</td>
                <td>0xdead</td>
              </tr>
              <tr>
                <td>249</td>
                <td>14</td>
                <td>1</td>
                <td>0xdead</td>
              </tr>
              <tr>
                <td>260</td>
                <td>16</td>
                <td>2</td>
                <td>0xdead</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              Only show blocks data which included tx from stress-test
              participant.
            </li>
          </ul>
          <h3>Zkopru Blocks</h3>
          <table role="table">
            <thead>
              <tr>
                <th>Propose Number</th>
                <th>Duration</th>
                <th>Included Transactions</th>
                <th>Block Hashes</th>
                <th>Layer1 Tx Hash</th>
                <th>Proposer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>10</td>
                <td>1</td>
                <td>deaddead</td>
                <td>0x000000000001</td>
                <td>coordinator_1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>12</td>
                <td>2</td>
                <td>deaddead</td>
                <td>0x000000000002</td>
                <td>coordinator_1</td>
              </tr>
              <tr>
                <td>3</td>
                <td>14</td>
                <td>4</td>
                <td>deaddead</td>
                <td>0x000000000003</td>
                <td>coordinator_1</td>
              </tr>
              <tr>
                <td>4</td>
                <td>16</td>
                <td>8</td>
                <td>deaddead</td>
                <td>0x000000000004</td>
                <td>coordinator_1</td>
              </tr>
            </tbody>
          </table>
          <h3>Auction Data</h3>
          <table role="table">
            <thead>
              <tr>
                <th>Propose Number</th>
                <th>Highest Bidder</th>
                <th>Highest Bid Amount</th>
                <th>Total Bid Counts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>0x123456789a</td>
                <td>2000000000</td>
                <td>2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>0x123456789a</td>
                <td>2000000000</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>0x123456789a</td>
                <td>2000000000</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default PageTemplate
