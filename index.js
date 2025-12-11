import random from 'random';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import moment from 'moment';

const FILE_PATH = './dummy.json';


const makeCommit = (n) => {
		if(n===0) return simpleGit().push();

		// Random date strictly within 2025
		const start = moment('2025-01-01T00:00:00Z');
		const end = moment('2025-12-31T23:59:59Z');
		const totalDays = end.diff(start, 'days'); // 364
		const dayOffset = random.int(0, totalDays);
		const hour = random.int(0, 23);
		const minute = random.int(0, 59);
		const second = random.int(0, 59);
		const DATE = start.clone().add(dayOffset, 'days').hour(hour).minute(minute).second(second).utc().format();

		const data = {
			date: DATE,
		};

		console.log(`commiting on ${DATE}`);
    
		jsonfile.writeFile(FILE_PATH, data, ()=>{
				simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE});
				makeCommit.bind(this, --n)();
		});
    
};

makeCommit(1000);


