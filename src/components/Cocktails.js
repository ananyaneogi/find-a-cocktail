import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CocktailInfo from './CocktailInfo';
import BookmarkIcon from './BookmarkIcon';
import FilledBookmarkIcon from './FilledBookmarkIcon';

class Cocktail extends Component {
    constructor() {
        super();
        this.state = {
            cocktail: [],
            cocktailOffline: {},
            isSaved: false,
            isOffline: false
        }
    }
    
    componentDidMount() {
        this.getRandomCocktail();
        if(!navigator.onLine) {
            this.setState({ isOffline: true })
        }
    }

    getRandomCocktail = () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        axios.get(url).then(res => {
            this.setState({ 
                isSaved:false, 
                cocktail: res.data.drinks[0] 
            })
            if (localStorage.cocktailOffline) {
                this.setState({ cocktailOffline: JSON.parse(localStorage.cocktailOffline) });
            }
            if(this.state.cocktailOffline.hasOwnProperty(this.state.cocktail.idDrink)) {
                this.setState({ isSaved: true });
            }
        });
    }

    saveOffline = () => {
        let cocktailData = this.state.cocktailOffline;

        if (cocktailData.hasOwnProperty(this.state.cocktail.idDrink)) {
            delete cocktailData[this.state.cocktail.idDrink];
            this.setState({
                cocktailOffline: cocktailData,
                isSaved: false 
        });
        } else {
            cocktailData[this.state.cocktail.idDrink] = this.state.cocktail;
            this.setState({ 
                cocktailOffline: cocktailData,
                isSaved: true
            });
        }

        localStorage.setItem('cocktailOffline', JSON.stringify(cocktailData));
    }

    render() {
        let mainContent;
        if(this.state.isOffline) {
            mainContent = <div className="offline-msg"> <span role="img" aria-label="information person">💁</span> Hey! You're offline. Go to <Link to="/saved">Bookmarks</Link> to view your saved cocktail recipes.</div>
        } else {
            mainContent = (
                <React.Fragment>
                    <CocktailInfo
                        selectedCocktail={this.state.cocktail}
                        saveOffline={this.saveOffline}
                        btnData={this.state.isSaved ? <FilledBookmarkIcon showInfo={true} /> : <BookmarkIcon />}
                        isMainPage={true}
                        />
    
                    <button className="refresh-fab" onClick={this.getRandomCocktail}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g id="surface1"><path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z " /></g></svg>
                    </button>
                </React.Fragment>
            )
        }
        return (
            <main>
                {mainContent}
            </main>
        );
    }
}

export default Cocktail;