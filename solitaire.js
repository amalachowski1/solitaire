import { getCustomText, getCardLink, faceCardImages } from './cardConfig.js';


const suits = ['♠', '♥', '♦', '♣'];
const ranks = [
    'A', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', 'J', 'Q', 'K'
];
let deck = [];
const rankOrder = {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13
};


// Variables to store drag state
let draggedCard = null;
let draggedCards = [];
let dragSourcePile = null;


// Create the deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Initialize the game
function initGame() {
    createDeck();
    shuffleDeck();
    dealCards();
}

// Deal the cards to the tableau
function dealCards() {
    const gameBoard = document.getElementById('game-board');

    // Clear the game board if restarting
    gameBoard.innerHTML = '';

    // Positioning constants
    const pileWidth = 80;
    const pileHeight = 120;
    const pileSpacing = 10; // Horizontal spacing between piles
    const cardOverlap = 20; // Vertical overlapping of cards

    const topRowY = 0; // Y-coordinate for the top row (foundations and draw piles)
    const bottomRowY = 150; // Y-coordinate for the bottom row (tableau)

    // Positions for stock and waste piles
    const stockPileX = 0;
    const wastePileX = stockPileX + pileWidth + pileSpacing;

    // Position for foundation piles starts after waste pile
    const foundationStartX = wastePileX + pileWidth + pileSpacing;

    // Create stock and waste piles
    const stockPile = document.createElement('div');
    stockPile.className = 'stock-pile';
    stockPile.style.left = stockPileX + 'px';
    stockPile.style.top = topRowY + 'px';
    gameBoard.appendChild(stockPile);

    const wastePile = document.createElement('div');
    wastePile.className = 'waste-pile';
    wastePile.style.left = wastePileX + 'px';
    wastePile.style.top = topRowY + 'px';
    gameBoard.appendChild(wastePile);

    // Create foundations
    const foundations = [];
    for (let i = 0; i < 4; i++) {
        const foundation = document.createElement('div');
        foundation.className = 'foundation';
        foundation.style.left = (foundationStartX + i * (pileWidth + pileSpacing)) + 'px';
        foundation.style.top = topRowY + 'px';
        gameBoard.appendChild(foundation);
        foundations.push(foundation);
    }

    // Calculate the starting x-coordinate for tableau piles
    const tableauStartX = stockPileX;

    // Create tableau piles
    for (let i = 0; i < 7; i++) {
        const pile = document.createElement('div');
        pile.className = 'pile';
        pile.style.left = (tableauStartX + i * (pileWidth + pileSpacing)) + 'px';
        pile.style.top = bottomRowY + 'px';

        for (let j = 0; j <= i; j++) {
            const cardData = deck.pop();
            const isFaceUp = j === i; // Only the top card is face-up
            const zIndex = j; // Set z-index based on position in the pile
            const card = createCardElement(cardData, isFaceUp, zIndex);
            pile.appendChild(card);
        }
        gameBoard.appendChild(pile);
    }

    // Add remaining cards to the stock
    deck.forEach((cardData, index) => {
        const zIndex = index; // Set z-index based on position
        const card = createCardElement(cardData, false, zIndex, false); // Pass false to prevent adding click listener
        card.style.top = -index * 0.5 + 'px'; // Slight offset to show card edges
        stockPile.appendChild(card);
    });

    // Add event listeners
    stockPile.addEventListener('click', drawCard);

    // Allow dropping on foundation and tableau piles
    const piles = document.querySelectorAll('.pile, .foundation');
    piles.forEach(pile => {
        pile.addEventListener('dragover', handleDragOver);
        pile.addEventListener('drop', handleDrop);
    });
}

