REM curl -i http://localhost:3000/api/issues 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-issues.header.out http://localhost:3000/api/issues | json_pp 2>&1 | tee curl-get-issues.out
REM curl --dump-header curl-get-issues.header.out http://localhost:3000/api/issues 2>&1 | tee curl-get-issues.out
REM curl -v http://localhost:3000/api/issues?status=Open 2>&1 | tee curl-get-issues-filtered.out
REM curl -v "http://localhost:3000/api/issues?effort_lte=16&effort_gte=4&offset=2&_limit=5&_sortby=effort&_ascdesc=-1" 2>&1 | tee curl-get-issues-filtered.out
REM curl -v "http://localhost:3000/api/issues?search=sit+amet&effort_lte=16&effort_gte=4&_sortby=title&_ascdesc=-1" 2>&1 | tee curl-get-issues-filtered.out
curl -v "http://localhost:3000/api/issues?search=sit+amet,+1&_sortby=title&_ascdesc=-1" 2>&1 | tee curl-get-issues-filtered.out
