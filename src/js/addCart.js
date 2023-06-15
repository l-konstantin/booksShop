window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.products-list_data');
        
        var bookInfo = {
            id: card.dataset.id
        }
        
        localStorage.setItem("books", JSON.stringify(bookInfo));
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "[]");
        }
    }
})