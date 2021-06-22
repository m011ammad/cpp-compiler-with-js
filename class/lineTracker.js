class LineTracker {
  constructor() {
    var line = 1;
    this.nextLine = function () {
      line++;
    };
    this.currentLine = function () {
      return line;
    };
  }
}