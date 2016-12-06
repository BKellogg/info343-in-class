import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var IMG_BASE = "https://image.tmdb.org/t/p/w154/";
        return (
            <div>
                <img src={IMG_BASE + this.props.movie.poster_path}/>
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.overview}</p>
            </div>
        );
    }
}