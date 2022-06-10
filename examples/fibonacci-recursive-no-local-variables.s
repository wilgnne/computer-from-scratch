start:
    push 2
    call fib
    mov SP, BP
    hlt

fib:
    mov a, [BP+2]   ; a = n
    cmp a, 1        ; if a < 1
    jlez fib_end    ; then return 1
    sub a, 1        ; a = n - 1
    push a          ; push n - 1
    call fib        ; a = fib(n - 1)
    mov SP, BP      ; clear parameter stack
    mov b, a        ; b = fib(n - 1)
    mov a, [BP+2]   ; a = n
    sub a, 2        ; a = n - 2
    push b          ; push fib(n - 1)
    push a          ; push n - 2
    call fib        ; a = fib(n - 2)
    mov SP, BP      ; clear parameter stack, but fib(n - 1) is on top of stack
    sub SP, 1       ; Restore SP to previous value before call
    pop b           ; b = fib(n - 1)
    add a, b        ; a = fib(n - 2) + fib(n - 1)
    ret

fib_end:
    mov a, 1        ; a = 1
    ret             ; return a
