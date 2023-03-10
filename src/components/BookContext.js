import { useEffect, useState } from 'react';
import BookCards from './BookCards';
import AddBookButton from './AddBook';

export default function BookContext() {
    const [bookList, setBookList] = useState([]);
    const API = "https://63dc7fa52308e3e319e89c0f.mockapi.io/books";

    //fetches the API data, sets the state to API data and console logs success 
    useEffect(() => {
        const reFreshInfo = async () => {
            const response = await fetch(API);
            const data = await response.json();
            setBookList(data);
            await console.log(bookList);
        }
        reFreshInfo();
    }, []);


    const getBooks = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setBookList(data);
        await console.log(bookList)
    };

    //fetches API data of single entry/item by id
    const onReadOneClick = async () => {
        const response = await fetch(API + "/4")
        const data = await response.json();
        await console.log(data);
    };

    //onclick, creates new object with input data and sets it into state and API 

    const addBookClick = async (newBook) => {

        await setBookList(bookList.concat(newBook))
        await fetch(API, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newBook)
        })
        await console.log(bookList);
    };


    //targets specified data and pushes the change to API - didn't get this done but dfoes work when hard-coded 
    const editBook = async (id) => {
        /*         const changedBook = {
                    title: "The Diary of Anne Frank",
                    contributor: "Kristina",
                    author: "Anne Frank",
                    date: "2/4/23",
                    review: "Sombering and vivid"
                } */
        let resourceID = (id);
        await fetch(API + "/" + resourceID, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify()
        })
        await console.log(bookList);
        getBooks();
    };
    //changedbook


    //determines item by id and deletes from API 
    const deleteBook = async (id) => {
        const resourceID = (id);
        const response = await fetch(
            API + "/" + resourceID,
            { method: "DELETE" }
        )
        await console.log("Book has been deleted");
        getBooks();
    };
    console.log(bookList);

    return (
        <div>
            <AddBookButton addBookClick={addBookClick} />
            <BookCards bookList={bookList} deleteBook={deleteBook} editBook={editBook} />
        </div>
    );
}
