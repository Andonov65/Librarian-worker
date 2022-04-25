import React from "react";
import {useHistory} from "react-router-dom";

const BookEdit = (props) => {

    const history = useHistory();//chuva pateki za idenje napred i nazad niz aplikacijata
    const [formData, updateFormDate] = React.useState({
        name: "",
        category: "Select",
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
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !=="Select"  ? formData.category : props.book.category;
        const authorId = formData.authorId !==0  ? formData.authorId :  props.book.author.id;
        const availableCopies = formData.availableCopies !==0 ? formData.availableCopies :  props.book.availableCopies;

        props.onEditBook(props.book.id, name, category, authorId, availableCopies);

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

                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) => {
                                    if(props.book.category !== undefined &&
                                        props.book.category === term)
                                        return <option selected={props.book.category} value={term}>{term}</option>
                                    else
                                        return <option value={term}>{term}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId"  className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                    if(props.book.author !== undefined &&
                                        props.book.author.id === term.id)
                                        return <option selected={props.book.author.id} value={props.book.author.id}>{term.name}</option>
                                    else
                                        return <option value={term.id}>{term.name}</option>
                                }
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="availableCopies">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}

                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )

}

export default BookEdit;
