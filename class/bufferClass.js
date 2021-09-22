class Buffer {

  // properties
  forward = 0;
  lexemeBegining = 0;

  constructor(input) {
    this.input = input;
  }

  nextChar() {
    return this.input[this.forward++];
  };

  takeLexeme() {
    let lexeme = this.input.substring(this.lexemeBegining, this.forward);
    this.lexemeBegining = this.forward;
    return lexeme;
  };

  deleteCurrentLexeme() {
    this.forward = this.lexemeBegining;
  };

  retract() {
    this.forward--;
  };

}
