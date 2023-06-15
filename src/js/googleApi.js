import iconDefault from "../images/item-2.png";

function apiGoogleBook() {
    let maxResults = 6;
    let btnLoadMore = document.querySelector('.products-list_load');
    
    let url = `https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=AIzaSyApcHP4GDuFqCQkrvfavTn7qvrb_RheN-Y&printType=books&startIndex=0&maxResults=${maxResults}&langRestrict=en`;

    btnLoadMore.addEventListener('click', (e) => {
        const listPage = [...document.querySelectorAll('.products-list .products-list_data')];
        for (let i = maxResults; i < maxResults + 6; i++) {
            if (listPage[i]) {
                listPage[i].style.display = 'block';
            }
        }
        maxResults += 6;

        if (maxResults >= listPage.length) {
            event.target.style.display = 'none';
        }
    })
    
    const extractThumbnail = ({ imageLinks }) => {
        const DEFAULT_THUMBNAIL = iconDefault;
        if (!imageLinks || !imageLinks.thumbnail) {
          return DEFAULT_THUMBNAIL;
        }
        return imageLinks.thumbnail.replace("http://", "https://");
    };

    const booksStore = getBooks();
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const html = data.items.map(book => {
                let activeClass = '';
                let activeText = '';

                if (booksStore.indexOf(book.id) === -1) {
                    activeText = 'Buy now';
                } else {
                    activeClass = ' active-button_cart';
                    activeText = 'In the cart';
                }

                return `
                    <li class="products-list_data" data-id="${book.id}">
                        <img class="product-data_image" src="${extractThumbnail(book.volumeInfo)}" alt="item1"/>
                        <div class="product-data">
                            <div class="product-data_author_height">
                                <h4 class="${book.volumeInfo.authors ? "product-data_author" : "product-data_author_none"}">${book.volumeInfo.authors}</h4>
                            </div>
                            <div class="product-data_name_height">
                                <h3 class="product-data_name">${book.volumeInfo.title}</h3>
                            </div>
                            <div class="product-data_star">
                                <div class="${book.volumeInfo.averageRating ? "product-data_rating" : "product-data_rating_none"}" data-total-value="${book.volumeInfo.averageRating}">
                                    <div class="product-data_rating_item" data-item-value="5">★</div>
                                    <div class="product-data_rating_item" data-item-value="4">★</div>
                                    <div class="product-data_rating_item" data-item-value="3">★</div>
                                    <div class="product-data_rating_item" data-item-value="2">★</div>
                                    <div class="product-data_rating_item" data-item-value="1">★</div>
                                </div>
                                <p class="${book.volumeInfo.ratingsCount ? "product-data_star_text" : "product-data_rating_none"}">${book.volumeInfo.ratingsCount} review</p>
                            </div>
                            <div class="product-data_description_height">
                                <p class="${book.volumeInfo.description ? "product-data_description" : "product-data_description_none"}">${book.volumeInfo.description}</p>
                            </div>
                            <div class="product-data_price_height">
                                <h4 class="${book.saleInfo.retailPrice ? "product-data_price" : "product-data_price_none"}">$ ${book.saleInfo.retailPrice}</h4>
                            </div>
                            <button class="product-data_button${activeClass}" type="button" onclick="handleCartLocalStorage(${book.id});">
                                ${activeText}
                            </button>
                        </div>
                    </li>`;
            })
            .join("");
            document.querySelector(".products-list").insertAdjacentHTML("afterbegin", html);

        })
        .catch(error => {
            console.log(error);
        });
        
    function getBooks() {
        const booksLocalStorage = localStorage.getItem("books");
        if (booksLocalStorage !== null) {
            return JSON.parse(booksLocalStorage);
        }
        return [];
    }

    function putBooks(id) {
        let books = getBooks();
        let pushBook = false;
        const index = books.indexOf(id);
    
        if (index === -1) {
            books.push(id);
            pushBook = true;
        } else {
            books.splice(index, 1);
        }
    
        books.push(id);
        localStorage.setItem("books", JSON.stringify(books));
        return { pushBook, books };
    }

    function handleCartLocalStorage(id) {
        const pushBook = putBooks(id);
        const element = document.querySelector(".product-data_button");

        if (pushBook) {
            element.classList.add(' active-button_cart');
            element.innerHTML = 'In the cart';
        } else {
            element.classList.remove(' active-button_cart');
            element.innerHTML = 'Buy now';
        }
    }
}
apiGoogleBook();
