import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useToast } from "@chakra-ui/react";

import { asm } from "@computer-from-scratch/assembler";
import { CPU, Memory } from "@computer-from-scratch/emulator";
import { Assembler } from "@computer-from-scratch/common";

interface IEmulatorContext {
  cpu: CPU.Cpu;
  registers: CPU.IRegisters;
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
    Memory.createMemory(768, [0, 1, 2, 3])
  );
  const [cpu, setCpu] = useState<CPU.Cpu>();
  const [registers, setRegisters] = useState<CPU.IRegisters>();
  const [labels, setLabels] = useState<Record<string, Assembler.Label>>();

  const toast = useToast();

  const assemble = useCallback((code: string) => {
    try {
      const { code: program, labels: programLabels } = asm(code);
      const newMemory = Memory.createMemory(768, program);
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

        setRegisters(regs);
      }
    } catch (e) {
      toast({
        title: "Runtime Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [cpu]);

  useEffect(() => {
    const newCpu = CPU.createCpu(memory);
    setRegisters(newCpu.getRegisters());
    setCpu(newCpu);
  }, [memory]);

  if (!cpu) {
    return null;
  }

  return (
    <EmulatorContext.Provider
      value={{
        cpu,
        registers,
        memory,
        labels,
        assemble,
        step,
      }}
    >
      {children}
    </EmulatorContext.Provider>
  );
}

export default EmulatorContextProvider;
