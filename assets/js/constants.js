const FPS = 1000 / 60;

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 750;

const BACKGROUND_MAIN = '/assets/images/background/backgroundOne.jpg';

const MUSIC_GAME = ['/assets/music/1-07. May.mp3',
                    '/assets/music/1-07. May.mp3',
                    '/assets/music/1-12 - Oldale Town.mp3',
                    '/assets/music/1-13 - Pokémon Center.mp3',
                    '/assets/music/1-35 - Cycling.mp3'];

// const GAME_OVER = '/assets/music/1-38 - Lose.mp3'


const POKEBALL = '/assets/images/sprites/pokeball.png';
const SUPERBALL = '/assets/images/sprites/superball.png';
const ULTRABALL = '/assets/images/sprites/ultraball.png';
const MASTERBALL = '/assets/images/sprites/masterball.png';
const STATIC_SUPERBALL = '/assets/images/sprites/super.png';
const STATIC_ULTRABALL = '/assets/images/sprites/ultra.png';
const STATIC_MASTERBALL = '/assets/images/sprites/master.png';
const STATIC_MEGA_STONE = '/assets/images/sprites/mega.png';

const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_THROW = 32;

const TRAINER_VX = 3;
const TRAINER_VY = 3;
const TRAINER_POKEBALL_RELOAD = 500;

let POKEBALL_SPEED = 3;
const POKEBALL_STRONG = 50;
const SUPERBALL_STRONG = 100;
const ULTRABALL_STRONG = 150;

const POKEMON_NORMAL_SPEED = 1;
const POKEMON_EXTRA_SPEED = 20;

const MAX_POKEMON_NUMBER = 146;
const MIN_POKEMON_NUMBER = 146;

const POKEMON_GENERATE_INTERVAL = 10000;

const MAX_POKEMON_GROUND = 5;
const POKEMON_OUT_DISTANCE = 600;

const LOCAL_STORAGE_SCORE_KEY = 'scores';

const DEBUG = false;