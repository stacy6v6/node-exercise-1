const fs = require('fs')

const [inputFile, outputFile, flag] = process.argv.slice(2)

const convertData = (dataInput) => dataInput.toString().split('\n').map((elem, line) => `${line + 1}: ${elem} \n`).join('')

if (process.argv.slice(2).length === 0) {
  process.stdin.on('data', (data) => {
    console.log(convertData(data))
  })
} else {
  if (inputFile === undefined || outputFile === undefined) {
    console.log('Invalid no. of arguments')
    process.exit(1)
  }

  fs.readFile(inputFile.toString(), 'utf-8', (err, data) => {
    if (err) {
      console.log('file cannot be found.')
      process.exit(1)
    }

    let finalData = ''
    finalData = convertData(data)

    if (fs.existsSync(outputFile) === true) {
      if (flag !== '-y' && flag !== '-n' && flag !== undefined) {
        console.log('Invalid argument. Please input -y or -n only for the third argument.')
        process.exit(1)
      }
      if (flag === undefined || flag === '-n') {
        console.log('File already exists and will not be overwritten')
        process.exit(1)
      }
      if (flag === '-y') {
        fs.writeFile(outputFile, finalData, (error) => {
          if (error) {
            console.log(error)
          }
        })
      }
    } else {
      fs.writeFile(outputFile, finalData, (error) => {
        if (error) {
          console.log(error)
        }
      })
    }
  })
}
