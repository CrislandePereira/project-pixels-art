/* eslint-disable no-unused-vars */
const colors = [];
const colorPallete = document.getElementById('color-palette');
const clear = document.getElementById('clear-board');
const pixels = document.querySelector('.pixel');
const btnRandomColors = document.querySelector('#button-random-color');
const pegarCor = document.querySelectorAll('.color');
const arrayRgb = [];

function saveLocalStoragePalette(value) {
  localStorage.setItem('colorPalette', JSON.stringify(value));
}

function getLocalStoragePalette() {
  const colorPaletteStorage = localStorage.getItem('colorPalette');
  if (colorPaletteStorage) return JSON.parse(colorPaletteStorage);
  return null;
}

const coresRandom = () => {
  // sorteia as cores
  pegarCor[0].style.background = 'black';
  for (let index = 1; index < pegarCor.length; index += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    arrayRgb.push(rgb);
    pegarCor[index].style.background = rgb;
  }
  saveLocalStoragePalette(arrayRgb);
}; // referência: https://wallacemaxters.com.br/blog/48/como-gerar-cores-aleatorias-no-javascript#:~:text=Gerando%20cores%20RGBA&text=A%20fun%C3%A7%C3%A3o%20Math.,ser%C3%A1%20a%20opacidade%20da%20cor.

const btnClear = () => {
  clear.addEventListener('click', () => {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.background = 'white';
    }
  });
};

// função que cria a paleta de cores
const createPallet = () => {
  // cria e escolhe chama a função de sortear as cores
  for (let index = 0; index < 4; index += 1) {
    colors[index] = document.createElement('div');
    colors[index].classList = 'color';
    colors[0].classList.add('selected');
    colorPallete.appendChild(colors[index]);
  }
};

const createBoard = () => {
  // cria o quadro
  const pixelBoard = document.getElementById('pixel-board');
  const columns = [];
  for (let indexLine = 0; indexLine < 5; indexLine += 1) {
    for (let indexColumn = 0; indexColumn < 5; indexColumn += 1) {
      columns[indexColumn] = document.createElement('div');
      columns[indexColumn].classList = 'pixel';
      pixelBoard.appendChild(columns[indexColumn]);
    }
  }
};

const selecionaCor = () => {
  // seleciona a cor que será utilizada
  const cores = document.getElementsByClassName('color');
  for (let indexCor = 0; indexCor < cores.length; indexCor += 1) {
    cores[indexCor].addEventListener('click', (event) => {
      const corSelecionada = document.querySelector('.selected');
      if (corSelecionada) {
        corSelecionada.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

function initialColors() {
  const colorSaved = getLocalStoragePalette();
  if (colorSaved) {
    console.log(colorSaved);
    const [firstColor, secondColor, thirthColor] = colorSaved;
    // console.log(firstColor, secondColor, thirthColor);
    pegarCor[0].style.background = 'black';
    pegarCor[1].style.background = firstColor;
    pegarCor[2].style.background = secondColor;
    pegarCor[3].style.background = thirthColor;
  } else {
    pegarCor[0].style.background = 'black';
    pegarCor[1].style.background = 'red';
    pegarCor[2].style.background = 'blue';
    pegarCor[3].style.background = 'green';
  }
  // getLocalStorageColorBoard();
}

window.onload = () => {
  btnRandomColors.addEventListener('click', coresRandom);

  initialColors();
  createBoard();
  selecionaCor();
  btnClear();
};
