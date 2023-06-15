const listCategory = [
    {
        id: 1,
        category: 'Architecture'
    },
    {
        id: 2,
        category: 'Art & Fashion'
    },
    {
        id: 3,
        category: 'Biography'
    },
    {
        id: 4,
        category: 'Business'
    },
    {
        id: 5,
        category: 'Crafts & Hobbies'
    },
    {
        id: 6,
        category: 'Drama'
    },
    {
        id: 7,
        category: 'Fiction'
    },
    {
        id: 8,
        category: 'Food & Drink'
    },
    {
        id: 9,
        category: 'Health & Wellbeing'
    },
    {
        id: 10,
        category: 'Humo'
    },
    {
        id: 11,
        category: 'Poetry'
    },
    {
        id: 12,
        category: 'Psychology'
    },
    {
        id: 13,
        category: 'Science'
    },
    {
        id: 14,
        category: 'Technology'
    },
    {
        id: 15,
        category: 'Travel & Maps'
    }
];

function sidebarActive(options) {
    options = options || {
        activeSidebar: true
    };
    
    let listSidebar = document.querySelector(".sidebar-category");

    if (options.activeSidebar) {
        listCategories();
    }

    function listCategories() {
        listCategory.forEach((item, index) => {
            let categories = `
                <div class="sidebar-category_name n${index} ${index === 0 ? "active" : ""}" data-index="${index}">
                    ${listCategory[index].category}
                </div>`;
            listSidebar.innerHTML += categories;
        });
        listSidebar.querySelectorAll(".sidebar-category_name").forEach(categories => {
            categories.addEventListener("click", function() {
                moveSidebar(this.dataset.index);
            })
        })
    }

    function moveSidebar(num) {
        if (options.activeSidebar) {
            listSidebar.querySelector(".active").classList.remove("active");
            listSidebar.querySelector(".n" + num).classList.add("active");
        }
    }
}

let sidebarOptions = {
    activeSidebar: true
}

document.addEventListener("DOMContentLoaded", function() {
    sidebarActive(sidebarOptions);
});

