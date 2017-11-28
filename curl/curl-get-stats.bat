REM curl -i http://localhost:3000/api/issues 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-issues.header.out http://localhost:3000/api/issues | json_pp 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-stats.header.out http://localhost:3000/api/issues?_summary 2>&1 | tee curl-get-stats.out
curl -v http://localhost:3000/api/issues?_summary 2>&1 | tee curl-get-stats.out
