const fs = require('fs')
const path = require('path')

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  const pageData = JSON.parse(
    fs.readFileSync('./src/content/result_sample.json', { encoding: 'utf-8' }),
  )
  const buildResultTemplate = path.resolve(`src/templates/result.tsx`);

  createPage({
    path: `/result`,
    component: buildResultTemplate,
    context: {
      ...pageData,
    },
  })
}