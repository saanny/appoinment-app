#!/bin/bash
request(){
data=(
'{"id":"1","start":"2020-10-10 20:20", "end":"2020-10-10 20:30",
"createdAt":"2020-09-02 14:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"2","start":"2019-10-10 20:20", "end":"2020-10-10 20:30",
"createdAt":"2018-10-02 16:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"3","start":"2020-10-10 20:25", "end":"2020-10-10 20:35",
"createdAt":"2020-10-01 13:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"4","start":"2020-10-11 10:00", "end":"2020-10-11 11:30",
"createdAt":"2020-10-01 11:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"5","start":"2020-10-12 11:27", "end":"2020-10-10 12:27",
"createdAt":"2020-09-11 10:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"6","start":"2020-10-12 12:00", "end":"2020-10-12 13:30",
"createdAt":"2020-08-02 13:23:12", "updatedAt":"2020-09-28 14:23:12"}'
'{"id":"1","start":"2020-10-17 14:40", "end":"2020-10-17 15:30",
"createdAt":"2020-03-02 19:23:12", "updatedAt":"2020-09-28 14:24:12"}'
)
random_data=${data[($RANDOM % ${#data[@]})]}
response=$(curl --header "Content-Type: application/json" \
--request POST \
--data "$random_data" \
-w "%{http_code}" \
--silent \
--output /dev/null \
http://localhost:3000/api/v1/appointments)
echo "request:" $random_data "->" $response
}
export -f request
seq 1 ${1:-100} | xargs -n1 -P10 bash -c 'request'