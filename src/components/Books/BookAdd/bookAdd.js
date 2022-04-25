import React from "react";
import {useHistory} from 'react-router-dom';

const BookAdd = (props) => {

    const history = useHistory();//chuva pateki za idenje napred i nazad niz aplikacijata
    const [formData, updateFormDate] = React.useState({
        name: "",
        category: "NOVEL",
        authorId: 0,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormDate({
            ...formData, //vrz toa shto go imame do sega
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault(); // ne gi prakaj odma podatocite tuku nie kje odluchime
        const name = formData.name;
        const category = formData.category;
        const authorId = formData.authorId;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name, category, authorId, availableCopies);

        history.push("/books"); //da vrati na strnata so site produkti
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter product name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            <option selected>Select</option>
                            {props.categories.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Author</label>
                        <select name="authorId" className="form-control" onChange={handleChange}>
                            <option selected>Select</option>
                            {props.authors.map((term) =>
                                <option value={term.id}>{term.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="availableCopies">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder="Available Copies"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default BookAdd;