function createCardElement(cardData, isFaceUp = false, zIndex = 0, addClickListener = true) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.suit = cardData.suit;
    card.dataset.rank = cardData.rank;
    card.style.zIndex = zIndex;
    card.draggable = isFaceUp;

    // Position the card within its pile
    card.style.top = zIndex * 20 + 'px';

    // Assign color class based on suit
    const suit = cardData.suit;
    if (suit === '♥' || suit === '♦') {
        card.classList.add('red-card');
    } else {
        card.classList.add('black-card');
    }

    // Determine if the card is a face card with an image
    const cardName = cardData.rank + cardData.suit;
    const isFaceCard = ['J', 'Q', 'K'].includes(cardData.rank);
    let hasImage = isFaceCard && faceCardImages[cardName];

    if (isFaceUp) {
        if (hasImage) {
            // Create an img element for the face card image
            const img = document.createElement('img');
            img.className = 'card-image';
            img.src = faceCardImages[cardName];
            card.appendChild(img);
        }

        // Add rank and suit overlay
        const cardValue = document.createElement('span');
        cardValue.className = 'card-value';
        cardValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(cardValue);

        // Add custom text for face cards
        const customText = document.createElement('span');
        customText.className = 'custom-text'; // Add a class for styling
        customText.textContent = getCustomText(cardData.rank, cardData.suit); // Get custom text based on rank and suit
        card.appendChild(customText);

        // Position the custom text at the bottom of the card
        customText.style.position = 'absolute';
        customText.style.bottom = '5px'; // Adjust as needed
        customText.style.left = '50%';
        customText.style.transform = 'translateX(-50%)'; // Center the text
    }

    if (!isFaceUp) {
        card.classList.add('hidden');
        card.draggable = false;
    } else {
        // Event listeners for drag-and-drop
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);

        // Only add click event listener to face-up cards
        if (addClickListener) {
            card.addEventListener('click', handleCardClick);
        }
    }

    return card;
}


// Event handlers
function handleDragStart(e) {
    // Ensure the target is a card (or traverse up if it's a child element)
    draggedCard = e.target.closest('.card'); // Find the nearest parent with the class 'card'

    // If for some reason there's no valid card, stop the drag
    if (!draggedCard) {
        return;
    }

    dragSourcePile = draggedCard.parentElement; // Set the source pile

    // Get the index of the dragged card in its pile
    const cardsInPile = Array.from(dragSourcePile.children);
    const draggedCardIndex = cardsInPile.indexOf(draggedCard);

    // If dragging multiple cards (sequence), store them
    draggedCards = cardsInPile.slice(draggedCardIndex);

    // Add dragging class for styling
    draggedCards.forEach(card => card.classList.add('dragging'));
}

function handleDragEnd(e) {
    // Remove dragging class
    if (draggedCards) {
        draggedCards.forEach(card => card.classList.remove('dragging'));
    }
    draggedCard = null;
    draggedCards = [];
    dragSourcePile = null;
}

function handleDragOver(e) {
    const dropTargetPile = e.currentTarget;
    const topCard = dropTargetPile.lastChild;

    // Prevent dropping onto hidden cards
    if (topCard && topCard.classList.contains('hidden')) {
        e.preventDefault();
        return;
    }

    e.preventDefault(); // Necessary to allow drop
}

