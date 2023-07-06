const moon = document.querySelector(".fa-moon");
const functions = document.querySelector(".todo .sub-div .functions");
const drag = document.querySelector(".drag");
const body = document.querySelector("body");
const activeInput = document.querySelector(".sub-div .active-input .input");
const addBtn = document.querySelector(".sub-div .active-input .fa-plus");
const inputContainer = document.querySelector(".sub-div .input-container");
const inputCover = document.querySelector(
  ".sub-div .input-container .input-cover"
);
const spans = document.querySelectorAll(".sub-div .functions .middle span");
const activeBtn = document.querySelector(".sub-div .functions .middle .active");
const allBtn = document.querySelector(".sub-div .functions .middle .all");
const completedBtn = document.querySelector(
  ".sub-div .functions .middle .completed"
);
const clearCompletedBtn = document.querySelector(".sub-div .functions .clear");
const numberOfActiveItems = document.querySelector(
  ".sub-div .functions .quantity-remaining"
);

let allArray = [];
let completedArray = [];
let completedBtnStatus = false;
let activeArray = [];
let length;

// localStorage.setItem('allArray', allArray )

// lightmode check for localstorage/
if (localStorage.getItem("weather") == "night") {
  document.body.classList.add("lightmode");
  moon.classList.add("fa-sun");
  activeInput.classList.add("lightmode");
  addBtn.classList.add("lightmode");
  drag.classList.add("lightmode");
  functions.classList.add("lightmode");
} else {
  document.body.classList.remove("lightmode");
  moon.classList.remove("fa-sun");
  activeInput.classList.remove("lightmode");
  addBtn.classList.remove("lightmode");
  drag.classList.remove("lightmode");
  functions.classList.remove("lightmode");
}

// ---lightmode toggler----
moon.addEventListener("click", function () {
  document.body.classList.toggle("lightmode");
  moon.classList.toggle("fa-sun");
  activeInput.classList.toggle("lightmode");
  addBtn.classList.toggle("lightmode");
  functions.classList.toggle("lightmode");
  drag.classList.toggle("lightmode");
  if (document.querySelector(".fa-times")) {
    const closeBtns = inputContainer.querySelectorAll(".fa-times");
    closeBtns.forEach((btn) => btn.classList.add("lightmode"));
  }
  if (document.querySelector(".todoInput")) {
    const todos = body.querySelectorAll(".todoInput");
    for (const item of todos) {
      if (body.classList.contains("lightmode")) {
        item.classList.add("lightmode");
      } else if (!body.classList.contains("lightmode")) {
        item.classList.remove("lightmode");
      }
    }
  }
  if (activeInput.classList.contains("lightmode")) {
    mode = "night";
    localStorage.setItem("weather", mode);
  } else {
    mode = "day";
    localStorage.setItem("weather", mode);
  }
});



addBtn.addEventListener("click", function () {
  const todoItem = activeInput.value;
  if (todoItem == "") {
    return;
  }
  allArray.push(todoItem);
  activeArrayCheck();
  length = activeArray.length;
  numberOfActiveItems.textContent = `${length} item(s) left`;
  activeInput.value = "";
  allArrayRender();
  if (completedBtn.classList.contains("blue")) {
    for (const span of spans) {
      span.classList.remove("blue");
    }
    allBtn.classList.add("blue");
  }
  if (activeBtn.classList.contains("blue")) {
    for (const span of spans) {
      span.classList.remove("blue");
    }
    allBtn.classList.add("blue");
  }
});


//compare completedArray and allArray and produce active array
function activeArrayCheck() {
  activeArray = allArray.filter((item) => !completedArray.includes(item));
  console.log(activeArray);
}

// render different pages function
function renderTodoBasedOnCat(array) {
  if (array.length > 0) {
    inputCover.innerHTML = ``;
  }
  if (array.length == 0) {
    inputCover.innerHTML = ``;
  }
  for (item of array) {
    const div = document.createElement("div");
    div.className = "input-parent";
    div.innerHTML = `
            <input type="text" class="todoInput" readonly value='${item}' />
            `;
    inputCover.append(div);
    if (body.classList.contains("lightmode")) {
      div.querySelector(".todoInput").classList.add("lightmode");
    } else if (!body.classList.contains("lightmode")) {
      div.querySelector(".todoInput").classList.remove("lightmode");
    }
  }
}

