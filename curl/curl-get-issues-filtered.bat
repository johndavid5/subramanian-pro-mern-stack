REM curl -i http://localhost:3000/api/issues 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-issues.header.out http://localhost:3000/api/issues | json_pp 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-issues.header.out http://localhost:3000/api/issues 2>&1 | tee curl-get-issues.out
REM curl -v http://localhost:3000/api/issues?status=Open 2>&1 | tee curl-get-issues-filtered.out
curl -v "http://localhost:3000/api/issues?effort_lte=16&effort_gte=4&offset=1&_limit=2" 2>&1 | tee curl-get-issues-filtered.out
