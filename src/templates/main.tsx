import dayjs from 'dayjs'
import duration, { DurationUnitType } from 'dayjs/plugin/duration'
import React from 'react'
import { Link } from 'gatsby'
import '../styles/index.css'

dayjs.extend(duration)

// TODO: repository change to sifnoc -> zkopru-test
const GITREMOTE =
  process.env.GITREMOTE ?? `https://github.com/sifnoc/stress-test`
const UTCFORMAT = `YYYY-MM-DD HH:mm:ss UTC`
const TimeSegments = [`years`, `months`, `days`, `hours`, `minutes`, `seconds`]

const Home = (props) => {
  const { pageContext } = props

  return (
    <>
      <main>
        <div className="container">
          <h1>Zkopru Stress Test DashBoard</h1>
          <p>
            This page is for posting the results of the zkopru stress testing.
            the result data generated from &nbsp;
            <a href="https://github.com/zkopru-network/stress-test">
              zkopru-network/stress-test
            </a>
            .
          </p>
          <p className="main">
            A stress test will be stopped when it meets those conditions are
            below.
          </p>
          <div className="inview">
            <p>1. When no proposed block submitted more than two rounds</p>
            <p>
              2. When one of the participants(coordinator, wallet) node stopped
              unexpectedly.
            </p>
          </div>
          <p> </p>
          <p>
            <b>
              2021-10-27 : Currently, Testing results are generated manually.
            </b>
          </p>
          <table role="table">
            <thead>
              <tr>
                <th>Try</th>
                <th>Branch</th>
                <th>Commit</th>
                <th>Start Time</th>
                <th>Testing Duration</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {pageContext.results.length !== 0 ? (
                pageContext.results.map((result) => {
                  const { git, operation } = result.data.info
                  const { branch, commit } = git[`stress-test`]
                  const { startTime, endTime } = operation

                  /** TODO: create util, generating 'duration' string logic
                   * Starting time must exist,
                   * endTime not exist and less 24 hours seems failed
                   * endtime not exist and over 24 hours Seems failed
                   * endtime exist finished
                   */

                  let testingDuation
                  let status = `Details`

                  const timeDiff = endTime - startTime
                  if (timeDiff > 0) {
                    const diffTime = dayjs.duration(timeDiff)

                    // eslint-disable-next-line no-restricted-syntax
                    for (const seg of TimeSegments) {
                      const timeSeg = diffTime.get(seg as DurationUnitType)
                      if (timeSeg) {
                        testingDuation = `${timeSeg} ${seg}`
                        break
                      }
                    }
                  } else {
                    testingDuation = `Unkown`
                  }

                  return (
                    <tr>
                      <td>{result.id}</td>
                      <td>
                        <a href={`${GITREMOTE}/tree/${branch}`}>{branch}</a>
                      </td>
                      <td>
                        <a href={`${GITREMOTE}/commit/${commit}`}>{commit}</a>
                      </td>
                      <td>{dayjs(startTime).format(UTCFORMAT)}</td>
                      <td>{testingDuation}</td>
                      <Link to={`result_${result.id}`}>
                        <td>{status}</td>
                      </Link>
                    </tr>
                  )
                })
              ) : (
                <>No Testing Result, yet</>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default Home
