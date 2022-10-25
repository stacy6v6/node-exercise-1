const fs = require('fs')

const [inputFile, outputFile, flag] = process.argv.slice(2)

if (process.argv.slice(2).length === 0) {
  process.stdin.on('data', (data) => {
    const newData = data.toString().split('\n')
    for (let line = 0; line < newData.length; line += 1) {
      console.log(`${line + 1}: ${newData[line]} \n`)
    }
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
    const dataStr = data.split('\n')
    for (let i = 0; i < dataStr.length; i += 1) {
      finalData += `${i + 1}: ${dataStr[i]}\n`
    }

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
