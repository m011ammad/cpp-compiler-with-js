class Buffer {
  constructor(input) {
    var forward = 0;
    var lexemeBegining = 0;
    this.input = input;
    this.nextChar = function () {
      return input[forward++];
    };
    this.takeLexeme = function () {
      let lexeme = input.substring(lexemeBegining, forward);
      lexemeBegining = forward;
      return lexeme;
    };
    this.deleteCurrentLexeme = function () {
      forward = lexemeBegining;
    };
    this.retract = function () {
      forward--;
    };
  }
}