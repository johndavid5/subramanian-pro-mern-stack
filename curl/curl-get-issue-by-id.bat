REM curl -v "http://localhost:3000/api/issues/5a026a3bc082f0311c51502f" 2>&1 | tee curl-get-issue-by-id.out
REM curl -v "http://localhost:3000/api/issues/garbage" 2>&1 | tee curl-get-issue-by-id.out
curl -v "http://localhost:3000/api/issues/5a026a3bc082f0311c515123" 2>&1 | tee curl-get-issue-by-id.out
