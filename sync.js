const simpleGit = require('simple-git')("./");


function Sync_Code(){
	simpleGit.pull()
}

setInterval(Sync_Code,3600)  // sync code every hour
