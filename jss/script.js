class Memorama{

    constructor() {

        this.canPlay = false;

        this.card1 = null;
        this.card2 = null;

        this.availableImages = [1, 6, 7, 5, 3, 8, 4];
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );

        this.maxPairNumber = this.availableImages.length;

        this.startGame();
    }

    startGame() {
        this.foundPairs = 0;
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
        this.continuePlaying();
    }

    setNewOrder() {
        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() -0.5 );
    }

    setImagesInCards() {

        for (const key in this.cards) {

            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];

            card.dataset.image = image;
            imgLabel.src = `./imagess/${image}.jpeg`;
        }
    }

    openCards() {
        this.cards.forEach( card => card.classList.add("opened") );

        setTimeout(() => {
            this.closeCards();            
        }, 3000);
    }

    closeCards() {

        this.cards.forEach( card => card.classList.remove("opened") );
        this.addClickEvents();
        this.canPlay = true;
    }

    continuePlaying() {
        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;
    }

    addClickEvents() {

        this.cards.forEach(card => card.addEventListener("click", this.flipCard.bind(this)) );
        
        document.getElementById("reset-button").addEventListener("click", this.resetGame.bind(this));
        document.getElementById("continue-button").addEventListener("click", this.continuePlaying.bind(this));
    }

    removeClickEvents() {
        this.cards.forEach( card => card.removeEventListener("click", this.flipCard) );
    }

    flipCard(e) {

        const clickedCard = e.target;

        if (this.canPlay && !clickedCard.classList.contains("opened")) {

            clickedCard.classList.add("opened");
            this.checkPair( clickedCard.dataset.image );
        }
    }

    checkPair(image) {

        if (!this.card1) this.card1 = image;
        else this.card2 = image;

        if (this.card1 && this.card2) {

            if (this.card1 == this.card2) {

                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300);
            }
            else {

                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 800);
            }
        }
    }

    resetOpenedCards() {

        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;
    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {

            alert("¡Felicidades le has roto el culo al otro jugador!");
            this.setNewGame();
        }
    }

    setNewGame() {

        this.removeClickEvents();
        this.cards.forEach( card => card.classList.remove("opened") );

        setTimeout(this.startGame.bind(this), 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Memorama();
});