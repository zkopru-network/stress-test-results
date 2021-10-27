const fs = require('fs')
const path = require('path')

// TODO: testresult file should be better uuid
const targetDirectory = `src/content`
const resultFiles = fs.readdirSync(targetDirectory)
const results = resultFiles.map((file) => {
  const data = JSON.parse(fs.readFileSync(`${targetDirectory}/${file}`, `utf8`))
  const id = file.split(`_`)[1].split(`.`)[0]
  return { id, filePath: `${targetDirectory}/${file}`, data }
})

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  // Create main Page
  createPage({
    path: `/`,
    component: path.resolve(`src/templates/main.tsx`),
    context: {
      results: results.sort((a, b) => (a.id < b.id ? 1 : -1)),
    },
  })

  // Create results pages
  results.forEach((result) => {
    createPage({
      path: `/result_${result.id}`,
      component: path.resolve(`src/templates/result.tsx`),
      context: {
        id: result.id,
        ...result.data,
      },
    })
  })
}
