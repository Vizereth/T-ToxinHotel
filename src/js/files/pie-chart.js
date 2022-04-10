let totalVotes = 260;

const votesData = {
  excellent: { count: 130, gradColor1: '#FFE39C', gradColor2: '#FFBA9C' },
  good: { count: 65, gradColor1: '#6FCF97', gradColor2: '#66D2EA' },
  satisfactory: { count: 65, gradColor1: '#BC9CFF', gradColor2: '#8BA4F9' },
  disappointing: { count: 0, gradColor1: '#919191', gradColor2: '#3D4975' },
};

class PieChart {
  constructor(el, data, total, fixWordFunction) {
    this.cvs = el;
    this.ctx = this.cvs.getContext('2d');
    this.width = 120;
    this.height = 120;

    this.sAngle = 0; // start angle
    this.eAngle = 0; // end angle

    this.total = total;
    this.data = data;
    this.colors = {
      1: { gradColor1: '#FFE39C', gradColor2: '#FFBA9C' },
      2: { gradColor1: '#6FCF97', gradColor2: '#66D2EA' },
      3: { gradColor1: '#BC9CFF', gradColor2: '#8BA4F9' },
      4: { gradColor1: '#919191', gradColor2: '#3D4975' },
    };

    this.textColor = 'rgba(188, 156, 255, 1)';
    this.fixWord = fixWordFunction;
  }

  init() {
    this.setSize();
    this.drawChart();
    this.drawText();
  }

  calculateRadian(n) {
    const deg = (n * 360) / this.total;
    const rad = (deg * Math.PI) / 180;

    return rad;
  }

  setSize() {
    this.cvs.width = this.width;
    this.cvs.height = this.height;
  }

  createGradient({
    cX,
    cY,
    radiusFull,
    startAngle,
    endAngle,
    gradColor1,
    gradColor2,
  }) {
    const gradStartX = cX + radiusFull * Math.sin(startAngle);
    const gradStartY = cY - radiusFull * Math.cos(startAngle);

    const gradEndX = cX + radiusFull * Math.sin(endAngle);
    const gradEndY = cY - radiusFull * Math.cos(endAngle);

    const grad = this.ctx.createLinearGradient(
      gradStartX,
      gradStartY,
      gradEndX,
      gradEndY
    );

    grad.addColorStop(0, gradColor1);
    grad.addColorStop(1, gradColor2);

    return grad;
  }

  drawArc(num, gradColor1, gradColor2) {
    /* The width of an arc */
    const lineWidth = 4;

    /* This value will be added to the start and end angles because the 0 degree point on the circle starts at 3 o'clock in canvas space. 
    E.g., a 180 degree arc starts from 3 o'clock and ends at 9 o'clock without this offset, whereas with the offset it'd start at 12 o'clock and end at 6'oclock (both arcs are drawn in counterclockwise direction). */
    const offset = 1.5 * Math.PI;

    const cX = this.width / 2;
    const cY = this.height / 2;
    const radius = this.width / 2 - lineWidth;
    const radiusFull = this.width / 2;

    /* Each arc is separated by empty space of N units in width, so this value will be substracted from the start angle and added to the end angle of an arc to separate it from other arcs. */
    const space = (1 * Math.PI) / 180;

    let startAngle = this.sAngle;
    let endAngle = Math.abs(startAngle - this.calculateRadian(num));

    const gradient = this.createGradient({
      cX,
      cY,
      radiusFull,
      startAngle,
      endAngle,
      gradColor1,
      gradColor2,
    });

    this.ctx.beginPath();
    this.ctx.arc(
      cX,
      cY,
      radius,
      startAngle + offset - space,
      endAngle + offset + space,
      true
    );
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.closePath();

    this.sAngle = endAngle;
  }

  drawText() {
    const numberText = '700 24px Montserrat';
    const titleText = '700 12px Montserrat';
    const gap = 20; // distance between text elements

    const word = this.fixWord(this.total);

    this.ctx.beginPath();
    this.ctx.font = numberText;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.textColor;
    this.ctx.fillText(this.total, this.height / 2, this.width / 2);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.font = titleText;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.textColor;
    this.ctx.fillText(word, this.height / 2, this.width / 2 + gap);
    this.ctx.closePath();
  }

  drawChart() {
    this.data.forEach((item) => {
      const count = item['count'];
      const color = item['color'];
      const colorType = this.colors[color];

      this.drawArc(count, colorType['gradColor1'], colorType['gradColor2']);
    });
  }
}

const fixVotesWord = (n) => {
  const digitsArray = n.toString().split('');
  const lastDigit = +digitsArray[digitsArray.length - 1];

  let word;

  if (lastDigit === 0) {
    word = 'Голосов';
  } else if (lastDigit === 1) {
    word = 'Голос';
  } else if (lastDigit > 0 && lastDigit < 5) {
    word = 'Голоса';
  } else if (lastDigit >= 5 && lastDigit <= 9) {
    word = 'Голосов';
  }

  return word.toUpperCase();
};

const drawPieChart = (() => {
  const pieChart = document.querySelector('.pie-chart');
  if (!pieChart) return;

  const canvas = pieChart.querySelector('.pie-chart__canvas');

  const list = pieChart.querySelector('.pie-chart__list');
  const listItems = pieChart.querySelectorAll('.pie-chart__list-item');

  const total = +list.dataset.total;
  const data = [];

  listItems.forEach((item) => {
    const itemData = {
      name: item.dataset.name,
      count: +item.dataset.value,
      color: +item.dataset.color,
    };
    data.push(itemData);
  });

  new PieChart(canvas, data, total, fixVotesWord).init();
})();
