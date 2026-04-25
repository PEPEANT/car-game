(function () {
  const basePath = "assets/cars/individual/";

  window.CarGameVehicleAssets = {
    playerDesignId: "pale-blue-compact",
    aliases: {
      "seoul-sedan": "silver-sedan",
      "taxi-yellow": "pale-blue-compact",
      "city-suv": "charcoal-suv",
      "ev-white": "silver-sedan",
      "red-fastback": "silver-sedan",
      "silver-van": "white-minivan",
      "midnight-sedan": "charcoal-suv",
      "blue-hatchback": "navy-wagon",
    },
    designs: [
      {
        id: "white-minivan",
        body: "#f2f2ef",
        type: "van",
        src: `${basePath}01-white-minivan.png`,
        crop: { x: 36, y: 17, w: 288, h: 536 },
        minWidthScale: 1.16,
      },
      {
        id: "silver-sedan",
        body: "#c9c7c2",
        type: "sedan",
        src: `${basePath}03-silver-sedan.png`,
        crop: { x: 42, y: 34, w: 275, h: 503 },
        minWidthScale: 1.12,
      },
      {
        id: "charcoal-suv",
        body: "#2c2d2c",
        type: "suv",
        src: `${basePath}04-charcoal-suv.png`,
        crop: { x: 40, y: 38, w: 280, h: 494 },
        minWidthScale: 1.18,
      },
      {
        id: "navy-wagon",
        body: "#172a46",
        type: "wagon",
        src: `${basePath}05-navy-wagon.png`,
        crop: { x: 39, y: 25, w: 282, h: 498 },
        minWidthScale: 1.18,
      },
      {
        id: "pale-blue-compact",
        body: "#bddde0",
        type: "compact",
        src: `${basePath}02-pale-blue-compact.png`,
        crop: { x: 49, y: 50, w: 262, h: 459 },
        minWidthScale: 1.08,
      },
      {
        id: "white-van",
        body: "#f3f1eb",
        type: "van",
        src: `${basePath}07-white-van.png`,
        crop: { x: 46, y: 61, w: 267, h: 438 },
        minWidthScale: 1.16,
      },
      {
        id: "olive-pickup",
        body: "#5c5f49",
        type: "pickup",
        src: `${basePath}08-olive-pickup.png`,
        crop: { x: 41, y: 27, w: 278, h: 494 },
        minWidthScale: 1.18,
      },
    ],
  };
})();
