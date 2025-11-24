# POKE GAME

## Pokémon Trainer Game

**Languages and technologies used:**  
**JavaScript**, **HTML5**, **CSS3**, **Canvas API**

Become a Pokémon Trainer and **clear the battlefield** by moving Pokémon between the fences, guiding them or throwing Pokéballs, and using items strategically. Every match is a unique challenge!

[**Play the game online**](https://pokemon-moving-game.netlify.app)

---

## User Interface

- **Start Screen**: choose your avatar (boy or girl) before starting.  
- **Score Button**: view the top 5 high scores.  
- **Game Over Screen**: enter your name and return to the main menu using the corresponding button.  

Navigation is intuitive and smooth, ensuring a consistent and easy player experience.

---

## Game Items

During gameplay, you will find useful items:

- **Superball / Ultraball**: push Pokémon with greater force.  
- **Masterball**: instantly removes a Pokémon from the field.  
- **Mega Evolution Stone**: makes your trainer grow, allowing you to remove Pokémon faster.

---

## Effects by Pokémon Type

Each Pokémon type affects the trainer differently:

- **Fire, Poison, Dragon**: you lose one life.  
- **Grass, Normal, Fairy**: you gain one life.  
- **Water, Ice, Ground**: your movement becomes slippery.  
- **Ghost, Electric, Dark**: temporary paralysis.  
- **Psychic, Fighting, Flying**: confusion; Pokéballs are thrown in the opposite direction.  
- **Bug, Rock, Steel**: no effect on the trainer.

---

## Game Mechanics

- The field can contain a maximum of **5 Pokémon** at once.  
- If more than 5 Pokémon appear, you lose **one life**.  
- Every **10 seconds**, 1, 2, or 3 Pokémon spawn randomly.  
- To **pick up items**, stand directly on top of them.  
- A type counter displays which Pokémon types you have removed, sorted by the most defeated.  
- Each Pokémon removed grants **one point**.  
- Items disappear randomly after a short time, increasing difficulty.  
- Includes collision detection, movement, type-based interactions, and a full scoring system.

---

## Easter Egg

- Discover the secret easter egg by reading the route sign inside the game.

---

## How to Play

### Controls

- **Arrow Keys ← ↑ → ↓**: move the trainer.  
- **Spacebar**: throw a Pokéball.  
- **Right-click**: interact with UI buttons.

### Steps

1. Open the game in your browser.  
2. Select your avatar (boy or girl) and check the high scores.  
3. During the game, remove Pokémon and collect items to improve your stats.  
4. On Game Over, enter your name and return to the main menu.

---

## Credits

- Inspired by classic Pokémon games.  
- Pokémon data and images retrieved dynamically via the [PokéAPI](https://pokeapi.co/).  
- Music and sound effects from the [Pokémon Emerald Remastered OST](https://downloads.khinsider.com/game-soundtracks/album/pokemon-emerald-remastered-complete-original-soundtrack).
