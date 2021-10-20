export function processProposeData(proposeData) {
  const txCount = {
    total: 0,
    '24h': 0,
    '1h': 0,
  }

  // const totalProcessedTx = data.organizerData.layer1.proposeData.reduce((txCount, propose) => {txCount + propose.txcount}, 0)

  const diffTime = proposeData.endTime - proposeData.startTime

  if (diffTime < 24 * 3600 * 1000) {
    txCount[`24h`] += proposeData.txcount
  } else if (diffTime < 3600 * 1000) {
    txCount[`1h`] += proposeData.txcount
  }

  txCount.total += proposeData.txcount

  return {
    txCount,
    tps: {
      avgTPS: txCount.total / Math.floor(diffTime / 1000),
      last24hTPS: txCount['24h'] / (24 * 3600),
      last1hTPS: txCount['1h'] / 3600,
    },
  }
}

/* Participant Table 
*  key-value object to get name or address from the other one
* i.e "coordinator_1": "0x0123456789",
*     "0x0123456789": "coordinator_1"
// */
// const participants = {}
// export function keyTable(key, value?) {
//   if (key && value) {
//     participants[key] = value
//     participants[value] = key
//   } else if (key) {
//     return participants[key]
//   }
// }
