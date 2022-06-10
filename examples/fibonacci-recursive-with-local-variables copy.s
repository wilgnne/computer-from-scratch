start:
    push 5
    call fib
    mov SP, BP
    hlt

fib:
    SUB SP, 1       ; Allocate space for local variable
    mov a, [BP+3]   ; a = n
    cmp a, 1        ; if a < 1
    jlez fib_end    ; then return 1
    sub a, 1        ; a = n - 1
    push a          ; push n - 1
    call fib        ; a = fib(n - 1)
    mov SP, BP      ; clear parameter stack
    SUB SP, 1       ; restore local variable
    mov [BP], a   ; save result in local variable
    mov a, [BP+3]   ; a = n
    sub a, 2        ; a = n - 2
    push a          ; push n - 2
    call fib        ; a = fib(n - 2)
    mov SP, BP      ; clear parameter stack, but fib(n - 1) is on top of stack
    SUB SP, 1       ; restore local variable
    mov b, [BP]   ; b = saved result
    add a, b        ; a = fib(n - 2) + fib(n - 1)
    ADD SP, 1       ; free local variable
    ret

fib_end:
    mov a, 1        ; a = 1
    ADD SP, 1       ; free local variable
    ret             ; return a
