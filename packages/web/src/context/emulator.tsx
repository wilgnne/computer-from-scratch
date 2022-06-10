import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useToast } from "@chakra-ui/react";

import { asm } from "@computer-from-scratch/assembler";
import { CPU, Memory } from "@computer-from-scratch/emulator";
import { Assembler } from "@computer-from-scratch/common";

const MEMORY_SIZE = 256 * 4;

interface IEmulatorContext {
  cpu: CPU.Cpu;
  registers: CPU.IRegisters;
  executedInstructions: number;
  memory: Memory.Memory;
  labels: Record<string, Assembler.Label>;
  assemble: (_code: string) => void;
  step: () => void;
}

const EmulatorContext = createContext<IEmulatorContext>(null);

export function useEmulator() {
  return useContext(EmulatorContext);
}

function EmulatorContextProvider({ children }: { children: React.ReactNode }) {
  const [memory, setMemory] = useState(() =>
    Memory.createMemory(MEMORY_SIZE, [0, 1, 2, 3])
  );
  const [cpu, setCpu] = useState<CPU.Cpu>();
  const [registers, setRegisters] = useState<CPU.IRegisters>();
  const [executedInstructions, setExecutedInstructions] = useState(0);
  const [labels, setLabels] = useState<Record<string, Assembler.Label>>();

  const toast = useToast();

  const assemble = useCallback((code: string) => {
    try {
      const { code: program, labels: programLabels } = asm(code);
      const newMemory = Memory.createMemory(MEMORY_SIZE, program);
      setMemory(newMemory);
      setLabels(programLabels);
    } catch (e) {
      toast({
        title: "Compile Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  const step = useCallback(() => {
    try {
      if (cpu) {
        const { registers: regs } = cpu.step();

        const execInstructions = Math.floor(regs.IP / 3);

        const prevLabelsCont = Object.keys(labels).filter(
          (key) => labels[key].address <= regs.IP
        ).length;

        setRegisters(regs);
        setExecutedInstructions(execInstructions + prevLabelsCont);
      }
    } catch (e) {
      toast({
        title: "Runtime Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      throw new Error(e);
    }
  }, [cpu]);

  useEffect(() => {
    const newCpu = CPU.createCpu(memory);
    setRegisters(newCpu.getRegisters());
    setCpu(newCpu);
  }, [memory]);
  const value = useMemo(
    () => ({
      cpu,
      registers,
      executedInstructions,
      memory,
      labels,
      assemble,
      step,
    }),
    [cpu, registers, executedInstructions, memory, labels, assemble]
  );

  if (!cpu) {
    return null;
  }

  return (
    <EmulatorContext.Provider value={value}>
      {children}
    </EmulatorContext.Provider>
  );
}

export default EmulatorContextProvider;
