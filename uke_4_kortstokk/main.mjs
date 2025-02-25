// // import { fetchData } from "./fetches.mjs";
// // import {deckContainer, drawCardBtn, shuffleDeckBtn} from '../public/index.html';
import {newDeck, shuffleDeck, drawCard} from './kortFunksjoner.mjs';



document.addEventListener('DOMContentLoaded', () => {
const deckContainer = document.getElementById('deckContainer');
const drawCardBtn = document.getElementById('drawCardBtn');
const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
// const deckContainer = document.getElementById('deckContainer');
// const drawCardBtn = document.getElementById('drawCardBtn');
// const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
let url = "http://localhost:8000/temp/deck";
// let currentDeckId = null;
let currentDeckId = localStorage.getItem('currentDeckId');

    async function loadDeck() {
        console.log('Loading deck');
        if(currentDeckId === null){
        try {

            let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            let data = await response.json();
            console.log(data);

            currentDeckId = data.deck_id;
            localStorage.setItem('currentDeckId', currentDeckId);
            console.log('Deck id:', currentDeckId);

            let theDiv = document.createElement('div');
            theDiv.innerHTML = `
                <h2>Your deck id: ${data.deck_id}</h2>
                `;
            deckContainer.appendChild(theDiv);
            return data;

        } catch (error) {
            console.log('Error:', error);
        }; 
     }else {
            console.log('Deck already loaded:', currentDeckId);
            let theDiv = document.createElement('div');
            theDiv.innerHTML = `
                <h2>Your deck id: ${currentDeckId}</h2>
            `;
            deckContainer.appendChild(theDiv)
        }
    } 

    async function loadCard(deck_id){

        try {
            const drawCardUrl = url + "/" + deck_id + "/card";
            let response = await fetch(drawCardUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);

            // for(let card of data.deck){
                let theDiv = document.createElement('div');
                theDiv.innerHTML = `
                    <h2>${card.suit} ${card.value}</h2>
                `;
                deckContainer.appendChild(theDiv);
                console.log('Card:', card);
            // }

            return data;
            
        } catch (error) {
            console.log('Error:', error);
        }

    };

    drawCardBtn.addEventListener('click', function(evt){
        evt.preventDefault();
        if (currentDeckId !== null) {
            loadCard(currentDeckId);
            console.log('Drawing card');
        } else {
            console.log('No deck loaded');
        }
    });
    
    loadDeck();
    //loadCard();
});
