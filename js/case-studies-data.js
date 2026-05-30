/**
 * Dashboard Datasets and Filter Event Binding
 * Powers the interactive analytics widgets across Case Studies & Projects.
 */

const DashboardData = {
  /* --- HIMALAYAN EXPEDITION PLATFORM DATA --- */
  himalayan: {
    filters: {
      all: {
        kpis: { count: '11,425', success: '54.2%', death: '1.25%' },
        trend: { labels: ['1920s', '1940s', '1960s', '1980s', '2000s', '2020s'], data: [12, 45, 120, 560, 1850, 2400] },
        bars: { labels: ['Everest', 'K2', 'Lhotse', 'Makalu', 'Cho Oyu'], data: [1.6, 7.8, 1.2, 3.2, 0.9] } // Death rates by peak %
      },
      everest: {
        kpis: { count: '3,212', success: '48.5%', death: '1.60%' },
        trend: { labels: ['1920s', '1940s', '1960s', '1980s', '2000s', '2020s'], data: [5, 12, 38, 210, 890, 1200] },
        bars: { labels: ['Everest', 'Others'], data: [1.6, 1.1] }
      },
      k2: {
        kpis: { count: '412', success: '32.1%', death: '7.80%' },
        trend: { labels: ['1940s', '1960s', '1980s', '2000s', '2020s'], data: [2, 8, 48, 120, 184] },
        bars: { labels: ['K2', 'Others'], data: [7.8, 1.1] }
      },
      annapurna: {
        kpis: { count: '298', success: '28.4%', death: '12.4%' },
        trend: { labels: ['1950s', '1970s', '1990s', '2010s', '2020s'], data: [3, 14, 45, 92, 115] },
        bars: { labels: ['Annapurna', 'Others'], data: [12.4, 1.1] }
      }
    }
  },

  /* --- INSURANCE DISTRIBUTION DATA --- */
  insurance: {
    filters: {
      all: {
        kpis: { premium: '$12.4M', commission: '$1.48M', lossRatio: '42.5%' },
        trend: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [1.1, 1.3, 1.7, 2.1, 2.8, 3.4] }, // Millions
        bars: { labels: ['Bancassurance', 'Broker', 'Agency', 'Direct'], data: [420, 510, 280, 120] } // Agent count
      },
      motor: {
        kpis: { premium: '$6.8M', commission: '$0.82M', lossRatio: '58.2%' },
        trend: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [0.6, 0.7, 0.9, 1.1, 1.5, 2.0] },
        bars: { labels: ['Bancassurance', 'Broker', 'Agency', 'Direct'], data: [180, 310, 150, 40] }
      },
      health: {
        kpis: { premium: '$4.2M', commission: '$0.50M', lossRatio: '32.1%' },
        trend: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [0.4, 0.5, 0.6, 0.7, 0.9, 1.1] },
        bars: { labels: ['Bancassurance', 'Broker', 'Agency', 'Direct'], data: [210, 140, 90, 60] }
      },
      property: {
        kpis: { premium: '$1.4M', commission: '$0.16M', lossRatio: '18.4%' },
        trend: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [0.1, 0.1, 0.2, 0.3, 0.4, 0.3] },
        bars: { labels: ['Bancassurance', 'Broker', 'Agency', 'Direct'], data: [30, 60, 40, 20] }
      }
    }
  },

  /* --- BANCASSURANCE DATA --- */
  bancassurance: {
    filters: {
      all: {
        kpis: { policies: '45,800', paidClaims: '$2.85M', productivity: '82.5%' },
        trend: { labels: ['Q1-25', 'Q2-25', 'Q3-25', 'Q4-25', 'Q1-26'], data: [1200, 1450, 1900, 2100, 2400] }, // Conversion volumes
        bars: { labels: ['Apex Bank', 'Elite Cred.', 'Standard Co.', 'Prime Fin.'], data: [88, 72, 94, 61] } // Productivity Index
      },
      apex: {
        kpis: { policies: '15,200', paidClaims: '$1.10M', productivity: '88.0%' },
        trend: { labels: ['Q1-25', 'Q2-25', 'Q3-25', 'Q4-25', 'Q1-26'], data: [380, 480, 620, 710, 820] },
        bars: { labels: ['Apex Bank', 'Average'], data: [88, 77] }
      },
      elite: {
        kpis: { policies: '11,400', paidClaims: '$0.85M', productivity: '72.0%' },
        trend: { labels: ['Q1-25', 'Q2-25', 'Q3-25', 'Q4-25', 'Q1-26'], data: [310, 360, 440, 520, 580] },
        bars: { labels: ['Elite Cred.', 'Average'], data: [72, 77] }
      }
    }
  },

  /* --- SPOTIFY DATA --- */
  spotify: {
    filters: {
      all: {
        kpis: { hours: '840h', skipRate: '24.2%', uniqueTracks: '2,890' },
        trend: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], data: [20, 5, 80, 140, 110, 220] }, // Listen intensity
        bars: { labels: ['Indie Rock', 'Synthwave', 'Post-Punk', 'Lofi Beats', 'Jazz'], data: [35, 28, 22, 18, 12] } // Genre %
      },
      mobile: {
        kpis: { hours: '520h', skipRate: '28.5%', uniqueTracks: '1,920' },
        trend: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], data: [10, 2, 60, 90, 80, 120] },
        bars: { labels: ['Indie Rock', 'Synthwave', 'Post-Punk', 'Lofi Beats', 'Jazz'], data: [38, 24, 25, 10, 8] }
      },
      desktop: {
        kpis: { hours: '320h', skipRate: '17.2%', uniqueTracks: '1,450' },
        trend: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], data: [10, 3, 20, 50, 30, 100] },
        bars: { labels: ['Indie Rock', 'Synthwave', 'Post-Punk', 'Lofi Beats', 'Jazz'], data: [30, 35, 18, 30, 18] }
      }
    }
  }
};

