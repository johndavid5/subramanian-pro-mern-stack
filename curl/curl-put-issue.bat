REM {
REM   "_id": "59f11d3fa77085aeb4a6a216",
REM   "status": "Assigned",
REM   "owner": "Hanuman",
REM   "created": "2016-08-16T00:00:00.000Z",
REM   "effort": 14,
REM   "completionDate": "2016-08-17T00:00:00.000Z",
REM   "title": "Rescue Sita."
REM }
REM curl -v -X PUT "http://localhost:3000/api/issues/59f11d3fa77085aeb4a6a216" --header "Content-Type: application/json" --data "{ \"status\": \"\", \"owner\": \"Hanuman\", \"created\": \"2017-08-16T00:00:00.000Z\", \"effort\": 15, \"completionDate\": \"2017-08-17T00:00:00.000Z\", \"title\": \"Rescue Sita.\" }"
REM Nice try, but this blows up the body parser since you're not supposed to use single quotes in valid JSON...
REM curl -v --trace-ascii curl-put-issue.trace-ascii.out -X PUT "http://localhost:3000/api/issues/59f11d3fa77085aeb4a6a216" --header "Content-Type: application/json" --data "{ 'status': '', 'owner': 'Hanuman', 'created': '2017-08-16T00:00:00.000Z', 'effort': 15, 'completionDate': '2017-08-17T00:00:00.000Z', 'title': 'Rescue Sita.' }"
REM Note: gotta choose between -v (verbose) and --trace-ascii
curl --trace-ascii curl-put-issue.trace-ascii.out -X PUT "http://localhost:3000/api/issues/59f11d3fa77085aeb4a6a216" --header "Content-Type: application/json" --data "{ \"status\": \"Fixed\", \"owner\": \"Hanuman\", \"created\": \"2015-08-16T00:00:00.000Z\", \"effort\": 15, \"completionDate\": \"2015-08-17T00:00:00.000Z\", \"title\": \"Rescue Sita.\" }" 2>&1 | tee curl-put-issue.out
