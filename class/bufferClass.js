class Buffer {

  // properties
  forward = 0;
  lexemeBegining = 0;

  constructor(input) {
    this.input = input;
  }

  nextChar() {
    return input[forward++];
  };

  takeLexeme() {
    let lexeme = input.substring(lexemeBegining, forward);
    lexemeBegining = forward;
    return lexeme;
  };

  deleteCurrentLexeme() {
    forward = lexemeBegining;
  };
  
  retract() {
    forward--;
  };

}
