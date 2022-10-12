const fs = require('fs')

fs.readFile(process.argv[2].toString(), 'utf-8', (err, data) => {
  if (err) {
    console.log('File cannot be found')
  } else if (data) {
    for (let i = 0; i < data.split('\n').length; i += 1){
        let linecount = i+1
        let lineData;

        for (let x = 0; x < data.split('\n').length; x += 1) {
            if (data[x] === '\n'){
                lineData = data.split('\n')
            }
        }
        console.log(`${linecount}: ${lineData[i]}`)
      }
    } 
})
