import './App.css';
import {Component} from "react";
import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import LibrarianService from "../../repository/librarianrepository";
import Categories from "../Categories/categories";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Books from "../Books/BookList/books";

class App extends Component{

  constructor(props) {
    super(props);
    this.state ={
      categories: [],
      books: [],
      selectedBook: {},
        authors: []
    }
  }

  render() {
    return(
        <Router>
          <Header/>
          <main>
            <div className={"container"}>


              <Route path={"/categories"} exact render={() =>
                  <Categories categories={this.state.categories}/>}/>

              <Route path={"/books/add"} exact render={() =>
                  <BookAdd categories={this.state.categories}
                           authors={this.state.authors}
                           onAddBook={this.addBook}/>}/>

              <Route path={"/books/edit/:id"} exact render={() =>
                  <BookEdit categories={this.state.categories}
                            authors={this.state.authors}
                               onEditBook={this.editBook}
                               book={this.state.selectedBook}/>}/>

              <Route path={"/books"} exact render={() =>
                  <Books books={this.state.books}
                            onDelete={this.deleteBook}
                            onMarkAsTaken={this.onMarkAsTaken}
                            book={this.state.selectedBook}
                            onEdit={this.getBook}/>}/>

              <Redirect to={"/books"} />


            </div>
          </main>

        </Router>

    );
  }

  componentDidMount() {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }


  loadCategories = () => {
    LibrarianService.fetchCategories()
        .then((data) =>{
          this.setState({
            categories: data.data
          })
        })
  }

    loadAuthors = () => {
        LibrarianService.fetchAuthors()
            .then((data) =>{
                this.setState({
                    authors: data.data
                })
            })
    }

  loadBooks = () => {
    LibrarianService.fetchBooks()
        .then((data) =>{
          this.setState({
            books: data.data
          })
        })
  }

  deleteBook = (id) => {
      LibrarianService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        })
  }

    onMarkAsTaken = (id) => {
        LibrarianService.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }

  addBook = (name, category, authorId, availableCopies) =>{
      LibrarianService.addBook(name, category, authorId, availableCopies)
        .then(() => {
          this.loadBooks();
        })
  }

  getBook = (id) => {
      LibrarianService.getBook(id)
        .then((data) =>{
          this.setState({
            selectedBook: data.data
          })
        })
  }

    editBook = (id, name, category, authorId, availableCopies) => {
        LibrarianService.editBook(id, name, category, authorId, availableCopies)
        .then(() => {
          this.loadBooks()
        });
  }

}

export default App;
