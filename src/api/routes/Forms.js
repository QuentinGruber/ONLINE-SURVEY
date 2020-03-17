

 exports.create_new_form = function(req,res){
    const writeJsonFile = require('write-json-file');

    var data = {
      Form_name: req.query.Form_name,
      Content: [req.query.Content]
    };
  
    (async () => {
      await writeJsonFile('testFORM.json', data);
    })();
    res.send("true")
}