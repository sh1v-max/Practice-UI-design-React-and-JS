// ----- CONFIG -----
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1024;
const GRID_SIZE = 4;
const CELL_SIZE = 110;
const CELL_GAP = 12;
const TILE_VALUES = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20];

const config = {
  type: Phaser.AUTO,
  width: DESIGN_WIDTH,
  height: DESIGN_HEIGHT,
  backgroundColor: '#ffe4e8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: { preload, create }
};

new Phaser.Game(config);

// ----- STATE -----
let state = {
  grid: Array(16).fill(null),
  queue: [],
  score: 0,
  best: 0,
  level: 1,
  trash: 3,
  undoStack: [],
  gameOver: false
};

let gridCells = [];
let gridSprites = new Array(16).fill(null);
let queueSprites = [];
let scoreText, bestText, levelText, trashText;
let sceneRef;

// ----- HELPERS -----
const idx = (r, c) => r * GRID_SIZE + c;

function preload() {}

function create() {
  const scene = this;
  sceneRef = scene;

  // best from localStorage
  state.best = parseInt(localStorage.getItem('jd-best') || '0');

  createHeader(scene);
  createGrid(scene);
  createRightPanel(scene);

  initQueue();
  drawAll(scene);
  setupDrag(scene);
  setupKeyboard(scene);
}

function createHeader(scene) {
  scene.add.text(DESIGN_WIDTH / 2, 60, 'JUST DIVIDE', {
    fontSize: '54px',
    fontStyle: 'bold',
    color: '#444'
  }).setOrigin(0.5);

  scene.add.text(DESIGN_WIDTH / 2, 110, 'Drag tiles, divide, and clear!', {
    fontSize: '24px',
    color: '#666'
  }).setOrigin(0.5);

  // level / score
  const levelBg = scene.add.rectangle(500, 200, 160, 60, 0x4a90e2).setStrokeStyle(3, 0xffffff);
  levelText = scene.add.text(levelBg.x, levelBg.y, `LEVEL ${state.level}`, {
    fontSize: '22px',
    color: '#fff'
  }).setOrigin(0.5);

  const scoreBg = scene.add.rectangle(940, 200, 220, 80, 0xe94b8b).setStrokeStyle(3, 0xffffff);
  scoreText = scene.add.text(scoreBg.x, scoreBg.y - 10, `Score: ${state.score}`, {
    fontSize: '22px',
    color: '#fff'
  }).setOrigin(0.5);
  bestText = scene.add.text(scoreBg.x, scoreBg.y + 18, `Best: ${state.best}`, {
    fontSize: '18px',
    color: '#fff'
  }).setOrigin(0.5);
}

function createGrid(scene) {
  const startX = 320;
  const startY = 320;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const x = startX + c * (CELL_SIZE + CELL_GAP);
      const y = startY + r * (CELL_SIZE + CELL_GAP);
      const cell = scene.add.rectangle(x, y, CELL_SIZE, CELL_SIZE, 0x7fdedb, 0.8)
        .setStrokeStyle(3, 0xffffff);
      cell.setData('type', 'cell');
      cell.setData('index', idx(r, c));
      cell.setInteractive();
      scene.input.enableDropZone(cell); // correct API [web:21]
      gridCells[idx(r, c)] = cell;
    }
  }
}

