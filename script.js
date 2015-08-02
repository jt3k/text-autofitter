///helpers
function hashFunc() {
  // not really an efficient hash function
  return JSON.stringify(arguments);
}

/*На входе:
   1) текстовая строка,
   2) ширина блока куда она должна уместиться,
   3) стиль текстовой строки (все параметры не обязательны).
На выходе:
   шрифт при котором текстовая строка(text) влезет в блок шириной(width)
*/
var si = function(opt) {
  //   opt = {
  //     text: '',
  //     wishfulWidth: 300,
  //     styleObj: {}
  //   };

//   console.log('noCache');
  if (!opt) {
    return;
  }

  var widthFromSize = function(line, size) {
      line.style.fontSize = size + 'px';
      return line.offsetWidth;
    },
    line = document.createElement('span'),
    width, k, resultWidth;

  //default values in attributes
  var textNode = document.createTextNode(opt.text || 'example');
  opt.wishfulWidth = opt.wishfulWidth || 300;
  opt.styleObj = _.extend({}, {
    'whiteSpace': 'nowrap',
    'fontFamily': 'sans-serif'
  }, opt.styleObj);


  line.appendChild(textNode);
  appendStyle(line, opt.styleObj);
  document.body.appendChild(line);

  //при шрифте 100px делим ширину строки на размер гарнитуры
  k = widthFromSize(line, 100) / 100;

  //получаем требуемый размер шрифта 
  resultWidth = (opt.wishfulWidth - 1) / k;

  document.body.removeChild(line);
  return resultWidth;
};

//делаем функцию запоминающей
si = _.memoize(si, hashFunc);
//console.log(si('проверко',200)); //вернёт какого размера должен быть текст чтобы уместиться в ширину 200


//
function appendStyle(el, styleObj) {
  for (var i in styleObj) {
    if (styleObj.hasOwnProperty(i)) {
      el.style[i] = styleObj[i];
    }
  }
}

var helpe = function(arr, style, width) {
  //var crP = function(){ return document.CreateElement('p')}
  var p, span;
  var obj = document.createElement('div');
  obj.id = 'lalala';
  //   obj.style.lineHeight = 1;
  if (typeof arr === 'string' && arr.length) {
    arr = arr.split('\n');
  } else { //if empty
    return obj;
  }

  var stylesForSi = _.pick(style, function(val, key) {
    return /font|letter/.test(key);
  });

  for (var i in arr) {
    span = document.createElement('span');
    p = document.createElement('p');
    p.style.textAlign = 'center';
    p.style.margin = '0';
    p.appendChild(span);

    span.appendChild(document.createTextNode(arr[i]));
    style.fontSize = si({
      text: arr[i],
      wishfulWidth: width,
      styleObj: stylesForSi
    }) + 'px';
    style.backgroundColor = '#' + Math.random().toString(16).slice(-6);
    style.color = '#' + Math.random().toString(16).slice(-6);

    appendStyle(span, style);

    obj.appendChild(p);
  }
  return obj;
};


//psdz

var psdz = function(text, width) {
  //options
  var styleObj = {
      "fontFamily": 'serif',
      "fontWeight": 'bold',
      "letterSpacing": '-.07em',
      "fontStyle": 'italic',
      "white-space": 'nowrap'
    },
    o = document.getElementById('output');
  o.innerHTML = '';
  o.appendChild(helpe(text, styleObj, width));
};

//psdz = _.debounce(psdz, 150);

var range = document.getElementById('range');
var rangeVal = document.getElementById('range-val');
var inp = document.getElementById('input');
inp.oninput = range.oninput = function() {
  psdz(inp.value, range.value);
  rangeVal.innerHTML = range.value;
};

// psdz(inp.value, range.value);
inp.oninput();