<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Solitaire Game</title>
    <style>
        body {
            background-color: green;
            font-family: Arial, sans-serif;
            color: white;
            text-align: center;
        }

        /* New container to align game board and close-up area */
        #game-container {
            display: flex;
            justify-content: flex-start;
            width: 100vw;
            height: 100vh;
        }

        #game-board {
            margin: 2vh 0 2vh 0;
            width: 60%;
            position: relative;
        }

        .pile,
        .stock-pile,
        .waste-pile,
        .foundation {
            position: absolute;
            width: 14vh;
            height: 21vh;
        }

        .pile {
            position: absolute;
            width: 14vh;
            height: 21vh;
        }

        .stock-pile,
        .waste-pile {
            width: 14vh;
            height: 21vh;
        }

        .stock-pile .card,
        .waste-pile .card {
            position: absolute;
            left: 0;
            transition: top 0.3s ease;
        }

        .card {
            width: 14vh;
            height: 21vh;
            position: relative;
            /* Change to relative to contain absolutely positioned children */
            border: 0.2vh solid black;
            border-radius: 5px;
            background-color: #fff;
            overflow: hidden;
        }

        .card.hidden {
            background-color: #007700;
            border-color: #007700;/ cursor: pointer;
            /* background-image: url('https://i.pinimg.com/564x/51/70/ff/5170ffda8f8c80447d04f380babd1cf5.jpg'); */
            background-image: url('https://i.pinimg.com/564x/51/70/ff/5170ffda8f8c80447d04f380babd1cf5.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 0.2vh solid black;
        }

        /* Hide the rank and suit for hidden cards */
        .card.hidden .card-value {
            display: none;
        }

        .foundation {
            width: 14vh;
            height: 21vh;
            position: absolute;
            border: 2px dashed #fff;
            border-radius: 5px;
            background-color: #007700;
            margin: 0;
        }

        /* Remove placeholder styling when foundation has a card */
        .foundation.has-card {
            border: none;
            background-color: transparent;
        }

        /* Style for the rank and suit in the upper-left corner */
        .card-corner {
            position: absolute;
            font-size: 0.85vw;
            font-weight: bold;
            background: radial-gradient(ellipse, white, transparent);
            padding: 2px 5px;
            border-radius: 15px;
            z-index: 2;
            /* Ensure this is higher than the image z-index */
            /* Ensure it's above the card image */
        }

        /* Apply color to card corners for red and black cards */
        .card.red-card .card-corner,
        #enlarged-card.red-card .card-corner {
            color: red;
        }

        .card.black-card .card-corner,
        #enlarged-card.black-card .card-corner {
            color: black;
        }

        .card-corner.top-left {
            top: 2px;
            left: 2px;
        }

        .card-corner.bottom-right {
            bottom: 2px;
            right: 2px;
            transform: rotate(180deg);
        }

        /* Hide the card corners when the card is face down */
        .card.hidden .card-corner {
            display: none;
        }

        /* Visual feedback during dragging */
        .dragging {
            opacity: 0.5;
        }

        /* Close-up area on the right */
        #close-up-area {
            width: 40%;
            height: 100%;
            margin-top: 20px;
            margin-left: 20px;
            position: relative;
        }

        #enlarged-card {
            width: 70%;
            height: 84%;
            position: absolute;
            display: none;
            border: 0.3vh solid black;
            border-radius: 5px;
            /* Increased border-radius for rounder edges */
            background-color: #fff;
            color: black;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -55%);
        }

        /* Instruction overlay */
        #instruction-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3vh;
            text-align: center;
            color: white;
            padding: 20px;
            box-sizing: border-box;
            pointer-events: none;
            /* This makes the overlay non-interactive */
            z-index: -10;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -55%);
        }

        /* Enlarged card corner styles */
        #enlarged-card .card-corner.enlarged {
            font-size: 4vh;
            padding: 5px 15px;
            border-radius: 35px;
        }

        #enlarged-card .card-corner.top-left.enlarged {
            top: 1vh;
            left: 1vh;
        }

        #enlarged-card .card-corner.bottom-right.enlarged {
            bottom: 1vh;
            right: 1vh;
            transform: rotate(180deg);
        }

        /* Card images container */
        .card-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            /* Ensure this is lower than the card-corner z-index */
        }

        /* Card images on the game board */
        .card-image {
            /* Removed opacity and transition properties */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .card-image.active {
            opacity: 1;
        }

        /* Enlarged card image container */
        .card-image-container.enlarged {
            width: 100%;
            height: 100%;
        }

        /* Enlarged card image */
        .enlarged-card-image {
            /* Removed opacity and transition properties */
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .enlarged-card-image.active {
            opacity: 1;
        }

        /* Small text for cards on the board */
        .custom-text {
            position: absolute;
            bottom: 20px;
            /* Position at the bottom */
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            text-align: center;
            color: black;
            background: radial-gradient(ellipse at center, white, transparent);
            padding: 2px 5px;
            border-radius: 10px;
            z-index: 2;
            /* Ensure this is higher than the image z-index */
            /* Ensure it's above the image and other elements */
            width: 90%;
            max-width: 70px;
        }

        /* Larger text for enlarged card */
        .custom-text.enlarged {
            bottom: 20px;
            font-size: 26px;
            padding: 5px 10px;
            max-width: 280px;
            /* Adjust as needed */
            z-index: 3;
        }

        :root {
            --card-overlap: 20px;
            /* Adjust this value as needed */
        }

        /* Override default link styles */
        .custom-text a {
            color: inherit;
            text-decoration: inherit;
            font-style: inherit;
            font-weight: inherit;
        }

        #custom-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10000;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        #toggleZIndex {
            position: absolute;
            bottom: 5%;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #openNewTab {
            position: absolute;
            bottom: 5%;
            left: 75%;
            transform: translateX(-50%);
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="game-container">
        <div id="custom-background"></div>
        <div id="game-board">
            <!-- Game board will be populated by JavaScript -->
        </div>
        <div id="close-up-area">
            <!-- Enlarged card will be displayed here -->
            <div id="enlarged-card"></div>
            <button id="toggleZIndex">Toggle Z-Index</button>
            <button id="openNewTab">Open in New Tab</button>
            <div id="instruction-overlay">Click on any card for close-up</div>
        </div>
    </div>
    <script type="module" src="solitaire.js"></script>
</body>

</html>
