import React from 'react'
import OperationInfo from '../components/BasicInfo'
import { Layer1, ZkopruConfig, Coordinators } from '../components/Configuration'
import {
  Performance,
  CoordinatorInfo,
  WalletInfo,
  Layer1Blocks,
  ZkopruBlocks,
  AuctionData,
} from '../components/Result'

const PageTemplate = (props) => {
  const { id, info, configuration, testResult } = props.pageContext

  return (
    <>
      <main>
        <div className="container">
          <h1>Zkopru Stress Test #{id}</h1>
          <h2>Information</h2>
          <OperationInfo data={info} />
          <h2>Configuration</h2>
          <h3>Layer1</h3>
          <Layer1 data={configuration.layer1} />
          <h3>Zkopru Contract</h3>
          <ZkopruConfig data={configuration.zkopruConfig} />
          <h3>Coordinators</h3>
          <Coordinators data={configuration} />
          <h2>Test Result</h2>
          <h3>Performances</h3>
          <p>Transactions per seconds in Layer2 blocks</p>
          <Performance data={testResult} targetTPS={info.operation.targetTPS} />
          <h3>Coordinators</h3>
          <CoordinatorInfo data={testResult} />
          <h3>Wallets</h3>
          <WalletInfo data={testResult} />
          <h3>Layer1 Blocks</h3>
          <Layer1Blocks data={testResult} />
          <h3>Zkopru Blocks</h3>
          <ZkopruBlocks data={testResult} />
          <h3>Auction Data</h3>
          <AuctionData data={testResult} />
        </div>
      </main>
    </>
  )
}

export default PageTemplate
