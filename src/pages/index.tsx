import React from 'react'
import { PageProps, Link } from 'gatsby'
import '../styles/index.css'

const Home: React.FC<PageProps> = () => (
  <main>
    <div className="container">
      <h1>Zkopru Stress Test DashBoard</h1>
      <table role="table">
        <thead>
          <tr>
            <th>Try</th>
            <th>Status</th>
            <th>Branch / Commit</th>
            <th>StartTime</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <Link to="/result">
              <td>Success</td>
            </Link>
            <td>develop / 595d98513fec3a6944bf72b14e83dbbb675d3392</td>
            {/* <td>{dayjs('2020-04-10 20:10:10').format('YYYY-MM-DD HH:mm:ss UTC')}</td> */}
            <td>OnGoing</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
)

export default Home
