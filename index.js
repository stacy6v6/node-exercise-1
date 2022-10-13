const fs = require('fs')

if (process.argv.slice(2).length < 2 || process.argv.slice(2).length > 3) {
  console.log('Invalid no. of arguments')
} else {
  fs.readFile(process.argv[2].toString(), 'utf-8', (err, data) => {
    let finalData = ''
    for (let i = 0; i < data.split('\n').length; i += 1) {
      const linecount = i + 1
      let lineData

      for (let x = 0; x < data.split('\n').length; x += 1) {
        if (data[x] === '\n') {
          lineData = data.split('\n')
          finalData += `${linecount}: ${lineData[i]}\n`
        }
      }
    }
    if (err) {
      console.log('file cannot be found.')
    } else if (data) {
      if (fs.existsSync(process.argv[3]) === true) {
        if (process.argv[4] === undefined || process.argv[4] === '-n') {
          console.log('File already exists and will not be overwritten')
        } else if (process.argv[4] === '-y') {
          fs.writeFile(process.argv[3], finalData, (error) => {
            if (error) {
              console.log(error)
            }
          })
        } else {
          console.log('Invalid argument. Please input -y or -n only for the third argument.')
        }
      } else {
        fs.writeFile(process.argv[3], finalData, (error) => {
          if (error) {
            console.log(error)
          }
        })
      }
    }
  })
}
