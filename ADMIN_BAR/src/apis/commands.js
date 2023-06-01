export async function getAllCommands(){
    const response = await fetch('http://localhost:8000/getAllCommands');
    return await response.json();
}

export async function serveCommand(id){
    const response = await fetch(`http://localhost:8000/serveCommand/${id}`, {
        method : "PUT"
    });
    return await response.json();
}