// Initialize specific dashboard widget selectors
function bindDashboardFilters() {
  // Himalayan Expedition filter bindings
  const himalayanSelect = document.getElementById('filter-himalayan-peak');
  if (himalayanSelect) {
    himalayanSelect.addEventListener('change', (e) => {
      renderHimalayanDashboard(e.target.value);
    });
    // Init state
    renderHimalayanDashboard('all');
  }

  // Insurance filter bindings
  const insuranceSelect = document.getElementById('filter-insurance-lob');
  if (insuranceSelect) {
    insuranceSelect.addEventListener('change', (e) => {
      renderInsuranceDashboard(e.target.value);
    });
    renderInsuranceDashboard('all');
  }

  // Bancassurance bindings
  const bancassuranceSelect = document.getElementById('filter-bancassurance-bank');
  if (bancassuranceSelect) {
    bancassuranceSelect.addEventListener('change', (e) => {
      renderBancassuranceDashboard(e.target.value);
    });
    renderBancassuranceDashboard('all');
  }

  // Spotify bindings
  const spotifySelect = document.getElementById('filter-spotify-device');
  if (spotifySelect) {
    spotifySelect.addEventListener('change', (e) => {
      renderSpotifyDashboard(e.target.value);
    });
    renderSpotifyDashboard('all');
  }
}

/* --- RENDER WORKFLOW FUNCTIONS --- */
function renderHimalayanDashboard(filterKey) {
  const dataSet = DashboardData.himalayan.filters[filterKey] || DashboardData.himalayan.filters.all;
  
  // Bind KPI Numbers
  document.getElementById('kpi-himalayan-count').textContent = dataSet.kpis.count;
  document.getElementById('kpi-himalayan-success').textContent = dataSet.kpis.success;
  document.getElementById('kpi-himalayan-death').textContent = dataSet.kpis.death;

  // Render SVG charts
  Charts.drawLineChart('chart-himalayan-line', dataSet.trend.labels, dataSet.trend.data, { color: '#00D4FF' });
  Charts.drawBarChart('chart-himalayan-bar', dataSet.bars.labels, dataSet.bars.data, { color: '#FF5E7E' });
}

function renderInsuranceDashboard(filterKey) {
  const dataSet = DashboardData.insurance.filters[filterKey] || DashboardData.insurance.filters.all;
  
  document.getElementById('kpi-insurance-premium').textContent = dataSet.kpis.premium;
  document.getElementById('kpi-insurance-commission').textContent = dataSet.kpis.commission;
  document.getElementById('kpi-insurance-loss').textContent = dataSet.kpis.lossRatio;

  Charts.drawLineChart('chart-insurance-line', dataSet.trend.labels, dataSet.trend.data, { color: '#6EE7F9' });
  Charts.drawBarChart('chart-insurance-bar', dataSet.bars.labels, dataSet.bars.data, { color: '#00D4FF' });
}

function renderBancassuranceDashboard(filterKey) {
  const dataSet = DashboardData.bancassurance.filters[filterKey] || DashboardData.bancassurance.filters.all;
  
  const policiesEl = document.getElementById('kpi-bancassurance-policies');
  const claimsEl = document.getElementById('kpi-bancassurance-claims');
  const productivityEl = document.getElementById('kpi-bancassurance-prod');
  
  if (policiesEl) policiesEl.textContent = dataSet.kpis.policies;
  if (claimsEl) claimsEl.textContent = dataSet.kpis.paidClaims;
  if (productivityEl) productivityEl.textContent = dataSet.kpis.productivity;

  Charts.drawLineChart('chart-bancassurance-line', dataSet.trend.labels, dataSet.trend.data, { color: '#00D4FF' });
  Charts.drawBarChart('chart-bancassurance-bar', dataSet.bars.labels, dataSet.bars.data, { color: '#6EE7F9' });
}

function renderSpotifyDashboard(filterKey) {
  const dataSet = DashboardData.spotify.filters[filterKey] || DashboardData.spotify.filters.all;
  
  const hoursEl = document.getElementById('kpi-spotify-hours');
  const skipsEl = document.getElementById('kpi-spotify-skips');
  const tracksEl = document.getElementById('kpi-spotify-tracks');
  
  if (hoursEl) hoursEl.textContent = dataSet.kpis.hours;
  if (skipsEl) skipsEl.textContent = dataSet.kpis.skipRate;
  if (tracksEl) tracksEl.textContent = dataSet.kpis.uniqueTracks;

  Charts.drawLineChart('chart-spotify-line', dataSet.trend.labels, dataSet.trend.data, { color: '#6EE7F9' });
  Charts.drawBarChart('chart-spotify-bar', dataSet.bars.labels, dataSet.bars.data, { color: '#00D4FF' });
}

// Draw a simple preview chart for the Hero (widget right on home index)
function renderHeroWidgetChart() {
  const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const premiumTrend = [0.8, 1.2, 1.1, 1.9, 2.5, 3.4];
  Charts.drawLineChart('hero-db-line', trendLabels, premiumTrend, { color: '#00D4FF' });
}

// Self bootstrap on script loads
document.addEventListener('DOMContentLoaded', () => {
  bindDashboardFilters();
  
  // Hero Widget Loader
  if (document.getElementById('hero-db-line')) {
    setTimeout(renderHeroWidgetChart, 300);
  }
});
