// alert("connected");
$(document).ready(function () {
    //create Base URL variable
    const BASE_URL = "http://localhost:4000";
  
    /**API Request Functions */
  
    //get all names from DB
    const fetchNames = async () => {
      //fetch data from the server using the fetch API
      const response = await fetch(`${BASE_URL}/names`);
  
      //convert the response to JSON
      const data = await response.json();
      // console.log({ data });
  
      //return the data
      return data;
    };
  
    //get a names by its ID
    const fetchName = async (id) => {
      //fetch data from the server using the fetch API
      const response = await fetch(`${BASE_URL}/names/${id}`);
  
      //convert the response to JSON
      const data = await response.json();
      // console.log({ data });
  
      //return the data
      return data;
    };
  
    //add a new name to the server
    const addName = async (text) => {
      let newItem = {
        "text": text
      }
      
      //fetch data from the server using the fetch API
      const response = await fetch(`${BASE_URL}/names`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
  
      //convert the response to JSON
      const data = await response.json();
      // console.log({ data });
  
      //return the data
      return data;
    };
  
    /**Other functions to handle CRUD requests */
  
    //create render function to retrieve data from the server and render it to the page
    const render = async () => {
      //fetch all todos from the server
      const names = await fetchNames();
      // console.log("todos from render", { todos });
  
      // Clear the current list
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
      //get the value of the input field
      const text = $("#newTodo").val();
      // console.log({ text });
  
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
  
      //re-render the names by calling the render function
      render();
    });
  
    //add event listener to the delete button
    $(document).on("click", ".deleteTodo", async function () {
      // Get the id of the todo to be deleted
      const id = $(this).data("index");
      console.log("deleting", { id });
  
      // Delete the names from the server
      await fetch(`${BASE_URL}/names/${id}`, {
        method: "DELETE",
      });
  
      // Re-render the names by calling the render function
      render();
    });
  
  });
  