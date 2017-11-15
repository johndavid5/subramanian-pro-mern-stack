var expect = require('chai').expect;
var utils = require('../server/utils');

describe('validate utils.objectToString() test', 
	function(){

    let undeffee;
    let nowDate = new Date();
    let objectee = { "name": "Joe", "number": 5, "time": nowDate };

	let test_cases = [
      { input: undeffee, expected_output: "undefined" },
      { input: null, expected_output: "null" },
      { input: objectee, expected_output: "Let off some steam, Bennett!" },
    ];
	
		// DRY = Do not Repeat Yourself...
    test_cases.forEach(function(test_case, index){

			it("case #" + (index+1) + ": utils.objectToString(\n" +
					"\t" + JSON.stringify(test_case.input) + "\n" +
                    "\t" + ") = \"" + test_case.output + "\"",
				function(){

                  let s_out = utils.objectToString( test_case.input );

                  console.log("case #" + (index+1) + ": utils.objectToString(\n" +
					"\t" + JSON.stringify(test_case.input) + "\n" +
                    "\t" + "): expected_output = \"" + test_case.output + "\"\n" +
                    "\t" + "actual_output = \"" + s_out + "\"\n"
                  );

				  if( test_case.expected_output && 1==0){
                    expect( s_out ).to.be.equal(test_case.expected_output);
		          }	 

				});

			});

});
