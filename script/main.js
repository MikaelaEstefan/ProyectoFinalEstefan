let categories = [];
let expenses = [];

const categoryForm = document.getElementById("categoryForm");
const categoryInput = document.getElementById("categoryInput");
const categoryList = document.getElementById("categoryList");
const expenseForm = document.getElementById("expenseForm");
const categorySelect = document.getElementById("categorySelect");
const expenseInput = document.getElementById("expenseInput");
const expenseList = document.getElementById("expenseList");

//-------------------Add category-----------------------//
//-----------------------------------------------------//
//1- 'e.preventDefault()' evita que se envíe el formulario y se recargue la página.
//2- Obtiene el nombre de la categoría del campo de entrada, eliminando los espacios en blanco al principio y al final.//
//3- Verifica si el nombre de la categoría es válido. Si no es válido, muestra un mensaje de error y sale de la función.//
//4- Obtiene las categorías existentes de localStorage y las guarda en la variable categories. Si no hay categorías, se establece un array vacío.//
//5- Agrega la nueva categoría al final del array categories.//
//6- Actualiza las opciones del elemento de selección de categoría (un select) agregando una nueva opción con el valor y el texto establecidos como el nombre de la nueva categoría.//
//7- Agrega la nueva categoría a la lista como un elemento li.//
//8- Muestra un mensaje de éxito con el nombre de la categoría agregada.//
//10- Restablece el formulario para borrar el campo de entrada.//

function addCategory(e) {
    e.preventDefault(); 
    const categoryName = categoryInput.value.trim();
    if (categoryName === '') {
        //---Sweet Alert---//
        //----------------//
        Swal.fire({
            title: 'Please enter a valid category name.',
            icon: 'error',
            iconColor: '#414833',
            background: '#c2c5aa',
            color: '#3b3923',
            showConfirmButton: false, 
            timer: 2000
        });
        return;
    } 

    categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.push(categoryName);
    localStorage.setItem('categories', JSON.stringify(categories));

   
    const option = document.createElement('option');
    option.value = categoryName;
    option.textContent = categoryName;
    categorySelect.appendChild(option);

    categoryList.innerHTML += `<li>${categoryName}</li>`; 
    //---Sweet Alert---//
    //----------------//
        Swal.fire({
            title: `Category '${categoryName}' added successfully!`,
            icon: 'success',
            iconColor: '#414833',
            background: '#c2c5aa',
            color: '#3b3923',
            showConfirmButton: false, 
            timer: 2000
        });
    categoryForm.reset(); 
}

//---------------Agregar las categorias agregadas a las options-------------------//
//-------------------------------------------------------------------------------//
window.addEventListener('load', () => {
    categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
});

//----------------------------Add expense---------------------------//
//-----------------------------------------------------------------//
//1- Primero, 'e.preventDefault()' evita que se envíe el formulario y se recargue la página.
//2- Luego, obtiene el valor seleccionado del elemento de selección de categoría (categorySelect) y lo almacena en la variable category.//
//3- Crea una nueva instancia de Date para obtener la fecha actual en formato de cadena utilizando el método toLocaleDateString(), y almacena el resultado en la variable date.//
//4- Luego, obtiene el valor de la entrada de gasto (expenseInput), lo recorta y lo almacena en la variable amount.//
//5- Comprueba si tanto la categoría como la cantidad son valores válidos. Si alguno de ellos es una cadena vacía, muestra un mensaje de error utilizando la función showMessage() y devuelve la función.//
//6- Crea un nuevo objeto de gasto (expense) que contiene la categoría, la fecha y la cantidad del gasto.//
//7- Agrega el nuevo objeto de gasto a expenses utilizando el método push().//
//8- Agrega una nueva fila a la lista de gastos (expenseList) que muestra la categoría, la fecha y la cantidad del nuevo gasto, utilizando una cadena de plantilla de texto y el operador +=.//
//9- Muestra un mensaje de éxito utilizando la función showMessage().//
//10- Restablece el formulario de entrada de gastos (expenseForm) para borrar los campos de entrada utilizando el método reset().//

