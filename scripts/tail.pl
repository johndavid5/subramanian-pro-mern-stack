use POSIX;
use strict;

#print(getTimestamp() . "\n");
#exit(0);

my $line;
my $count = 0;
while($line=<STDIN>){
	$count++;
	print("($count)[" . getTimestamp() . "]: \"" . $line . "\"...\n");
}

sub getTimestamp {
	return POSIX::strftime("%Y-%m-%d %I:%M:%S %p", localtime);
}
