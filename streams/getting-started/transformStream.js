const stream = require("stream");

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super();
    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = "";
  }
  _transform(chunk, encoding, callback) {
    const pieces = (this.tailPiece + chunk).split(this.searchString);
    const lastPiece = pieces[pieces.length - 1];
    const tailPieceLen = this.searchString.length - 1;

    this.tailPiece = lastPiece.slice(-tailPieceLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);

    this.push(pieces.join(this.replaceString));
  }

  _flush(callback) {
    this.push(this.tailPiece);
    callback();
  }
}

/* Example with Quokka
  const rs = new ReplaceStream("World", "Node.js");
  rs.on("data", chunk => console.log(chunk.toString()));
  rs.write(
    "hello Wdedw dewd ewdew wedew dew dwed World edw dewdew wWorld ewdw edwe"
  );
  rs.end();
*/

module.exports = ReplaceStream;
