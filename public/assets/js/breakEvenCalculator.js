// public/assets/js/breakEvenCalculator.js

document.addEventListener('DOMContentLoaded', function () {

    // Function to add a new product form
    window.addProduct = function() {
        const productsContainer = document.getElementById('products-container');
        const productCount = productsContainer.querySelectorAll('.product').length + 1;

        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h5>${localization.product} ${productCount}</h5>
            <button type="button" class="btn btn-danger btn-sm remove-product-btn" onclick="removeProduct(this)">${localization.remove}</button>
            <div class="form-group">
                <label>${localization.productName}</label>
                <input type="text" class="form-control" name="productName" placeholder="${localization.product} ${productCount}">
            </div>
            <div class="form-group">
                <label>${localization.variableCostPerUnit}</label>
                <input type="number" class="form-control" name="variableCostPerUnit" step="0.01" required>
            </div>
            <div class="form-group">
                <label>${localization.pricePerUnit}</label>
                <input type="number" class="form-control" name="pricePerUnit" step="0.01" required>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    }

    // Function to remove a product form
    window.removeProduct = function(button) {
        const productDiv = button.closest('.product');
        productDiv.remove();

        // Update product headings
        const products = document.querySelectorAll('#products-container .product');
        products.forEach((product, index) => {
            const heading = product.querySelector('h5');
            heading.textContent = `${localization.product} ${index + 1}`;
        });

        // Hide allocation and projection sections if no products are left
        if (products.length === 0) {
            document.getElementById('allocation-section').style.display = 'none';
            document.getElementById('profit-loss-section').style.display = 'none';
            document.getElementById('break-even-result').innerHTML = '';
            if (window.breakEvenChartInstance) {
                window.breakEvenChartInstance.destroy();
            }
        }
    }

    // Break-even Form Submission
    document.getElementById('break-even-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const fixedCosts = parseFloat(document.getElementById('fixedCosts').value);
        const productElements = document.querySelectorAll('#products-container .product');
        const resultDiv = document.getElementById('break-even-result');

        if (isNaN(fixedCosts)) {
            resultDiv.innerHTML = `<p class="error">${localization.invalidNumbers}</p>`;
            return;
        }

        let products = [];
        let totalVariableCostPerUnit = 0;
        let totalPricePerUnit = 0;

        // Gather product data
        for (let i = 0; i < productElements.length; i++) {
            const productNameInput = productElements[i].querySelector('input[name="productName"]');
            let productName = productNameInput.value.trim();
            const variableCost = parseFloat(productElements[i].querySelector('input[name="variableCostPerUnit"]').value);
            const pricePerUnit = parseFloat(productElements[i].querySelector('input[name="pricePerUnit"]').value);

            // Assign default product name if left blank
            if (!productName) {
                productName = `${localization.product} ${i + 1}`;
                productNameInput.value = productName; // Update the input field with the default name
            }

            if (isNaN(variableCost) || isNaN(pricePerUnit)) {
                resultDiv.innerHTML = `<p class="error">${localization.invalidNumbers}</p>`;
                return;
            }

            if (pricePerUnit <= variableCost) {
                resultDiv.innerHTML = `<p class="error">${localization.priceError}</p>`;
                return;
            }

            products.push({
                name: productName,
                variableCost: variableCost,
                price: pricePerUnit,
                unitsToSell: 0, // Initialize with zero; will be calculated
                isFixed: false // Initialize as not fixed
            });

            totalVariableCostPerUnit += variableCost;
            totalPricePerUnit += pricePerUnit;
        }

        // Calculate contribution margin
        const contributionMargin = totalPricePerUnit - totalVariableCostPerUnit;
        if (contributionMargin <= 0) {
            resultDiv.innerHTML = `<p class="error">${localization.contributionMarginError}</p>`;
            return;
        }

        // Calculate break-even units and revenue
        const breakEvenUnits = fixedCosts / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * totalPricePerUnit;

        // Margin of Safety (assuming expected sales as break-even units + 10%)
        const expectedSalesForMargin = breakEvenUnits * 1.1;
        const marginOfSafety = expectedSalesForMargin - breakEvenUnits;

        // Generate HTML results
        resultDiv.innerHTML = `
            <h5>${localization.breakEvenPoint}:</h5>
            <p>${breakEvenUnits.toFixed(2)} units</p>
            <h5>${localization.breakEvenRevenue}:</h5>
            <p>$${breakEvenRevenue.toFixed(2)}</p>
            <h5>${localization.marginOfSafety}:</h5>
            <p>${marginOfSafety.toFixed(2)} units (${((marginOfSafety / expectedSalesForMargin) * 100).toFixed(2)}%)</p>
        `;

        // Prepare data for Chart.js
        generateChart(breakEvenUnits, expectedSalesForMargin, fixedCosts, totalVariableCostPerUnit, totalPricePerUnit);

        // Initialize Allocation Section
        initializeAllocations(breakEvenUnits, products);
    });

    // Function to initialize allocations with sliders and checkboxes
    function initializeAllocations(breakEvenUnits, products) {
        const allocationSection = document.getElementById('allocation-section');
        const allocationContainer = document.getElementById('allocation-container');

        // Clear previous allocations if any
        allocationContainer.innerHTML = '';

        // Calculate initial allocation (even distribution)
        const initialAllocation = breakEvenUnits / products.length;

        products.forEach((product, index) => {
            product.unitsToSell = initialAllocation;
            const allocationDiv = document.createElement('div');
            allocationDiv.className = 'slider-container';
            allocationDiv.innerHTML = `
                <div class="slider-label">
                    <span>${product.name}</span>
                    <div>
                        <span id="slider-value-${index}" class="slider-value">${product.unitsToSell.toFixed(2)} units</span>
                        <% if (products.length > 2) { %>
                            <input type="checkbox" class="fixed-allocation" id="fix-allocation-${index}" data-product-index="${index}">
                            <label for="fix-allocation-${index}" class="ml-2">${localization.fixAllocation}</label>
                        <% } %>
                    </div>
                </div>
                <input type="range" class="form-control-range allocation-slider" id="slider-${index}" data-product-index="${index}" min="0" max="${breakEvenUnits * 2}" step="0.1" value="${product.unitsToSell}">
            `;
            allocationContainer.appendChild(allocationDiv);
        });

        // Show the allocation section
        allocationSection.style.display = 'block';

        // Attach event listeners to sliders
        const sliders = document.querySelectorAll('.allocation-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', function() {
                handleSliderChange(this, breakEvenUnits, products);
            });
        });

        // Attach event listeners to fix allocation checkboxes (if more than two products)
        if (products.length > 2) {
            const fixCheckboxes = document.querySelectorAll('.fixed-allocation');
            fixCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    handleFixAllocationChange(this, products);
                });
            });
        }
    }

    // Function to handle checkbox changes for fixing allocations
    function handleFixAllocationChange(checkbox, products) {
        const index = parseInt(checkbox.getAttribute('data-product-index'));
        const slider = document.getElementById(`slider-${index}`);
        const sliderValueSpan = document.getElementById(`slider-value-${index}`);

        if (checkbox.checked) {
            // Mark the product as fixed
            products[index].isFixed = true;
            // Disable the slider to prevent manual changes
            slider.disabled = true;
            // Optionally, style the slider to indicate it's fixed
            slider.style.opacity = '0.6';
            slider.style.cursor = 'not-allowed';
        } else {
            // Unmark the product as fixed
            products[index].isFixed = false;
            // Enable the slider
            slider.disabled = false;
            slider.style.opacity = '1';
            slider.style.cursor = 'pointer';
        }
    }

    // Function to handle slider changes
    function handleSliderChange(changedSlider, breakEvenUnits, products) {
        const changedIndex = parseInt(changedSlider.getAttribute('data-product-index'));
        const changedValue = parseFloat(changedSlider.value);
        const sliders = document.querySelectorAll('.allocation-slider');

        // Update the displayed value
        const sliderValueSpan = document.getElementById(`slider-value-${changedIndex}`);
        if (sliderValueSpan) {
            sliderValueSpan.textContent = `${changedValue.toFixed(2)} units`;
        }

        // Update the product's unitsToSell
        products[changedIndex].unitsToSell = changedValue;

        // Calculate the total allocated units
        let totalAllocated = 0;
        products.forEach(product => {
            totalAllocated += product.unitsToSell;
        });

        // Calculate the difference from the break-even units
        const difference = breakEvenUnits - totalAllocated;

        if (difference !== 0) {
            // Get list of non-fixed products excluding the changed one
            const adjustableProducts = products.filter((product, idx) => !product.isFixed && idx !== changedIndex);
            const totalAdjustableUnits = adjustableProducts.reduce((sum, product) => sum + product.unitsToSell, 0);

            if (adjustableProducts.length === 0) {
                // If no adjustable products, reset the changed slider to maintain total
                alert(localization.allocationError);
                changedSlider.value = products[changedIndex].unitsToSell - difference;
                sliderValueSpan.textContent = `${products[changedIndex].unitsToSell.toFixed(2)} units`;
                return;
            }

            adjustableProducts.forEach(product => {
                const idx = products.indexOf(product);
                const slider = document.getElementById(`slider-${idx}`);
                const sliderValueSpan = document.getElementById(`slider-value-${idx}`);

                // Calculate the proportional adjustment
                const proportion = product.unitsToSell / totalAdjustableUnits;
                const adjustment = proportion * difference;
                const newValue = product.unitsToSell + adjustment;

                // Update the product's unitsToSell
                products[idx].unitsToSell = Math.max(newValue, 0);

                // Update the slider and displayed value
                slider.value = products[idx].unitsToSell.toFixed(2);
                sliderValueSpan.textContent = `${products[idx].unitsToSell.toFixed(2)} units`;
            });

            // Recalculate the total allocated units to correct any floating point discrepancies
            totalAllocated = products.reduce((sum, product) => sum + product.unitsToSell, 0);
            const residual = breakEvenUnits - totalAllocated;

            if (Math.abs(residual) > 0.01) { // Allow a small margin
                // Adjust the first non-fixed and non-changed product to compensate
                for (let i = 0; i < products.length; i++) {
                    if (i !== changedIndex && !products[i].isFixed) {
                        products[i].unitsToSell += residual;
                        const slider = document.getElementById(`slider-${i}`);
                        if (slider) {
                            slider.value = products[i].unitsToSell.toFixed(2);
                            const sliderValueSpan = document.getElementById(`slider-value-${i}`);
                            if (sliderValueSpan) {
                                sliderValueSpan.textContent = `${products[i].unitsToSell.toFixed(2)} units`;
                            }
                        }
                        break;
                    }
                }
            }
        }

        // Recalculate and update the results
        recalculateResults();
    }

    // Function to recalculate results based on current allocations
    function recalculateResults() {
        const fixedCosts = parseFloat(document.getElementById('fixedCosts').value);
        const productElements = document.querySelectorAll('#products-container .product');
        const allocationSliders = document.querySelectorAll('.allocation-slider');
        const resultDiv = document.getElementById('break-even-result');

        let products = [];
        let totalVariableCostPerUnit = 0;
        let totalPricePerUnit = 0;
        let totalUnits = 0;

        for (let i = 0; i < productElements.length; i++) {
            const productNameInput = productElements[i].querySelector('input[name="productName"]');
            let productName = productNameInput.value.trim();
            const variableCost = parseFloat(productElements[i].querySelector('input[name="variableCostPerUnit"]').value);
            const pricePerUnit = parseFloat(productElements[i].querySelector('input[name="pricePerUnit"]').value);
            const unitsToSell = parseFloat(allocationSliders[i].value);
            const isFixed = false; // This will be updated based on checkbox state

            // Assign default product name if left blank
            if (!productName) {
                productName = `${localization.product} ${i + 1}`;
                productNameInput.value = productName; // Update the input field with the default name
            }

            if (isNaN(variableCost) || isNaN(pricePerUnit) || isNaN(unitsToSell)) {
                resultDiv.innerHTML = `<p class="error">${localization.invalidNumbers}</p>`;
                return;
            }

            if (pricePerUnit <= variableCost) {
                resultDiv.innerHTML = `<p class="error">${localization.priceError}</p>`;
                return;
            }

            // Determine if the product is fixed based on the checkbox
            const fixCheckbox = document.getElementById(`fix-allocation-${i}`);
            const productIsFixed = fixCheckbox ? fixCheckbox.checked : false;

            products.push({
                name: productName,
                variableCost: variableCost,
                price: pricePerUnit,
                unitsToSell: unitsToSell,
                isFixed: productIsFixed
            });

            totalVariableCostPerUnit += variableCost;
            totalPricePerUnit += pricePerUnit;
            totalUnits += unitsToSell;
        }

        // Calculate contribution margin
        const contributionMargin = totalPricePerUnit - totalVariableCostPerUnit;
        if (contributionMargin <= 0) {
            resultDiv.innerHTML = `<p class="error">${localization.contributionMarginError}</p>`;
            return;
        }

        // Calculate break-even units and revenue
        const breakEvenUnits = fixedCosts / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * totalPricePerUnit;

        // Margin of Safety (assuming expected sales as break-even units + 10%)
        const expectedSalesForMargin = breakEvenUnits * 1.1;
        const marginOfSafety = expectedSalesForMargin - breakEvenUnits;

        // Generate HTML results
        resultDiv.innerHTML = `
            <h5>${localization.breakEvenPoint}:</h5>
            <p>${breakEvenUnits.toFixed(2)} units</p>
            <h5>${localization.breakEvenRevenue}:</h5>
            <p>$${breakEvenRevenue.toFixed(2)}</p>
            <h5>${localization.marginOfSafety}:</h5>
            <p>${marginOfSafety.toFixed(2)} units (${((marginOfSafety / expectedSalesForMargin) * 100).toFixed(2)}%)</p>
        `;

        // Prepare data for Chart.js
        generateChart(breakEvenUnits, expectedSalesForMargin, fixedCosts, totalVariableCostPerUnit, totalPricePerUnit);
    }

    // Function to generate the break-even chart
    function generateChart(breakEvenUnits, expectedSales, fixedCosts, totalVariableCostPerUnit, totalPricePerUnit) {
        const ctx = document.getElementById('breakEvenChart').getContext('2d');

        // Destroy existing chart if it exists to avoid duplication
        if (window.breakEvenChartInstance) {
            window.breakEvenChartInstance.destroy();
        }

        // Data Points
        const units = [];
        const revenue = [];
        const costs = [];

        for (let u = 0; u <= Math.ceil(expectedSales * 1.2); u++) {
            units.push(u);
            revenue.push(u * totalPricePerUnit);
            costs.push(fixedCosts + (u * totalVariableCostPerUnit));
        }

        window.breakEvenChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: units,
                datasets: [
                    {
                        label: localization.revenue,
                        data: revenue,
                        borderColor: 'green',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: localization.costs,
                        data: costs,
                        borderColor: 'red',
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: localization.breakEvenAnalysis
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    legend: {
                        position: 'top',
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: localization.unitsSold
                        },
                        ticks: {
                            maxTicksLimit: 20
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: localization.amount
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

});