function addExpense(e) {
    e.preventDefault(); 
    const category = categorySelect.value;
    const date = new Date().toLocaleDateString();
    const amount = expenseInput.value.trim();
    if (category === '' || amount === '') {
        //---Sweet Alert---//
        //----------------//
        Swal.fire({
            title: 'Please select a category and enter a valid expense amount.',
            icon: 'error',
            iconColor: '#414833',
            background: '#c2c5aa',
            color: '#3b3923',
            showConfirmButton: false, 
            timer: 2000
        });
        return;
    }
    const expense = {
        category: category,
        date: date,
        amount: amount
    };
    expenses.push(expense);
    expenseList.innerHTML += `<li>${category} - ${date} - ${amount}</li>`; 
   //---Sweet Alert---//
   //----------------//
   Swal.fire({
    title: 'Expense added successfully!',
    icon: 'success',
    iconColor: '#414833',
    background: '#c2c5aa',
    color: '#3b3923',
    showConfirmButton: false, 
    timer: 2000
  });
    expenseForm.reset(); 
}

//------------------------Show message------------------------//
//-----------------------------------------------------------//
//1- La función toma dos argumentos: message (el mensaje que se mostrará en la interfaz de usuario) y className (la clase CSS que se utilizará para dar formato al mensaje).//
//2- Crea un nuevo div utilizando el método createElement() y lo almacena en la variable div.//
//3- Establece la clase CSS del nuevo div como "message" concatenada con el valor del argumento className.//
//4- Crea un nuevo nodo de texto utilizando el método createTextNode() y lo establece como el contenido del nuevo div, utilizando el método appendChild().//
//5- Obtiene una referencia al elemento contenedor utilizando el método querySelector() y lo almacena en la variable container. En este caso, el contenedor es el elemento con la clase CSS "container".//
//6- Inserta el nuevo div como el último hijo del contenedor utilizando el método insertBefore(). En este caso, el nuevo div se inserta después del último elemento hijo del contenedor, por lo que se pasa null como segundo argumento.//

function showMessage(message, className) {
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    container.insertBefore(div, null);
}

//-----Populate category (add options to the category select element)-----//
//-----------------------------------------------------------------------//
//1- La función recorre el array categories utilizando el método forEach().//
//2- Para cada elemento de categories, crea un nuevo elemento option utilizando el método createElement() y lo almacena en la variable option.//
//3- Establece el valor del atributo value del nuevo elemento option como el valor del elemento de categories, utilizando la propiedad value.//
//4- Establece el contenido del nuevo elemento option como el valor del elemento de la matriz categories, utilizando la propiedad text.//
//5- Agrega el nuevo elemento option al menú desplegable de categorías utilizando el método appendChild() del elemento categorySelect. //

function populateCategories() {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
    });
}

//-------------generateReport----------------//
//------------------------------------------//
//1-Se crea un objeto vacío ´categoryTotals´ donde se van a guardar los totales de cada categoría.//
//2- Se itera sobre el array expenses, que contiene los gastos. Para cada gasto, se realiza lo siguiente:
//a. Se obtiene la categoría del gasto utilizando expense.category. //
//b. Se obtiene el monto del gasto y se convierte a un número decimal utilizando parseFloat(expense.amount). //
//c. Se verifica si la categoría ya existe en categoryTotals. Si existe, se suma el monto actual al total existente. Si no existe, se crea la categoría en categoryTotals y se asigna el monto actual. //

function generateReport() {
    const categoryTotals = {};
  
    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);
  
      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });
  
    //---Chart---//
    const chartCanvas = document.getElementById('reportChart');
  
    //---Extraer los nombres y cantidades para la chart---//
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
  
    //--Crear la chart--/7
    new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: amounts,
          backgroundColor: ['#414833', '#b3ab8c', '#867f54', '#3b3923', '#6d6d6d'],
        }],
      },
      options: {
        responsive: true,
      },
    });  
}


//------Event listeners------//
//--------------------------//
categoryForm.addEventListener('submit', addCategory);
expenseForm.addEventListener('submit', addExpense);
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    document.getElementById('reportButton').addEventListener('click', showReport);
});
reportButton.addEventListener('click', generateReport);

