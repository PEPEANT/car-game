(function () {
  window.CarGameLevels = [
    {
      "name": "A",
      "spawn": {
        "x": 272,
        "y": 592,
        "angle": 0
      },
      "target": {
        "x": 1008,
        "y": 176,
        "w": 96,
        "h": 142,
        "angle": 0
      },
      "slots": [
        {
          "x": 560,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 672,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 784,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 896,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1008,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1120,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 560,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 672,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 784,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 896,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1008,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1120,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        }
      ],
      "designs": [
        {
          "id": "lane",
          "type": "lane",
          "label": "중앙선",
          "x": 740,
          "y": 392,
          "w": 972,
          "h": 44,
          "angle": 0
        },
        {
          "id": "entry-arrow",
          "type": "arrow",
          "label": "진입 화살표",
          "x": 1012,
          "y": 308,
          "w": 90,
          "h": 60,
          "angle": -1.5707963267948966,
          "phase": 0
        },
        {
          "id": "exit-arrow",
          "type": "arrow",
          "label": "출구 화살표",
          "x": 484,
          "y": 324,
          "w": 90,
          "h": 60,
          "angle": 0,
          "phase": 1
        },
        {
          "id": "crosswalk",
          "type": "crosswalk",
          "label": "횡단보도",
          "x": 384,
          "y": 596,
          "w": 108,
          "h": 82,
          "angle": 0
        }
      ],
      "obstacles": [
        {
          "x": 560,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#f2f2ef",
          "design": "white-minivan"
        },
        {
          "x": 672,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#c9c7c2",
          "design": "silver-sedan"
        },
        {
          "x": 896,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#2c2d2c",
          "design": "charcoal-suv"
        },
        {
          "x": 1120,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#172a46",
          "design": "navy-wagon"
        },
        {
          "x": 560,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 784,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 1008,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 84,
          "y": 300,
          "w": 240,
          "h": 34,
          "angle": -1.5707963267948966,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 312,
          "y": 172,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 196,
          "y": 216,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 440,
          "y": 140,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        }
      ]
    },
    {
      "name": "B",
      "spawn": {
        "x": 1084,
        "y": 430,
        "angle": -1.5707963267948966
      },
      "target": {
        "x": 672,
        "y": 584,
        "w": 96,
        "h": 142,
        "angle": 3.141592653589793
      },
      "slots": [
        {
          "x": 560,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 672,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 784,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 896,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1008,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1120,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 560,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 672,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 784,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 896,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1008,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1120,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        }
      ],
      "obstacles": [
        {
          "x": 560,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#c9c7c2",
          "design": "silver-sedan"
        },
        {
          "x": 784,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#2c2d2c",
          "design": "charcoal-suv"
        },
        {
          "x": 896,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#172a46",
          "design": "navy-wagon"
        },
        {
          "x": 1120,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 560,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 784,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 896,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#f2f2ef",
          "design": "white-minivan"
        },
        {
          "x": 1120,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#c9c7c2",
          "design": "silver-sedan"
        },
        {
          "x": 618,
          "y": 365,
          "w": 350,
          "h": 34,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 244,
          "y": 454,
          "w": 34,
          "h": 210,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 486,
          "y": 318,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 526,
          "y": 318,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 566,
          "y": 318,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 606,
          "y": 318,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        }
      ],
      "designs": [
        {
          "id": "lane",
          "type": "lane",
          "label": "중앙선",
          "x": 640,
          "y": 380,
          "w": 972,
          "h": 44,
          "angle": 0
        },
        {
          "id": "entry-arrow",
          "type": "arrow",
          "label": "진입 화살표",
          "x": 282,
          "y": 384,
          "w": 90,
          "h": 60,
          "angle": 1.5707963267948966,
          "phase": 0
        },
        {
          "id": "exit-arrow",
          "type": "arrow",
          "label": "출구 화살표",
          "x": 1050,
          "y": 384,
          "w": 90,
          "h": 60,
          "angle": -1.5707963267948966,
          "phase": 1
        },
        {
          "id": "crosswalk",
          "type": "crosswalk",
          "label": "횡단보도",
          "x": 140,
          "y": 545,
          "w": 108,
          "h": 82,
          "angle": 0
        }
      ]
    },
    {
      "name": "C",
      "spawn": {
        "x": 180,
        "y": 132,
        "angle": 1.5707963267948966
      },
      "target": {
        "x": 1100,
        "y": 420,
        "w": 96,
        "h": 142,
        "angle": -1.5707963267948966
      },
      "slots": [
        {
          "x": 184,
          "y": 240,
          "w": 96,
          "h": 142,
          "angle": 1.5707963267948966
        },
        {
          "x": 184,
          "y": 348,
          "w": 96,
          "h": 142,
          "angle": 1.5707963267948966
        },
        {
          "x": 180,
          "y": 464,
          "w": 96,
          "h": 142,
          "angle": 1.5707963267948966
        },
        {
          "x": 180,
          "y": 576,
          "w": 96,
          "h": 142,
          "angle": 1.5707963267948966
        },
        {
          "x": 1100,
          "y": 196,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 1100,
          "y": 308,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 1100,
          "y": 420,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 1100,
          "y": 532,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 672,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 784,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 896,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1008,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 672,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 784,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 896,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 564,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        }
      ],
      "designs": [
        {
          "id": "lane",
          "type": "lane",
          "label": "중앙선",
          "x": 548,
          "y": 690,
          "w": 972,
          "h": 44,
          "angle": 0
        },
        {
          "id": "entry-arrow",
          "type": "arrow",
          "label": "진입 화살표",
          "x": 320,
          "y": 284,
          "w": 90,
          "h": 60,
          "angle": 1.5707963267948966,
          "phase": 0
        },
        {
          "id": "exit-arrow",
          "type": "arrow",
          "label": "출구 화살표",
          "x": 492,
          "y": 276,
          "w": 90,
          "h": 60,
          "angle": -1.5707963267948966,
          "phase": 1
        },
        {
          "id": "crosswalk",
          "type": "crosswalk",
          "label": "횡단보도",
          "x": 408,
          "y": 588,
          "w": 108,
          "h": 82,
          "angle": 0
        }
      ],
      "obstacles": [
        {
          "x": 184,
          "y": 236,
          "w": 68,
          "h": 112,
          "angle": 1.5707963267948966,
          "type": "parked",
          "color": "#2c2d2c",
          "design": "charcoal-suv"
        },
        {
          "x": 184,
          "y": 356,
          "w": 68,
          "h": 112,
          "angle": 1.5707963267948966,
          "type": "parked",
          "color": "#172a46",
          "design": "navy-wagon"
        },
        {
          "x": 180,
          "y": 576,
          "w": 68,
          "h": 112,
          "angle": 1.5707963267948966,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 1100,
          "y": 196,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 1100,
          "y": 308,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 1100,
          "y": 532,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#f2f2ef",
          "design": "white-minivan"
        },
        {
          "x": 672,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#172a46",
          "design": "navy-wagon"
        },
        {
          "x": 896,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 784,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 896,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 440,
          "y": 480,
          "w": 370,
          "h": 34,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 588,
          "y": 200,
          "w": 34,
          "h": 178,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 726,
          "y": 306,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 774,
          "y": 306,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 822,
          "y": 306,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 870,
          "y": 306,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        }
      ]
    },
    {
      "name": "D",
      "spawn": {
        "x": 160,
        "y": 610,
        "angle": 1.5707963267948966
      },
      "target": {
        "x": 1020,
        "y": 384,
        "w": 96,
        "h": 142,
        "angle": -1.5707963267948966
      },
      "slots": [
        {
          "x": 560,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 672,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 784,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 896,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1008,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 1120,
          "y": 176,
          "w": 96,
          "h": 142,
          "angle": 0
        },
        {
          "x": 560,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 672,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 784,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 896,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1008,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 1120,
          "y": 584,
          "w": 96,
          "h": 142,
          "angle": 3.141592653589793
        },
        {
          "x": 580,
          "y": 388,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 716,
          "y": 388,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 868,
          "y": 388,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        },
        {
          "x": 1016,
          "y": 380,
          "w": 96,
          "h": 142,
          "angle": -1.5707963267948966
        }
      ],
      "designs": [
        {
          "id": "lane",
          "type": "lane",
          "label": "중앙선",
          "x": 692,
          "y": 690,
          "w": 972,
          "h": 44,
          "angle": 0
        },
        {
          "id": "entry-arrow",
          "type": "arrow",
          "label": "진입 화살표",
          "x": 424,
          "y": 280,
          "w": 90,
          "h": 60,
          "angle": 1.5707963267948966,
          "phase": 0
        },
        {
          "id": "exit-arrow",
          "type": "arrow",
          "label": "출구 화살표",
          "x": 1164,
          "y": 384,
          "w": 90,
          "h": 60,
          "angle": -1.5707963267948966,
          "phase": 1
        },
        {
          "id": "crosswalk",
          "type": "crosswalk",
          "label": "횡단보도",
          "x": 120,
          "y": 424,
          "w": 108,
          "h": 82,
          "angle": 0
        }
      ],
      "obstacles": [
        {
          "x": 560,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 672,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 896,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 1008,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#f2f2ef",
          "design": "white-minivan"
        },
        {
          "x": 1120,
          "y": 176,
          "w": 68,
          "h": 112,
          "angle": 0,
          "type": "parked",
          "color": "#c9c7c2",
          "design": "silver-sedan"
        },
        {
          "x": 560,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#2c2d2c",
          "design": "charcoal-suv"
        },
        {
          "x": 784,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#172a46",
          "design": "navy-wagon"
        },
        {
          "x": 1008,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#bddde0",
          "design": "pale-blue-compact"
        },
        {
          "x": 1120,
          "y": 584,
          "w": 68,
          "h": 112,
          "angle": 3.141592653589793,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 568,
          "y": 388,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#f3f1eb",
          "design": "white-van"
        },
        {
          "x": 716,
          "y": 384,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#5c5f49",
          "design": "olive-pickup"
        },
        {
          "x": 864,
          "y": 388,
          "w": 68,
          "h": 112,
          "angle": -1.5707963267948966,
          "type": "parked",
          "color": "#f2f2ef",
          "design": "white-minivan"
        },
        {
          "x": 344,
          "y": 376,
          "w": 34,
          "h": 252,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 752,
          "y": 544,
          "w": 312,
          "h": 34,
          "angle": 0,
          "type": "curb",
          "color": "#303b3a"
        },
        {
          "x": 404,
          "y": 492,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 448,
          "y": 492,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 492,
          "y": 492,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 152,
          "y": 188,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        },
        {
          "x": 232,
          "y": 120,
          "w": 32,
          "h": 32,
          "angle": 0,
          "type": "cone",
          "color": "#ff8a3d"
        }
      ]
    }
  ];
})();
