/**
 * Custom Lightweight SVG Charting Engine
 * Creates beautiful, crisp, vector-based interactive charts
 * without bloated external library loads.
 */

const Charts = {
  // Helper to create SVG elements
  createSvgElement(type, attributes = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
    return el;
  },

  // Line & Area Chart Renderer
  drawLineChart(containerId, labels, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    const width = container.offsetWidth || 350;
    const height = container.offsetHeight || 150;
    const padding = { top: 15, right: 15, bottom: 25, left: 35 };
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const strokeColor = options.color || '#00D4FF';
    const fillGradientId = `grad-${containerId}`;
    
    // Math utilities
    const maxVal = Math.max(...data) * 1.15 || 100;
    const minVal = 0;
    const valRange = maxVal - minVal;
    
    // Create master SVG
    const svg = this.createSvgElement('svg', {
      width: '100%',
      height: '100%',
      viewBox: `0 0 ${width} ${height}`,
      style: 'overflow: visible;'
    });
    
    // Create gradients definition
    const defs = this.createSvgElement('defs');
    const linearGrad = this.createSvgElement('linearGradient', {
      id: fillGradientId,
      x1: '0%', y1: '0%', x2: '0%', y2: '100%'
    });
    linearGrad.appendChild(this.createSvgElement('stop', { offset: '0%', 'stop-color': strokeColor, 'stop-opacity': '0.25' }));
    linearGrad.appendChild(this.createSvgElement('stop', { offset: '100%', 'stop-color': strokeColor, 'stop-opacity': '0.0' }));
    defs.appendChild(linearGrad);
    svg.appendChild(defs);
    
    // Draw grid lines
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const yVal = minVal + (valRange * i / gridCount);
      const y = padding.top + chartHeight - (chartHeight * (yVal - minVal) / valRange);
      
      // Horizontal guide grid line
      const line = this.createSvgElement('line', {
        x1: padding.left,
        y1: y,
        x2: padding.left + chartWidth,
        y2: y,
        stroke: 'rgba(255, 255, 255, 0.035)',
        'stroke-width': '1',
        'stroke-dasharray': '2 4'
      });
      svg.appendChild(line);
      
      // Y-Axis label
      const yLabel = this.createSvgElement('text', {
        x: padding.left - 8,
        y: y + 3,
        fill: '#A0AEC0',
        'font-size': '8.5px',
        'font-family': 'var(--font-mono)',
        'text-anchor': 'end'
      });
      yLabel.textContent = Math.round(yVal);
      svg.appendChild(yLabel);
    }
    
    // Calculate coordinates for all points
    const points = data.map((val, idx) => {
      const x = padding.left + (chartWidth * idx / (data.length - 1));
      const y = padding.top + chartHeight - (chartHeight * (val - minVal) / valRange);
      return { x, y, value: val, label: labels[idx] };
    });
    
    // Build path structures
    let linePathD = '';
    let areaPathD = `M ${padding.left} ${padding.top + chartHeight} `;
    
    points.forEach((pt, idx) => {
      if (idx === 0) {
        linePathD += `M ${pt.x} ${pt.y} `;
        areaPathD += `L ${pt.x} ${pt.y} `;
      } else {
        // Curve control points for smooth lines
        const prevPt = points[idx - 1];
        const cp1x = prevPt.x + (pt.x - prevPt.x) / 2;
        const cp1y = prevPt.y;
        const cp2x = prevPt.x + (pt.x - prevPt.x) / 2;
        const cp2y = pt.y;
        
        linePathD += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y} `;
        areaPathD += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y} `;
      }
    });
    
    areaPathD += `L ${points[points.length - 1].x} ${padding.top + chartHeight} Z`;
    
    // Draw fill area
    const area = this.createSvgElement('path', {
      d: areaPathD,
      fill: `url(#${fillGradientId})`
    });
    svg.appendChild(area);
    
    // Draw stroke line
    const strokeLine = this.createSvgElement('path', {
      d: linePathD,
      fill: 'none',
      stroke: strokeColor,
      'stroke-width': '2',
      'stroke-linecap': 'round',
      style: 'filter: drop-shadow(0 0 4px ' + strokeColor + '55);'
    });
    svg.appendChild(strokeLine);
    
    // Draw X Axis label nodes
    points.forEach((pt, idx) => {
      // Limit to 4-5 labels for clean responsive sizing
      if (data.length <= 6 || idx % Math.ceil(data.length / 5) === 0 || idx === data.length - 1) {
        const xLabel = this.createSvgElement('text', {
          x: pt.x,
          y: padding.top + chartHeight + 15,
          fill: '#A0AEC0',
          'font-size': '8.5px',
          'font-family': 'var(--font-heading)',
          'text-anchor': 'middle'
        });
        xLabel.textContent = pt.label;
        svg.appendChild(xLabel);
      }
      
      // Node interactive circles
      const circle = this.createSvgElement('circle', {
        cx: pt.x,
        cy: pt.y,
        r: '3.5',
        fill: '#131A29',
        stroke: strokeColor,
        'stroke-width': '1.5',
        style: 'cursor: pointer; transition: all 0.2s;'
      });
      
      // Hover overlay trigger
      circle.addEventListener('mouseenter', () => {
        circle.setAttribute('r', '5.5');
        circle.setAttribute('fill', strokeColor);
        
        // Show lightweight floating tooltip
        this.showChartTooltip(container, pt.x, pt.y, `${pt.label}: ${pt.value}`);
      });
      
      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '3.5');
        circle.setAttribute('fill', '#131A29');
        this.hideChartTooltip(container);
      });
      
      svg.appendChild(circle);
    });
    
    container.appendChild(svg);
  },

  // Bar Chart Renderer
  drawBarChart(containerId, labels, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    const width = container.offsetWidth || 350;
    const height = container.offsetHeight || 150;
    const padding = { top: 15, right: 15, bottom: 25, left: 35 };
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const barColor = options.color || '#6EE7F9';
    const maxVal = Math.max(...data) * 1.1 || 100;
    const minVal = 0;
    const valRange = maxVal - minVal;
    
    const svg = this.createSvgElement('svg', {
      width: '100%',
      height: '100%',
      viewBox: `0 0 ${width} ${height}`,
      style: 'overflow: visible;'
    });
    
    // Draw background guides
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const yVal = minVal + (valRange * i / gridCount);
      const y = padding.top + chartHeight - (chartHeight * (yVal - minVal) / valRange);
      
      const line = this.createSvgElement('line', {
        x1: padding.left,
        y1: y,
        x2: padding.left + chartWidth,
        y2: y,
        stroke: 'rgba(255, 255, 255, 0.035)',
        'stroke-width': '1',
        'stroke-dasharray': '2 4'
      });
      svg.appendChild(line);
      
      const yLabel = this.createSvgElement('text', {
        x: padding.left - 8,
        y: y + 3,
        fill: '#A0AEC0',
        'font-size': '8.5px',
        'font-family': 'var(--font-mono)',
        'text-anchor': 'end'
      });
      yLabel.textContent = Math.round(yVal);
      svg.appendChild(yLabel);
    }
    
    // Render columns
    const barSpacing = 0.35; // % gap
    const groupWidth = chartWidth / data.length;
    const barWidth = groupWidth * (1 - barSpacing);
    
    data.forEach((val, idx) => {
      const x = padding.left + (groupWidth * idx) + (groupWidth * barSpacing / 2);
      const barHeight = chartHeight * (val - minVal) / valRange;
      const y = padding.top + chartHeight - barHeight;
      
      // Visual column box (rounded top corners)
      const bar = this.createSvgElement('rect', {
        x: x,
        y: y,
        width: barWidth,
        height: barHeight,
        rx: '3', // top corners rounded
        fill: barColor,
        style: 'cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);',
        opacity: 0.85
      });
      
      // Animate entry height from bottom
      bar.style.transformOrigin = `0px ${padding.top + chartHeight}px`;
      bar.animate([
        { transform: 'scaleY(0)' },
        { transform: 'scaleY(1)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
      });
      
      bar.addEventListener('mouseenter', () => {
        bar.setAttribute('opacity', '1');
        bar.setAttribute('fill', '#00D4FF');
        this.showChartTooltip(container, x + barWidth / 2, y, `${labels[idx]}: ${val}`);
      });
      
      bar.addEventListener('mouseleave', () => {
        bar.setAttribute('opacity', '0.85');
        bar.setAttribute('fill', barColor);
        this.hideChartTooltip(container);
      });
      
      svg.appendChild(bar);
      
      // X Label
      if (data.length <= 8 || idx % 2 === 0) {
        const xLabel = this.createSvgElement('text', {
          x: x + barWidth / 2,
          y: padding.top + chartHeight + 15,
          fill: '#A0AEC0',
          'font-size': '8.5px',
          'font-family': 'var(--font-heading)',
          'text-anchor': 'middle'
        });
        xLabel.textContent = labels[idx];
        svg.appendChild(xLabel);
      }
    });
    
    container.appendChild(svg);
  },

  // Tooltip Helper Systems
  showChartTooltip(container, x, y, text) {
    this.hideChartTooltip(container);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#131A29';
    tooltip.style.border = '1px solid #00D4FF';
    tooltip.style.padding = '0.35rem 0.6rem';
    tooltip.style.borderRadius = '4px';
    tooltip.style.color = '#FFFFFF';
    tooltip.style.fontSize = '10px';
    tooltip.style.fontFamily = 'var(--font-mono)';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.boxShadow = '0 0 10px rgba(0,212,255,0.2)';
    tooltip.style.zIndex = '50';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.transition = 'opacity 0.15s ease';
    tooltip.style.opacity = '0';
    tooltip.textContent = text;
    
    container.appendChild(tooltip);
    
    // Align tooltip to center on node
    const ttWidth = tooltip.offsetWidth;
    const ttHeight = tooltip.offsetHeight;
    
    tooltip.style.left = `${x - ttWidth / 2}px`;
    tooltip.style.top = `${y - ttHeight - 8}px`;
    tooltip.style.opacity = '1';
  },

  hideChartTooltip(container) {
    const existing = container.querySelectorAll('.chart-tooltip');
    existing.forEach(el => el.remove());
  }
};