function handleDrop(e) {
    e.preventDefault();
    const dropTargetPile = e.currentTarget;

    if (isValidMove(draggedCards[0], dropTargetPile)) {
        // Update z-index and position for the moved cards
        const startingZIndex = dropTargetPile.children.length;

        if (dropTargetPile.classList.contains('foundation')) {
            // Handle moving a card to the foundation pile
            const card = draggedCards[0];
            dragSourcePile.removeChild(card);
            card.style.zIndex = startingZIndex;
            card.style.top = '0px'; // No overlap in foundation piles
            card.style.display = ''; // Ensure the card is visible
            dropTargetPile.appendChild(card);

            // Hide the previous top card if any
            if (dropTargetPile.children.length > 1) {
                const previousCard = dropTargetPile.children[dropTargetPile.children.length - 2];
                previousCard.style.display = 'none';
            }

            // Add the 'has-card' class to remove placeholder styling
            dropTargetPile.classList.add('has-card');
        } else {
            // For tableau piles, handle moving multiple cards
            draggedCards.forEach((card, index) => {
                dragSourcePile.removeChild(card);
                card.style.zIndex = startingZIndex + index;
                card.style.top = (startingZIndex + index) * 20 + 'px'; // Overlap cards by 20px
                card.style.display = ''; // Ensure the card is visible
                dropTargetPile.appendChild(card);
            });
        }

        // If the last card in the source pile is hidden, reveal it
        if (
            dragSourcePile.classList.contains('pile') &&
            dragSourcePile.lastChild &&
            dragSourcePile.lastChild.classList.contains('hidden')
        ) {
            const lastCard = dragSourcePile.lastChild;
            lastCard.classList.remove('hidden');
            lastCard.draggable = true;
            lastCard.addEventListener('dragstart', handleDragStart);
            lastCard.addEventListener('dragend', handleDragEnd);
            lastCard.addEventListener('click', handleCardClick); // Add click event listener

            // Update the card's content
            const cardData = {
                rank: lastCard.dataset.rank,
                suit: lastCard.dataset.suit,
            };
            const isFaceCard = ['J', 'Q', 'K'].includes(cardData.rank);
            const cardName = cardData.rank + cardData.suit;
            let hasImage = isFaceCard && faceCardImages[cardName];

            // Clear existing content
            lastCard.innerHTML = '';

            if (hasImage) {
                // Add face card image
                const img = document.createElement('img');
                img.className = 'card-image';
                img.src = faceCardImages[cardName];
                lastCard.appendChild(img);
            }

            // Add rank and suit overlay
            const cardValue = document.createElement('span');
            cardValue.className = 'card-value';
            cardValue.textContent = cardData.rank + cardData.suit;
            lastCard.appendChild(cardValue);
        }

        // If the source was a foundation pile
        if (dragSourcePile.classList.contains('foundation')) {
            // Remove the moved card from the foundation pile
            // If there are cards left, show the new top card
            if (dragSourcePile.lastChild) {
                const topCard = dragSourcePile.lastChild;
                topCard.style.display = '';
            } else {
                // If the foundation pile is now empty, remove 'has-card' class
                dragSourcePile.classList.remove('has-card');
            }
        }
    }

    // Reset drag state
    handleDragEnd();
}



// Function to check if the move is valid
function isValidMove(card, targetPile) {
    const cardRank = rankOrder[card.dataset.rank];
    const cardSuit = card.dataset.suit;
    const cardColor = getColor(cardSuit);

    console.log(`Checking move for card ${card.dataset.rank}${card.dataset.suit}`);

    // If moving to foundation pile
    if (targetPile.classList.contains('foundation')) {
        const topCard = targetPile.lastChild;

        if (!topCard) {
            return cardRank === 1;
        } else {
            const topCardRank = rankOrder[topCard.dataset.rank];
            const topCardSuit = topCard.dataset.suit;
            return cardSuit === topCardSuit && cardRank === topCardRank + 1;
        }
    }

    // If moving to tableau pile
    if (targetPile.classList.contains('pile')) {
        const topCard = targetPile.lastChild;

        if (!topCard) {
            return cardRank === 13;
        } else if (topCard.classList.contains('hidden')) {
            return false;
        } else {
            const topCardRank = rankOrder[topCard.dataset.rank];
            const topCardSuit = topCard.dataset.suit;
            const topCardColor = getColor(topCardSuit);
            return cardRank === topCardRank - 1 && cardColor !== topCardColor;
        }
    }

    return false;
}

// Helper function to get the color of a suit
function getColor(suit) {
    if (suit === '♥' || suit === '♦') {
        return 'red';
    } else {
        return 'black';
    }
}

