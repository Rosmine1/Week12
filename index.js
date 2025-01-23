// alert("connected");
$(document).ready(function () {
    //create Base URL variable
    const BASE_URL = "http://localhost:4000";
  
    
  
    //get all names from DB
    const fetchNames = async () => {
      const response = await fetch(`${BASE_URL}/names`);
      const data = await response.json();
      return data;
    };
  
    //get a names by its ID
    const fetchName = async (id) => { 
      const response = await fetch(`${BASE_URL}/names/${id}`);
      const data = await response.json();
      return data;
    };
  
    //add a new name to the server
    const addName = async (text) => {
      let newItem = {
        "text": text
      }
      
      const response = await fetch(`${BASE_URL}/names`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      return data;
    };
  
    
    //function to retrieve data from the server and render it to the page
    const render = async () => {
      const names = await fetchNames();
      $("#todoList").empty();
  
      // Loop through the names array and append each todo to the list
      names.forEach(function (name, index) {
        let nameItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span class="todo-text ${
                                      name.text ? "text" : " "}">${name.text}</span>
                                    <div>
                                        <button class="btn btn-sm btn-danger deleteTodo" data-index="${
                                          name.id
                                        }">Delete</button>
                                    </div>
                                </li>`;
        $("#todoList").append(nameItem);
      });
    };
  
    // Call the render function when the page loads
    render();
  
    //add event listener to the add name button
    $("#addTodo").click(async (event) => {
      event.preventDefault();
      const text = $("#newTodo").val();
    
      if (!text) {
        alert("Please enter a name");
        return;
      }
  
      //add the names  to the server
      try {
        await addName(text);
      } catch (error) {
        console.log(error);
      } finally {
        //clear the input field regardless of the outcome
        $("#newTodo").val("");
      }
  
      //re-render the names again
      render();
    });
  
    //add event listener to the delete button
    $(document).on("click", ".deleteTodo", async function () {
      const id = $(this).data("index");
      console.log("deleting", { id });
      await fetch(`${BASE_URL}/names/${id}`, {
        method: "DELETE",
      });
  
      // Re-render the names again 
      render();
    });
  
  });
  