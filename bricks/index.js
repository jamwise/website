const groupTypes = ["I", "L", "J", "O", "T", "S", "Z"];
const [I, L, J, O, T, S, Z] = groupTypes;

const levelIntervals = [500, 300, 200, 100, 50];

const scores = [40, 50, 100, 300];

const newLevelAfter = 10;

// Centre block always in first position
const groupTemplates = {
  [I]: [
    [0, 1],
    [0, 0],
    [0, 2],
    [0, 3],
  ],
  [L]: [
    [1, 0],
    [0, 0],
    [2, 0],
    [0, 1],
  ],
  [J]: [
    [1, 0],
    [0, 0],
    [2, 0],
    [2, 1],
  ],
  [O]: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [T]: [
    [1, 1],
    [0, 1],
    [2, 1],
    [1, 0],
  ],
  [S]: [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 0],
  ],
  [Z]: [
    [1, 0],
    [0, 0],
    [1, 1],
    [2, 1],
  ],
};

const getDimensions = (group) =>
  group.reduce(
    (acc, [x, y]) => [Math.max(acc[0], x + 1), Math.max(acc[1], y + 1)],
    [0, 0]
  );

const dimensions = {
  [I]: getDimensions(groupTemplates[I]),
  [L]: getDimensions(groupTemplates[L]),
  [J]: getDimensions(groupTemplates[J]),
  [O]: getDimensions(groupTemplates[O]),
  [T]: getDimensions(groupTemplates[T]),
  [S]: getDimensions(groupTemplates[S]),
  [Z]: getDimensions(groupTemplates[Z]),
};

const colors = {
  [I]: "#588b8b",
  [L]: "#8900f2",
  [J]: "#ffd5c2",
  [O]: "#f28f3b",
  [T]: "#c8553d",
  [S]: "#2d3047",
  [Z]: "#93b7be",
};

const getRandomGroup = () =>
  groupTypes[Math.floor(Math.random() * groupTypes.length)];

const Game = (columns, rows, onUpdate) => {
  let currentLevel = 0;
  let currentGroup = null;
  let linesCleared = 0;
  let score = 0;

  let interval = levelIntervals[0];

  const canvas = new Array(columns)
    .fill(null)
    .map(() => new Array(rows).fill(null));

  const hasCollision = ({ group, x, y }) =>
    group.some(([_x, _y]) => y >= 0 && canvas[x + _x]?.[y + _y] !== null);

  const update = (cured) => onUpdate(canvas, currentGroup, score, cured);

  const clearCompletedRows = () => {
    const prevLinesCleared = linesCleared;
    for (let y = 0; y < rows; y++) {
      if (canvas.every((column) => column[y] !== null)) {
        canvas.forEach((column) => column.splice(y, 1));
        canvas.forEach((column) => column.unshift(null));
        linesCleared++;
      }
    }
    if (linesCleared > prevLinesCleared) {
      score += scores[linesCleared - prevLinesCleared - 1];
      if (linesCleared % newLevelAfter === 0) {
        currentLevel++;
        interval = levelIntervals[currentLevel];
      }
    }
  };

  const cureCanvas = () => {
    if (!currentGroup) return;
    currentGroup.group.forEach(([dx, dy]) => {
      canvas[currentGroup.x + dx][currentGroup.y + dy] = currentGroup.groupType;
    });
    clearCompletedRows();
  };

  const addGroup = () => {
    const groupType = getRandomGroup();
    const [width, height] = dimensions[groupType];
    const group = groupTemplates[groupType];
    const entryPoint = Math.floor(columns / 2 - width / 2);
    const newGroup = {
      groupType,
      group,
      rotation: 0,
      x: entryPoint,
      y: -height,
    };
    if (hasCollision(newGroup)) {
      clearInterval(gameInterval);
      alert("Game Over");
      return;
    }
    cureCanvas();

    currentGroup = newGroup;
    update(true);
  };

  const moveDown = () => {
    if (!currentGroup) return;
    const newGroup = {
      ...currentGroup,
      y: currentGroup.y + 1,
    };
    if (hasCollision(newGroup)) {
      addGroup();
      return;
    }
    currentGroup = newGroup;
    update();
  };

  const moveRight = () => {
    if (!currentGroup) return;
    const newGroup = {
      ...currentGroup,
      x: currentGroup.x + 1,
    };
    if (hasCollision(newGroup)) {
      return;
    }
    currentGroup = newGroup;
    update();
  };

  const moveLeft = () => {
    if (!currentGroup) return;
    const newGroup = {
      ...currentGroup,
      x: currentGroup.x - 1,
    };
    if (hasCollision(newGroup)) {
      return;
    }
    currentGroup = newGroup;
    update();
  };

  const dropRight = () => {
    if (!currentGroup) return;
    let newGroup = {
      ...currentGroup,
      x: currentGroup.x + 1,
    };
    while (!hasCollision(newGroup)) {
      currentGroup = newGroup;
      newGroup = {
        ...newGroup,
        x: newGroup.x + 1,
      };
    }
    update();
  };

  const dropLeft = () => {
    if (!currentGroup) return;
    let newGroup = {
      ...currentGroup,
      x: currentGroup.x - 1,
    };
    while (!hasCollision(newGroup)) {
      currentGroup = newGroup;
      newGroup = {
        ...newGroup,
        x: newGroup.x - 1,
      };
    }
    update();
  };

  const dropDown = () => {
    if (!currentGroup) return;
    let newGroup = {
      ...currentGroup,
      y: currentGroup.y + 1,
    };
    while (!hasCollision(newGroup)) {
      currentGroup = newGroup;
      newGroup = {
        ...newGroup,
        y: newGroup.y + 1,
      };
    }
    addGroup();
    update();
  };

  function rotate() {
    if (!currentGroup) return;
    // Find center point of the piece
    const sumX = currentGroup.group.reduce((sum, [x]) => sum + x, 0);
    const sumY = currentGroup.group.reduce((sum, [_, y]) => sum + y, 0);
    const centerX = Math.round(sumX / currentGroup.group.length);
    const centerY = Math.round(sumY / currentGroup.group.length);

    const newGroup = {
      ...currentGroup,
      rotation: currentGroup.rotation + 90,
      group: currentGroup.group.map(([x, y]) => {
        // Translate to origin, rotate, translate back
        const relativeX = x - centerX;
        const relativeY = y - centerY;
        return [centerX - relativeY, centerY + relativeX];
      }),
    };

    if (hasCollision(newGroup)) {
      return;
    }
    currentGroup = newGroup;
    update();
  }

  const createInterval = () => setInterval(moveDown, interval);

  let gameInterval = createInterval();

  addGroup();
  update();

  return {
    moveRight,
    moveLeft,
    rotate,
    moveDown,
    dropDown,
    dropRight,
    dropLeft,
  };
};

