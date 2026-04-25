(() => {
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const levelText = document.querySelector("#levelText");
  const timeText = document.querySelector("#timeText");
  const hitText = document.querySelector("#hitText");
  const pauseButton = document.querySelector("#pauseButton");
  const resetButton = document.querySelector("#resetButton");
  const editButton = document.querySelector("#editButton");
  const banner = document.querySelector("#banner");
  const bannerTitle = document.querySelector("#bannerTitle");
  const bannerMeta = document.querySelector("#bannerMeta");
  const editorPanel = document.querySelector("#editorPanel");
  const editorLevelSelect = document.querySelector("#editorLevelSelect");
  const saveLayoutButton = document.querySelector("#saveLayoutButton");
  const resetLayoutButton = document.querySelector("#resetLayoutButton");
  const addParkedButton = document.querySelector("#addParkedButton");
  const addConeButton = document.querySelector("#addConeButton");
  const addCurbButton = document.querySelector("#addCurbButton");
  const deleteItemButton = document.querySelector("#deleteItemButton");
  const rotateLeftButton = document.querySelector("#rotateLeftButton");
  const rotateRightButton = document.querySelector("#rotateRightButton");
  const editorStatus = document.querySelector("#editorStatus");

  const WORLD = { w: 1280, h: 760 };
  const LOT = { x: 46, y: 72, w: 1188, h: 636 };
  const PLAYER = { w: 54, h: 96 };
  const HOLD_TO_WIN = 1.15;
  const STORAGE_KEY = "parking-lot-layouts-v1";
  const SNAP = 4;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = mulberry32(20260425);
  const speckles = Array.from({ length: 280 }, () => ({
    x: rand() * WORLD.w,
    y: rand() * WORLD.h,
    r: 0.7 + rand() * 1.8,
    a: 0.05 + rand() * 0.08,
  }));

  const carDesigns = [
    {
      id: "seoul-sedan",
      body: "#2e8bd7",
      roof: "#111b22",
      glass: "#13242c",
      trim: "#d8eef7",
      accent: "#86c8ff",
      plate: "#f7f2d3",
      type: "sedan",
      spriteIndex: 0,
    },
    {
      id: "taxi-yellow",
      body: "#f3c348",
      roof: "#10181c",
      glass: "#162932",
      trim: "#fff1a6",
      accent: "#1d8f64",
      plate: "#f7f2d3",
      type: "taxi",
      spriteIndex: 1,
    },
    {
      id: "city-suv",
      body: "#40b985",
      roof: "#123127",
      glass: "#153329",
      trim: "#c9f3df",
      accent: "#f05d52",
      plate: "#f7f2d3",
      type: "suv",
      spriteIndex: 3,
    },
    {
      id: "ev-white",
      body: "#eef3f1",
      roof: "#566066",
      glass: "#1d2b31",
      trim: "#ffffff",
      accent: "#5ab0ff",
      plate: "#d7f0ff",
      type: "ev",
      spriteIndex: 2,
    },
    {
      id: "red-fastback",
      body: "#ef5b61",
      roof: "#28171a",
      glass: "#231a1f",
      trim: "#ffd0d0",
      accent: "#ff777e",
      plate: "#f7f2d3",
      type: "fastback",
      spriteIndex: 6,
    },
    {
      id: "silver-van",
      body: "#cfd7d8",
      roof: "#687174",
      glass: "#253238",
      trim: "#f6fbfb",
      accent: "#ff6c6c",
      plate: "#f7f2d3",
      type: "van",
      spriteIndex: 4,
    },
    {
      id: "midnight-sedan",
      body: "#2f3a46",
      roof: "#0f151b",
      glass: "#18222b",
      trim: "#cad2d8",
      accent: "#ffd65a",
      plate: "#f7f2d3",
      type: "sedan",
      spriteIndex: 5,
    },
    {
      id: "blue-hatchback",
      body: "#238bd9",
      roof: "#111b22",
      glass: "#13242c",
      trim: "#d8eef7",
      accent: "#86c8ff",
      plate: "#f7f2d3",
      type: "hatchback",
      spriteIndex: 7,
    },
  ];
  const palette = carDesigns.map((design) => design.body);
  const carSpriteSheet = new Image();
  let carSpriteSheetReady = false;
  carSpriteSheet.onload = () => {
    carSpriteSheetReady = true;
  };
  carSpriteSheet.src = "assets/cars/topview-korean-cars-transparent.png";

  const defaultLevels = buildLevels();
  const levels = loadSavedLevels(defaultLevels);
  const input = {
    up: false,
    down: false,
    left: false,
    right: false,
    brake: false,
  };

  let activeLevel = 0;
  let level = levels[0];
  let car;
  let elapsed = 0;
  let hits = 0;
  let hold = 0;
  let hitCooldown = 0;
  let transitionTimer = 0;
  let paused = false;
  let finished = false;
  let lastFrame = performance.now();
  let dpr = 1;
  let viewport = { scale: 1, offsetX: 0, offsetY: 0, width: WORLD.w, height: WORLD.h };
  const editor = {
    enabled: false,
    hover: null,
    selection: null,
    drag: null,
  };

  function buildLevels() {
    const topRow = makeSlots({ x: 560, y: 176, count: 6, spacing: 112, angle: 0 });
    const bottomRow = makeSlots({ x: 560, y: 584, count: 6, spacing: 112, angle: Math.PI, stepAngle: 0 });
    const leftColumn = makeSlots({ x: 180, y: 190, count: 4, spacing: 112, angle: Math.PI / 2, stepAngle: Math.PI / 2 });
    const rightColumn = makeSlots({ x: 1100, y: 196, count: 4, spacing: 112, angle: -Math.PI / 2, stepAngle: Math.PI / 2 });

    return [
      {
        name: "A",
        spawn: { x: 142, y: 612, angle: Math.PI / 2 },
        target: topRow[4],
        slots: [...topRow, ...bottomRow],
        obstacles: [
          ...parkedFromSlots([topRow[0], topRow[1], topRow[3], topRow[5], bottomRow[0], bottomRow[2], bottomRow[4]], 0),
          curb(404, 380, 240, 34),
          cone(696, 390),
          cone(746, 390),
          cone(796, 390),
        ],
      },
      {
        name: "B",
        spawn: { x: 1084, y: 430, angle: -Math.PI / 2 },
        target: bottomRow[1],
        slots: [...topRow, ...bottomRow],
        obstacles: [
          ...parkedFromSlots([topRow[0], topRow[2], topRow[3], topRow[5], bottomRow[0], bottomRow[2], bottomRow[3], bottomRow[5]], 1),
          curb(618, 365, 350, 34),
          curb(244, 454, 34, 210),
          cone(486, 318),
          cone(526, 318),
          cone(566, 318),
          cone(606, 318),
        ],
      },
      {
        name: "C",
        spawn: { x: 136, y: 124, angle: Math.PI / 2 },
        target: rightColumn[2],
        slots: [...leftColumn, ...rightColumn, ...topRow.slice(1, 5), ...bottomRow.slice(1, 5)],
        obstacles: [
          ...parkedFromSlots([leftColumn[0], leftColumn[1], leftColumn[3], rightColumn[0], rightColumn[1], rightColumn[3]], 2),
          ...parkedFromSlots([topRow[1], topRow[3], bottomRow[2], bottomRow[3]], 3),
          curb(532, 400, 370, 34),
          curb(538, 272, 34, 178),
          cone(726, 306),
          cone(774, 306),
          cone(822, 306),
          cone(870, 306),
        ],
      },
      {
        name: "D",
        spawn: { x: 160, y: 610, angle: Math.PI / 2 },
        target: { x: 948, y: 384, w: 96, h: 142, angle: -Math.PI / 2 },
        slots: [
          ...topRow,
          ...bottomRow,
          ...makeSlots({ x: 600, y: 384, count: 4, spacing: 116, angle: -Math.PI / 2, stepAngle: 0 }),
        ],
        obstacles: [
          ...parkedFromSlots([topRow[0], topRow[1], topRow[3], topRow[4], topRow[5], bottomRow[0], bottomRow[2], bottomRow[4], bottomRow[5]], 4),
          ...parkedFromSlots(makeSlots({ x: 600, y: 384, count: 3, spacing: 116, angle: -Math.PI / 2, stepAngle: 0 }), 5),
          curb(274, 300, 34, 252),
          curb(752, 544, 312, 34),
          cone(404, 492),
          cone(448, 492),
          cone(492, 492),
          cone(1058, 252),
          cone(1058, 300),
        ],
      },
    ];
  }

  function cloneLevels(source) {
    return JSON.parse(JSON.stringify(source));
  }

  function loadSavedLevels(fallback) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return cloneLevels(fallback);
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length !== fallback.length) return cloneLevels(fallback);
      return parsed.map((savedLevel, index) => normalizeLevel(savedLevel, fallback[index]));
    } catch {
      return cloneLevels(fallback);
    }
  }

  function normalizeLevel(savedLevel, fallbackLevel) {
    return {
      name: fallbackLevel.name,
      spawn: normalizeRect(savedLevel?.spawn, fallbackLevel.spawn),
      target: normalizeRect(savedLevel?.target, fallbackLevel.target),
      slots: normalizeArray(savedLevel?.slots, fallbackLevel.slots),
      obstacles: normalizeArray(savedLevel?.obstacles, fallbackLevel.obstacles),
    };
  }

  function normalizeArray(savedItems, fallbackItems) {
    if (!Array.isArray(savedItems)) return cloneLevels(fallbackItems);
    return savedItems
      .filter((item) => item && Number.isFinite(item.x) && Number.isFinite(item.y))
      .map((item, index) => normalizeRect(item, fallbackItems[index] ?? item));
  }

  function normalizeRect(item, fallback) {
    const base = { ...fallback, ...item };
    return {
      ...base,
      x: Number.isFinite(base.x) ? base.x : fallback.x,
      y: Number.isFinite(base.y) ? base.y : fallback.y,
      w: Number.isFinite(base.w) ? base.w : fallback.w,
      h: Number.isFinite(base.h) ? base.h : fallback.h,
      angle: Number.isFinite(base.angle) ? base.angle : fallback.angle,
    };
  }

  function makeSlots({ x, y, count, spacing, angle, stepAngle = angle, w = 96, h = 142 }) {
    return Array.from({ length: count }, (_, index) => ({
      x: x + Math.cos(stepAngle) * spacing * index,
      y: y + Math.sin(stepAngle) * spacing * index,
      w,
      h,
      angle,
    }));
  }

  function parkedFromSlots(slots, offset) {
    return slots.map((slot, index) => ({
      x: slot.x,
      y: slot.y,
      w: 68,
      h: 112,
      angle: slot.angle,
      type: "parked",
      color: palette[(index + offset) % palette.length],
      design: carDesigns[(index + offset) % carDesigns.length].id,
    }));
  }

  function cone(x, y) {
    return { x, y, w: 32, h: 32, angle: 0, type: "cone", color: "#ff8a3d" };
  }

  function curb(x, y, w, h) {
    return { x, y, w, h, angle: 0, type: "curb", color: "#303b3a" };
  }

  function loadLevel(index) {
    activeLevel = index;
    level = levels[activeLevel];
    car = {
      x: level.spawn.x,
      y: level.spawn.y,
      angle: level.spawn.angle,
      speed: 0,
      steer: 0,
      flash: 0,
    };
    elapsed = 0;
    hits = 0;
    hold = 0;
    hitCooldown = 0;
    transitionTimer = 0;
    paused = false;
    finished = false;
    editor.hover = null;
    editor.selection = null;
    editor.drag = null;
    hideBanner();
    syncHud();
    syncEditorPanel();
    pauseButton.textContent = "⏸";
    pauseButton.setAttribute("aria-label", "일시정지");
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function syncHud() {
    levelText.textContent = `${activeLevel + 1}/${levels.length}`;
    timeText.textContent = elapsed.toFixed(1);
    hitText.textContent = String(hits);
  }

  function syncEditorPanel() {
    if (!editorLevelSelect) return;
    editorLevelSelect.value = String(activeLevel);
    editorStatus.textContent = editor.selection
      ? `${editor.selection.label} · x ${Math.round(editor.selection.object.x)} · y ${Math.round(editor.selection.object.y)}`
      : "선택 없음";
  }

  function showBanner(title, meta) {
    bannerTitle.textContent = title;
    bannerMeta.textContent = meta;
    banner.classList.remove("is-hidden");
  }

  function hideBanner() {
    banner.classList.add("is-hidden");
  }

  function setPaused(value) {
    if (finished) return;
    paused = value;
    pauseButton.textContent = paused ? "▶" : "⏸";
    pauseButton.setAttribute("aria-label", paused ? "계속" : "일시정지");
    if (paused) {
      showBanner("일시정지", `레벨 ${activeLevel + 1}`);
    } else {
      hideBanner();
      lastFrame = performance.now();
    }
  }

  function setEditorMode(value) {
    editor.enabled = value;
    editor.hover = null;
    editor.selection = null;
    editor.drag = null;
    editorPanel.classList.toggle("is-hidden", !editor.enabled);
    editButton.classList.toggle("is-active", editor.enabled);
    if (editor.enabled) {
      clearInput();
      car.x = level.spawn.x;
      car.y = level.spawn.y;
      car.angle = level.spawn.angle;
      car.speed = 0;
      hideBanner();
    }
    syncEditorPanel();
  }

  function clearInput() {
    for (const key of Object.keys(input)) input[key] = false;
  }

  function saveLayouts() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
      showBanner("저장됨", `레벨 ${activeLevel + 1} 배치`);
    } catch {
      showBanner("저장 실패", "브라우저 저장소 확인");
    }
    setTimeout(() => {
      if (editor.enabled) hideBanner();
    }, 900);
  }

  function resetCurrentLayout() {
    levels[activeLevel] = cloneLevels([defaultLevels[activeLevel]])[0];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
    } catch {
      // The reset still applies for the current session.
    }
    loadLevel(activeLevel);
    setEditorMode(true);
    showBanner("기본값", `레벨 ${activeLevel + 1} 복원`);
    setTimeout(hideBanner, 900);
  }

  function update(dt) {
    if (transitionTimer > 0) {
      transitionTimer -= dt;
      if (transitionTimer <= 0) {
        if (activeLevel === levels.length - 1) {
          finished = true;
          paused = true;
          car.speed = 0;
          showBanner("완료", `${elapsed.toFixed(1)}초 · 접촉 ${hits}`);
          pauseButton.textContent = "▶";
        } else {
          loadLevel(activeLevel + 1);
          showBanner(`레벨 ${activeLevel + 1}`, "주차 시작");
          setTimeout(hideBanner, 850);
        }
      }
      return;
    }

    elapsed += dt;
    hitCooldown = Math.max(0, hitCooldown - dt);
    car.flash = Math.max(0, car.flash - dt);

    const was = { x: car.x, y: car.y, angle: car.angle, speed: car.speed };
    const throttle = (input.up ? 1 : 0) - (input.down ? 1 : 0);
    const steering = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const brakeForce = input.brake ? 380 : 0;
    const accel = throttle * (throttle > 0 ? 260 : 210);

    car.steer = lerp(car.steer, steering, 1 - Math.pow(0.001, dt));
    car.speed += accel * dt;
    car.speed = applyDrag(car.speed, 84 * dt);
    if (brakeForce > 0) {
      car.speed = applyDrag(car.speed, brakeForce * dt);
    }
    car.speed = clamp(car.speed, -168, 286);

    const turnLimit = clamp(Math.abs(car.speed) / 120, 0, 1);
    car.angle += car.steer * turnLimit * car.speed * dt / 86;
    car.x += Math.sin(car.angle) * car.speed * dt;
    car.y -= Math.cos(car.angle) * car.speed * dt;

    if (collidesWithWorld()) {
      car.x = was.x;
      car.y = was.y;
      car.angle = was.angle;
      car.speed = -was.speed * 0.24;
      registerHit();
    }

    const state = parkingState();
    if (state.ready) {
      hold = clamp(hold + dt, 0, HOLD_TO_WIN);
    } else {
      hold = clamp(hold - dt * 1.7, 0, HOLD_TO_WIN);
    }

    if (hold >= HOLD_TO_WIN) {
      transitionTimer = 1.05;
      car.speed = 0;
      showBanner(`레벨 ${activeLevel + 1} 완료`, activeLevel === levels.length - 1 ? "기록 저장" : "다음 레벨");
    }

    syncHud();
  }

  function applyDrag(speed, amount) {
    if (speed > 0) return Math.max(0, speed - amount);
    if (speed < 0) return Math.min(0, speed + amount);
    return 0;
  }

  function collidesWithWorld() {
    const playerRect = playerRectData();
    const corners = getCorners(playerRect);
    const outside = corners.some(
      (point) =>
        point.x < LOT.x + 10 ||
        point.x > LOT.x + LOT.w - 10 ||
        point.y < LOT.y + 10 ||
        point.y > LOT.y + LOT.h - 10,
    );
    if (outside) return true;
    return level.obstacles.some((obstacle) => rectsIntersect(playerRect, obstacle));
  }

  function registerHit() {
    if (hitCooldown > 0) return;
    hits += 1;
    hitCooldown = 0.34;
    car.flash = 0.22;
  }

  function parkingState() {
    const target = level.target;
    const local = toLocal(car.x, car.y, target);
    const xRoom = target.w * 0.5 - PLAYER.w * 0.43;
    const yRoom = target.h * 0.5 - PLAYER.h * 0.43;
    const xFit = Math.abs(local.x) / Math.max(1, xRoom);
    const yFit = Math.abs(local.y) / Math.max(1, yRoom);
    const angleFit = angleDiffPi(car.angle, target.angle) / 0.22;
    const speedFit = Math.abs(car.speed) / 18;
    const maxFit = Math.max(xFit, yFit, angleFit, speedFit);
    return {
      ready: maxFit <= 1,
      quality: clamp(1 - (maxFit - 0.35) / 0.65, 0, 1),
      progress: hold / HOLD_TO_WIN,
    };
  }

  function playerRectData() {
    return { x: car.x, y: car.y, w: PLAYER.w, h: PLAYER.h, angle: car.angle };
  }

  function getCorners(rect) {
    const c = Math.cos(rect.angle);
    const s = Math.sin(rect.angle);
    const hw = rect.w / 2;
    const hh = rect.h / 2;
    const points = [
      { x: -hw, y: -hh },
      { x: hw, y: -hh },
      { x: hw, y: hh },
      { x: -hw, y: hh },
    ];
    return points.map((point) => ({
      x: rect.x + point.x * c - point.y * s,
      y: rect.y + point.x * s + point.y * c,
    }));
  }

  function rectsIntersect(a, b) {
    const ac = getCorners(a);
    const bc = getCorners(b);
    const axes = [
      axisFrom(ac[0], ac[1]),
      axisFrom(ac[1], ac[2]),
      axisFrom(bc[0], bc[1]),
      axisFrom(bc[1], bc[2]),
    ];

    return axes.every((axis) => {
      const pa = project(axis, ac);
      const pb = project(axis, bc);
      return pa.max >= pb.min && pb.max >= pa.min;
    });
  }

  function axisFrom(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: -dy / len, y: dx / len };
  }

  function project(axis, points) {
    let min = Infinity;
    let max = -Infinity;
    for (const point of points) {
      const dot = point.x * axis.x + point.y * axis.y;
      min = Math.min(min, dot);
      max = Math.max(max, dot);
    }
    return { min, max };
  }

  function toLocal(x, y, rect) {
    const dx = x - rect.x;
    const dy = y - rect.y;
    const c = Math.cos(-rect.angle);
    const s = Math.sin(-rect.angle);
    return {
      x: dx * c - dy * s,
      y: dx * s + dy * c,
    };
  }

  function angleDiffPi(a, b) {
    let diff = Math.abs(wrapAngle(a - b));
    diff = Math.min(diff, Math.abs(Math.PI - diff));
    return diff;
  }

  function wrapAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }

  function draw(now) {
    resizeCanvas();
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "#151a1b";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const scale = Math.min(cssWidth / WORLD.w, cssHeight / WORLD.h);
    const offsetX = (cssWidth - WORLD.w * scale) / 2;
    const offsetY = (cssHeight - WORLD.h * scale) / 2;
    viewport = { scale, offsetX, offsetY, width: cssWidth, height: cssHeight };

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    drawLot(now);
    drawSlots(now);
    drawObstacles(now);
    drawPlayer();
    drawParkingGauge();
    drawEditorOverlay();
    ctx.restore();
  }

  function drawLot(now) {
    ctx.fillStyle = "#262d2d";
    ctx.fillRect(0, 0, WORLD.w, WORLD.h);

    for (const dot of speckles) {
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.a})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    roundRectPath(ctx, LOT.x, LOT.y, LOT.w, LOT.h, 18);
    ctx.fillStyle = "#293130";
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#c9d1ca";
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f2ce52";
    ctx.setLineDash([28, 18]);
    ctx.beginPath();
    ctx.moveTo(154, 380);
    ctx.lineTo(1126, 380);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    const rightArrowX = activeLevel === 2 ? 982 : 1050;
    drawArrow(282, 384, Math.PI / 2, now);
    drawArrow(rightArrowX, 384, -Math.PI / 2, now + 1);
    drawCrosswalk(90, 504);
  }

  function drawSlots(now) {
    for (const slot of level.slots) {
      const isTarget = sameSlot(slot, level.target);
      drawSlot(slot, isTarget, now);
    }
    if (!level.slots.some((slot) => sameSlot(slot, level.target))) {
      drawSlot(level.target, true, now);
    }
  }

  function drawSlot(slot, isTarget, now) {
    ctx.save();
    ctx.translate(slot.x, slot.y);
    ctx.rotate(slot.angle);
    ctx.lineWidth = isTarget ? 5 : 3;
    ctx.strokeStyle = isTarget ? `rgba(80, 209, 138, ${0.68 + Math.sin(now * 5) * 0.18})` : "rgba(246, 247, 241, 0.42)";
    ctx.fillStyle = isTarget ? "rgba(80, 209, 138, 0.12)" : "rgba(255, 255, 255, 0.025)";
    roundRectPath(ctx, -slot.w / 2, -slot.h / 2, slot.w, slot.h, 5);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = isTarget ? "rgba(255, 214, 90, 0.7)" : "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-slot.w / 2 + 14, 0);
    ctx.lineTo(slot.w / 2 - 14, 0);
    ctx.stroke();
    ctx.restore();
  }

  function drawObstacles(now) {
    for (const obstacle of level.obstacles) {
      if (obstacle.type === "parked") drawParkedCar(obstacle);
      if (obstacle.type === "cone") drawCone(obstacle, now);
      if (obstacle.type === "curb") drawCurb(obstacle);
    }
  }

  function drawParkedCar(obstacle) {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.rotate(obstacle.angle);
    drawVehicleSprite({
      w: obstacle.w,
      h: obstacle.h,
      design: obstacle.design,
      color: obstacle.color,
      parked: true,
    });
    ctx.restore();
  }

  function drawCone(obstacle, now) {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.rotate(Math.sin(now * 2 + obstacle.x) * 0.03);
    drawShadow(obstacle.w, obstacle.h, 0.22);
    ctx.fillStyle = "#ff8738";
    ctx.beginPath();
    ctx.moveTo(0, -17);
    ctx.lineTo(17, 16);
    ctx.lineTo(-17, 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.76)";
    ctx.fillRect(-9, 3, 18, 5);
    ctx.fillStyle = "#6c3420";
    ctx.fillRect(-19, 16, 38, 8);
    ctx.restore();
  }

  function drawCurb(obstacle) {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.rotate(obstacle.angle);
    roundRectPath(ctx, -obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h, 8);
    ctx.fillStyle = "#35413f";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 214, 90, 0.42)";
    ctx.lineWidth = 5;
    ctx.setLineDash([18, 14]);
    ctx.beginPath();
    ctx.moveTo(-obstacle.w / 2 + 12, 0);
    ctx.lineTo(obstacle.w / 2 - 12, 0);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawVehicleSprite({ w, h, design, color, player = false, damaged = false }) {
    const spec = resolveCarDesign(design, color);
    const bodyColor = damaged ? "#ff6b57" : color || spec.body;
    const type = spec.type;

    if (carSpriteSheetReady) {
      drawVehiclePngSprite(w, h, spec, player, damaged);
      return;
    }

    drawShadow(w, h, player ? 0.42 : 0.34);
    drawVehicleTires(w, h);

    ctx.save();
    drawVehicleBodyPath(w, h, type);
    ctx.fillStyle = bodyColor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.stroke();
    ctx.clip();

    drawVehiclePaintDetails(w, h, spec, bodyColor, player);
    drawVehicleGlass(w, h, spec);
    drawVehicleLights(w, h, spec, player);
    ctx.restore();

    if (type === "taxi" || player) drawTaxiSign(w, h);
    if (type === "suv") drawRoofRails(w, h);
    if (type === "ev") drawEvBadge(w, h);
  }

  function drawVehiclePngSprite(w, h, spec, player, damaged) {
    const cols = 4;
    const cellW = carSpriteSheet.naturalWidth / cols;
    const cellH = carSpriteSheet.naturalHeight / 2;
    const index = spec.spriteIndex ?? 0;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const crop = {
      x: col * cellW + cellW * 0.18,
      y: row * cellH + cellH * 0.05,
      w: cellW * 0.64,
      h: cellH * 0.9,
    };
    const scale = player ? 1.08 : 1.04;
    const drawW = w * scale;
    const drawH = h * scale;

    ctx.save();
    ctx.drawImage(
      carSpriteSheet,
      crop.x,
      crop.y,
      crop.w,
      crop.h,
      -drawW / 2,
      -drawH / 2,
      drawW,
      drawH,
    );

    if (damaged) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(255, 85, 64, 0.34)";
      ctx.fillRect(-drawW / 2, -drawH / 2, drawW, drawH);
    }
    ctx.restore();
  }

  function resolveCarDesign(id, color) {
    const byId = carDesigns.find((design) => design.id === id);
    const byColor = carDesigns.find((design) => design.body === color);
    return byId || byColor || carDesigns[0];
  }

  function drawVehicleBodyPath(w, h, type) {
    const hw = w / 2;
    const hh = h / 2;
    const front = type === "van" ? 0.78 : type === "fastback" ? 0.58 : 0.66;
    const shoulder = type === "suv" || type === "van" ? 0.96 : 0.9;
    const rear = type === "fastback" ? 0.72 : 0.84;
    const nose = type === "van" ? 7 : 10;
    const tail = type === "fastback" ? 9 : 7;

    ctx.beginPath();
    ctx.moveTo(-hw * front, -hh + nose);
    ctx.quadraticCurveTo(-hw * shoulder, -hh + 16, -hw * shoulder, -hh + 34);
    ctx.lineTo(-hw * rear, hh - 18);
    ctx.quadraticCurveTo(-hw * rear, hh - tail, -hw * 0.5, hh - tail);
    ctx.lineTo(hw * 0.5, hh - tail);
    ctx.quadraticCurveTo(hw * rear, hh - tail, hw * rear, hh - 18);
    ctx.lineTo(hw * shoulder, -hh + 34);
    ctx.quadraticCurveTo(hw * shoulder, -hh + 16, hw * front, -hh + nose);
    ctx.quadraticCurveTo(0, -hh, -hw * front, -hh + nose);
    ctx.closePath();
  }

  function drawVehicleTires(w, h) {
    const hw = w / 2;
    const hh = h / 2;
    const tireW = Math.max(6, w * 0.13);
    const tireH = Math.max(18, h * 0.23);
    const tireX = hw - tireW * 0.44;
    const frontY = -hh + h * 0.27;
    const rearY = hh - h * 0.31;

    ctx.fillStyle = "#20292a";
    roundRectPath(ctx, -tireX - tireW / 2, frontY - tireH / 2, tireW, tireH, 4);
    ctx.fill();
    roundRectPath(ctx, tireX - tireW / 2, frontY - tireH / 2, tireW, tireH, 4);
    ctx.fill();
    roundRectPath(ctx, -tireX - tireW / 2, rearY - tireH / 2, tireW, tireH, 4);
    ctx.fill();
    roundRectPath(ctx, tireX - tireW / 2, rearY - tireH / 2, tireW, tireH, 4);
    ctx.fill();
  }

  function drawVehiclePaintDetails(w, h, spec, bodyColor, player) {
    const hw = w / 2;
    const hh = h / 2;

    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    roundRectPath(ctx, -hw * 0.48, -hh + 10, w * 0.96, 7, 4);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    roundRectPath(ctx, -hw * 0.42, hh - 17, w * 0.84, 8, 4);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.23)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-hw * 0.56, -hh + 34);
    ctx.lineTo(-hw * 0.48, hh - 22);
    ctx.moveTo(hw * 0.56, -hh + 34);
    ctx.lineTo(hw * 0.48, hh - 22);
    ctx.stroke();

    if (spec.type === "taxi" || player) {
      ctx.fillStyle = spec.accent;
      roundRectPath(ctx, -hw + 7, -hh + 40, 5, h - 70, 3);
      ctx.fill();
      roundRectPath(ctx, hw - 12, -hh + 40, 5, h - 70, 3);
      ctx.fill();
    }

    if (spec.type === "ev") {
      ctx.strokeStyle = spec.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-hw * 0.42, -hh + 23);
      ctx.quadraticCurveTo(0, -hh + 13, hw * 0.42, -hh + 23);
      ctx.stroke();
    }

    if (spec.type === "van") {
      ctx.fillStyle = shadeColor(bodyColor, -18);
      roundRectPath(ctx, -hw * 0.5, h * 0.05, w, h * 0.26, 7);
      ctx.fill();
    }
  }

  function drawVehicleGlass(w, h, spec) {
    const hw = w / 2;
    const hh = h / 2;
    const glass = spec.glass;

    if (spec.type === "ev") {
      ctx.fillStyle = glass;
      roundRectPath(ctx, -hw * 0.45, -hh + 18, w * 0.9, h - 42, 11);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      roundRectPath(ctx, -hw * 0.32, -hh + 25, w * 0.26, h - 56, 6);
      ctx.fill();
      return;
    }

    const frontH = spec.type === "van" ? h * 0.18 : h * 0.22;
    const cabinH = spec.type === "fastback" ? h * 0.36 : h * 0.29;
    const rearH = spec.type === "suv" || spec.type === "van" ? h * 0.24 : h * 0.18;

    ctx.fillStyle = glass;
    roundRectPath(ctx, -hw * 0.58, -hh + 18, w * 0.58, frontH, 7);
    ctx.fill();
    roundRectPath(ctx, hw * 0.02, -hh + 18, w * 0.56, frontH, 7);
    ctx.fill();

    ctx.fillStyle = shadeColor(glass, 12);
    roundRectPath(ctx, -hw * 0.58, -h * 0.04, w * 1.16, cabinH, 9);
    ctx.fill();

    ctx.fillStyle = glass;
    roundRectPath(ctx, -hw * 0.5, hh - rearH - 13, w, rearH, 7);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    roundRectPath(ctx, -hw * 0.44, -hh + 24, w * 0.34, 5, 3);
    ctx.fill();
  }

  function drawVehicleLights(w, h, spec, player) {
    const hw = w / 2;
    const hh = h / 2;
    const frontLight = player ? "#fff4a8" : "rgba(255, 255, 225, 0.88)";

    ctx.fillStyle = frontLight;
    roundRectPath(ctx, -hw * 0.62, -hh + 5, w * 0.25, 5, 3);
    ctx.fill();
    roundRectPath(ctx, hw * 0.37, -hh + 5, w * 0.25, 5, 3);
    ctx.fill();

    ctx.fillStyle = spec.accent || "#e34d54";
    roundRectPath(ctx, -hw * 0.6, hh - 11, w * 0.22, 6, 3);
    ctx.fill();
    roundRectPath(ctx, hw * 0.38, hh - 11, w * 0.22, 6, 3);
    ctx.fill();

    ctx.fillStyle = spec.plate;
    roundRectPath(ctx, -hw * 0.22, hh - 13, w * 0.44, 7, 3);
    ctx.fill();
  }

  function drawTaxiSign(w, h) {
    const hw = w / 2;
    ctx.save();
    ctx.fillStyle = "#f7f2d3";
    roundRectPath(ctx, -hw * 0.34, -h * 0.04, w * 0.68, 12, 5);
    ctx.fill();
    ctx.fillStyle = "#11181c";
    roundRectPath(ctx, -hw * 0.18, -h * 0.015, w * 0.36, 4, 2);
    ctx.fill();
    ctx.restore();
  }

  function drawRoofRails(w, h) {
    const hw = w / 2;
    const hh = h / 2;
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.34)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-hw * 0.48, -hh + 24);
    ctx.lineTo(-hw * 0.48, hh - 24);
    ctx.moveTo(hw * 0.48, -hh + 24);
    ctx.lineTo(hw * 0.48, hh - 24);
    ctx.stroke();
    ctx.restore();
  }

  function drawEvBadge(w, h) {
    const hw = w / 2;
    const hh = h / 2;
    ctx.save();
    ctx.fillStyle = "#5ab0ff";
    ctx.beginPath();
    ctx.arc(hw * 0.42, hh - 23, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function shadeColor(hex, percent) {
    const value = hex.replace("#", "");
    if (value.length !== 6) return hex;
    const amount = Math.round(2.55 * percent);
    const r = clamp(parseInt(value.slice(0, 2), 16) + amount, 0, 255);
    const g = clamp(parseInt(value.slice(2, 4), 16) + amount, 0, 255);
    const b = clamp(parseInt(value.slice(4, 6), 16) + amount, 0, 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function toHex(value) {
    return Math.round(value).toString(16).padStart(2, "0");
  }

  function drawPlayer() {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);

    drawVehicleSprite({
      w: PLAYER.w,
      h: PLAYER.h,
      design: "taxi-yellow",
      color: car.flash > 0 ? "#ff6b57" : "#ffd65a",
      player: true,
      damaged: car.flash > 0,
    });
    ctx.restore();
  }

  function drawParkingGauge() {
    const target = level.target;
    const state = parkingState();
    const progress = transitionTimer > 0 ? 1 : hold / HOLD_TO_WIN;

    ctx.save();
    ctx.translate(target.x, target.y);
    ctx.rotate(target.angle);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    roundRectPath(ctx, -target.w / 2 - 9, -target.h / 2 - 9, target.w + 18, target.h + 18, 8);
    ctx.stroke();
    ctx.strokeStyle = state.ready ? "#50d18a" : "#ffd65a";
    ctx.setLineDash([Math.max(1, (target.w + target.h) * 2 * progress), 999]);
    roundRectPath(ctx, -target.w / 2 - 9, -target.h / 2 - 9, target.w + 18, target.h + 18, 8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawEditorOverlay() {
    if (!editor.enabled) return;

    for (const item of editorItems()) {
      if (item.kind === "slot") drawEditorOutline(item.object, "rgba(90, 176, 255, 0.24)", 2);
      if (item.kind === "obstacle") drawEditorOutline(item.object, "rgba(255, 214, 90, 0.38)", 2);
    }

    drawEditorOutline(level.target, "rgba(80, 209, 138, 0.95)", 4);
    drawEditorOutline({ ...level.spawn, w: PLAYER.w, h: PLAYER.h }, "rgba(255, 214, 90, 0.95)", 4);

    if (editor.hover && (!editor.selection || editor.hover.object !== editor.selection.object)) {
      drawEditorOutline(editorItemRect(editor.hover), "rgba(246, 247, 241, 0.7)", 3);
    }

    if (editor.selection) {
      drawEditorOutline(editorItemRect(editor.selection), "#5ab0ff", 5);
    }
  }

  function drawEditorOutline(rect, color, lineWidth) {
    ctx.save();
    ctx.translate(rect.x, rect.y);
    ctx.rotate(rect.angle || 0);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.setLineDash([10, 8]);
    roundRectPath(ctx, -rect.w / 2 - 5, -rect.h / 2 - 5, rect.w + 10, rect.h + 10, 8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawShadow(w, h, alpha) {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    roundRectPath(ctx, -w / 2 + 5, -h / 2 + 7, w, h, 13);
    ctx.fill();
  }

  function drawArrow(x, y, angle, now) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.42 + Math.sin(now * 2) * 0.04;
    ctx.fillStyle = "#f7f1d1";
    ctx.beginPath();
    ctx.moveTo(34, 0);
    ctx.lineTo(-14, -24);
    ctx.lineTo(-6, -8);
    ctx.lineTo(-42, -8);
    ctx.lineTo(-42, 8);
    ctx.lineTo(-6, 8);
    ctx.lineTo(-14, 24);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCrosswalk(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(246, 247, 241, 0.44)";
    for (let i = 0; i < 6; i += 1) {
      ctx.fillRect(i * 18, 0, 9, 82);
    }
    ctx.restore();
  }

  function sameSlot(a, b) {
    return Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01 && Math.abs(a.angle - b.angle) < 0.01;
  }

  function roundRectPath(context, x, y, w, h, r) {
    const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + w, y, x + w, y + h, radius);
    context.arcTo(x + w, y + h, x, y + h, radius);
    context.arcTo(x, y + h, x, y, radius);
    context.arcTo(x, y, x + w, y, radius);
    context.closePath();
  }

  function mulberry32(seed) {
    return function next() {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function editorItems() {
    const items = [
      {
        kind: "target",
        label: "목표",
        object: level.target,
        rect: level.target,
      },
      {
        kind: "spawn",
        label: "시작",
        object: level.spawn,
        rect: { ...level.spawn, w: PLAYER.w, h: PLAYER.h },
      },
    ];

    level.obstacles.forEach((object, index) => {
      items.push({
        kind: "obstacle",
        label: obstacleLabel(object, index),
        object,
        index,
        rect: object,
      });
    });

    level.slots.forEach((object, index) => {
      items.push({
        kind: "slot",
        label: `칸 ${index + 1}`,
        object,
        index,
        rect: object,
      });
    });

    return items;
  }

  function obstacleLabel(object, index) {
    if (object.type === "parked") return `주차차 ${index + 1}`;
    if (object.type === "cone") return `콘 ${index + 1}`;
    if (object.type === "curb") return `연석 ${index + 1}`;
    return `장애물 ${index + 1}`;
  }

  function pickEditorItem(point) {
    const items = editorItems();
    const priority = ["target", "spawn", "obstacle", "slot"];
    for (const kind of priority) {
      for (let index = items.length - 1; index >= 0; index -= 1) {
        const item = items[index];
        if (item.kind === kind && pointInRect(point, item.rect)) return item;
      }
    }
    return null;
  }

  function pointInRect(point, rect) {
    const local = toLocal(point.x, point.y, rect);
    return Math.abs(local.x) <= rect.w / 2 + 8 && Math.abs(local.y) <= rect.h / 2 + 8;
  }

  function editorItemRect(item) {
    if (item.kind === "spawn") return { ...item.object, w: PLAYER.w, h: PLAYER.h };
    return item.object;
  }

  function worldPointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - viewport.offsetX) / viewport.scale;
    const y = (event.clientY - rect.top - viewport.offsetY) / viewport.scale;
    return {
      x: clamp(x, LOT.x + 8, LOT.x + LOT.w - 8),
      y: clamp(y, LOT.y + 8, LOT.y + LOT.h - 8),
    };
  }

  function selectEditorItem(item) {
    editor.selection = item;
    syncEditorPanel();
  }

  function moveEditorSelection(point) {
    if (!editor.drag || !editor.selection) return;
    const object = editor.selection.object;
    object.x = snap(point.x - editor.drag.offsetX);
    object.y = snap(point.y - editor.drag.offsetY);
    object.x = clamp(object.x, LOT.x + 18, LOT.x + LOT.w - 18);
    object.y = clamp(object.y, LOT.y + 18, LOT.y + LOT.h - 18);

    if (editor.selection.kind === "spawn") {
      car.x = object.x;
      car.y = object.y;
      car.angle = object.angle;
      car.speed = 0;
    }
    syncEditorPanel();
  }

  function snap(value) {
    return Math.round(value / SNAP) * SNAP;
  }

  function rotateSelected(delta) {
    if (!editor.selection) return;
    const object = editor.selection.object;
    object.angle = wrapAngle((object.angle || 0) + delta);
    if (editor.selection.kind === "spawn") {
      car.angle = object.angle;
      car.speed = 0;
    }
    syncEditorPanel();
  }

  function deleteSelected() {
    if (!editor.selection) return;
    if (editor.selection.kind === "obstacle") {
      level.obstacles.splice(editor.selection.index, 1);
    }
    if (editor.selection.kind === "slot") {
      level.slots.splice(editor.selection.index, 1);
    }
    editor.selection = null;
    editor.hover = null;
    syncEditorPanel();
  }

  function addObstacle(type) {
    const base = editor.selection?.object ?? { x: WORLD.w / 2, y: WORLD.h / 2, angle: 0 };
    let object;
    if (type === "parked") {
      object = {
        x: snap(base.x + 44),
        y: snap(base.y + 44),
        w: 68,
        h: 112,
        angle: base.angle || 0,
        type: "parked",
        color: palette[level.obstacles.length % palette.length],
        design: carDesigns[level.obstacles.length % carDesigns.length].id,
      };
    }
    if (type === "cone") {
      object = cone(snap(base.x + 40), snap(base.y + 40));
    }
    if (type === "curb") {
      object = curb(snap(base.x + 56), snap(base.y + 40), 180, 34);
    }
    level.obstacles.push(object);
    selectEditorItem({
      kind: "obstacle",
      label: obstacleLabel(object, level.obstacles.length - 1),
      object,
      index: level.obstacles.length - 1,
      rect: object,
    });
  }

  function handleEditorPointerDown(event) {
    if (!editor.enabled) return;
    const point = worldPointFromEvent(event);
    const item = pickEditorItem(point);
    editor.hover = item;
    selectEditorItem(item);
    if (!item) return;
    editor.drag = {
      pointerId: event.pointerId,
      offsetX: point.x - item.object.x,
      offsetY: point.y - item.object.y,
    };
    canvas.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  function handleEditorPointerMove(event) {
    if (!editor.enabled) return;
    const point = worldPointFromEvent(event);
    if (editor.drag) {
      moveEditorSelection(point);
      event.preventDefault();
      return;
    }
    editor.hover = pickEditorItem(point);
  }

  function handleEditorPointerUp(event) {
    if (!editor.enabled) return;
    editor.drag = null;
    canvas.releasePointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  function initEditorPanel() {
    editorLevelSelect.replaceChildren(
      ...levels.map((levelData, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = `레벨 ${index + 1} · ${levelData.name}`;
        return option;
      }),
    );
    syncEditorPanel();
  }

  const keyMap = new Map([
    ["arrowup", "up"],
    ["w", "up"],
    ["arrowdown", "down"],
    ["s", "down"],
    ["arrowleft", "left"],
    ["a", "left"],
    ["arrowright", "right"],
    ["d", "right"],
    [" ", "brake"],
  ]);

  window.addEventListener("keydown", (event) => {
    const lowered = event.key.toLowerCase();
    if (lowered === "e") {
      setEditorMode(!editor.enabled);
      event.preventDefault();
      return;
    }

    if (editor.enabled) {
      if (event.key === "[" || event.key === "{") rotateSelected(-Math.PI / 12);
      if (event.key === "]" || event.key === "}") rotateSelected(Math.PI / 12);
      if (event.key === "Delete" || event.key === "Backspace") deleteSelected();
      if ((event.ctrlKey || event.metaKey) && lowered === "s") saveLayouts();
      if (event.key === "Escape") setEditorMode(false);
      event.preventDefault();
      return;
    }

    const key = keyMap.get(event.key.toLowerCase());
    if (key) {
      input[key] = true;
      event.preventDefault();
    }
    if (lowered === "p") setPaused(!paused);
    if (lowered === "r") loadLevel(activeLevel);
  });

  window.addEventListener("keyup", (event) => {
    const key = keyMap.get(event.key.toLowerCase());
    if (key) {
      input[key] = false;
      event.preventDefault();
    }
  });

  document.querySelectorAll(".touch-pad button").forEach((button) => {
    const control = button.dataset.control;
    const activate = (event) => {
      input[control] = true;
      button.classList.add("is-active");
      button.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };
    const release = (event) => {
      input[control] = false;
      button.classList.remove("is-active");
      event.preventDefault();
    };
    button.addEventListener("pointerdown", activate);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
  });

  pauseButton.addEventListener("click", () => setPaused(!paused));
  resetButton.addEventListener("click", () => loadLevel(activeLevel));
  editButton.addEventListener("click", () => setEditorMode(!editor.enabled));
  editorLevelSelect.addEventListener("change", () => loadLevel(Number(editorLevelSelect.value)));
  saveLayoutButton.addEventListener("click", saveLayouts);
  resetLayoutButton.addEventListener("click", resetCurrentLayout);
  addParkedButton.addEventListener("click", () => addObstacle("parked"));
  addConeButton.addEventListener("click", () => addObstacle("cone"));
  addCurbButton.addEventListener("click", () => addObstacle("curb"));
  deleteItemButton.addEventListener("click", deleteSelected);
  rotateLeftButton.addEventListener("click", () => rotateSelected(-Math.PI / 12));
  rotateRightButton.addEventListener("click", () => rotateSelected(Math.PI / 12));
  canvas.addEventListener("pointerdown", handleEditorPointerDown);
  canvas.addEventListener("pointermove", handleEditorPointerMove);
  canvas.addEventListener("pointerup", handleEditorPointerUp);
  canvas.addEventListener("pointercancel", handleEditorPointerUp);
  window.addEventListener("resize", resizeCanvas);

  function frame(now) {
    const dt = clamp((now - lastFrame) / 1000, 0, 0.034);
    lastFrame = now;
    if (!paused && !finished && !editor.enabled) update(dt);
    draw(now / 1000);
    requestAnimationFrame(frame);
  }

  initEditorPanel();
  loadLevel(0);
  resizeCanvas();
  requestAnimationFrame(frame);
})();
