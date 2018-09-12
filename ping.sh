#!/bin/bash
# Connect to an FOnline server and get player count + uptime
# Best code ever... bash is NOT ugly...

# read_bytes_fmt $num_bytes $file_descriptor $od_format
read_bytes_fmt() {
  res=`dd bs=$1 count=1 <&$2 2> /dev/null | od -t $3`
  arr=(${res// / })
  echo ${arr[1]}
}

# read x bytes as uint
# read_bytes_uint $num_bytes $file_descriptor
read_bytes_uint() {
  echo $(read_bytes_fmt $1 $2 u$1)
}

exec 3<>/dev/tcp/$1/$2
echo -ne '\xFF\xFF\xFF\xFF' >&3
sleep .25
PLAYERS=$(read_bytes_uint 4 "3")
UPTIME=$(read_bytes_uint 4 "3")

echo "Players: $PLAYERS"
echo "Uptime: $UPTIME seconds"