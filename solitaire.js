import { assignCardContents, defaultContent, setCustomBackground } from './cardConfig.js';

setCustomBackground('https://www.carlsberg.com/static/dist/img/betterments/greener-green/frames-n-4/label_1.jpg');


var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

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

// Declare assignedContent in the global scope
let assignedContent = {};

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
    assignedContent = assignCardContents(); // Assign contents to cards
    dealCards();
    setupEnlargedCardArea(); // Add this line
}

// Add this new function
function setupEnlargedCardArea() {
    const closeUpArea = document.getElementById('close-up-area');

    // Create the instruction overlay if it doesn't exist
    let instructionOverlay = document.getElementById('instruction-overlay');
    if (!instructionOverlay) {
        instructionOverlay = document.createElement('div');
        instructionOverlay.id = 'instruction-overlay';
        instructionOverlay.textContent = 'Click on any card for close-up';
        closeUpArea.appendChild(instructionOverlay);
    }

    // Add this: Create the iframe for content
    let contentFrame = document.getElementById('content-frame');
    if (!contentFrame) {
        contentFrame = document.createElement('iframe');
        contentFrame.id = 'content-frame';
        contentFrame.style.display = 'none';
        contentFrame.style.width = '70%';
        contentFrame.style.height = '84%';
        contentFrame.style.border = 'none';
        contentFrame.style.position = 'absolute';
        contentFrame.style.left = '50%';
        contentFrame.style.top = '50%';
        contentFrame.style.transform = 'translate(-50%, -55%)';
        contentFrame.style.zIndex = '0'; // Initially set to 0
        closeUpArea.appendChild(contentFrame);
    }
}

// Deal the cards to the tableau
function dealCards() {
    const gameBoard = document.getElementById('game-board');

    // Clear the game board if restarting
    gameBoard.innerHTML = '';

    // Positioning constants
    const pileWidth = viewportHeight * 0.12;
    const pileHeight = viewportHeight * 0.18;
    const pileSpacing = viewportWidth * 0.02; // Horizontal spacing between piles
    const cardOverlap = viewportHeight * 0.03; // Vertical overlapping of cards

    const topRowY = 0; // Y-coordinate for the top row (foundations and draw piles)
    const bottomRowY = viewportHeight * 0.25; // Y-coordinate for the bottom row (tableau)

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

            // Position cards within the pile
            card.style.position = 'absolute';
            card.style.top = (j * cardOverlap) + 'px'; // Use cardOverlap for vertical spacing

            pile.appendChild(card);
        }

        gameBoard.appendChild(pile);
    }

    // Add remaining cards to the stock
    deck.forEach((cardData, index) => {
        const zIndex = index; // Set z-index based on position
        const card = createCardElement(cardData, false, zIndex, false); // Pass false to prevent adding click listener
        card.style.position = 'absolute'; // Ensure absolute positioning
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

    // Assign color class based on suit
    const suit = cardData.suit;
    if (suit === '♥' || suit === '♦') {
        card.classList.add('red-card');
    } else {
        card.classList.add('black-card');
    }

    // Get the content assigned to this card
    const cardKey = cardData.rank + cardData.suit;
    const content = assignedContent[cardKey] || defaultContent;

    if (isFaceUp) {
        // Add rank and suit overlays
        const topLeftValue = document.createElement('div');
        topLeftValue.className = 'card-corner top-left';
        topLeftValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(topLeftValue);

        const bottomRightValue = document.createElement('div');
        bottomRightValue.className = 'card-corner bottom-right';
        bottomRightValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(bottomRightValue);

        // Add card images if available
        if (content.images && content.images.length > 0) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-image-container';
            content.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.className = 'card-image';
                img.src = image.src;
                img.style.opacity = index === 0 ? 1 : 0;
                imgContainer.appendChild(img);

                // Preload the image
                const preloadImg = new Image();
                preloadImg.src = image.src;
            });
            card.appendChild(imgContainer);
            startSlideshow(imgContainer, content.images, defaultContent.defaultSlideshowDuration, defaultContent.defaultTransition);
        }

        // Add custom text with embedded link if available
        if (content.text) {
            const customText = document.createElement('div');
            customText.className = 'custom-text';

            if (content.link) {
                const link = document.createElement('a');
                link.href = content.link;
                link.textContent = content.text;
                link.addEventListener('click', handleLinkClick);
                customText.appendChild(link);
            } else {
                customText.textContent = content.text;
            }

            // Apply custom text styles
            const textStyle = { ...defaultContent.textStyle, ...content.textStyle };
            Object.assign(customText.style, textStyle);

            card.appendChild(customText);
        }
    } else {
        card.classList.add('hidden');
        card.draggable = false;
    }

    if (addClickListener) {
        card.addEventListener('click', handleCardClick);
    }

    if (isFaceUp) {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }

    return card;
}

