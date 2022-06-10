start:
  push 0    ; i coordinate
  push 0    ; j coordinate
  push 1    ; value
  call draw

draw:
  mov a, [bp+5] ; a = i
  and a, 11111000b ; a = i % 8
  mov b, [bp+4] ; b = j
  shr b, 3     ; b = j / 8
  add a, b     ; a = j / 8 + i % 8   a = tile index

  mov b, [bp+5] ; b = i
  and b, 111b   ; b = tile line

  mov c, [bp+4] ; c = j
  and c, 111b   ; c = tile bit

  shl a, 3      ; a = tile index * 8
  or a, b       ; a = tile index * 8 + tile line  a = tile address
  add a, 0x200  ; a = tile address + offset

  mov b, [a]    ; b = tile value
  sub SP, 1     ; reverser local variable
  mov [BP], b   ; save tile value

  mov b, [bp+3] ; b = value
  shl b, c      ; b = value << tile bit
  mov c, [BP]   ; c = tile value
  or b, c    ; b = value << tile bit | tile value

  mov [a], b    ; save tile value

  mov SP, BP
  ret
