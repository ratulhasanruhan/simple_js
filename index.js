import random from 'random';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import momont from 'moment';

const FILE_PATH = './dummy.json';


const makeCommit = (n, commitIndex = 0) => {
	if(n===0) return simpleGit().push();
	const daysInRange = 365;
	const dayOffset = Math.floor((commitIndex / 1000) * daysInRange);
	const DATE = momont().subtract(1, 'y').add(dayOffset, 'd').format();

	const data = {
	  date: DATE,
	};

	console.log(`commiting on ${DATE}`);
	
	jsonfile.writeFile(FILE_PATH, data, ()=>{
		simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE});
		makeCommit.bind(this, --n, commitIndex + 1)();
	});
	
};

makeCommit(1000);