function createRightPanel(scene) {
  const panelX = 1160;
  const panelY = 420;

  scene.add.rectangle(panelX, panelY + 80, 240, 460, 0xf5a623, 0.9);

  // NEXT / queue
  scene.add.text(panelX, panelY - 40, 'NEXT', {
    fontSize: '24px',
    color: '#fff',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  // TRASH
  scene.add.text(panelX, panelY + 240, 'TRASH', {
    fontSize: '24px',
    color: '#fff',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  const trashRect = scene.add.rectangle(panelX, panelY + 310, CELL_SIZE, CELL_SIZE, 0xd0021b, 0.85)
    .setStrokeStyle(3, 0xffffff);
  trashRect.setData('type', 'trash');
  trashRect.setInteractive();
  scene.input.enableDropZone(trashRect);

  trashText = scene.add.text(panelX, panelY + 370, `Uses: ${state.trash}`, {
    fontSize: '18px',
    color: '#fff'
  }).setOrigin(0.5);
}

// ----- QUEUE / DRAW -----
function randomTile() {
  return TILE_VALUES[Math.floor(Math.random() * TILE_VALUES.length)];
}

function initQueue() {
  state.queue = [randomTile(), randomTile(), randomTile()];
}

function drawAll(scene) {
  drawGrid(scene);
  drawQueue(scene);
  updateScoreUI();
}

function tileColor(val) {
  const colors = [0x4a90e2, 0xe94b8b, 0xf5a623, 0xd0021b, 0x9013fe];
  return colors[val % colors.length];
}

function makeTile(scene, x, y, value) {
  const cont = scene.add.container(x, y);
  const bg = scene.add.rectangle(0, 0, CELL_SIZE - 12, CELL_SIZE - 12, tileColor(value))
    .setStrokeStyle(2, 0xffffff);
  const t = scene.add.text(0, 0, String(value), {
    fontSize: '32px',
    fontStyle: 'bold',
    color: '#fff'
  }).setOrigin(0.5);
  cont.add([bg, t]);
  cont.setSize(CELL_SIZE - 12, CELL_SIZE - 12);
  cont.setData('value', value);
  cont.setData('kind', 'tile');
  return cont;
}

function drawGrid(scene) {
  // clear old sprites
  for (let i = 0; i < 16; i++) {
    if (gridSprites[i]) {
      gridSprites[i].destroy();
      gridSprites[i] = null;
    }
  }

  const startX = 320;
  const startY = 320;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const i = idx(r, c);
      const val = state.grid[i];
      if (val != null) {
        const x = startX + c * (CELL_SIZE + CELL_GAP);
        const y = startY + r * (CELL_SIZE + CELL_GAP);
        const tile = makeTile(scene, x, y, val);
        gridSprites[i] = tile;
      }
    }
  }
}

function drawQueue(scene) {
  // clear old
  queueSprites.forEach(s => s.destroy());
  queueSprites = [];

  const panelX = 1160;
  const baseY = 420;

  for (let i = 0; i < 3; i++) {
    const v = state.queue[i];
    const y = baseY + i * 90;
    const tile = makeTile(scene, panelX, y, v);
    tile.setData('queueIndex', i);
    if (i === 0) {
      tile.setInteractive({ draggable: true }); // only top is draggable [web:20]
    }
    queueSprites.push(tile);
  }
}

function updateScoreUI() {
  scoreText.setText(`Score: ${state.score}`);
  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem('jd-best', String(state.best));
  }
  bestText.setText(`Best: ${state.best}`);
  levelText.setText(`LEVEL ${state.level}`);
  trashText.setText(`Uses: ${state.trash}`);
}

// ----- INPUT / DRAG -----
function setupDrag(scene) {
  scene.input.on('dragstart', (pointer, go) => {
    if (go.getData('kind') === 'tile') {
      go.setScale(1.1);
      go.setDepth(10);
    }
  });

  scene.input.on('drag', (pointer, go, dragX, dragY) => {
    go.x = dragX;
    go.y = dragY;
  });

  scene.input.on('dragend', (pointer, go, dropped) => {
    go.setScale(1);
    if (!dropped) {
      // snap back to queue if not dropped in zone
      const qi = go.getData('queueIndex');
      if (qi === 0) {
        go.x = 1160;
        go.y = 420;
      }
    }
  });

  scene.input.on('drop', (pointer, go, dropZone) => {
    const fromQueueIndex = go.getData('queueIndex');
    const value = go.getData('value');
    if (fromQueueIndex !== 0) return; // only top

    if (dropZone.getData('type') === 'trash') {
      if (state.trash <= 0) return;
      pushUndo();
      state.trash--;
      advanceQueue();
      drawQueue(scene);
      updateScoreUI();
      go.destroy();
      return;
    }

    if (dropZone.getData('type') === 'cell') {
      const cellIndex = dropZone.getData('index');
      if (state.grid[cellIndex] != null) return;
      pushUndo();
      placeTileOnGrid(cellIndex, value);
      advanceQueue();
      drawGrid(scene);
      drawQueue(scene);
      updateScoreUI();
      go.destroy();
      checkGameOver();
    }
  });
}

function setupKeyboard(scene) {
  scene.input.keyboard.on('keydown-Z', () => undo());
  scene.input.keyboard.on('keydown-R', () => hardReset());
}

// ----- GAME LOGIC -----
function neighbors(i) {
  const r = Math.floor(i / GRID_SIZE);
  const c = i % GRID_SIZE;
  const res = [];
  if (r > 0) res.push(idx(r - 1, c));
  if (r < GRID_SIZE - 1) res.push(idx(r + 1, c));
  if (c > 0) res.push(idx(r, c - 1));
  if (c < GRID_SIZE - 1) res.push(idx(r, c + 1));
  return res;
}

function mergeResult(a, b) {
  if (a === b) return { type: 'vanish' };
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  if (big % small !== 0) return null;
  const q = big / small;
  if (q === 1) return { type: 'vanish' };
  return { type: 'merge', value: q, big: big };
}

function placeTileOnGrid(index, value) {
  state.grid[index] = value;
  // try merges with each neighbor (fixed order)
  const nbs = neighbors(index);
  for (const ni of nbs) {
    const nbVal = state.grid[ni];
    if (nbVal == null) continue;
    const res = mergeResult(state.grid[index], nbVal);
    if (!res) continue;

    if (res.type === 'vanish') {
      state.grid[index] = null;
      state.grid[ni] = null;
      state.score += 2;
    } else if (res.type === 'merge') {
      // result replaces the larger tile; smaller disappears
      if (state.grid[index] === res.big) {
        state.grid[index] = res.value;
        state.grid[ni] = null;
      } else {
        state.grid[ni] = res.value;
        state.grid[index] = null;
      }
      state.score += 1;
    }
  }

  // level from score
  const newLevel = Math.floor(state.score / 10) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    state.trash += 2;
  }
}

