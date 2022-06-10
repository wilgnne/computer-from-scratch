import React from "react";
import { Divider, Heading } from "@chakra-ui/react";
import Sketch from "react-p5";
import p5Types from "p5";

import { useEmulator } from "../context/emulator";
import { chunkArray } from "../utils/chunk";

const VRAM_PAGE = 2;

function Display() {
  const { memory } = useEmulator();

  const vram = chunkArray<number>(memory.getMemory(), 256)[VRAM_PAGE];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(516, 260).parent(canvasParentRef);

    p5.background(0);
    p5.noStroke();
    p5.fill(64);

    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 64; j += 1) {
        p5.rect(j * 8 + 4, i * 8 + 4, 5, 5);
      }
    }
  };

  const draw = (p5: p5Types) => {
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 64; j += 1) {
        const tile = (i & 0b11111000) + (j >> 3);
        const tileLine = i & 0b00000111;
        const tileBit = j & 0b00000111;

        const tileLineAdrr = (tile << 3) | tileLine;
        const tileLineValue = vram[tileLineAdrr];

        const pixelValue = tileLineValue & (1 << tileBit);

        if (pixelValue) {
          p5.fill(255);
        } else {
          p5.fill(64);
        }

        p5.rect(j * 8 + 4, i * 8 + 4, 5, 5);
      }
    }
  };

  return (
    <div>
      <Heading size="md">Display</Heading>
      <Divider marginTop={2} marginBottom={2} />
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default Display;
