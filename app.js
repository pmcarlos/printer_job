const fs = require('fs')
const printer = require('printer')
const filename = './test.pdf' //replace with name (file with 2018)
const outputFilename = './output.pdf' //this is the output file with (2019)
const HummusRecipe = require('hummus-recipe');

console.log(printer.getPrinters()); //check log for printer name and replace printer on print function

function print(){
  if( process.platform != 'win32') {
    printer.printFile({filename: outputFilename,
      // printer: HP_343434, // replace with printer name
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
        fs.unlinkSync(outputFilename)
        fs.unlinkSync(filename)
      },
      error:function(err){
        console.log(err);
      }
    });
  } else {
    // not yet implemented, use printDirect and text
    
    printer.printDirect({data:fs.readFileSync(outputFilename),
      // printer: HP_343434, // replace with printer name
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
        fs.unlinkSync(outputFilename)
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
    
  const pdfDoc = new HummusRecipe(filename, outputFilename);
  pdfDoc
    .editPage(1)
    .rectangle(20, 20, 40, 100) //20x20 rectangle x=40 y=100 from Left-Top
    .text('2019', 40, 100) //text 2019 in 40,100
    .endPage()
    .endPDF();

    print()
  }
}, 700)