// event listeners for pageBtns
activeBtn.addEventListener("click", function () {
  renderTodoBasedOnCat(activeArray);
  for (const span of spans) {
    span.classList.remove("blue");
  }
  this.classList.add("blue");
});
completedBtn.addEventListener("click", function () {
  renderTodoBasedOnCat(completedArray);
  for (const span of spans) {
    span.classList.remove("blue");
  }
  this.classList.add("blue");
});
clearCompletedBtn.addEventListener("click", function () {
  allArray = allArray.filter((item) => !completedArray.includes(item));
  completedArray = [];
  console.log(allArray);
  if (allArray.length == 0) {
    completedBtnStatus = true;
  }
  allArrayRender();
  if (completedBtn.classList.contains("blue")) {
    renderTodoBasedOnCat(completedArray);
  }
  if (activeBtn.classList.contains("blue")) {
    for (const span of spans) {
      span.classList.remove("blue");
    }
    allBtn.classList.add("blue");
  }
});

allBtn.addEventListener("click", function () {
  allArrayRender();
  for (const span of spans) {
    span.classList.remove("blue");
  }
  this.classList.add("blue");
});



//rending content of allArray
function allArrayRender() {
  if (completedBtnStatus) {
    inputCover.innerHTML = ``;
  }
  if (allArray.length > 0) {
    inputCover.innerHTML = ``;
  }
  console.log(allArray);
  console.log(activeArray);
  for (item of allArray) {
    const ItemIndex = allArray.indexOf(item)
    const div = document.createElement("div");
    div.className = "input-parent";
    div.setAttribute('dataIndex', ItemIndex)
    div.innerHTML = `
        <input type="checkbox" class="checker" />
        <input type="text" class="todoInput"  readonly value='${item}' />
        <i class="fas fa-times"></i>
        `;
    div.querySelector(".checker").addEventListener("change", function () {
      div.querySelector(".todoInput").classList.toggle("active");
      console.log(div.querySelector(".todoInput").value);
      if (this.checked) {
        const agenda = this.parentElement.querySelector(".todoInput").value;
        completedArray.push(agenda);
        console.log(allArray);
        console.log(completedArray);
        activeArrayCheck();
        numberOfActiveItems.textContent = `${activeArray.length} item(s) left`;
      } else if (this.checked == false) {
        const agenda = this.parentElement.querySelector(".todoInput").value;
        completedArray = completedArray.filter((item) => {
          return item !== agenda;
        });
        console.log(allArray);
        console.log(completedArray);
        activeArrayCheck();
        numberOfActiveItems.textContent = `${activeArray.length} item(s) left`;
      }
    });
    div.querySelector(".fa-times").addEventListener("click", function () {
      const filtered = this.parentElement.querySelector(".todoInput").value;
      allArray = allArray.filter((item) => {
        return item !== filtered;
      });
      completedArray = completedArray.filter((item) => {
        return item !== filtered;
      });

      console.log(allArray);
      console.log(completedArray);
      activeArrayCheck();
      div.remove();
      numberOfActiveItems.textContent = `${activeArray.length} item(s) left`;
    });
    if (completedArray.includes(item)) {
      div.querySelector(".checker").checked = true;
      div.querySelector(".todoInput").classList.add("active");
    }

    ///drag functionality
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("drop", dragDrop);
    div.addEventListener("dragenter", dragEnter);
    div.addEventListener("dragleave", dragLeave);

    // lightmode check
    if (body.classList.contains("lightmode")) {
      div.querySelector(".todoInput").classList.add("lightmode");
      div.querySelector(".fa-times").classList.add("lightmode");
    } else if (!body.classList.contains("lightmode")) {
      div.querySelector(".todoInput").classList.remove("lightmode");
      div.querySelector(".fa-times").classList.remove("lightmode");
    }
    inputCover.append(div);
  }
}





//drag functionality
let dragStartIndex;
let dragStartValue;

function dragStart() {
  dragStartValue = this.querySelector(".todoInput").value;
  dragStartIndex = allArray.indexOf(dragStartValue);
}
function dragEnter() {
  // console.log("event:dragenter");
}

function dragLeave() {
  // console.log('n');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndValue = this.querySelector(".todoInput").value;
  const dragEndIndex = allArray.indexOf(dragEndValue);
  swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(from, to) {
  const val = allArray[from]
  const val2 = allArray[to]
  allArray[to] = val
  allArray[from] = val2
  allArrayRender()
}
