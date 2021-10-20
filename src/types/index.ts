import { ReactNode } from 'react'

export interface BaseComponentProps {
  children?: ReactNode
}

export interface GitData {
  'stress-test': {
    commit: string
    branch: string
  }
  zkopru: {
    commit: string
    branch: string
  }
}

export interface OperationInfo {
  git: GitData
  operation: {
    startTime: number
    endTime?: number
    checkTime?: number
  }
  systemInformation: {
    cpu: any
    memory: any
  }
  testnetInfo: {
    nodeInfo: string
    chainId: number
  }
}
