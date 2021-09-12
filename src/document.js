document.body.innerHTML = `
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
     integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"   crossorigin="anonymous">
     <link rel="stylesheet" href="style.css">
     <title>ToDo App</title>

</head>
<body>
     <header class="d-flex justify-content-center p-3 bg-warning">
          <h4>ToDo App</h4>
     </header>
   <main class="container p-0">
     <div class="row">
        <nav class="col-3 btn-light">
            <div id="project-list" class="d-flex flex-column p-2">
               <h5 class="p2">PROJECT</h5>
                    <ul class=" d-flex flex-column" id="project-home">
                    </ul>
            </div>
            <div id="project-form-container">
                    <h5 class="p-2">Add project</h5>
                 <div id="project-form">
                      <form id="my-form">
                        <label for="project-input"></label><br>
                        <input type="text" id="project-input" name="project-input" placeholder="title"><br>
                        <input type="submit" value="create" id="project-submit">
                      </form>
                 </div>
            </div>
        </nav>
        <div class="col-9" id="task-form-container">
               <h4>Create a Task</h4>
               <!-- append task form here -->
        </div>
    </div> 
          <div class="row">
              <div class="col-4" id="add-task-container">
                    <!-- append card task here -->
               </div>
          </div>
   </main>  




   <script src="main.js"></script>
</body>
</html>`;

export default document;