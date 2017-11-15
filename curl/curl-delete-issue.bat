REM curl -v "http://localhost:3000/api/issues/5a026a3bc082f0311c51502f" 2>&1 | tee curl-get-issue-by-id.out
REM curl -v "http://localhost:3000/api/issues/garbage" 2>&1 | tee curl-get-issue-by-id.out
curl -v -X DELETE "http://localhost:3000/api/issues/5a0b8d5a9a23d216a8ba3fc2" 2>&1 | tee curl-delete-issue.out