function advanceQueue() {
  state.queue.shift();
  state.queue.push(randomTile());
}

function gridFull() {
  return state.grid.every(v => v != null);
}

function canAnyMergeWithValue(tileValue) {
  for (let i = 0; i < 16; i++) {
    if (state.grid[i] != null) continue;
    const nbs = neighbors(i);
    for (const ni of nbs) {
      if (state.grid[ni] == null) continue;
      if (mergeResult(tileValue, state.grid[ni])) return true;
    }
  }
  return false;
}

function checkGameOver() {
  if (!gridFull()) return;
  const curTile = state.queue[0];
  if (canAnyMergeWithValue(curTile)) return;

  state.gameOver = true;
  showGameOverOverlay();
}

function showGameOverOverlay() {
  const s = sceneRef;
  const cont = s.add.container(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2);
  const bg = s.add.rectangle(0, 0, 500, 320, 0x000000, 0.85);
  const title = s.add.text(0, -90, 'GAME OVER', {
    fontSize: '48px',
    color: '#fff',
    fontStyle: 'bold'
  }).setOrigin(0.5);
  const info = s.add.text(0, 0, `Score: ${state.score}\nBest: ${state.best}`, {
    fontSize: '26px',
    color: '#fff',
    align: 'center'
  }).setOrigin(0.5);
  const btn = s.add.rectangle(0, 90, 200, 60, 0x4a90e2).setInteractive();
  const btnText = s.add.text(0, 90, 'RESTART', {
    fontSize: '24px',
    color: '#fff'
  }).setOrigin(0.5);

  btn.on('pointerdown', () => {
    cont.destroy();
    hardReset();
  });

  cont.add([bg, title, info, btn, btnText]);
}

// ----- UNDO / RESET -----
function pushUndo() {
  if (state.undoStack.length >= 10) state.undoStack.shift();
  state.undoStack.push(JSON.parse(JSON.stringify({
    grid: state.grid,
    queue: state.queue,
    score: state.score,
    level: state.level,
    trash: state.trash
  })));
}

function undo() {
  if (!state.undoStack.length) return;
  const prev = state.undoStack.pop();
  state.grid = prev.grid;
  state.queue = prev.queue;
  state.score = prev.score;
  state.level = prev.level;
  state.trash = prev.trash;
  drawGrid(sceneRef);
  drawQueue(sceneRef);
  updateScoreUI();
}

function hardReset() {
  state = {
    grid: Array(16).fill(null),
    queue: [],
    score: 0,
    best: parseInt(localStorage.getItem('jd-best') || '0'),
    level: 1,
    trash: 3,
    undoStack: [],
    gameOver: false
  };
  initQueue();
  drawAll(sceneRef);
}
