import random from 'random';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import momont from 'moment';

const FILE_PATH = './dummy.json';


const makeCommit = (n) => {
	if(n===0) return simpleGit().push();
	const x = random.int(0, 54);
	const y = random.int(0, 6);
	const p = random.int(1, 7);
	const DATE = momont().subtract(p, 'y').add(1, 'd').add(x,'w').add(y, 'd').format();

	const data = {
	  date: DATE,
	};

	console.log(`commiting on ${DATE}`);
	
	jsonfile.writeFile(FILE_PATH, data, ()=>{
		simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE});
		makeCommit.bind(this, --n)();
	});
	
};

makeCommit(10000);


