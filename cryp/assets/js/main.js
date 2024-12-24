document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show-menu');
                toggle.classList.toggle('show-icon');
            });
        }
    };

    showMenu('nav-toggle', 'nav-menu');

    // Dropdown functionality
    const dropdownItems = document.querySelectorAll('.dropdown__item');

    dropdownItems.forEach((item) => {
        const dropdownButton = item.querySelector('.dropdown__button');

        if (dropdownButton) {
            dropdownButton.addEventListener('click', () => {
                const dropdownContainer = item.querySelector('.dropdown__container');
                const dropdownArrow = item.querySelector('.dropdown__arrow');

                if (dropdownContainer && dropdownArrow) {
                    dropdownContainer.style.height = dropdownContainer.style.height === 'auto' ? '0' : 'auto';
                    dropdownArrow.style.transform = dropdownArrow.style.transform === 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
                }

                // Close other dropdowns
                dropdownItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        const otherContainer = otherItem.querySelector('.dropdown__container');
                        const otherArrow = otherItem.querySelector('.dropdown__arrow');
                        if (otherContainer && otherArrow) {
                            otherContainer.style.height = '0';
                            otherArrow.style.transform = 'rotate(0)';
                        }
                    }
                });
            });
        }
    });

    // Crypto ticker functionality
    class CryptoTicker {
        constructor(elementId, cryptoList) {
            this.tickerElement = document.getElementById(elementId);
            this.cryptoList = cryptoList;
        }

        async fetchPrices() {
            // Simulated data fetch (replace with actual API call in production)
            return this.cryptoList.map(crypto => ({
                symbol: crypto,
                price: (Math.random() * 10000).toFixed(2),
                change: (Math.random() * 10 - 5).toFixed(2)
            }));
        }

        async updateTicker() {
            const prices = await this.fetchPrices();
            if (this.tickerElement) {
                this.tickerElement.innerHTML = '';

                prices.forEach(crypto => {
                    const tickerItem = document.createElement('div');
                    tickerItem.className = 'ticker-item';
                    tickerItem.innerHTML = `
                        <span class="crypto-symbol">${crypto.symbol}</span>
                        <span class="crypto-price">$${crypto.price}</span>
                        <span class="crypto-change ${parseFloat(crypto.change) >= 0 ? 'positive' : 'negative'}">
                            ${parseFloat(crypto.change) >= 0 ? '▲' : '▼'} ${Math.abs(parseFloat(crypto.change))}%
                        </span>
                    `;
                    this.tickerElement.appendChild(tickerItem);
                });
            }
        }

        startTicker() {
            this.updateTicker();
            setInterval(() => this.updateTicker(), 10000); // Update every 10 seconds
        }
    }

    const cryptoList = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA', 'DOT', 'LINK', 'BCH', 'XLM', 'UNI'];
    const ticker = new CryptoTicker('cryptoTicker', cryptoList);
    ticker.startTicker();

    // Market tracker functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const periodButtons = document.querySelectorAll('.period-button');
    const cryptoTableBody = document.getElementById('cryptoTableBody');
    const selectedCoinElement = document.getElementById('selectedCoin');
    let selectedCoin = null;
    let selectedPeriod = '1D';
    let currentTab = 'active';

    const coins = [
        { symbol: 'BTC', name: 'Bitcoin' },
        { symbol: 'ETH', name: 'Ethereum' },
        { symbol: 'BNB', name: 'Binance Coin' },
        { symbol: 'ADA', name: 'Cardano' },
        { symbol: 'DOGE', name: 'Dogecoin' },
        { symbol: 'XRP', name: 'Ripple' },
        { symbol: 'DOT', name: 'Polkadot' },
        { symbol: 'UNI', name: 'Uniswap' },
        { symbol: 'BCH', name: 'Bitcoin Cash' },
        { symbol: 'LTC', name: 'Litecoin' },
    ];

    function generateRandomPrice(base, volatility) {
        return (base + (Math.random() - 0.5) * volatility).toFixed(2);
    }

    function generateRandomChange() {
        return (Math.random() * 20 - 10).toFixed(2);
    }

    function generateRandomMarketCap(price) {
        const supply = Math.floor(Math.random() * 1000000000);
        return (price * supply).toFixed(0);
    }

    function updateCryptoTable() {
        if (cryptoTableBody) {
            cryptoTableBody.innerHTML = '';
            const sortedCoins = [...coins].sort((a, b) => {
                if (currentTab === 'gainers') {
                    return b.change - a.change;
                } else if (currentTab === 'losers') {
                    return a.change - b.change;
                }
                return 0;
            });

            sortedCoins.forEach(coin => {
                coin.price = generateRandomPrice(1000, 100);
                coin.change = generateRandomChange();
                coin.marketCap = generateRandomMarketCap(coin.price);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${coin.symbol}</td>
                    <td>$${coin.price}</td>
                    <td class="${parseFloat(coin.change) >= 0 ? 'positive' : 'negative'}">${coin.change}%</td>
                    <td>$${Number(coin.marketCap).toLocaleString()}</td>
                `;
                row.addEventListener('click', () => {
                    selectedCoin = coin;
                    if (selectedCoinElement) {
                        selectedCoinElement.textContent = coin.name;
                    }
                    updateChart();
                });
                cryptoTableBody.appendChild(row);
            });
        }
    }

    function updateChart() {
        if (!selectedCoin) return;

        // This is a placeholder for chart update functionality
        // In a real implementation, you would use a charting library like Chart.js or ApexCharts
        console.log(`Updating chart for ${selectedCoin.name} (${selectedCoin.symbol}) - ${selectedPeriod}`);
    }

    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentTab = button.dataset.tab;
                updateCryptoTable();
            });
        });
    }

    if (periodButtons) {
        periodButtons.forEach(button => {
            button.addEventListener('click', () => {
                periodButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedPeriod = button.dataset.period;
                updateChart();
            });
        });
    }

    // Initial update
    updateCryptoTable();
    setInterval(updateCryptoTable, 5000); // Update every 5 seconds

    // Email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            emailForm.reset();
        });
    }

    // Start trading button
    const startTradingBtn = document.getElementById('startTradingBtn');
    if (startTradingBtn) {
        startTradingBtn.addEventListener('click', () => {
            alert('Welcome to CryptoEx! Let\'s get you started with trading.');
        });
    }

    // Animate reason cards on scroll
    const reasonCards = document.querySelectorAll('.reason-card');
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    reasonCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Partner logo hover effect
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });


    // Trading View functionality
    function updateTradingView() {
        const tradingView = document.getElementById('trading-view');
        if (tradingView) {
            const coins = ['BTC', 'ETH', 'DOGE', 'XRP', 'ADA'];
            let content = '<table><tr><th>Coin</th><th>Price</th><th>Change</th></tr>';

            coins.forEach(coin => {
                const price = (Math.random() * 10000).toFixed(2);
                const change = (Math.random() * 10 - 5).toFixed(2);
                const changeClass = parseFloat(change) >= 0 ? 'positive' : 'negative';

                content += `
                    <tr>
                        <td>${coin}</td>
                        <td>$${price}</td>
                        <td class="${changeClass}">${change}%</td>
                    </tr>
                `;
            });

            content += '</table>';
            tradingView.innerHTML = content;
        }
    }
     
    // Update trading view every 5 seconds
    updateTradingView();
    setInterval(updateTradingView, 5000);


    
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (keep any existing code here)

    // Popular Cryptocurrency Cards functionality
    const cryptoCardGrid = document.getElementById('cryptoCardGrid');
    const popularCryptos = [
        { name: 'Bitcoin', symbol: 'BTC' },
        { name: 'Ethereum', symbol: 'ETH' },
        { name: 'Binance Coin', symbol: 'BNB' },
        { name: 'Cardano', symbol: 'ADA' },
        { name: 'Solana', symbol: 'SOL' },
        { name: 'XRP', symbol: 'XRP' },
        { name: 'Polkadot', symbol: 'DOT' },
        { name: 'Dogecoin', symbol: 'DOGE' }
    ];

    function createCryptoCard(crypto) {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <h3>${crypto.name} (${crypto.symbol})</h3>
            <div class="price">$<span id="${crypto.symbol}-price"></span></div>
            <canvas id="${crypto.symbol}-chart" class="chart"></canvas>
        `;
        return card;
    }

    function updateCryptoCards() {
        popularCryptos.forEach(crypto => {
            const price = (Math.random() * 10000).toFixed(2);
            const priceElement = document.getElementById(`${crypto.symbol}-price`);
            if (priceElement) {
                priceElement.textContent = price;
            }

            const chartCanvas = document.getElementById(`${crypto.symbol}-chart`);
            if (chartCanvas) {
                const ctx = chartCanvas.getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 100);
                gradient.addColorStop(0, 'rgba(78, 56, 216, 0.5)');
                gradient.addColorStop(1, 'rgba(78, 56, 216, 0.1)');

                // Generate random price data for the chart
                const data = Array.from({ length: 10 }, () => Math.random() * 1000 + 5000);

                ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
                ctx.beginPath();
                ctx.moveTo(0, chartCanvas.height - (data[0] / 100));
                data.forEach((price, index) => {
                    ctx.lineTo(index * (chartCanvas.width / 9), chartCanvas.height - (price / 100));
                });
                ctx.lineTo(chartCanvas.width, chartCanvas.height);
                ctx.lineTo(0, chartCanvas.height);
                ctx.closePath();
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, chartCanvas.height - (data[0] / 100));
                data.forEach((price, index) => {
                    ctx.lineTo(index * (chartCanvas.width / 9), chartCanvas.height - (price / 100));
                });
                ctx.strokeStyle = '#4e38d8';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

    if (cryptoCardGrid) {
        popularCryptos.forEach(crypto => {
            const card = createCryptoCard(crypto);
            cryptoCardGrid.appendChild(card);
        });

        updateCryptoCards();
        setInterval(updateCryptoCards, 5000); // Update every 5 seconds
    }

    // ... (keep any existing code here)
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (keep any existing code here)

    // Favorite Cryptocurrency Cards functionality
    const favoriteCryptoGrid = document.getElementById('favoriteCryptoGrid');
    const favoriteCryptos = [
        { name: 'Bitcoin', symbol: 'BTC' },
        { name: 'Ethereum', symbol: 'ETH' },
        { name: 'Cardano', symbol: 'ADA' },
        { name: 'Polkadot', symbol: 'DOT' },
        { name: 'Solana', symbol: 'SOL' },
        { name: 'Chainlink', symbol: 'LINK' }
    ];

    function createFavoriteCryptoCard(crypto) {
        const card = document.createElement('div');
        card.className = 'favorite-crypto-card';
        card.innerHTML = `
            <h3>${crypto.name} (${crypto.symbol})</h3>
            <div class="price">$<span id="${crypto.symbol}-fav-price"></span></div>
            <div class="chart-container">
                <canvas id="${crypto.symbol}-fav-chart"></canvas>
            </div>
            <div class="chart-buttons">
                <button class="chart-button active" data-period="month" data-symbol="${crypto.symbol}">Month</button>
                <button class="chart-button" data-period="year" data-symbol="${crypto.symbol}">Year</button>
            </div>
        `;
        return card;
    }

    function generateChartData(days) {
        return Array.from({ length: days }, (_, i) => ({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
            price: Math.random() * 1000 + 5000
        }));
    }

    function drawChart(canvas, data, color) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 20;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        const minPrice = Math.min(...data.map(d => d.price));
        const maxPrice = Math.max(...data.map(d => d.price));
        const priceRange = maxPrice - minPrice;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(padding, height - padding - (data[0].price - minPrice) / priceRange * chartHeight);

        data.forEach((point, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = height - padding - (point.price - minPrice) / priceRange * chartHeight;
            ctx.lineTo(x, y);
        });

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw price labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText(`$${minPrice.toFixed(2)}`, 0, height - padding);
        ctx.fillText(`$${maxPrice.toFixed(2)}`, 0, padding);

        // Draw date labels
        ctx.fillText(data[0].date.toLocaleDateString(), padding, height);
        ctx.fillText(data[data.length - 1].date.toLocaleDateString(), width - padding * 2, height);
    }

    function updateFavoriteCryptoCards() {
        favoriteCryptos.forEach(crypto => {
            const price = (Math.random() * 10000).toFixed(2);
            const priceElement = document.getElementById(`${crypto.symbol}-fav-price`);
            if (priceElement) {
                priceElement.textContent = price;
            }

            const chartCanvas = document.getElementById(`${crypto.symbol}-fav-chart`);
            if (chartCanvas) {
                const activeButton = document.querySelector(`.chart-button.active[data-symbol="${crypto.symbol}"]`);
                const period = activeButton ? activeButton.dataset.period : 'month';
                const days = period === 'month' ? 30 : 365;
                const data = generateChartData(days);
                drawChart(chartCanvas, data, '#4e38d8');
            }
        });
    }

    if (favoriteCryptoGrid) {
        favoriteCryptos.forEach(crypto => {
            const card = createFavoriteCryptoCard(crypto);
            favoriteCryptoGrid.appendChild(card);
        });

        favoriteCryptoGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('chart-button')) {
                const symbol = e.target.dataset.symbol;
                const period = e.target.dataset.period;
                const buttons = document.querySelectorAll(`.chart-button[data-symbol="${symbol}"]`);
                buttons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const chartCanvas = document.getElementById(`${symbol}-fav-chart`);
                if (chartCanvas) {
                    const days = period === 'month' ? 30 : 365;
                    const data = generateChartData(days);
                    drawChart(chartCanvas, data, '#4e38d8');
                }
            }
        });

        updateFavoriteCryptoCards();
        setInterval(updateFavoriteCryptoCards, 60000); // Update every minute
    }
    const currencies = [
        { code: 'EUR', flag: '🇪🇺' },
        { code: 'USD', flag: '🇺🇸' },
        { code: 'JPY', flag: '🇯🇵' },
        { code: 'GBP', flag: '🇬🇧' },
        { code: 'CHF', flag: '🇨🇭' },
        { code: 'AUD', flag: '🇦🇺' },
        { code: 'CAD', flag: '🇨🇦' },
        { code: 'NZD', flag: '🇳🇿' },
        { code: 'CNY', flag: '🇨🇳' }
    ];

    // Sample exchange rates (in real application, these would come from an API)
    const exchangeRates = {
        EUR: { USD: 1.0410, JPY: 163.407, GBP: 0.82957, CHF: 0.89910, AUD: 1.66528, CAD: 1.49280, NZD: 1.838000, CNY: 7.5839 },
        USD: { EUR: 0.9621, JPY: 157.111, GBP: 0.79734, CHF: 0.89910, AUD: 1.6017, CAD: 1.43570, NZD: 1.7676, CNY: 7.2941 },
        JPY: { EUR: 0.0061193, USD: 0.006362, GBP: 0.005073, CHF: 0.005718, AUD: 0.010190, CAD: 0.009132, NZD: 0.011249, CNY: 0.04638 },
        GBP: { EUR: 1.2050, USD: 1.2533, JPY: 196.973, CHF: 1.128740, AUD: 2.007980, CAD: 1.79974, NZD: 2.215640, CNY: 9.1441 },
        CHF: { EUR: 1.0672, USD: 1.1100, JPY: 174.446, GBP: 0.8852, AUD: 1.7780, CAD: 1.5929, NZD: 1.9622, CNY: 8.0969 },
        AUD: { EUR: 0.5960, USD: 0.62400, JPY: 98.091, GBP: 0.4955, CHF: 0.559020, CAD: 0.895470, NZD: 1.102150, CNY: 4.5483 },
        CAD: { EUR: 0.6696, USD: 0.6960, JPY: 109.436, GBP: 0.5552, CHF: 0.62610, AUD: 1.1152, NZD: 1.2304, CNY: 5.0792 },
        NZD: { EUR: 0.5436, USD: 0.56517, JPY: 88.883, GBP: 0.4509, CHF: 0.50810, AUD: 0.9037, CAD: 0.81186, CNY: 4.122 },
        CNY: { EUR: 0.13180, USD: 0.1371, JPY: 21.523, GBP: 0.10931, CHF: 0.1231, AUD: 0.216, CAD: 0.1965, NZD: 0.238 }
    };

    function createTable() {
        const table = document.getElementById('ratesTable');
        const headerRow = table.querySelector('thead tr');

        // Create header cells
        headerRow.innerHTML = '<th></th>'; // Empty corner cell
        currencies.forEach(currency => {
            headerRow.innerHTML += `
                <th>
                    <div class="currency-cell">
                        <span>${currency.flag}</span>
                        <span>${currency.code}</span>
                    </div>
                </th>
            `;
        });

        // Create table body
        const tbody = table.querySelector('tbody');
        currencies.forEach(rowCurrency => {
            const row = document.createElement('tr');
            
            // Add row header
            row.innerHTML = `
                <td>
                    <div class="currency-cell">
                        <span>${rowCurrency.flag}</span>
                        <span>${rowCurrency.code}</span>
                    </div>
                </td>
            `;

            // Add rate cells
            currencies.forEach(colCurrency => {
                if (rowCurrency.code === colCurrency.code) {
                    row.innerHTML += '<td class="rate-cell highlight">-</td>';
                } else {
                    const rate = exchangeRates[rowCurrency.code][colCurrency.code];
                    row.innerHTML += `
                        <td class="rate-cell">${rate ? rate.toFixed(6) : '-'}</td>
                    `;
                }
            });

            tbody.appendChild(row);
        });
    }

    // Initialize table
    createTable();

    // In a real application, you would update the rates periodically
    setInterval(() => {
        // Simulate rate updates
        const cells = document.querySelectorAll('.rate-cell:not(.highlight)');
        cells.forEach(cell => {
            const currentValue = parseFloat(cell.textContent);
            if (!isNaN(currentValue)) {
                const newValue = currentValue * (1 + (Math.random() - 0.5) * 0.001);
                cell.textContent = newValue.toFixed(6);
            }
        });
    }, 5000);
    // ... (keep any existing code here)
});