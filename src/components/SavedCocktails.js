import React, { Component } from 'react'
import CocktailInfo from './CocktailInfo';
import FilledBookmarkIcon  from './FilledBookmarkIcon';

class SavedCocktails extends Component {
    constructor() {
        super();
        this.state = {
            cocktailOffline: {},
            selectedCocktail: {}
        }
    }

    componentWillMount() {
        if (localStorage.cocktailOffline) {
            this.setState({ cocktailOffline: JSON.parse(localStorage.cocktailOffline) })
        }
    }

    expandView = (selected) => {
        this.setState({ selectedCocktail :  selected })
        this.refs.dialog.setAttribute('open', true)
    }

    closeDialog = () => {
        this.refs.dialog.removeAttribute('open');
    }

    unsave = (e, id) => {
        e.stopPropagation();
        const { cocktailOffline } = this.state;

        if (cocktailOffline.hasOwnProperty(id)) {
            delete cocktailOffline[id];
            this.setState({ cocktailOffline: cocktailOffline });
            localStorage.setItem('cocktailOffline', JSON.stringify(cocktailOffline));
        }
    }

    render() {
        let showContent;
        const { cocktailOffline } = this.state; 

        if (Object.keys(cocktailOffline).length === 0) {
            showContent = <div className="offline-msg">You haven't bookmarked any cocktail recipe yet!</div>
        } else {
            showContent = Object.keys(cocktailOffline).map((key) => (
                (<div className="saved-card" key={cocktailOffline[key].idDrink} onClick={() => this.expandView(cocktailOffline[key])}>
                    {cocktailOffline[key].strDrink}
                    <button type="button" onClick={(e) => this.unsave(e, key)}><FilledBookmarkIcon/></button>
                </div>)
            ))
        }

        return (
            <div>
                    {showContent}
                    <dialog ref="dialog">
                        <button onClick={this.closeDialog}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path d="M 10.8125 9.28125 L 4.09375 16 L 10.8125 22.71875 L 12.21875 21.28125 L 7.9375 17 L 28 17 L 28 15 L 7.9375 15 L 12.21875 10.71875 Z "/></g></svg>
                        </button>
                        <CocktailInfo selectedCocktail={this.state.selectedCocktail} />
                    </dialog>
            </div>
        )
    }
}

export default SavedCocktails;