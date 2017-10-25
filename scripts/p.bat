REM node trymongo.js callbacks -dburl "mongodb://localhost/playground" 2>&1 | tee p.out
REM node trymongo.js promises -dburl "mongodb://localhost/playground" 2>&1 | tee p.out
REM node trymongo.js generator -dburl "mongodb://localhost/playground" 2>&1 | tee p.out
node trymongo.js async -dburl "mongodb://localhost/playground" 2>&1 | tee p.out
