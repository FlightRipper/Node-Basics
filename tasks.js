
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

function onDataReceived(text) {
  let result = text.split(" ");
  const input = text.split(" ")[0].trim();
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(input === 'hello') {
    hello(text.replace('\n',""));
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    listTasks();
  }
  else if(input === 'add'){
    add(text.replace('\n',""));
  }
  else if(input === 'remove'){
    remove(text.replace('\n',""));
  }
  else if(input === 'edit'){
    edit(text.replace('\n',""));
  }
  else if (text.startsWith('check ')){
    check(result)
  }
  else if (text.startsWith('uncheck ')){
   uncheck(result)
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
* Says hello
*
* @returns {void}
*/


// function to write the commands

// function hello takes the input as an argument and returns it with !
function hello(input){
  console.log(input + "!");
}

let tasks = [
  {
   taskname: "Buy kousa",
   done : false,
  },
  {
   taskname: "drill kousa",
  done : false,
  },
  {
    taskname: "fill kousa",
    done : false,
  }
];

// Function to list all tasks
function listTasks(){
  for (i=0;i<tasks.length;i++){
    console.log(`${i+1} - [${tasks[i].done? "✓":" "}] ${tasks[i].taskname}`);
  }
}

// function to  add a task to the list

function add(result) {
  tasks.push({taskname:result.slice(1),done:false}); 
}

function check(result){
  tasks[parseInt(result[1]-1)].done=true
}

function uncheck(result){
  tasks[parseInt(result[1]-1)].done=false
}

//function to remove a task from the list
function remove(result) {
  tasks.splice(parseInt(result[1]) - 1, 1);
}

function edit(input) {
  if (input.length <= 4) {
    return console.log(" invalid input");
  }
  const args = input.split(' ');
  if (args.length === 2) {
    const newText = args[1];
    tasks[tasks.length - 1] = newText;
  }
  else if (args.length === 3 && !isNaN(args[1])) {
    const index = parseInt(args[1]) - 1;
    const newText = args[2];
    if (index >= 0 && index < tasks.length) {
      tasks[index] = newText;
    } else {
      console.log("Invalid index");
    }
  } 
  else {
    console.log("Invalid format");
  }
}



/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

function help(){
  console.log("hello : to Greet, quit/exit : to close the application, add : add a new task to the list, remove : remove a task from the list(make sure to write the index)")
}

// The following line starts the application
startApp("Ahmad Mallah")
