import React from 'react'
import dayjs from 'dayjs'
import duration, { DurationUnitType } from 'dayjs/plugin/duration'
import { OperationInfo as OperationInfoType } from '../types'

dayjs.extend(duration)

const TimeSegment = [`years`, `months`, `days`, `hours`, `minutes`, `seconds`]

const OperationInfo = (props): JSX.Element => {
  // Destruct object from data: JSX.Element[]
  const { data } = props
  const { git, operation, systemInformation } = data as OperationInfoType
  const { branch, commit } = git[`stress-test`]
  const { branch: zkopruBranch, commit: zkopruCommit } = git.zkopru
  const { startTime, endTime } = operation
  const { cpu, memory } = systemInformation
  const BASEURL = `http://github.com/`

  const branchUrl = `${BASEURL}/zkopru-network/stress-test/commits/${branch}`
  const commitUrl = `${BASEURL}/zkopru-network/stress-test/commits/${commit}`
  const zkopruBranchUrl = `${BASEURL}/zkopru-network/zkopru/tree/${branch}`
  const zkopruCommitUrl = `${BASEURL}/zkopru-network/zkopru/commits/${commit}`

  // OperationInfo - Calculate operation time
  const startDt = new Date(startTime)
  const utcStartTime = dayjs(startDt).format(`YYYY-MM-DD HH:mm:ss UTC`)

  let utcEndTime = `Unknown`
  let operationTime = ``

  if (endTime) {
    const endDt = new Date(endTime)
    utcEndTime = dayjs(endDt).format(`YYYY-MM-DD HH:mm:ss UTC`)
    const dTime = dayjs.duration(endTime - startTime)

    TimeSegment.forEach((seg: DurationUnitType) => {
      const timeSeg = dTime.get(seg)
      if (timeSeg) operationTime += `${timeSeg} ${seg} `
    })
  }

  // SystemInformation - convert from 'bytes' to 'Gb'
  const parsedMemory = Math.floor(memory.total / (1000**3))

  return (
    <>
      <h3>Testing</h3>
      <p>
        Stress-Test Branch: <a href={branchUrl}>{branch}</a>
      </p>
      <p>
        Stress-Test Commit: <a href={commitUrl}>{commit}</a>
      </p>
      <p>
        Zkopru Branch: <a href={zkopruBranchUrl}>{zkopruBranch}</a>
      </p>
      <p>
        Zkopru Commit: <a href={zkopruCommitUrl}>{zkopruCommit}</a>
      </p>
      <p>Start DateTime: {utcStartTime}</p>
      <p>End DateTime: {utcEndTime}</p>
      <p>Duration : {operationTime} </p>
      <h3>Host System</h3>
      <p>Cpu: {cpu.brand} </p>
      <p>Memory: {parsedMemory.toLocaleString(`en-US`)} Gb</p>
    </>
  )
}

export default OperationInfo
