const fs = require('fs')
const printer = require('printer')
const filename = './toPrint.txt'


console.log(printer.getPrinters());

function print(filename){
  if( process.platform != 'win32') {
    printer.printFile({filename:filename,
      // printer: HP_343434, // replace with printer name
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
        fs.unlinkSync(filename)
      },
      error:function(err){
        console.log(err);
      }
    });
  } else {
    // not yet implemented, use printDirect and text
    var fs = require('fs');
    printer.printDirect({data:fs.readFileSync(filename),
      // printer: HP_343434, // replace with printer name
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
        fs.unlinkSync(filename)
      },
      error:function(err){
        console.log(err);
      }
    });
  }
}

setInterval(function(){
  const fileExists = fs.existsSync(filename);
  if(fileExists){
    print(filename)
  }
}, 700)
