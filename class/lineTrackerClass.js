class LineTracker {

  line = 1;

  constructor() {
  }

  nextLine() {
    this.line++;
  };

  currentLine() {
    return this.line;
  };
  
}