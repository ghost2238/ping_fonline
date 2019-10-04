# Tools for pinging an FOnline server

*For correct ping send 4 bytes to server - 0xFFFFFFFF, than receive 16 bytes, 
where 4 is current online, 4 bytes is uptime in seconds, others 8 is reserved. After server drop connection.* -[cvet](https://fodev.net/forum/index.php/topic,2351.msg19771.html#msg19771)

## Code
`ping.sh` - Bash script for pinging, requires `dd` and `od`.<br>
`ping.fasm` - Same thing implemented in x64 asm ([FASM](https://flatassembler.net/)) for linux using only syscalls, no libc.
## Usage
`ping.sh <server ip> <server port>`
`node ping.js <server ip> <server port>`
### Example
`./ping.sh play.fonline-reloaded.net 2238`

> Players: 36<br>
> Uptime: 103831 seconds

`node ping.js play.fonline-reloaded.net 2238`

> Connected to play.fonline-reloaded.net:2238<br>
> Players: 8<br>
> Uptime: 6 days, 8 hours, 5 minutes