function startSlideshow(container, images, defaultDuration, defaultTransition) {
    if (images.length <= 1) return; // Don't start slideshow for single image

    // Clear any existing timeouts associated with this container
    if (container.slideshowTimeouts) {
        container.slideshowTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    }
    container.slideshowTimeouts = []; // Reset the array

    let currentIndex = 0;
    const imgElements = container.querySelectorAll('.card-image, .enlarged-card-image');

    // Set up initial state
    imgElements.forEach((img, index) => {
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.zIndex = '1'; // Set all images to the same z-index
    });

    function transitionToNextImage() {
        const currentImg = imgElements[currentIndex];
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImg = imgElements[nextIndex];
        const duration = images[currentIndex].duration || defaultDuration;
        const transition = images[currentIndex].transition || defaultTransition;

        // Fade in the next image
        nextImg.style.transition = `opacity ${transition}ms`;
        nextImg.style.opacity = '1';

        // Fade out the current image
        const delay = transition / 2;
        const fadeOutTimeoutId = setTimeout(() => {
            currentImg.style.transition = `opacity ${transition}ms`;
            currentImg.style.opacity = '0';
        }, delay);
        container.slideshowTimeouts.push(fadeOutTimeoutId);

        // After transition, reset states and move to next image
        const nextTransitionTimeoutId = setTimeout(() => {
            currentImg.style.transition = 'none';
            nextImg.style.transition = 'none';
            currentIndex = nextIndex;

            // Schedule next transition
            const nextTimeoutId = setTimeout(transitionToNextImage, duration - transition);
            container.slideshowTimeouts.push(nextTimeoutId);
        }, transition);
        container.slideshowTimeouts.push(nextTransitionTimeoutId);
    }

    // Start the slideshow
    const initialTimeoutId = setTimeout(transitionToNextImage, images[0].duration || defaultDuration);
    container.slideshowTimeouts.push(initialTimeoutId);
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

            // Set position to absolute
            card.style.position = 'absolute';
            card.style.left = '0px';
            card.style.top = '0px'; // No overlap in foundation piles
            card.style.zIndex = startingZIndex;
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

                // Set position to absolute
                card.style.position = 'absolute';
                card.style.left = '0px';

                // Calculate the top position based on the pile's overlapping
                const topPosition = (startingZIndex + index) * (viewportHeight * 0.03); // Use cardOverlap value
                card.style.top = `${topPosition}px`;
                card.style.zIndex = startingZIndex + index;
                card.style.display = ''; // Ensure the card is visible
                dropTargetPile.appendChild(card);
            });
        }

        // Reveal the last card in the source pile if it's hidden
        if (
            dragSourcePile.classList.contains('pile') &&
            dragSourcePile.lastChild &&
            dragSourcePile.lastChild.classList.contains('hidden')
        ) {
            const lastCard = dragSourcePile.lastChild;
            revealCard(lastCard);
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
        card.style.position = 'absolute'; // Ensure absolute positioning
        card.style.top = `${zIndex * -0.5}px`; // Slight overlap

        // Update the card's content
        const cardData = {
            rank: card.dataset.rank,
            suit: card.dataset.suit,
        };
        const cardKey = cardData.rank + cardData.suit;
        const content = assignedContent[cardKey] || defaultContent;

        // Clear existing content
        card.innerHTML = '';

        // Add rank and suit overlays
        const topLeftValue = document.createElement('div');
        topLeftValue.className = 'card-corner top-left';
        topLeftValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(topLeftValue);

        const bottomRightValue = document.createElement('div');
        bottomRightValue.className = 'card-corner bottom-right';
        bottomRightValue.textContent = cardData.rank + cardData.suit;
        card.appendChild(bottomRightValue);

        // Add card images if available
        if (content.images && content.images.length > 0) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-image-container';
            content.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.className = 'card-image';
                img.src = image.src;
                img.style.opacity = index === 0 ? 1 : 0;
                imgContainer.appendChild(img);
            });
            card.appendChild(imgContainer);
            startSlideshow(imgContainer, content.images, content.defaultSlideshowDuration, content.defaultTransition);
        }

        // Add custom text if available
        if (content.text) {
            const customText = document.createElement('div');
            customText.className = 'custom-text';

            if (content.link) {
                const link = document.createElement('a');
                link.href = content.link;
                link.textContent = content.text;
                link.addEventListener('click', handleLinkClick);
                customText.appendChild(link);
            } else {
                customText.textContent = content.text;
            }

            // Apply custom text styles
            const textStyle = { ...defaultContent.textStyle, ...content.textStyle };
            Object.assign(customText.style, textStyle);

            card.appendChild(customText);
        }

        // Ensure the card is absolutely positioned within the waste pile
        card.style.position = 'absolute';
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