// Implementation:

const brick = (x, y, width, color = "#f3f3f3", style = "") =>
  `<div class="brick" style="${style} position: absolute; width: ${width}px; height: ${width}px; background: ${color}; top: ${
    y * width
  }px; left: ${x * width}px;"></div>`;

const paintGroups = (canvas, currentGroup, width) => {
  const groups = document.getElementById("groups");
  groups.innerHTML = "";

  const color = colors[currentGroup.groupType];
  currentGroup.group.forEach(([dx, dy]) => {
    document.getElementById("groups").innerHTML += brick(
      currentGroup.x + dx,
      currentGroup.y + dy,
      width,
      color
    );
  });

  canvas.forEach((column, x) => {
    column.forEach((cell, y) => {
      if (cell !== null) {
        document.getElementById("groups").innerHTML += brick(
          x,
          y,
          width,
          colors[cell],
          "pointer-events: none;"
        );
      }
    });
  });
};

function trackFingerMovement(element, distance, callback) {
  let startX = 0;
  let startY = 0;
  let lastTriggerX = 0;
  let lastTriggerY = 0;
  let isDragging = false;
  let isTap = true;
  let startNow = 0;

  element.addEventListener("touchstart", (e) => {
    isDragging = true;
    isTap = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    lastTriggerX = startX;
    lastTriggerY = startY;
    startNow = Date.now();
  });

  element.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault(); // Prevent scrolling
      e.stopPropagation();
      if (!isDragging) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      // Check X axis movement
      const distanceX = currentX - lastTriggerX;
      if (Math.abs(distanceX) >= distance) {
        isTap = false;
        callback({
          axis: "x",
          direction: distanceX > 0 ? "right" : "left",
          distance: Math.abs(distanceX),
        });
        lastTriggerX = currentX;
      }

      // Check Y axis movement
      const distanceY = currentY - lastTriggerY;
      if (Math.abs(distanceY) >= distance) {
        isTap = false;
        callback({
          axis: "y",
          direction: distanceY > 0 ? "down" : "up",
          distance: Math.abs(distanceY),
        });
        lastTriggerY = currentY;
      }
    },
    { passive: false }
  );

  element.addEventListener("touchend", () => {
    if (!isDragging) return;
    if (isTap) {
      callback({ isTap });
    }
    const elapsed = Date.now() - startNow;
    const distanceX = lastTriggerX - startX;
    const distanceY = lastTriggerY - startY;
    const velocityX = distanceX / elapsed;
    const velocityY = distanceY / elapsed;
    // get bigger of the two:
    const axis = Math.abs(velocityX) > Math.abs(velocityY) ? "x" : "y";
    const velocity =
      Math.abs(velocityX) > Math.abs(velocityY) ? velocityX : velocityY;
    const direction = axis === "x" ? velocity > 0 ? "right" : "left" : velocity > 0 ? "down" : "up";

    if (elapsed < 140 && Math.abs(velocity) > 0.4) {
      callback({
        axis,
        direction,
        isFlick: true,
      });
    }

    isDragging = false;
  });

  return () => {
    isDragging = false;
  }
}

const startGame = () => {
  const columns = 11;
  const rows = 20;
  const canvasDocument = document.getElementById("canvas");
  const scoreDocument = document.getElementById("score");
  const cellWidth = canvasDocument.offsetWidth / columns;

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      canvasDocument.innerHTML += brick(x, y);
    }
  }

  let cancelDrag = () => {};

  const render = (canvas, currentGroup, score, cured) => {
    scoreDocument.innerText = score;
    if (cured) cancelDrag();
    paintGroups(canvas, currentGroup, cellWidth);
  };

  const {
    moveLeft,
    moveRight,
    rotate,
    moveDown,
    dropDown,
    dropRight,
    dropLeft,
  } = Game(columns, rows, render);

  const touchArea = document.getElementById("touch-area");

  cancelDrag = trackFingerMovement(touchArea, cellWidth, ({ axis, isTap, isFlick, direction }) => {
    if (isFlick) {
      if (direction === "down") {
        dropDown();
      } else if (direction === "up") {
        rotate();
      } else if (direction === "left") {
        dropLeft();
      } else if (direction === "right") {
        dropRight();
      }
    } else if (axis === "x") {
      if (direction === "right") {
        moveRight();
      } else {
        moveLeft();
      }
    } else if (axis === "y") {
      if (direction === "down") {
        moveDown();
      }
    } else if (isTap) {
      rotate();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      moveRight();
    }
    if (event.key === "ArrowLeft") {
      moveLeft();
    }
    if (event.key === "ArrowUp") {
      rotate();
    }
    if (event.key === "ArrowDown") {
      dropDown();
    }
  });
};

startGame();
