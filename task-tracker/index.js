const express = require('express');
const fs = require('fs');
const { json } = require('stream/consumers');
const bodyParser = require('body-parser')

const app = express();
const port = 9999;
const FILE = "./data.json";

app.use(express.json());
app.use(bodyParser.json())

// Read file
function readFile(){
    const data = fs.readFileSync(FILE)
    return JSON.parse(data)
}

// Write file
function writeFile(data){
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}

// Create new task
app.post('/create', (req, res) => {
  try {
    const file = readFile();
    const lastID = file.length > 0 ? file[file.length - 1].id : 0;

    const newItem = {
        id: lastID + 1,
        description: req.body.description,
        status: 'to-do',
        createdAt: Date.now(),
        updatedAt: null
    }

    file.push(newItem);
    writeFile(file);
    console.log('Create data with ID:', lastID + 1)
    res.status(201).json({message: 'Write Data Success',})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error'})
  }   
})

// Update task description
app.put('/update/:id', (req, res) => {
  try {
    const file = readFile();
    const updatedAt = Date.now();
    const id = parseInt(req.params.id)
    const entry = file.find(i => i.id == id);
    if(!entry)
      return res.status(404).json({message:'ID not found'});
    
    entry.description = req.body.description;
    entry.updatedAt = updatedAt;
    writeFile(file);

    console.log('Update data with ID:', id)
    return res.status(201).json({message: 'Update Success'});
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'})
  }
})

// Update task status
app.put('/update-status/:id', (req,res) => {
  const allowedStatus = ['to-do', 'in-progress', 'done']
  const status = req.query.status;
  if(!allowedStatus.includes(status))
    return res.status(401).json({message: 'status are prohibited'})

  const file = readFile();
  const id = parseInt(req.params.id)
  const entry = file.find(i => i.id === id)
  if(!entry)
    return res.status(404).json({message: 'ID not found'})

  entry.status = status;
  entry.updatedAt = Date.now();
  writeFile(file);

  console.log('Update status on ID:', id, 'to', status);
  return res.status(201).json({message: 'update success'})
})

// Delete task
app.delete('/delete/:id', (req, res) => {
  try {
    const file = readFile();
    const id = parseInt(req.params.id)
    const entry = file.find(i => i.id === id);

    if(!entry)
      return res.status(404).json({message: 'ID not found'})

    const newFile = file.filter(i => i.id !== id);
    writeFile(newFile);
    console.log('Delete entry with ID:', id)
    return res.status(201).json({message: 'delete success'})
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

// Read tasks
app.get('/', (req, res) => {
  const allowedStatus = ['to-do', 'in-progress', 'done']
  const status = req.query.status;
  const file = readFile();
  if (!status)
    return res.status(200).json(file)

  if(!allowedStatus.includes(status))
    return res.status(401).json({message: 'invalid status'}) 
  
  const entries = file.filter(i => i.status == status);
  if(entries.length === 0)
    return res.status(404).json({message: `not found any ${status} task`})

  return res.status(200).json({message: 'found', data: entries})
});

// Start the server
app.listen(port, () => {
  console.log(`Task Tracker app listening at http://localhost:${port}`);
});