// Handle card clicks to display the enlarged card and adjust z-index of open iframes
function handleCardClick(e) {
    const card = e.currentTarget;
    // Only display enlarged card if it's not hidden
    if (!card.classList.contains('hidden')) {
        displayEnlargedCard(card);
        // Adjust z-index of open iframes to 0
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.zIndex = '0';
        });
    }
}

function displayEnlargedCard(card) {
    const enlargedCardContainer = document.getElementById('enlarged-card');
    const instructionOverlay = document.getElementById('instruction-overlay');
    const contentFrame = document.getElementById('content-frame');

    enlargedCardContainer.innerHTML = ''; // Clear previous content
    enlargedCardContainer.className = ''; // Reset classes

    // Hide the instruction overlay
    instructionOverlay.style.display = 'none';

    // Copy the card classes
    enlargedCardContainer.className = '';
    enlargedCardContainer.classList.add(card.classList.contains('red-card') ? 'red-card' : 'black-card');
    if (card.classList.contains('hidden')) {
        enlargedCardContainer.classList.add('hidden');
    }

    // Set z-index of the enlarged card to 1
    enlargedCardContainer.style.zIndex = '1';

    const cardRank = card.dataset.rank;
    const cardSuit = card.dataset.suit;
    const cardKey = cardRank + cardSuit;
    const content = assignedContent[cardKey] || defaultContent;

    // Add card images if available
    if (content.images && content.images.length > 0) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'card-image-container enlarged';
        content.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.className = 'enlarged-card-image';
            img.src = image.src;
            img.style.opacity = index === 0 ? 1 : 0;
            imgContainer.appendChild(img);
        });
        enlargedCardContainer.appendChild(imgContainer);
        startSlideshow(imgContainer, content.images, defaultContent.defaultSlideshowDuration, defaultContent.defaultTransition);
    }

    // Add rank and suit overlays
    const topLeftValue = document.createElement('div');
    topLeftValue.className = 'card-corner top-left enlarged';
    topLeftValue.textContent = cardRank + cardSuit;
    enlargedCardContainer.appendChild(topLeftValue);

    const bottomRightValue = document.createElement('div');
    bottomRightValue.className = 'card-corner bottom-right enlarged';
    bottomRightValue.textContent = cardRank + cardSuit;
    enlargedCardContainer.appendChild(bottomRightValue);

    // Add custom text with embedded link if available
    if (content.text) {
        const customText = document.createElement('div');
        customText.className = 'custom-text enlarged';

        if (content.link) {
            const link = document.createElement('a');
            link.href = content.link;
            link.textContent = content.text;
            link.addEventListener('click', handleLinkClick);
            customText.appendChild(link);
        } else {
            customText.textContent = content.text;
        }

        // Apply custom text styles for enlarged card
        const textStyle = { ...defaultContent.textStyle, ...content.textStyle };
        Object.assign(customText.style, {
            ...textStyle,
            fontSize: `${parseInt(textStyle.fontSize) * 3}px`, // Increase font size for enlarged card
            bottom: '40px', // Adjust bottom position for enlarged card
            maxWidth: '280px' // Adjust max width for enlarged card
        });

        enlargedCardContainer.appendChild(customText);
    }

    // Show the enlarged card
    enlargedCardContainer.style.display = 'block';

    // Add click event listener to the enlarged card
    enlargedCardContainer.addEventListener('click', () => {
        console.log('click');
    });
}

