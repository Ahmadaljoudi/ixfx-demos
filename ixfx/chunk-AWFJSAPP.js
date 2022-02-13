import {
  Colour_exports,
  Drawing_exports
} from "./chunk-TSPA5LNV.js";
import {
  fromNumbers
} from "./chunk-77MRLFOF.js";
import {
  mapCircular
} from "./chunk-BN26ULXV.js";
import {
  minMaxAvg,
  randomElement
} from "./chunk-46AVLJSS.js";
import {
  parentSizeCanvas,
  resolveEl
} from "./chunk-EGNKYH6P.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField
} from "./chunk-YDTVC7MM.js";

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  Colour: () => Colour_exports,
  DictionaryOfColourCombinations: () => DictionaryOfColourCombinations_exports,
  Drawing: () => Drawing_exports,
  Palette: () => Palette_exports,
  Plot: () => Plot_exports,
  Svg: () => Svg_exports
});

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  applyOpts: () => applyOpts,
  applyPathOpts: () => applyPathOpts,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getOrCreateDefX: () => getOrCreateDefX,
  svg: () => svg
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth)
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  if (opts.markerHeight)
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  if (opts.orient)
    m.setAttribute(`orient`, opts.orient.toString());
  else
    m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox)
    m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX)
    m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY)
    m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null)
    return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null)
    throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight)
      opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth)
      opts = { ...opts, markerWidth: 6 };
    if (!opts.refX)
      opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY)
      opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`)
      opts = { ...opts, fillStyle: `black` };
    if (!opts.viewBox)
      opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts)
        applyOpts(tri, opts);
      return tri;
    });
  } else
    throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var numOrPercentage = (v) => {
  if (v >= 0 && v <= 1)
    return v * 100 + `%`;
  return v.toString();
};
var pathEl = (svgOrArray, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `path`, queryOrExisting);
  const svg2 = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  p.setAttributeNS(null, `d`, svg2);
  parent.appendChild(p);
  if (opts)
    applyOpts(p, opts);
  return p;
};
var circleUpdate = (el, circle, opts) => {
  el.setAttributeNS(null, `cx`, circle.x.toString());
  el.setAttributeNS(null, `cy`, circle.y.toString());
  el.setAttributeNS(null, `r`, circle.radius.toString());
  if (opts)
    applyOpts(el, opts);
};
var circleEl = (circle, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `circle`, queryOrExisting);
  circleUpdate(p, circle, opts);
  return p;
};
var lineEl = (line, parent, opts, queryOrExisting) => {
  const lineEl2 = createOrResolve(parent, `line`, queryOrExisting);
  lineEl2.setAttributeNS(null, `x1`, line.a.x.toString());
  lineEl2.setAttributeNS(null, `y1`, line.a.y.toString());
  lineEl2.setAttributeNS(null, `x2`, line.b.x.toString());
  lineEl2.setAttributeNS(null, `y2`, line.b.y.toString());
  if (opts)
    applyOpts(lineEl2, opts);
  if (opts)
    applyPathOpts(lineEl2, opts);
  return lineEl2;
};
var textPathUpdate = (el, text, opts) => {
  if (opts?.method)
    el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side)
    el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing)
    el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numOrPercentage(opts.startOffset));
  }
  if (opts?.textLength)
    el.setAttributeNS(null, `textLength`, numOrPercentage(opts.textLength));
  if (text) {
    el.textContent = text;
  }
};
var textPathEl = (pathRef, text, parent, opts, queryOrExisting) => {
  const textEl2 = createOrResolve(parent, `text`, queryOrExisting + `-text`);
  textElUpdate(textEl2, void 0, void 0, opts);
  const p = createOrResolve(textEl2, `textPath`, queryOrExisting);
  p.setAttributeNS(null, `href`, pathRef);
  textPathUpdate(p, text, opts);
  if (opts)
    applyOpts(p, opts);
  return p;
};
var textElUpdate = (el, pos, text, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text) {
    el.textContent = text;
  }
  if (opts) {
    applyOpts(el, opts);
    if (opts.anchor)
      el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align)
      el.setAttributeNS(null, `alignment-baseline`, opts.align);
  }
};
var textEl = (text, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `text`, queryOrExisting);
  textElUpdate(p, pos, text, opts);
  return p;
};
var grid = (parent, center, spacing, width, height, opts = {}) => {
  if (!opts.strokeStyle)
    opts = { ...opts, strokeStyle: Palette_exports.getCssVariable(`bg-dim`, `silver`) };
  if (!opts.strokeWidth)
    opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts(g, opts);
  let y = 0;
  while (y < height) {
    const horiz = fromNumbers(0, y, width, y);
    lineEl(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height);
    lineEl(vert, g);
    x += spacing;
  }
  parent.appendChild(g);
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    if (typeof queryOrExisting === `string`)
      existing = parent.querySelector(queryOrExisting);
    else
      existing = queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.appendChild(p);
    if (queryOrExisting && typeof queryOrExisting === `string`) {
      if (queryOrExisting.startsWith(`#`))
        p.id = queryOrExisting.substring(1);
    }
    return p;
  }
  return existing;
};
var getOrCreateDefX = (parent, id, creator) => {
  const created = creator();
  if (created === void 0)
    throw new Error(`Could not create def ${id}`);
  return created;
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
  if (opts.markerStart)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerStart, opts));
  if (opts.markerMid)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerMid, opts));
};
var applyOpts = (elem, opts) => {
  if (opts.fillStyle)
    elem.setAttributeNS(null, `fill`, opts.fillStyle);
  if (opts.strokeStyle)
    elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth)
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  if (opts.strokeDash)
    elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
};
var svg = (parent, parentOpts) => {
  if (parentOpts)
    applyOpts(parent, parentOpts);
  const o = {
    text: (text, pos, opts, queryOrExisting) => textEl(text, parent, pos, opts, queryOrExisting),
    textPath: (pathRef, text, opts, queryOrExisting) => textPathEl(pathRef, text, parent, opts, queryOrExisting),
    line: (line, opts, queryOrExisting) => lineEl(line, parent, opts, queryOrExisting),
    circle: (circle, opts, queryOrExisting) => circleEl(circle, parent, opts, queryOrExisting),
    path: (svgStr, opts, queryOrExisting) => pathEl(svgStr, parent, opts, queryOrExisting),
    grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set height(height) {
      parent.setAttributeNS(null, `height`, height.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  };
  return o;
};

// src/visual/Plot.ts
var Plot_exports = {};
__export(Plot_exports, {
  add: () => add,
  createScales: () => createScales,
  draw: () => draw,
  drawSeries: () => drawSeries,
  drawSeriesAxis: () => drawSeriesAxis,
  plot: () => plot
});

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create,
  getCssVariable: () => getCssVariable
});
var create = (fallbacks) => new PaletteImpl(fallbacks);
var _store, _aliases, _lastFallback, _elementBase;
var PaletteImpl = class {
  constructor(fallbacks) {
    __privateAdd(this, _store, /* @__PURE__ */ new Map());
    __privateAdd(this, _aliases, /* @__PURE__ */ new Map());
    __publicField(this, "fallbacks");
    __privateAdd(this, _lastFallback, 0);
    __privateAdd(this, _elementBase, void 0);
    if (fallbacks !== void 0)
      this.fallbacks = fallbacks;
    else
      this.fallbacks = [`red`, `blue`, `green`, `orange`];
    __privateSet(this, _elementBase, document.body);
  }
  setElementBase(el) {
    __privateSet(this, _elementBase, el);
  }
  add(key, colour) {
    __privateGet(this, _store).set(key, colour);
  }
  alias(from, to) {
    __privateGet(this, _aliases).set(from, to);
  }
  get(key, fallback) {
    const alias = __privateGet(this, _aliases).get(key);
    if (alias !== void 0)
      key = alias;
    const c = __privateGet(this, _store).get(key);
    if (c !== void 0)
      return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(__privateGet(this, _elementBase)).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0)
        return fallback;
      fromCss = this.fallbacks[__privateGet(this, _lastFallback)];
      __privateWrapper(this, _lastFallback)._++;
      if (__privateGet(this, _lastFallback) === this.fallbacks.length)
        __privateSet(this, _lastFallback, 0);
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key))
      return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return __privateGet(this, _store).has(key);
  }
};
_store = new WeakMap();
_aliases = new WeakMap();
_lastFallback = new WeakMap();
_elementBase = new WeakMap();
var getCssVariable = (name, fallbackColour = `black`, root) => {
  if (root === void 0)
    root = document.body;
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0)
    return fallbackColour;
  return fromCss;
};