function drawCard(e) {
    const stockPile = document.querySelector('.stock-pile');
    const wastePile = document.querySelector('.waste-pile');
    if (stockPile.lastChild) {
        const card = stockPile.lastChild;
        card.classList.remove('hidden');
        card.draggable = true;
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('click', handleCardClick);

        stockPile.removeChild(card);

        // Reset position and z-index
        const zIndex = wastePile.children.length;
        card.style.zIndex = zIndex;
        card.style.top = zIndex * -0.5 + 'px'; // Slight overlap

        // Update the card's content
        const cardData = {
            rank: card.dataset.rank,
            suit: card.dataset.suit,
        };
        const isFaceCard = ['J', 'Q', 'K'].includes(cardData.rank);
        const cardName = cardData.rank + cardData.suit;
        let hasImage = isFaceCard && faceCardImages[cardName];

        // Clear existing content
        card.innerHTML = '';

        if (hasImage) {
            // Add face card image
            const img = document.createElement('img');
            img.className = 'card-image';
            img.src = faceCardImages[cardName];
            card.appendChild(img);
        }

        // Add rank and suit overlay
        const cardValue = document.createElement('span');
        cardValue.className = 'card-value';
        cardValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(cardValue);

        // Add custom text for face cards
        const customText = document.createElement('span');
        customText.className = 'custom-text'; // Add a class for styling
        customText.textContent = getCustomText(cardData.rank, cardData.suit);
        card.appendChild(customText);

        // Position the custom text at the bottom of the card
        customText.style.position = 'absolute';
        customText.style.bottom = '5px';
        customText.style.left = '50%';
        customText.style.transform = 'translateX(-50%)';

        wastePile.appendChild(card);
    } else {
        // Reset stock from waste
        while (wastePile.lastChild) {
            const card = wastePile.lastChild;
            card.classList.add('hidden');
            card.draggable = false;
            card.removeEventListener('dragstart', handleDragStart);
            card.removeEventListener('dragend', handleDragEnd);
            card.removeEventListener('click', handleCardClick);
            wastePile.removeChild(card);
            stockPile.appendChild(card);
        }
    }
}


// Handle card clicks to display the enlarged card
function handleCardClick(e) {
    const card = e.currentTarget;
    // Only display enlarged card if it's not hidden
    if (!card.classList.contains('hidden')) {
        displayEnlargedCard(card);
    }
}

function displayEnlargedCard(card) {
    const enlargedCardContainer = document.getElementById('enlarged-card');
    enlargedCardContainer.innerHTML = ''; // Clear previous content

    // Copy the card classes
    enlargedCardContainer.className = '';
    enlargedCardContainer.classList.add(card.classList.contains('red-card') ? 'red-card' : 'black-card');
    if (card.classList.contains('hidden')) {
        enlargedCardContainer.classList.add('hidden');
    }

    const cardRank = card.dataset.rank;
    const cardSuit = card.dataset.suit;

    /*
    // Add custom text for enlarged card
    const customText = document.createElement('span');
    customText.className = 'custom-text enlarged';
    customText.textContent = getCustomText(cardRank, cardSuit);
    enlargedCardContainer.appendChild(customText);
    */

    // Add a link to the enlarged card
    const cardLink = getCardLink(cardRank, cardSuit);
    if (cardLink) {
        const link = document.createElement('a');
        link.href = cardLink.url;
        link.textContent = cardLink.text;
        link.style.color = 'blue';
        link.style.textDecoration = 'underline';
        link.style.position = 'absolute';
        link.style.bottom = '40px';
        link.style.left = '50%';
        link.style.transform = 'translateX(-50%)';

        // Set attributes for opening in a new tab
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Prevent default behavior for both left and right clicks
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(cardLink.url, '_blank', 'noopener,noreferrer');
        });

        link.addEventListener('auxclick', (e) => {
            if (e.button === 1) { // Middle click
                e.preventDefault();
                window.open(cardLink.url, '_blank', 'noopener,noreferrer');
            }
        });

        link.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            window.open(cardLink.url, '_blank', 'noopener,noreferrer');
        });

        enlargedCardContainer.appendChild(link);
    }

    const cardName = card.dataset.rank + card.dataset.suit;
    const isFaceCard = ['J', 'Q', 'K'].includes(card.dataset.rank);
    let hasImage = isFaceCard && faceCardImages[cardName];

    if (card.classList.contains('hidden')) {
        // For hidden cards, no content
    } else if (hasImage) {
        // Display the image
        const img = document.createElement('img');
        img.className = 'enlarged-card-image';
        img.src = faceCardImages[cardName];
        enlargedCardContainer.appendChild(img);
    }

    // Add rank and suit overlay
    const cardValue = document.createElement('span');
    cardValue.className = 'card-value';
    cardValue.textContent = card.dataset.rank + card.dataset.suit;
    enlargedCardContainer.appendChild(cardValue);

    // Show the enlarged card
    enlargedCardContainer.style.display = 'block';
}


initGame();