function moveCard(card, targetPile) {
    const sourcePile = card.parentElement;
    sourcePile.removeChild(card);

    // Update positions of remaining cards in the source pile
    updatePilePositions(sourcePile);

    // Add card to target pile
    targetPile.appendChild(card);

    // Update positions in the target pile
    updatePilePositions(targetPile);

    // Update draggable state for cards in both piles
    updateDraggableState(sourcePile);
    updateDraggableState(targetPile);
}

function updatePilePositions(pile) {
    const cards = Array.from(pile.children);
    cards.forEach((card, index) => {
        card.style.zIndex = index;
        card.style.top = (index * cardOverlap) + 'px';
    });
}

function updateDraggableState(pile) {
    const cards = Array.from(pile.children);
    cards.forEach((card, index) => {
        if (index === cards.length - 1) {
            card.draggable = true;
            card.classList.remove('hidden');
        } else {
            card.draggable = false;
        }
    });
}

function revealCard(card) {
    card.classList.remove('hidden');
    card.draggable = true;
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    card.addEventListener('click', handleCardClick);

    // Update the card's content
    const cardData = {
        rank: card.dataset.rank,
        suit: card.dataset.suit,
    };
    const cardKey = cardData.rank + cardData.suit;
    const content = assignedContent[cardKey] || defaultContent;

    // Clear existing content
    card.innerHTML = '';

    // Add rank and suit overlays
    const topLeftValue = document.createElement('div');
    topLeftValue.className = 'card-corner top-left';
    topLeftValue.textContent = cardData.rank + cardData.suit;
    card.appendChild(topLeftValue);

    const bottomRightValue = document.createElement('div');
    bottomRightValue.className = 'card-corner bottom-right';
    bottomRightValue.textContent = cardData.rank + cardData.suit;
    card.appendChild(bottomRightValue);

    // Add card images if available
    if (content.images && content.images.length > 0) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'card-image-container';
        content.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.className = 'card-image';
            img.src = image.src;
            img.style.opacity = index === 0 ? 1 : 0;
            imgContainer.appendChild(img);
        });
        card.appendChild(imgContainer);
        startSlideshow(imgContainer, content.images, content.defaultSlideshowDuration, content.defaultTransition);
    }

    // Add custom text if available
    if (content.text) {
        const customText = document.createElement('div');
        customText.className = 'custom-text';

        if (content.link) {
            const link = document.createElement('a');
            link.href = content.link;
            link.textContent = content.text;
            link.addEventListener('click', handleLinkClick);
            customText.appendChild(link);
        } else {
            customText.textContent = content.text;
        }

        // Apply custom text styles
        const textStyle = { ...defaultContent.textStyle, ...content.textStyle };
        Object.assign(customText.style, textStyle);

        card.appendChild(customText);
    }
}

// Update the handleLinkClick function
function handleLinkClick(event) {
    event.preventDefault();
    const link = event.target.href;
    const contentFrame = document.getElementById('content-frame');
    const enlargedCardContainer = document.getElementById('enlarged-card');
    const instructionOverlay = document.getElementById('instruction-overlay');
    // Show and load the content frame
    contentFrame.style.display = 'block';
    contentFrame.src = link;
    // Change the z-index of the #enlarged-card by multiplying it by -1
    const enlargedCard = document.getElementById('enlarged-card');
    enlargedCard.style.zIndex = `${parseInt(enlargedCard.style.zIndex) * -1}`;
}

document.addEventListener('DOMContentLoaded', function () {

    const toggleZIndexButton = document.getElementById('toggleZIndex');
    const closeup = document.getElementById('closeup');
    let isZIndexNegative = false;

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            event.preventDefault();
            toggleZIndexButton.click();
        }
    });
    toggleZIndexButton.addEventListener('click', function () {
        document.getElementById('enlarged-card').style.zIndex *= -1;
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.zIndex = '0';
        });
    });
    openNewTab.addEventListener('click', function () {
        const contentFrame = document.getElementById('content-frame');
        if (contentFrame && contentFrame.src) {
            window.open(contentFrame.src, '_blank');
        }
    });
});

initGame();