// src/visual/Plot.ts
var piPi = Math.PI * 2;
var createScales = (buffer) => {
  const seriesNames = buffer.keys();
  const scales = [];
  seriesNames.forEach((s) => {
    const series = buffer.get(s);
    if (series === void 0)
      return;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    if (range === 0) {
      range = min;
      min = min - range / 2;
      max = max + range / 2;
    }
    scales.push({
      min,
      max,
      range,
      name: s
    });
  });
  return scales;
};
var add = (buffer, value, series = "") => {
  buffer.addKeyedValues(series, value);
};
var draw = (buffer, drawing) => {
  const { fixedRange, ctx, yLabelWidth, width, height } = drawing;
  const showYAxis = drawing.showYAxis ?? true;
  const margin = 10;
  const cap = drawing.capacity === 0 ? buffer.lengthMax : drawing.capacity;
  let series = createScales(buffer);
  if (fixedRange !== void 0) {
    series = series.map((s) => ({ ...s, range: fixedRange[1] - fixedRange[0], min: fixedRange[0], max: fixedRange[1] }));
  }
  ctx.clearRect(0, 0, width, height);
  ctx.translate(margin, 0);
  if (showYAxis) {
    series.forEach((s) => {
      if (drawing.yAxes !== void 0) {
        if (typeof drawing.yAxes === `string` && s.name !== drawing.yAxes)
          return;
        if (!drawing.yAxes.includes(s.name))
          return;
      }
      drawSeriesAxis(s, drawing);
      ctx.translate(yLabelWidth + 3, 0);
    });
  }
  const plotDrawing = {
    ...drawing,
    width: width - margin - margin - (showYAxis ? yLabelWidth : 0),
    height: height - margin - margin
  };
  if (plotDrawing.dataXScale === void 0)
    plotDrawing.dataXScale = plotDrawing.width / cap, ctx.translate(0, margin);
  series.forEach((s) => {
    const data2 = buffer.getSource(s.name);
    if (data2 === void 0)
      return;
    drawSeries(s, data2, plotDrawing);
  });
  ctx.resetTransform();
};
var drawSeriesAxis = (series, drawing) => {
  const { ctx, height, palette } = drawing;
  if (palette.has(`series-${series.name}-axis`))
    ctx.fillStyle = palette.get(`series-${series.name}-axis`);
  else
    ctx.fillStyle = palette.getOrAdd(`series-${series.name}`);
  const mid = series.min + series.range / 2;
  const halfHeight = drawing.textHeight / 2;
  const y = 6;
  ctx.textBaseline = `top`;
  ctx.fillText(series.min.toFixed(2), 0, height - drawing.textHeight - y);
  ctx.fillText(series.max.toFixed(2), 0, halfHeight);
  ctx.fillText(mid.toFixed(2), 0, height / 2 - halfHeight);
};
var drawSeries = (series, values, drawing) => {
  const { ctx, height, dataXScale = 1, lineWidth = 2, fixedRange } = drawing;
  let x = 0;
  let leadingEdge;
  const style = drawing.style ?? `connected`;
  if (style === `dots`) {
    ctx.fillStyle = drawing.palette.getOrAdd(`series-${series.name}`);
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = drawing.palette.getOrAdd(`series-${series.name}`);
  }
  const incrementBy = drawing.coalesce ? drawing.dataXScale < 0 ? Math.floor(1 / drawing.dataXScale) : 1 : 1;
  for (let i = 0; i < values.length; i += incrementBy) {
    let y = (1 - (values[i] - series.min) / series.range) * height + 5;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi);
      ctx.fill();
    } else {
      if (i == 0)
        ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (i + 1 == values.pointer) {
      leadingEdge = { x, y };
    }
    x += dataXScale;
  }
  ctx.stroke();
  if (leadingEdge !== void 0) {
    ctx.beginPath();
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var plot = (parentElOrQuery, opts) => {
  const parentEl = resolveEl(parentElOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
  } else {
    console.log("not reusing");
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
  }
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = mapCircular({ capacity });
  const metrics = ctx.measureText("Xy");
  const coalesce = opts.coalesce ?? true;
  let drawingOpts = {
    ...opts,
    capacity,
    coalesce,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    palette: opts.palette ?? create(),
    style: opts.style ?? `connected`,
    width: canvasEl.width,
    height: canvasEl.height,
    ctx,
    yLabelWidth: 25
  };
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = { ...drawingOpts, width: bounds.width, height: bounds.height };
      draw(buffer, drawingOpts);
    });
  }
  return {
    dispose: () => {
      if (destroyCanvasEl)
        canvasEl.remove();
    },
    add: (value, series = "", skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing)
        return;
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/DictionaryOfColourCombinations.ts
var DictionaryOfColourCombinations_exports = {};
__export(DictionaryOfColourCombinations_exports, {
  randomPalette: () => randomPalette
});

// src/visual/DictionaryOfColourCombinationsData.ts
var data = [
  {
    "name": "Hermosa Pink",
    "combinations": [
      176,
      227,
      273
    ],
    "swatch": 0,
    "cmyk": [
      0,
      30,
      6,
      0
    ],
    "lab": [
      83.42717631799802,
      22.136186770428026,
      1.6381322957198563
    ],
    "rgb": [
      249,
      193,
      206
    ],
    "hex": "#f9c1ce"
  },
  {
    "name": "Corinthian Pink",
    "combinations": [
      27,
      43,
      87,
      97,
      128,
      169,
      174,
      206,
      246,
      254,
      264,
      342
    ],
    "swatch": 0,
    "cmyk": [
      0,
      35,
      15,
      0
    ],
    "lab": [
      80.34637979705501,
      25.369649805447466,
      7.879377431906619
    ],
    "rgb": [
      248,
      182,
      186
    ],
    "hex": "#f8b6ba"
  },
  {
    "name": "Cameo Pink",
    "combinations": [
      101,
      105,
      116,
      120,
      165,
      231
    ],
    "swatch": 0,
    "cmyk": [
      10,
      32,
      19,
      0
    ],
    "lab": [
      77.21675440604257,
      17.198443579766547,
      4.949416342412462
    ],
    "rgb": [
      224,
      179,
      182
    ],
    "hex": "#e0b3b6"
  },
  {
    "name": "Fawn",
    "combinations": [
      18,
      125,
      308
    ],
    "swatch": 0,
    "cmyk": [
      18,
      31,
      30,
      0
    ],
    "lab": [
      74.48996719310291,
      11.194552529182886,
      9.38521400778211
    ],
    "rgb": [
      209,
      176,
      167
    ],
    "hex": "#d1b0a7"
  },
  {
    "name": "Light Brown Drab",
    "combinations": [
      35,
      68,
      185,
      191,
      223,
      239,
      244,
      268,
      285,
      321
    ],
    "swatch": 0,
    "cmyk": [
      8,
      30,
      20,
      25
    ],
    "lab": [
      64.1168841077287,
      13.023346303501938,
      5.3424124513618665
    ],
    "rgb": [
      181,
      147,
      146
    ],
    "hex": "#b59392"
  },
  {
    "name": "Coral Red",
    "combinations": [
      92,
      123,
      320,
      332
    ],
    "swatch": 0,
    "cmyk": [
      0,
      55,
      40,
      0
    ],
    "lab": [
      70.28305485618371,
      39.28793774319067,
      23.190661478599225
    ],
    "rgb": [
      245,
      142,
      132
    ],
    "hex": "#f58e84"
  },
  {
    "name": "Fresh Color",
    "combinations": [
      240
    ],
    "swatch": 0,
    "cmyk": [
      0,
      53,
      45,
      0
    ],
    "lab": [
      70.96208133058671,
      37.48249027237355,
      27.29571984435799
    ],
    "rgb": [
      246,
      145,
      126
    ],
    "hex": "#f6917e"
  },
  {
    "name": "Grenadine Pink",
    "combinations": [
      6,
      21,
      112,
      166,
      193,
      201,
      230,
      300,
      315,
      341
    ],
    "swatch": 0,
    "cmyk": [
      0,
      62,
      58,
      0
    ],
    "lab": [
      66.89402609292745,
      43.82879377431905,
      34.70038910505838
    ],
    "rgb": [
      244,
      128,
      103
    ],
    "hex": "#f48067"
  },
  {
    "name": "Eosine Pink",
    "combinations": [
      34,
      59,
      90,
      108,
      134,
      153,
      197,
      242,
      248,
      276,
      287,
      314,
      327,
      336
    ],
    "swatch": 0,
    "cmyk": [
      0,
      63,
      23,
      0
    ],
    "lab": [
      67.25108720531014,
      46.68482490272373,
      10.29571984435799
    ],
    "rgb": [
      243,
      127,
      148
    ],
    "hex": "#f37f94"
  },
  {
    "name": "Spinel Red",
    "combinations": [
      14,
      147,
      165,
      184,
      195,
      224,
      277
    ],
    "swatch": 0,
    "cmyk": [
      0,
      70,
      21,
      0
    ],
    "lab": [
      64.53040360112917,
      52.18677042801556,
      8.291828793774329
    ],
    "rgb": [
      242,
      114,
      145
    ],
    "hex": "#f27291"
  },
  {
    "name": "Old Rose",
    "combinations": [
      55,
      162,
      260,
      265
    ],
    "swatch": 0,
    "cmyk": [
      15,
      70,
      40,
      0
    ],
    "lab": [
      58.771648737315935,
      42.1284046692607,
      12.307392996108945
    ],
    "rgb": [
      212,
      109,
      122
    ],
    "hex": "#d46d7a"
  },
  {
    "name": "Eugenia Red | A",
    "combinations": [
      284
    ],
    "swatch": 0,
    "cmyk": [
      7,
      76,
      60,
      0
    ],
    "lab": [
      58.36575875486381,
      50.754863813229576,
      28.536964980544752
    ],
    "rgb": [
      226,
      98,
      94
    ],
    "hex": "#e2625e"
  },
  {
    "name": "Eugenia Red | B",
    "combinations": [
      17,
      77,
      252,
      262,
      270,
      280,
      282,
      325
    ],
    "swatch": 0,
    "cmyk": [
      0,
      80,
      50,
      10
    ],
    "lab": [
      54.2748149843595,
      54.696498054474716,
      23.661478599221795
    ],
    "rgb": [
      218,
      82,
      93
    ],
    "hex": "#da525d"
  },
  {
    "name": "Raw Sienna",
    "combinations": [
      3,
      13,
      33,
      70,
      86,
      130,
      131,
      182,
      243,
      247,
      252,
      255,
      268,
      269,
      279,
      293,
      298,
      319,
      327
    ],
    "swatch": 0,
    "cmyk": [
      18,
      58,
      100,
      12
    ],
    "lab": [
      55.063706416418704,
      25.548638132295707,
      52.17120622568095
    ],
    "rgb": [
      187,
      113,
      37
    ],
    "hex": "#bb7125"
  },
  {
    "name": "Vinaceous Tawny",
    "combinations": [
      40,
      85,
      244
    ],
    "swatch": 0,
    "cmyk": [
      17,
      72,
      100,
      6
    ],
    "lab": [
      53.226520180056454,
      38.17509727626458,
      50.18677042801556
    ],
    "rgb": [
      197,
      97,
      39
    ],
    "hex": "#c56127"
  },
  {
    "name": "Jasper Red",
    "combinations": [
      155,
      194,
      216,
      219
    ],
    "swatch": 0,
    "cmyk": [
      2,
      83,
      100,
      0
    ],
    "lab": [
      56.809338521400775,
      58.41245136186771,
      57.630350194552534
    ],
    "rgb": [
      235,
      83,
      36
    ],
    "hex": "#eb5324"
  },
  {
    "name": "Spectrum Red",
    "combinations": [
      257,
      266,
      301,
      322
    ],
    "swatch": 0,
    "cmyk": [
      5,
      100,
      100,
      0
    ],
    "lab": [
      49.60708018616007,
      70.9260700389105,
      50.077821011673166
    ],
    "rgb": [
      227,
      31,
      38
    ],
    "hex": "#e31f26"
  },
  {
    "name": "Red Orange",
    "combinations": [
      31,
      164,
      179,
      241,
      264
    ],
    "swatch": 0,
    "cmyk": [
      9,
      90,
      100,
      0
    ],
    "lab": [
      51.8272678721294,
      60.64202334630349,
      50.88326848249028
    ],
    "rgb": [
      221,
      64,
      39
    ],
    "hex": "#dd4027"
  },
  {
    "name": "Etruscan Red",
    "combinations": [
      25,
      47,
      97,
      137,
      152,
      185,
      275
    ],
    "swatch": 0,
    "cmyk": [
      16,
      80,
      74,
      6
    ],
    "lab": [
      50.74845502403296,
      45.88326848249028,
      31.0544747081712
    ],
    "rgb": [
      197,
      83,
      71
    ],
    "hex": "#c55347"
  },
  {
    "name": "Burnt Sienna",
    "combinations": [
      198,
      242,
      263,
      285,
      286,
      297,
      312,
      333,
      343
    ],
    "swatch": 0,
    "cmyk": [
      22,
      76,
      100,
      15
    ],
    "lab": [
      46.43778133821622,
      36.23346303501947,
      43.7898832684825
    ],
    "rgb": [
      174,
      82,
      36
    ],
    "hex": "#ae5224"
  },
  {
    "name": "Ochre Red",
    "combinations": [
      199,
      283
    ],
    "swatch": 0,
    "cmyk": [
      18,
      73,
      63,
      20
    ],
    "lab": [
      46.81773098344396,
      35.73540856031127,
      21.848249027237358
    ],
    "rgb": [
      171,
      84,
      77
    ],
    "hex": "#ab544d"
  },
  {
    "name": "Scarlet",
    "combinations": [
      136,
      308,
      332
    ],
    "swatch": 0,
    "cmyk": [
      10,
      95,
      72,
      7
    ],
    "lab": [
      46.54612039368276,
      61.52529182879377,
      28.902723735408557
    ],
    "rgb": [
      203,
      47,
      67
    ],
    "hex": "#cb2f43"
  },
  {
    "name": "Carmine",
    "combinations": [
      39,
      117,
      122,
      154,
      225,
      232,
      307,
      313
    ],
    "swatch": 0,
    "cmyk": [
      0,
      100,
      75,
      16
    ],
    "lab": [
      44.29388876173037,
      67.18677042801556,
      33.71206225680933
    ],
    "rgb": [
      204,
      18,
      54
    ],
    "hex": "#cc1236"
  },
  {
    "name": "Indian Lake",
    "combinations": [
      299,
      331
    ],
    "swatch": 0,
    "cmyk": [
      12,
      89,
      35,
      9
    ],
    "lab": [
      47.54253452353704,
      57.21400778210116,
      6.677042801556411
    ],
    "rgb": [
      197,
      60,
      105
    ],
    "hex": "#c53c69"
  },
  {
    "name": "Rosolanc Purple",
    "combinations": [
      48,
      144,
      170,
      204,
      277,
      346
    ],
    "swatch": 0,
    "cmyk": [
      30,
      90,
      33,
      0
    ],
    "lab": [
      45.93881132219425,
      52.365758754863805,
      -3.159533073929964
    ],
    "rgb": [
      183,
      63,
      116
    ],
    "hex": "#b73f74"
  },
  {
    "name": "Pomegranite Purple",
    "combinations": [
      220,
      271
    ],
    "swatch": 0,
    "cmyk": [
      23,
      100,
      50,
      6
    ],
    "lab": [
      41.42519264515145,
      60.96108949416342,
      8.400778210116727
    ],
    "rgb": [
      183,
      31,
      87
    ],
    "hex": "#b71f57"
  },
  {
    "name": "Hydrangea Red",
    "combinations": [
      142
    ],
    "swatch": 0,
    "cmyk": [
      38,
      90,
      70,
      0
    ],
    "lab": [
      43.070115205615316,
      44.35408560311285,
      14.182879377431902
    ],
    "rgb": [
      169,
      65,
      81
    ],
    "hex": "#a94151"
  },
  {
    "name": "Brick Red",
    "combinations": [
      37,
      108,
      246,
      322,
      328
    ],
    "swatch": 0,
    "cmyk": [
      22,
      84,
      100,
      18
    ],
    "lab": [
      42.45975432974746,
      41.50972762645915,
      40.688715953307394
    ],
    "rgb": [
      168,
      66,
      34
    ],
    "hex": "#a84222"
  },
  {
    "name": "Carmine Red",
    "combinations": [
      35,
      51,
      104,
      130,
      181,
      200,
      221,
      228,
      233,
      237,
      245,
      338
    ],
    "swatch": 0,
    "cmyk": [
      25,
      95,
      80,
      16
    ],
    "lab": [
      38.71366445410849,
      50.22957198443581,
      24.688715953307394
    ],
    "rgb": [
      166,
      44,
      55
    ],
    "hex": "#a62c37"
  },
  {
    "name": "Pompeian Red",
    "combinations": [
      30,
      71,
      120,
      212,
      311,
      324
    ],
    "swatch": 0,
    "cmyk": [
      18,
      97,
      74,
      19
    ],
    "lab": [
      38.857099259937435,
      54.805447470817114,
      23.844357976653697
    ],
    "rgb": [
      171,
      36,
      57
    ],
    "hex": "#ab2439"
  },
  {
    "name": "Red",
    "combinations": [
      251,
      261
    ],
    "swatch": 0,
    "cmyk": [
      30,
      100,
      70,
      10
    ],
    "lab": [
      37.86678873884184,
      54.58754863813229,
      15.369649805447466
    ],
    "rgb": [
      167,
      33,
      68
    ],
    "hex": "#a72144"
  },
  {
    "name": "Brown",
    "combinations": [
      110,
      121,
      145,
      161
    ],
    "swatch": 0,
    "cmyk": [
      35,
      74,
      90,
      35
    ],
    "lab": [
      35.06981002517738,
      23.47470817120623,
      28.571984435797674
    ],
    "rgb": [
      124,
      66,
      38
    ],
    "hex": "#7c4226"
  },
  {
    "name": "Hay's Russet",
    "combinations": [
      58,
      82,
      95,
      152,
      186,
      231,
      249,
      304,
      314,
      336,
      345
    ],
    "swatch": 0,
    "cmyk": [
      37,
      85,
      87,
      35
    ],
    "lab": [
      31.235217822537575,
      30.657587548638134,
      23.509727626459153
    ],
    "rgb": [
      121,
      51,
      39
    ],
    "hex": "#793327"
  },
  {
    "name": "Vandyke Red",
    "combinations": [
      16,
      133,
      147,
      316,
      335
    ],
    "swatch": 0,
    "cmyk": [
      32,
      95,
      95,
      33
    ],
    "lab": [
      30.157930876630807,
      40.59922178988327,
      27.607003891050596
    ],
    "rgb": [
      130,
      36,
      31
    ],
    "hex": "#82241f"
  },
  {
    "name": "Pansy Purple",
    "combinations": [
      157,
      273
    ],
    "swatch": 0,
    "cmyk": [
      34,
      100,
      60,
      34
    ],
    "lab": [
      27.605096513313494,
      45.922178988326834,
      6.089494163424121
    ],
    "rgb": [
      125,
      19,
      58
    ],
    "hex": "#7d133a"
  },
  {
    "name": "Pale Burnt Lake",
    "combinations": [
      124,
      171,
      177,
      205,
      217,
      258,
      269,
      283
    ],
    "swatch": 0,
    "cmyk": [
      25,
      90,
      80,
      40
    ],
    "lab": [
      30.18234531166552,
      39.03501945525292,
      22.712062256809332
    ],
    "rgb": [
      128,
      38,
      38
    ],
    "hex": "#802626"
  },
  {
    "name": "Violet Red",
    "combinations": [
      9
    ],
    "swatch": 0,
    "cmyk": [
      75,
      100,
      50,
      5
    ],
    "lab": [
      27.77141985198749,
      30.38521400778211,
      -17.743190661478593
    ],
    "rgb": [
      100,
      45,
      94
    ],
    "hex": "#642d5e"
  },
  {
    "name": "Vistoris Lake",
    "combinations": [
      63,
      91,
      165,
      226,
      290,
      337
    ],
    "swatch": 0,
    "cmyk": [
      40,
      71,
      55,
      40
    ],
    "lab": [
      33.090714885175856,
      20.29571984435799,
      6.101167315175104
    ],
    "rgb": [
      109,
      65,
      69
    ],
    "hex": "#6d4145"
  },
  {
    "name": "Sulpher Yellow",
    "combinations": [
      52,
      72,
      80,
      104,
      132,
      135,
      151,
      208,
      246,
      254,
      270,
      294,
      296,
      310,
      315,
      320,
      321,
      326
    ],
    "swatch": 1,
    "cmyk": [
      4,
      4,
      28,
      0
    ],
    "lab": [
      93.22499427786678,
      -1.7315175097276239,
      21.64980544747081
    ],
    "rgb": [
      245,
      236,
      194
    ],
    "hex": "#f5ecc2"
  },
  {
    "name": "Pale Lemon Yellow",
    "combinations": [
      3,
      31,
      60,
      76,
      99,
      109,
      111,
      169,
      185,
      195,
      203,
      228,
      241,
      261,
      272,
      281,
      290,
      292,
      336
    ],
    "swatch": 1,
    "cmyk": [
      0,
      4,
      38,
      0
    ],
    "lab": [
      94.8577096208133,
      -0.14396887159533378,
      34.08560311284046
    ],
    "rgb": [
      255,
      239,
      174
    ],
    "hex": "#ffefae"
  },
  {
    "name": "Naples Yellow",
    "combinations": [
      14,
      115,
      166,
      193,
      303,
      325
    ],
    "swatch": 1,
    "cmyk": [
      2,
      7,
      44,
      0
    ],
    "lab": [
      91.7265583276112,
      0.31906614785992815,
      36.56809338521401
    ],
    "rgb": [
      251,
      230,
      160
    ],
    "hex": "#fbe6a0"
  },
  {
    "name": "Ivory Buff",
    "combinations": [
      11,
      50,
      94,
      102,
      126,
      178,
      184,
      190,
      209,
      214,
      235,
      243,
      262,
      266,
      301,
      343
    ],
    "swatch": 1,
    "cmyk": [
      8,
      15,
      40,
      0
    ],
    "lab": [
      85.59700923170824,
      3.377431906614788,
      27.268482490272362
    ],
    "rgb": [
      235,
      211,
      162
    ],
    "hex": "#ebd3a2"
  },
  {
    "name": "Seashell Pink",
    "combinations": [
      45,
      84,
      88,
      113,
      150,
      176,
      194,
      276,
      334
    ],
    "swatch": 1,
    "cmyk": [
      0,
      19,
      23,
      0
    ],
    "lab": [
      88.12848096437018,
      12.08949416342412,
      17.268482490272362
    ],
    "rgb": [
      253,
      212,
      189
    ],
    "hex": "#fdd4bd"
  },
  {
    "name": "Light Pinkish Cinnamon",
    "combinations": [
      317
    ],
    "swatch": 1,
    "cmyk": [
      0,
      25,
      40,
      0
    ],
    "lab": [
      84.2069123369192,
      15.630350194552534,
      29.809338521400775
    ],
    "rgb": [
      252,
      199,
      155
    ],
    "hex": "#fcc79b"
  },
  {
    "name": "Pinkish Cinnamon",
    "combinations": [
      78,
      161,
      175,
      232,
      258,
      263,
      292,
      305,
      310
    ],
    "swatch": 1,
    "cmyk": [
      5,
      32,
      53,
      0
    ],
    "lab": [
      77.84695201037613,
      17.229571984435808,
      34.747081712062254
    ],
    "rgb": [
      238,
      180,
      128
    ],
    "hex": "#eeb480"
  },
  {
    "name": "Cinnamon Buff",
    "combinations": [
      23,
      127,
      137,
      180,
      210,
      234,
      246,
      323,
      344
    ],
    "swatch": 1,
    "cmyk": [
      0,
      25,
      57,
      0
    ],
    "lab": [
      83.52941176470588,
      14.743190661478593,
      43.665369649805456
    ],
    "rgb": [
      253,
      197,
      126
    ],
    "hex": "#fdc57e"
  },
  {
    "name": "Cream Yellow",
    "combinations": [
      122,
      192,
      215,
      226,
      267,
      278,
      294,
      295,
      300,
      302,
      304,
      311,
      329,
      342
    ],
    "swatch": 1,
    "cmyk": [
      0,
      28,
      68,
      0
    ],
    "lab": [
      81.81277180132753,
      16.46692607003891,
      51.97665369649806
    ],
    "rgb": [
      253,
      191,
      104
    ],
    "hex": "#fdbf68"
  },
  {
    "name": "Golden Yellow",
    "combinations": [
      26,
      81,
      132,
      138,
      140,
      179,
      206,
      229,
      309,
      315
    ],
    "swatch": 1,
    "cmyk": [
      2,
      42,
      74,
      0
    ],
    "lab": [
      73.85671778439001,
      25.94163424124514,
      51.1828793774319
    ],
    "rgb": [
      243,
      162,
      87
    ],
    "hex": "#f3a257"
  },
  {
    "name": "Vinaceous Cinnamon",
    "combinations": [
      203,
      205,
      213,
      256,
      260,
      279,
      299
    ],
    "swatch": 1,
    "cmyk": [
      4,
      40,
      42,
      0
    ],
    "lab": [
      74.98741130693523,
      24.739299610894932,
      24.813229571984436
    ],
    "rgb": [
      238,
      167,
      140
    ],
    "hex": "#eea78c"
  },
  {
    "name": "Ochraceous Salmon",
    "combinations": [
      32,
      71,
      121,
      186,
      217,
      220,
      223,
      238,
      296,
      339
    ],
    "swatch": 1,
    "cmyk": [
      15,
      38,
      55,
      0
    ],
    "lab": [
      71.44731822690166,
      16.459143968871587,
      29.101167315175104
    ],
    "rgb": [
      216,
      163,
      123
    ],
    "hex": "#d8a37b"
  },
  {
    "name": "Isabella Color",
    "combinations": [
      4,
      12,
      241,
      292
    ],
    "swatch": 1,
    "cmyk": [
      15,
      28,
      60,
      10
    ],
    "lab": [
      69.68337529564354,
      7.070038910505843,
      33.02334630350194
    ],
    "rgb": [
      197,
      165,
      110
    ],
    "hex": "#c5a56e"
  },
  {
    "name": "Maple",
    "combinations": [
      282
    ],
    "swatch": 1,
    "cmyk": [
      5,
      26,
      56,
      20
    ],
    "lab": [
      68.19409475852598,
      9.591439688715951,
      32.94941634241246
    ],
    "rgb": [
      197,
      159,
      107
    ],
    "hex": "#c59f6b"
  },
  {
    "name": "Olive Buff",
    "combinations": [
      83,
      175,
      200,
      330,
      348
    ],
    "swatch": 1,
    "cmyk": [
      16,
      6,
      42,
      12
    ],
    "lab": [
      78.04837109941252,
      -7.108949416342412,
      23.657587548638134
    ],
    "rgb": [
      193,
      196,
      148
    ],
    "hex": "#c1c494"
  },
  {
    "name": "Ecru",
    "combinations": [
      167,
      249,
      275,
      279,
      292,
      302,
      317,
      327
    ],
    "swatch": 1,
    "cmyk": [
      20,
      25,
      40,
      6
    ],
    "lab": [
      72.19043259327077,
      4.2295719844358075,
      16.731517509727638
    ],
    "rgb": [
      194,
      174,
      147
    ],
    "hex": "#c2ae93"
  },
  {
    "name": "Yellow",
    "combinations": [
      22,
      62,
      68,
      154,
      240,
      251,
      295,
      313
    ],
    "swatch": 1,
    "cmyk": [
      0,
      0,
      100,
      0
    ],
    "lab": [
      94.96452277409018,
      -6.45525291828794,
      95.57976653696497
    ],
    "rgb": [
      255,
      242,
      0
    ],
    "hex": "#fff200"
  },
  {
    "name": "Lemon Yellow",
    "combinations": [
      45,
      123,
      138,
      158,
      168,
      173,
      189,
      210,
      253,
      259,
      289,
      298,
      306,
      317,
      333
    ],
    "swatch": 1,
    "cmyk": [
      5,
      0,
      85,
      0
    ],
    "lab": [
      92.65583276112001,
      -9.389105058365757,
      77.7626459143969
    ],
    "rgb": [
      248,
      237,
      67
    ],
    "hex": "#f8ed43"
  },
  {
    "name": "Apricot Yellow",
    "combinations": [
      107,
      129,
      163,
      198,
      213,
      247,
      265,
      284,
      305,
      319
    ],
    "swatch": 1,
    "cmyk": [
      0,
      10,
      100,
      0
    ],
    "lab": [
      89.35072861829556,
      1.9066147859922182,
      89.45525291828793
    ],
    "rgb": [
      255,
      221,
      0
    ],
    "hex": "#ffdd00"
  },
  {
    "name": "Pyrite Yellow",
    "combinations": [
      239,
      250,
      255,
      287
    ],
    "swatch": 1,
    "cmyk": [
      23,
      25,
      80,
      0
    ],
    "lab": [
      73.56221866178377,
      0.4241245136186649,
      49.8171206225681
    ],
    "rgb": [
      202,
      179,
      86
    ],
    "hex": "#cab356"
  },
  {
    "name": "Olive Ocher",
    "combinations": [
      66,
      148,
      149,
      156,
      157,
      249,
      278
    ],
    "swatch": 1,
    "cmyk": [
      18,
      26,
      90,
      0
    ],
    "lab": [
      74.87907225146868,
      3.568093385214013,
      61.805447470817114
    ],
    "rgb": [
      214,
      180,
      62
    ],
    "hex": "#d6b43e"
  },
  {
    "name": "Yellow Ocher",
    "combinations": [
      42,
      96,
      118,
      124,
      126,
      191,
      222,
      325
    ],
    "swatch": 1,
    "cmyk": [
      12,
      28,
      88,
      0
    ],
    "lab": [
      76.19134813458457,
      8.44357976653697,
      62.7898832684825
    ],
    "rgb": [
      226,
      181,
      64
    ],
    "hex": "#e2b540"
  },
  {
    "name": "Orange Yellow",
    "combinations": [
      114,
      148,
      153,
      164,
      170,
      257,
      286,
      338
    ],
    "swatch": 1,
    "cmyk": [
      0,
      33,
      100,
      0
    ],
    "lab": [
      78.49393453879605,
      19.571984435797674,
      78.21789883268482
    ],
    "rgb": [
      252,
      179,
      21
    ],
    "hex": "#fcb315"
  },
  {
    "name": "Yellow Orange",
    "combinations": [
      2,
      53,
      89,
      151,
      171,
      209,
      222,
      235,
      267,
      288,
      297,
      312,
      319,
      335
    ],
    "swatch": 1,
    "cmyk": [
      0,
      45,
      100,
      0
    ],
    "lab": [
      72.95948729686427,
      29.404669260700388,
      72.94163424124514
    ],
    "rgb": [
      249,
      157,
      27
    ],
    "hex": "#f99d1b"
  },
  {
    "name": "Apricot Orange",
    "combinations": [
      211,
      253,
      309,
      328
    ],
    "swatch": 1,
    "cmyk": [
      0,
      55,
      75,
      0
    ],
    "lab": [
      69.3736171511406,
      37.688715953307394,
      49.64980544747081
    ],
    "rgb": [
      246,
      140,
      80
    ],
    "hex": "#f68c50"
  },
  {
    "name": "Orange",
    "combinations": [
      7,
      46,
      141,
      144,
      149,
      256,
      272
    ],
    "swatch": 1,
    "cmyk": [
      0,
      68,
      100,
      0
    ],
    "lab": [
      63.79797055008774,
      47.159533073929964,
      64.715953307393
    ],
    "rgb": [
      243,
      116,
      32
    ],
    "hex": "#f37420"
  },
  {
    "name": "Peach Red",
    "combinations": [
      115,
      250,
      274,
      285,
      298,
      303,
      326,
      340
    ],
    "swatch": 1,
    "cmyk": [
      0,
      80,
      90,
      0
    ],
    "lab": [
      59.09666590371557,
      57.54863813229571,
      54.35019455252919
    ],
    "rgb": [
      241,
      90,
      48
    ],
    "hex": "#f15a30"
  },
  {
    "name": "English Red",
    "combinations": [
      1,
      131,
      190,
      308,
      339
    ],
    "swatch": 1,
    "cmyk": [
      13,
      73,
      100,
      0
    ],
    "lab": [
      57.2152285038529,
      43.29961089494162,
      54.361867704280144
    ],
    "rgb": [
      217,
      102,
      41
    ],
    "hex": "#d96629"
  },
  {
    "name": "Cinnamon Rufous",
    "combinations": [
      8,
      10,
      103,
      158,
      172,
      204,
      206
    ],
    "swatch": 1,
    "cmyk": [
      20,
      60,
      82,
      5
    ],
    "lab": [
      57.233539330128934,
      27.76653696498053,
      40.22957198443581
    ],
    "rgb": [
      194,
      117,
      68
    ],
    "hex": "#c27544"
  },
  {
    "name": "Orange Rufous",
    "combinations": [
      91,
      102,
      222
    ],
    "swatch": 1,
    "cmyk": [
      18,
      65,
      100,
      8
    ],
    "lab": [
      54.56168459601739,
      31.61089494163423,
      51.245136186770424
    ],
    "rgb": [
      193,
      107,
      39
    ],
    "hex": "#c16b27"
  },
  {
    "name": "Sulphine Yellow",
    "combinations": [
      36,
      65,
      142,
      160,
      252
    ],
    "swatch": 1,
    "cmyk": [
      24,
      32,
      100,
      4
    ],
    "lab": [
      67.23887998779279,
      4.346303501945528,
      60.55252918287937
    ],
    "rgb": [
      193,
      159,
      44
    ],
    "hex": "#c19f2c"
  },
  {
    "name": "Khaki",
    "combinations": [
      129,
      146,
      159,
      236,
      248
    ],
    "swatch": 1,
    "cmyk": [
      24,
      45,
      100,
      6
    ],
    "lab": [
      61.01930266269932,
      13.859922178988313,
      55.05058365758754
    ],
    "rgb": [
      188,
      137,
      43
    ],
    "hex": "#bc892b"
  },
  {
    "name": "Citron Yellow",
    "combinations": [
      40,
      87,
      145,
      150,
      153,
      196,
      305,
      323
    ],
    "swatch": 1,
    "cmyk": [
      35,
      17,
      95,
      0
    ],
    "lab": [
      72.4650949874113,
      -13.062256809338521,
      58.17509727626458
    ],
    "rgb": [
      178,
      183,
      62
    ],
    "hex": "#b2b73e"
  },
  {
    "name": "Citrine",
    "combinations": [
      59,
      93,
      132,
      133,
      262
    ],
    "swatch": 1,
    "cmyk": [
      36,
      32,
      100,
      0
    ],
    "lab": [
      65.5588616769665,
      -2.579766536964982,
      54.486381322957186
    ],
    "rgb": [
      176,
      159,
      54
    ],
    "hex": "#b09f36"
  },
  {
    "name": "Buffy Citrine",
    "combinations": [
      100,
      177,
      233
    ],
    "swatch": 1,
    "cmyk": [
      42,
      40,
      82,
      8
    ],
    "lab": [
      56.61860074769207,
      0,
      33.29961089494162
    ],
    "rgb": [
      150,
      135,
      77
    ],
    "hex": "#96874d"
  },
  {
    "name": "Dark Citrine",
    "combinations": [
      10,
      41,
      274,
      304
    ],
    "swatch": 1,
    "cmyk": [
      38,
      34,
      67,
      20
    ],
    "lab": [
      54.71427481498436,
      -1.4046692607003877,
      23.066147859922182
    ],
    "rgb": [
      139,
      131,
      91
    ],
    "hex": "#8b835b"
  },
  {
    "name": "Light Grayish Olive",
    "combinations": [
      107,
      184
    ],
    "swatch": 1,
    "cmyk": [
      43,
      36,
      62,
      19
    ],
    "lab": [
      53.185320820935374,
      -2.276264591439684,
      17.019455252918277
    ],
    "rgb": [
      132,
      128,
      97
    ],
    "hex": "#848061"
  },
  {
    "name": "Krongbergs Green",
    "combinations": [
      29
    ],
    "swatch": 1,
    "cmyk": [
      48,
      35,
      70,
      12
    ],
    "lab": [
      55.12474250400549,
      -6.1867704280155635,
      21.509727626459153
    ],
    "rgb": [
      132,
      135,
      94
    ],
    "hex": "#84875e"
  },
  {
    "name": "Olive",
    "combinations": [
      96,
      201,
      254,
      258,
      277,
      310,
      334
    ],
    "swatch": 1,
    "cmyk": [
      48,
      38,
      100,
      15
    ],
    "lab": [
      52.213321126115815,
      -5.727626459143963,
      41.486381322957186
    ],
    "rgb": [
      131,
      126,
      49
    ],
    "hex": "#837e31"
  },
  {
    "name": "Orange Citrine",
    "combinations": [
      212,
      342
    ],
    "swatch": 1,
    "cmyk": [
      28,
      48,
      92,
      24
    ],
    "lab": [
      50.24185549706264,
      11.517509727626447,
      42.046692607003905
    ],
    "rgb": [
      152,
      111,
      45
    ],
    "hex": "#986f2d"
  },
  {
    "name": "Sudan Brown",
    "combinations": [
      207,
      214,
      273
    ],
    "swatch": 1,
    "cmyk": [
      25,
      60,
      65,
      19
    ],
    "lab": [
      49.8619058518349,
      23.03112840466926,
      22.451361867704293
    ],
    "rgb": [
      163,
      103,
      82
    ],
    "hex": "#a36752"
  },
  {
    "name": "Olive Green",
    "combinations": [
      66,
      243,
      270,
      297
    ],
    "swatch": 1,
    "cmyk": [
      56,
      40,
      85,
      22
    ],
    "lab": [
      46.38590066376745,
      -8.494163424124508,
      26.486381322957186
    ],
    "rgb": [
      107,
      113,
      64
    ],
    "hex": "#6b7140"
  },
  {
    "name": "Light Brownish Olive",
    "combinations": [
      199,
      318
    ],
    "swatch": 1,
    "cmyk": [
      42,
      46,
      73,
      24
    ],
    "lab": [
      47.50743877317464,
      3.747081712062254,
      22.194552529182886
    ],
    "rgb": [
      128,
      110,
      75
    ],
    "hex": "#806e4b"
  },
  {
    "name": "Deep Grayish Olive",
    "combinations": [
      146,
      343
    ],
    "swatch": 1,
    "cmyk": [
      50,
      48,
      78,
      37
    ],
    "lab": [
      38.605325398641945,
      -0.28404669260700643,
      19.94163424124514
    ],
    "rgb": [
      99,
      90,
      58
    ],
    "hex": "#635a3a"
  },
  {
    "name": "Pale Raw Umber",
    "combinations": [
      26,
      73,
      160,
      234,
      296
    ],
    "swatch": 1,
    "cmyk": [
      46,
      63,
      87,
      32
    ],
    "lab": [
      37.065690089265274,
      11.190661478599225,
      24.957198443579756
    ],
    "rgb": [
      113,
      80,
      47
    ],
    "hex": "#71502f"
  },
  {
    "name": "Sepia",
    "combinations": [
      24,
      288
    ],
    "swatch": 1,
    "cmyk": [
      48,
      60,
      100,
      40
    ],
    "lab": [
      33.82619974059663,
      6.867704280155635,
      30.23346303501947
    ],
    "rgb": [
      100,
      75,
      30
    ],
    "hex": "#644b1e"
  },
  {
    "name": "Madder Brown",
    "combinations": [
      28,
      79,
      98,
      173,
      237,
      275,
      323
    ],
    "swatch": 1,
    "cmyk": [
      36,
      88,
      100,
      38
    ],
    "lab": [
      29.08522163729305,
      32,
      29.280155642023345
    ],
    "rgb": [
      118,
      44,
      25
    ],
    "hex": "#762c19"
  },
  {
    "name": "Mars Brown Tobacco",
    "combinations": [
      19
    ],
    "swatch": 1,
    "cmyk": [
      39,
      76,
      100,
      47
    ],
    "lab": [
      28.032349126420996,
      20.451361867704293,
      29.836575875486375
    ],
    "rgb": [
      101,
      53,
      20
    ],
    "hex": "#653514"
  },
  {
    "name": "Vandyke Brown",
    "combinations": [
      110,
      113,
      118,
      182,
      192,
      328
    ],
    "swatch": 1,
    "cmyk": [
      56,
      71,
      97,
      52
    ],
    "lab": [
      23.811703669794767,
      8.49805447470817,
      22.101167315175104
    ],
    "rgb": [
      75,
      51,
      23
    ],
    "hex": "#4b3317"
  },
  {
    "name": "Turquoise Green",
    "combinations": [
      36,
      74,
      147,
      163,
      173,
      202,
      223,
      230,
      263,
      272,
      285,
      293,
      300,
      305,
      317,
      346
    ],
    "swatch": 2,
    "cmyk": [
      29,
      0,
      24,
      0
    ],
    "lab": [
      85.26283665217059,
      -16.891050583657588,
      4.595330739299612
    ],
    "rgb": [
      181,
      222,
      204
    ],
    "hex": "#b5decc"
  },
  {
    "name": "Glaucous Green",
    "combinations": [
      7,
      150,
      171,
      207,
      239,
      260
    ],
    "swatch": 2,
    "cmyk": [
      30,
      9,
      24,
      0
    ],
    "lab": [
      80.29755092698558,
      -10.237354085603116,
      2.2996108949416225
    ],
    "rgb": [
      180,
      205,
      194
    ],
    "hex": "#b4cdc2"
  },
  {
    "name": "Dark Greenish Glaucous",
    "combinations": [
      264,
      311
    ],
    "swatch": 2,
    "cmyk": [
      30,
      15,
      36,
      0
    ],
    "lab": [
      77.09010452429999,
      -7.5564202334630295,
      11.369649805447466
    ],
    "rgb": [
      183,
      194,
      169
    ],
    "hex": "#b7c2a9"
  },
  {
    "name": "Yellow Green",
    "combinations": [
      111,
      141,
      276,
      326,
      334
    ],
    "swatch": 2,
    "cmyk": [
      35,
      0,
      72,
      0
    ],
    "lab": [
      80.60883497367819,
      -24.599221789883273,
      43.91050583657588
    ],
    "rgb": [
      175,
      212,
      114
    ],
    "hex": "#afd472"
  },
  {
    "name": "Light Green Yellow",
    "combinations": [
      61,
      289,
      291,
      311,
      346
    ],
    "swatch": 2,
    "cmyk": [
      26,
      5,
      85,
      0
    ],
    "lab": [
      81.13527122911421,
      -15.863813229571988,
      60.55642023346303
    ],
    "rgb": [
      199,
      209,
      79
    ],
    "hex": "#c7d14f"
  },
  {
    "name": "Night Green",
    "combinations": [
      19,
      32,
      158,
      326
    ],
    "swatch": 2,
    "cmyk": [
      52,
      0,
      100,
      0
    ],
    "lab": [
      73.30739299610894,
      -36.03112840466926,
      57.0272373540856
    ],
    "rgb": [
      135,
      197,
      64
    ],
    "hex": "#87c540"
  },
  {
    "name": "Olive Yellow",
    "combinations": [
      124,
      211,
      265,
      347
    ],
    "swatch": 2,
    "cmyk": [
      40,
      30,
      80,
      0
    ],
    "lab": [
      65.48561837186236,
      -6.054474708171213,
      37.836575875486375
    ],
    "rgb": [
      166,
      161,
      89
    ],
    "hex": "#a6a159"
  },
  {
    "name": "Artemesia Green",
    "combinations": [
      293,
      312
    ],
    "swatch": 2,
    "cmyk": [
      57,
      28,
      39,
      8
    ],
    "lab": [
      58.101777676050965,
      -12.832684824902728,
      -2.891050583657588
    ],
    "rgb": [
      112,
      147,
      144
    ],
    "hex": "#709390"
  },
  {
    "name": "Andover Green",
    "combinations": [
      244,
      346
    ],
    "swatch": 2,
    "cmyk": [
      60,
      40,
      50,
      10
    ],
    "lab": [
      51.212329289692526,
      -7.7626459143968845,
      1.5369649805447523
    ],
    "rgb": [
      109,
      126,
      119
    ],
    "hex": "#6d7e77"
  },
  {
    "name": "Rainette Green",
    "combinations": [
      73,
      162,
      188,
      266,
      301
    ],
    "swatch": 2,
    "cmyk": [
      42,
      20,
      62,
      10
    ],
    "lab": [
      63.738460364690624,
      -12.525291828793769,
      22.44747081712063
    ],
    "rgb": [
      143,
      160,
      113
    ],
    "hex": "#8fa071"
  },
  {
    "name": "Chromium Green",
    "combinations": [
      105,
      200,
      219,
      283
    ],
    "swatch": 2,
    "cmyk": [
      50,
      16,
      58,
      20
    ],
    "lab": [
      57.87289234760052,
      -18.147859922178995,
      14.992217898832678
    ],
    "rgb": [
      113,
      148,
      112
    ],
    "hex": "#719470"
  },
  {
    "name": "Pistachio Green",
    "combinations": [
      127,
      137
    ],
    "swatch": 2,
    "cmyk": [
      64,
      29,
      56,
      6
    ],
    "lab": [
      55.82055390249485,
      -18.642023346303503,
      5.688715953307394
    ],
    "rgb": [
      100,
      143,
      123
    ],
    "hex": "#648f7b"
  },
  {
    "name": "Sea Green",
    "combinations": [
      17,
      21,
      58,
      86,
      133,
      250,
      260,
      284,
      291,
      340,
      347
    ],
    "swatch": 2,
    "cmyk": [
      80,
      0,
      51,
      0
    ],
    "lab": [
      65.05226214999618,
      -48.90272373540856,
      0.4591439688715866
    ],
    "rgb": [
      0,
      180,
      155
    ],
    "hex": "#00b49b"
  },
  {
    "name": "Benzol Green",
    "combinations": [
      15,
      54,
      92,
      122,
      155,
      247,
      266,
      267,
      281,
      304,
      306
    ],
    "swatch": 2,
    "cmyk": [
      100,
      15,
      55,
      0
    ],
    "lab": [
      53.56221866178378,
      -54.62645914396887,
      -8.307392996108945
    ],
    "rgb": [
      0,
      151,
      141
    ],
    "hex": "#00978d"
  },
  {
    "name": "Light Porcelain Green",
    "combinations": [
      44,
      193,
      328
    ],
    "swatch": 2,
    "cmyk": [
      86,
      22,
      50,
      3
    ],
    "lab": [
      53.29518577859159,
      -37.52140077821012,
      -6.832684824902728
    ],
    "rgb": [
      0,
      144,
      138
    ],
    "hex": "#00908a"
  },
  {
    "name": "Green",
    "combinations": [
      198,
      216,
      293
    ],
    "swatch": 2,
    "cmyk": [
      75,
      21,
      73,
      0
    ],
    "lab": [
      57.770656900892654,
      -34.50972762645914,
      15.58754863813229
    ],
    "rgb": [
      72,
      155,
      110
    ],
    "hex": "#489b6e"
  },
  {
    "name": "Dull Viridian Green",
    "combinations": [
      136,
      256,
      306,
      316
    ],
    "swatch": 2,
    "cmyk": [
      90,
      20,
      80,
      0
    ],
    "lab": [
      53.49965667200732,
      -49.00389105058366,
      14.43968871595331
    ],
    "rgb": [
      0,
      148,
      101
    ],
    "hex": "#009465"
  },
  {
    "name": "Oil Green",
    "combinations": [
      245,
      299,
      320
    ],
    "swatch": 2,
    "cmyk": [
      53,
      28,
      100,
      8
    ],
    "lab": [
      57.639429312581065,
      -16.01167315175097,
      43.76653696498053
    ],
    "rgb": [
      129,
      146,
      56
    ],
    "hex": "#819238"
  },
  {
    "name": "Diamine Green",
    "combinations": [
      38,
      146,
      217,
      242,
      251,
      313
    ],
    "swatch": 2,
    "cmyk": [
      87,
      32,
      91,
      18
    ],
    "lab": [
      42.738994430457005,
      -35.661478599221795,
      18.56031128404669
    ],
    "rgb": [
      26,
      116,
      68
    ],
    "hex": "#1a7444"
  },
  {
    "name": "Cossack Green",
    "combinations": [
      5,
      135,
      262,
      270,
      278,
      294,
      319,
      341,
      348
    ],
    "swatch": 2,
    "cmyk": [
      76,
      32,
      91,
      18
    ],
    "lab": [
      45.46425574120699,
      -27.202334630350194,
      23.44747081712063
    ],
    "rgb": [
      67,
      119,
      66
    ],
    "hex": "#437742"
  },
  {
    "name": "Lincoln Green",
    "combinations": [
      70,
      121,
      203,
      210,
      280,
      290
    ],
    "swatch": 2,
    "cmyk": [
      60,
      48,
      86,
      37
    ],
    "lab": [
      36.266117341878385,
      -5.906614785992218,
      21.182879377431902
    ],
    "rgb": [
      85,
      88,
      50
    ],
    "hex": "#555832"
  },
  {
    "name": "Blackish Olive",
    "combinations": [
      109,
      318,
      336
    ],
    "swatch": 2,
    "cmyk": [
      56,
      32,
      63,
      55
    ],
    "lab": [
      33.261615930418856,
      -10.128404669260703,
      9.688715953307394
    ],
    "rgb": [
      66,
      83,
      62
    ],
    "hex": "#42533e"
  },
  {
    "name": "Deep Slate Olive",
    "combinations": [
      189,
      229,
      268,
      303,
      310,
      321,
      332,
      341,
      342,
      348
    ],
    "swatch": 2,
    "cmyk": [
      76,
      60,
      80,
      62
    ],
    "lab": [
      18.800640878919662,
      -7.669260700389103,
      7.536964980544752
    ],
    "rgb": [
      37,
      49,
      34
    ],
    "hex": "#253122"
  },
  {
    "name": "Nile Blue",
    "combinations": [
      25,
      250,
      268,
      302,
      306,
      330,
      345
    ],
    "swatch": 3,
    "cmyk": [
      25,
      0,
      10,
      0
    ],
    "lab": [
      87.6752880140383,
      -13.252918287937746,
      -5.031128404669261
    ],
    "rgb": [
      188,
      228,
      229
    ],
    "hex": "#bce4e5"
  },
  {
    "name": "Pale King's Blue",
    "combinations": [
      16,
      49,
      72,
      75,
      167,
      196,
      213,
      234,
      287
    ],
    "swatch": 3,
    "cmyk": [
      33,
      4,
      7,
      0
    ],
    "lab": [
      82.21408407721064,
      -12.735408560311285,
      -12.883268482490266
    ],
    "rgb": [
      167,
      212,
      228
    ],
    "hex": "#a7d4e4"
  },
  {
    "name": "Light Glaucous Blue",
    "combinations": [
      54,
      93,
      119,
      152,
      178,
      204,
      227,
      320,
      339,
      341
    ],
    "swatch": 3,
    "cmyk": [
      35,
      10,
      14,
      0
    ],
    "lab": [
      78.20859082932783,
      -10.568093385214013,
      -8.723735408560316
    ],
    "rgb": [
      165,
      200,
      209
    ],
    "hex": "#a5c8d1"
  },
  {
    "name": "Salvia Blue",
    "combinations": [
      29,
      129,
      135,
      139,
      142,
      188,
      209,
      212,
      237,
      272,
      294,
      321,
      330
    ],
    "swatch": 3,
    "cmyk": [
      41,
      25,
      10,
      0
    ],
    "lab": [
      69.4697489890898,
      -2.7587548638132233,
      -16.754863813229576
    ],
    "rgb": [
      151,
      172,
      200
    ],
    "hex": "#97acc8"
  },
  {
    "name": "Cobalt Green",
    "combinations": [
      156,
      188,
      201,
      202,
      230,
      271,
      281,
      282,
      290,
      291,
      308,
      333
    ],
    "swatch": 3,
    "cmyk": [
      42,
      0,
      42,
      0
    ],
    "lab": [
      79.01274128328375,
      -25.56420233463035,
      13
    ],
    "rgb": [
      150,
      209,
      170
    ],
    "hex": "#96d1aa"
  },
  {
    "name": "Calamine BLue",
    "combinations": [
      20,
      41,
      65,
      159,
      176,
      255,
      261,
      287,
      291,
      300
    ],
    "swatch": 3,
    "cmyk": [
      50,
      0,
      20,
      0
    ],
    "lab": [
      77.09010452429999,
      -26.241245136186777,
      -10.373540856031127
    ],
    "rgb": [
      120,
      205,
      208
    ],
    "hex": "#78cdd0"
  },
  {
    "name": "Venice Green",
    "combinations": [
      78,
      128,
      138,
      189,
      283,
      345
    ],
    "swatch": 3,
    "cmyk": [
      58,
      0,
      30,
      0
    ],
    "lab": [
      73.69954985885404,
      -31.731517509727624,
      -6.140077821011673
    ],
    "rgb": [
      98,
      198,
      191
    ],
    "hex": "#62c6bf"
  },
  {
    "name": "Cerulian Blue",
    "combinations": [
      1,
      63,
      99,
      125,
      148,
      227,
      240,
      264
    ],
    "swatch": 3,
    "cmyk": [
      84,
      26,
      32,
      0
    ],
    "lab": [
      54.972152285038526,
      -30.186770428015564,
      -20.13618677042801
    ],
    "rgb": [
      0,
      147,
      165
    ],
    "hex": "#0093a5"
  },
  {
    "name": "Peacock Blue",
    "combinations": [
      131,
      286
    ],
    "swatch": 3,
    "cmyk": [
      100,
      19,
      43,
      0
    ],
    "lab": [
      52.78553444724193,
      -48.91050583657588,
      -17.51750972762646
    ],
    "rgb": [
      0,
      147,
      155
    ],
    "hex": "#00939b"
  },
  {
    "name": "Green Blue",
    "combinations": [
      12,
      74,
      79,
      178,
      208,
      252,
      259,
      271,
      330
    ],
    "swatch": 3,
    "cmyk": [
      82,
      24,
      40,
      3
    ],
    "lab": [
      54.134431982909895,
      -31.268482490272376,
      -12.883268482490266
    ],
    "rgb": [
      9,
      145,
      151
    ],
    "hex": "#099197"
  },
  {
    "name": "Olympic Blue",
    "combinations": [
      44,
      67,
      157,
      194,
      231,
      274,
      324
    ],
    "swatch": 3,
    "cmyk": [
      69,
      44,
      10,
      0
    ],
    "lab": [
      53.090714885175856,
      -3.634241245136181,
      -30.739299610894946
    ],
    "rgb": [
      90,
      130,
      179
    ],
    "hex": "#5a82b3"
  },
  {
    "name": "Blue",
    "combinations": [
      49,
      51,
      88,
      143,
      154,
      186,
      191,
      215,
      257,
      267,
      295,
      333
    ],
    "swatch": 3,
    "cmyk": [
      95,
      54,
      0,
      0
    ],
    "lab": [
      43.49431601434348,
      -8.832684824902728,
      -48.77042801556421
    ],
    "rgb": [
      0,
      110,
      184
    ],
    "hex": "#006eb8"
  },
  {
    "name": "Antwarp Blue",
    "combinations": [
      85,
      106,
      114,
      140,
      163,
      172,
      208,
      244,
      258,
      281,
      299,
      302,
      334
    ],
    "swatch": 3,
    "cmyk": [
      100,
      40,
      30,
      10
    ],
    "lab": [
      42.03250171663996,
      -29.124513618677042,
      -27.727626459143963
    ],
    "rgb": [
      0,
      113,
      144
    ],
    "hex": "#007190"
  },
  {
    "name": "Helvetia Blue",
    "combinations": [
      39,
      48,
      161,
      187,
      218,
      259,
      312,
      347
    ],
    "swatch": 3,
    "cmyk": [
      100,
      62,
      19,
      10
    ],
    "lab": [
      35.309376668955515,
      -12.101167315175104,
      -36.37354085603113
    ],
    "rgb": [
      0,
      91,
      141
    ],
    "hex": "#005b8d"
  },
  {
    "name": "Dark Medici Blue",
    "combinations": [
      160,
      224,
      241,
      249
    ],
    "swatch": 3,
    "cmyk": [
      70,
      45,
      45,
      15
    ],
    "lab": [
      45.117875944151976,
      -9.225680933852146,
      -6.856031128404666
    ],
    "rgb": [
      84,
      112,
      118
    ],
    "hex": "#547076"
  },
  {
    "name": "Dusky Green",
    "combinations": [
      94,
      219,
      225,
      278,
      284,
      318,
      332,
      338
    ],
    "swatch": 3,
    "cmyk": [
      100,
      30,
      64,
      50
    ],
    "lab": [
      27.965209430075532,
      -36.268482490272376,
      -3.2801556420233453
    ],
    "rgb": [
      0,
      79,
      70
    ],
    "hex": "#004f46"
  },
  {
    "name": "Deep Lyons Blue",
    "combinations": [
      22,
      38,
      101,
      126,
      179,
      199,
      236,
      247,
      314,
      344
    ],
    "swatch": 3,
    "cmyk": [
      100,
      85,
      15,
      6
    ],
    "lab": [
      28.532845044632637,
      6.560311284046691,
      -42.68093385214007
    ],
    "rgb": [
      28,
      66,
      134
    ],
    "hex": "#1c4286"
  },
  {
    "name": "Violet Blue",
    "combinations": [
      75,
      83,
      89,
      98,
      125,
      233,
      286,
      289,
      297,
      309,
      339
    ],
    "swatch": 3,
    "cmyk": [
      85,
      79,
      38,
      16
    ],
    "lab": [
      30.14724956130312,
      5.435797665369648,
      -22.377431906614788
    ],
    "rgb": [
      64,
      69,
      106
    ],
    "hex": "#40456a"
  },
  {
    "name": "Vandar Poel's Blue",
    "combinations": [
      5,
      77,
      151,
      167,
      168,
      309,
      343
    ],
    "swatch": 3,
    "cmyk": [
      100,
      73,
      43,
      10
    ],
    "lab": [
      30.77744716563668,
      -11.264591439688715,
      -24.521400778210122
    ],
    "rgb": [
      6,
      79,
      110
    ],
    "hex": "#064f6e"
  },
  {
    "name": "Dark Tyrian Blue",
    "combinations": [
      2,
      60,
      67,
      119,
      141,
      245,
      279
    ],
    "swatch": 3,
    "cmyk": [
      90,
      66,
      36,
      50
    ],
    "lab": [
      20.613412680247194,
      -5.836575875486375,
      -19.081712062256813
    ],
    "rgb": [
      18,
      53,
      78
    ],
    "hex": "#12354e"
  },
  {
    "name": "Dull Violet Black",
    "combinations": [
      95,
      106,
      145,
      265,
      277,
      289,
      295,
      331
    ],
    "swatch": 3,
    "cmyk": [
      95,
      106,
      38,
      50
    ],
    "lab": [
      8.1025406271458,
      19.431906614785987,
      -28.813229571984436
    ],
    "rgb": [
      30,
      14,
      63
    ],
    "hex": "#1e0e3f"
  },
  {
    "name": "Deep Indigo",
    "combinations": [
      6,
      28,
      139,
      155,
      182,
      211,
      232
    ],
    "swatch": 3,
    "cmyk": [
      100,
      92,
      52,
      60
    ],
    "lab": [
      5.818265049210345,
      4.140077821011687,
      -21.785992217898837
    ],
    "rgb": [
      5,
      18,
      48
    ],
    "hex": "#051230"
  },
  {
    "name": "Deep Slate Green",
    "combinations": [
      84,
      149,
      166,
      271,
      318,
      325
    ],
    "swatch": 3,
    "cmyk": [
      80,
      50,
      60,
      70
    ],
    "lab": [
      16.881055924315252,
      -12.143968871595334,
      -2.2295719844357933
    ],
    "rgb": [
      17,
      47,
      44
    ],
    "hex": "#112f2c"
  },
  {
    "name": "Grayish Lavender - A",
    "combinations": [
      8,
      15,
      159,
      177,
      218,
      248,
      307
    ],
    "swatch": 4,
    "cmyk": [
      28,
      28,
      0,
      0
    ],
    "lab": [
      73.42336156252384,
      7.459143968871587,
      -19.35019455252919
    ],
    "rgb": [
      181,
      177,
      216
    ],
    "hex": "#b5b1d8"
  },
  {
    "name": "Grayish Lavender - B",
    "combinations": [
      47,
      56,
      174,
      187,
      235,
      327,
      329,
      338
    ],
    "swatch": 4,
    "cmyk": [
      25,
      33,
      20,
      0
    ],
    "lab": [
      71.34508278019379,
      10.046692607003905,
      -2.210116731517516
    ],
    "rgb": [
      192,
      169,
      179
    ],
    "hex": "#c0a9b3"
  },
  {
    "name": "Laelia Pink",
    "combinations": [
      20,
      254,
      280,
      337
    ],
    "swatch": 4,
    "cmyk": [
      20,
      48,
      18,
      0
    ],
    "lab": [
      66.5186541542687,
      24.307392996108945,
      -2.6614785992217946
    ],
    "rgb": [
      202,
      146,
      168
    ],
    "hex": "#ca92a8"
  },
  {
    "name": "Lilac",
    "combinations": [
      143,
      162,
      282,
      347
    ],
    "swatch": 4,
    "cmyk": [
      28,
      54,
      8,
      0
    ],
    "lab": [
      61.530479896238646,
      25.922178988326834,
      -14.252918287937746
    ],
    "rgb": [
      185,
      132,
      175
    ],
    "hex": "#b984af"
  },
  {
    "name": "Eupatorium Purple",
    "combinations": [
      215,
      315,
      322
    ],
    "swatch": 4,
    "cmyk": [
      25,
      79,
      12,
      0
    ],
    "lab": [
      52.24536507209888,
      46.71206225680933,
      -11.723735408560316
    ],
    "rgb": [
      191,
      88,
      146
    ],
    "hex": "#bf5892"
  },
  {
    "name": "Light Mauve",
    "combinations": [
      23,
      80,
      128,
      134,
      180,
      274,
      331
    ],
    "swatch": 4,
    "cmyk": [
      43,
      62,
      5,
      0
    ],
    "lab": [
      53.6415655756466,
      23.902723735408557,
      -23.976653696498047
    ],
    "rgb": [
      154,
      114,
      170
    ],
    "hex": "#9a72aa"
  },
  {
    "name": "Aconite Violet",
    "combinations": [
      43,
      64,
      90,
      187,
      220,
      257,
      269,
      301,
      307,
      324,
      344
    ],
    "swatch": 4,
    "cmyk": [
      39,
      68,
      5,
      0
    ],
    "lab": [
      52.66956588082704,
      30.696498054474716,
      -22.369649805447466
    ],
    "rgb": [
      163,
      106,
      165
    ],
    "hex": "#a36aa5"
  },
  {
    "name": "Dull Blue Violet",
    "combinations": [
      9,
      100
    ],
    "swatch": 4,
    "cmyk": [
      57,
      60,
      17,
      0
    ],
    "lab": [
      50.22201876859693,
      13.377431906614788,
      -22.4591439688716
    ],
    "rgb": [
      128,
      113,
      158
    ],
    "hex": "#80719e"
  },
  {
    "name": "Dark Soft Violet",
    "combinations": [
      64,
      127,
      197
    ],
    "swatch": 4,
    "cmyk": [
      70,
      68,
      13,
      0
    ],
    "lab": [
      43.99633783474479,
      12.346303501945528,
      -31.171206225680933
    ],
    "rgb": [
      102,
      98,
      156
    ],
    "hex": "#66629c"
  },
  {
    "name": "Blue Violet",
    "combinations": [
      116,
      175,
      196,
      322,
      345
    ],
    "swatch": 4,
    "cmyk": [
      72,
      80,
      0,
      0
    ],
    "lab": [
      39.12260624093995,
      23.571984435797674,
      -41.91050583657588
    ],
    "rgb": [
      100,
      80,
      161
    ],
    "hex": "#6450a1"
  },
  {
    "name": "Purple Drab",
    "combinations": [
      236
    ],
    "swatch": 4,
    "cmyk": [
      38,
      65,
      49,
      26
    ],
    "lab": [
      41.87228198672465,
      19.867704280155635,
      5.560311284046691
    ],
    "rgb": [
      132,
      86,
      91
    ],
    "hex": "#84565b"
  },
  {
    "name": "Deep Violet / Plumbeous",
    "combinations": [
      183,
      192,
      218
    ],
    "swatch": 4,
    "cmyk": [
      61,
      52,
      43,
      7
    ],
    "lab": [
      48.02929732204166,
      0.7937743190661593,
      -5.906614785992218
    ],
    "rgb": [
      112,
      114,
      124
    ],
    "hex": "#70727c"
  },
  {
    "name": "Veronia Purple",
    "combinations": [
      13,
      24,
      168,
      183
    ],
    "swatch": 4,
    "cmyk": [
      42,
      78,
      46,
      15
    ],
    "lab": [
      40.982681010147246,
      29.56031128404669,
      0.12840466926070349
    ],
    "rgb": [
      140,
      76,
      98
    ],
    "hex": "#8c4c62"
  },
  {
    "name": "Dark Slate Purple",
    "combinations": [
      225,
      248
    ],
    "swatch": 4,
    "cmyk": [
      64,
      85,
      60,
      10
    ],
    "lab": [
      34.306858930342564,
      22.217898832684824,
      -3.5525291828793826
    ],
    "rgb": [
      112,
      67,
      87
    ],
    "hex": "#704357"
  },
  {
    "name": "Taupe Brown",
    "combinations": [
      57,
      123,
      174,
      224,
      275,
      280,
      288
    ],
    "swatch": 4,
    "cmyk": [
      30,
      70,
      35,
      40
    ],
    "lab": [
      36.17303730830854,
      25.638132295719856,
      0.06225680933852118
    ],
    "rgb": [
      122,
      68,
      86
    ],
    "hex": "#7a4456"
  },
  {
    "name": "Violet Carmine",
    "combinations": [
      337
    ],
    "swatch": 4,
    "cmyk": [
      64,
      90,
      70,
      10
    ],
    "lab": [
      32.303349355306324,
      25.867704280155635,
      0.8171206225680976
    ],
    "rgb": [
      113,
      59,
      76
    ],
    "hex": "#713b4c"
  },
  {
    "name": "Violet",
    "combinations": [
      42,
      56,
      130,
      156,
      164,
      181,
      205,
      214,
      226,
      316,
      331,
      335
    ],
    "swatch": 4,
    "cmyk": [
      85,
      90,
      18,
      0
    ],
    "lab": [
      31.493095292591743,
      20.665369649805456,
      -37.92607003891051
    ],
    "rgb": [
      79,
      64,
      134
    ],
    "hex": "#4f4086"
  },
  {
    "name": "Red Violet",
    "combinations": [
      4,
      37,
      134,
      136,
      170,
      172,
      183,
      316
    ],
    "swatch": 4,
    "cmyk": [
      76,
      100,
      25,
      15
    ],
    "lab": [
      25.052262149996185,
      33.105058365758765,
      -30.05836575875486
    ],
    "rgb": [
      89,
      37,
      106
    ],
    "hex": "#59256a"
  },
  {
    "name": "Cotinga Purple",
    "combinations": [
      61,
      181,
      238,
      253,
      307,
      329,
      348
    ],
    "swatch": 4,
    "cmyk": [
      66,
      100,
      42,
      40
    ],
    "lab": [
      18.403906309605553,
      32.85992217898831,
      -15.762645914396884
    ],
    "rgb": [
      80,
      19,
      69
    ],
    "hex": "#501345"
  },
  {
    "name": "Dusky Madder Violet",
    "combinations": [
      18,
      50,
      53,
      82,
      103,
      314
    ],
    "swatch": 4,
    "cmyk": [
      75,
      100,
      46,
      30
    ],
    "lab": [
      20.103761348897535,
      28.64980544747081,
      -18.256809338521407
    ],
    "rgb": [
      78,
      29,
      76
    ],
    "hex": "#4e1d4c"
  },
  {
    "name": "White",
    "combinations": [
      55
    ],
    "swatch": 5,
    "cmyk": [
      0,
      0,
      0,
      0
    ],
    "lab": [
      100,
      0,
      0
    ],
    "rgb": [
      255,
      255,
      255
    ],
    "hex": "#ffffff"
  },
  {
    "name": "Neutral Gray",
    "combinations": [
      34,
      139,
      180,
      195,
      197,
      221,
      228,
      229,
      273,
      303,
      324,
      340
    ],
    "swatch": 5,
    "cmyk": [
      29,
      18,
      20,
      0
    ],
    "lab": [
      76.74525062943465,
      -3.0311284046692606,
      -2.0311284046692606
    ],
    "rgb": [
      182,
      191,
      193
    ],
    "hex": "#b6bfc1"
  },
  {
    "name": "Mineral Gray",
    "combinations": [
      11,
      30
    ],
    "swatch": 5,
    "cmyk": [
      33,
      18,
      25,
      7
    ],
    "lab": [
      70.75303273060197,
      -5.618677042801551,
      -0.0972762645914429
    ],
    "rgb": [
      162,
      176,
      173
    ],
    "hex": "#a2b0ad"
  },
  {
    "name": "Warm Gray",
    "combinations": [
      69,
      76,
      81,
      143,
      169,
      238,
      259,
      261
    ],
    "swatch": 5,
    "cmyk": [
      37,
      28,
      36,
      3
    ],
    "lab": [
      66.74753948271916,
      -2.2451361867704236,
      4.743190661478593
    ],
    "rgb": [
      161,
      163,
      154
    ],
    "hex": "#a1a39a"
  },
  {
    "name": "Slate Color",
    "combinations": [
      27,
      33,
      57,
      140,
      202,
      243,
      245,
      251,
      253,
      263,
      296,
      329,
      335
    ],
    "swatch": 5,
    "cmyk": [
      85,
      70,
      62,
      30
    ],
    "lab": [
      27.84771496147097,
      -5.3929961089494185,
      -6.9727626459144005
    ],
    "rgb": [
      52,
      69,
      76
    ],
    "hex": "#34454c"
  },
  {
    "name": "Black",
    "combinations": [
      46,
      52,
      62,
      69,
      112,
      117,
      144,
      190,
      207,
      216,
      221,
      242,
      255,
      256,
      269,
      276,
      288,
      298,
      313,
      323,
      337,
      340,
      344
    ],
    "swatch": 5,
    "cmyk": [
      20,
      10,
      15,
      100
    ],
    "lab": [
      5.62752727550164,
      -0.3968871595330796,
      -1.1245136186770424
    ],
    "rgb": [
      17,
      19,
      20
    ],
    "hex": "#111314"
  }
];

// src/visual/DictionaryOfColourCombinations.ts
var randomPalette = (minColours = 3) => {
  const d = data;
  const c = randomElement(d);
  if (c.combinations.length < minColours)
    return randomPalette(minColours);
  const combo = randomElement(c.combinations);
  const palette = [];
  for (const v of d) {
    if (v.name === c.name)
      continue;
    if (v.combinations.includes(combo)) {
      palette.push(v);
    }
  }
  if (palette.length < minColours)
    return randomPalette(minColours);
  else
    return palette;
};

export {
  Svg_exports,
  Palette_exports,
  Plot_exports,
  DictionaryOfColourCombinations_exports,
  visual_exports
};