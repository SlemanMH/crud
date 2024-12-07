const name = document.querySelector('#courseName');
const category = document.querySelector('#courseCategory');
const price = document.querySelector('#coursePrice');
const description = document.querySelector('#courseDescription');
const capacity = document.querySelector('#courseCapacity');
const addBtn = document.querySelector('#click');
let courses = [];
const deleteAllBtn = document.querySelector('#deleteBtn');
const serach = document.querySelector('#search');
const updateBtn = document.querySelector('#updateBtn');

if (localStorage.getItem('courses') !== null) {
    courses = JSON.parse(localStorage.getItem('courses'));
    displayCourses();
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}$/;
    if (!namePattern.test(name.value)) {
        name.classList.add('is-invalid');
        document.querySelector('.invalid-name').textContent = 'please start with capital letter and name must be between 2 and 10 characters';
        isValid = false;
    }else{
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
        document.querySelector('.invalid-name').textContent ='';
    }

    const categoryPattern = /^[A-Z][a-z]{2,20}$/;
    if (!categoryPattern.test(category.value)) {
        category.classList.add('is-invalid');
        document.querySelector('.invalid-category').textContent = 'please start with capital letter and category must be between 2 and 20 characters';
        isValid = false;
    }
    else{
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
        document.querySelector('.invalid-category').textContent ='';
    }

    const pricePattern = /^[1-9][0-9]{2,3}$/;
    if (!pricePattern.test(price.value)) {
        price.classList.add('is-invalid');
        document.querySelector('.invalid-price').textContent = 'price must between 100 - 9999';
        isValid = false;
    }
    else{
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
        document.querySelector('.invalid-price').textContent ='';
    }

    const descriptionPattern = /^[A-Z].*$/;
    if (!descriptionPattern.test(description.value)) {
        description.classList.add('is-invalid');
        document.querySelector('.invalid-description').textContent = 'please start with capital letter';
        isValid = false;
    }
    else{
        description.classList.remove('is-invalid');
        description.classList.add('is-valid');
        document.querySelector('.invalid-description').textContent ='';
    }

    const capacityPattern = /^[1-9][0-9]$/;
    if (!capacityPattern.test(capacity.value)) {
        capacity.classList.add('is-invalid');
        document.querySelector('.invalid-capacity').textContent = 'capacity must between 10 - 99';
        isValid = false;
    }
    else{
        capacity.classList.remove('is-invalid');
        capacity.classList.add('is-valid');
        document.querySelector('.invalid-capacity').textContent ='';
    }

    if (isValid) {
    const course = {
        name: name.value,
        category: category.value,
        price: price.value,
        description: description.value,
        capacity: capacity.value
    };

    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Course added successfully"
      });
    displayCourses();
    }
});

function displayCourses() {

    const result = courses.map((course, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button class="btn btn-info" onclick="updateCourse(${index})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button></td>
        </tr>`
    }).join('');
    document.querySelector('#data').innerHTML = result;
}

function deleteCourse(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}

deleteAllBtn.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('courses');
            courses = [];
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
});

serach.addEventListener('input', (e) => {

    const keyword = e.target.value;
    const courseResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    });

    const result = courseResult.map((course, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><button class="btn btn-info" onclick="updateCourse(${index})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button></td>
        </tr>`
    }).join('');
    document.querySelector('#data').innerHTML = result;
});

updateBtn.classList.add('d-none');

let index_update;
function updateCourse(index) {
    index_update = index;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    const course = courses[index];
    name.value = course.name;
    category.value = course.category;
    price.value = course.price;
    description.value = course.description;
    capacity.value = course.capacity;
}

updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}$/;
    if (!namePattern.test(name.value)) {
        name.classList.add('is-invalid');
        document.querySelector('.invalid-name').textContent = 'please start with capital letter and name must be between 2 and 10 characters';
        isValid = false;
    }else{
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
        document.querySelector('.invalid-name').textContent ='';
    }

    const categoryPattern = /^[A-Z][a-z]{2,20}$/;
    if (!categoryPattern.test(category.value)) {
        category.classList.add('is-invalid');
        document.querySelector('.invalid-category').textContent = 'please start with capital letter and category must be between 2 and 20 characters';
        isValid = false;
    }
    else{
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
        document.querySelector('.invalid-category').textContent ='';
    }

    const pricePattern = /^[1-9][0-9]{2,3}$/;
    if (!pricePattern.test(price.value)) {
        price.classList.add('is-invalid');
        document.querySelector('.invalid-price').textContent = 'price must between 100 - 9999';
        isValid = false;
    }
    else{
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
        document.querySelector('.invalid-price').textContent ='';
    }

    const descriptionPattern = /^[A-Z].*$/;
    if (!descriptionPattern.test(description.value)) {
        description.classList.add('is-invalid');
        document.querySelector('.invalid-description').textContent = 'please start with capital letter';
        isValid = false;
    }
    else{
        description.classList.remove('is-invalid');
        description.classList.add('is-valid');
        document.querySelector('.invalid-description').textContent ='';
    }

    const capacityPattern = /^[1-9][0-9]$/;
    if (!capacityPattern.test(capacity.value)) {
        capacity.classList.add('is-invalid');
        document.querySelector('.invalid-capacity').textContent = 'capacity must between 10 - 99';
        isValid = false;
    }
    else{
        capacity.classList.remove('is-invalid');
        capacity.classList.add('is-valid');
        document.querySelector('.invalid-capacity').textContent ='';
    }
if (isValid) {
    const course = {
        name: name.value,
        category: category.value,
        price: price.value,
        description: description.value,
        capacity: capacity.value
    };
    courses[index_update] = course;
    localStorage.setItem('courses', JSON.stringify(courses));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Course updated successfully"
      });
    displayCourses();
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}
});
