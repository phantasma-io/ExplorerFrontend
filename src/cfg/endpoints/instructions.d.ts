interface Instruction {
  instruction?: string;
}

interface IntructionParams {
  script_raw?: string;
}

interface InstructionResults extends ListResults {
  instructions?: Instruction[];
}
