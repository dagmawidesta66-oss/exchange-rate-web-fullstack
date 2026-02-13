document.getElementById('predictForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let d = parseFloat(document.getElementById('domestic').value);
    let f = parseFloat(document.getElementById('foreign').value);
    let r = parseFloat(document.getElementById('lastRate').value);

    // PPP forecast
    let ppp = r * (1 + (d - f));

    // Random Walk forecast
    let rwm = r;

    // Trend with arrows
    let trendText = "";
    if(ppp > r){
        trendText = `<span style="color:red; font-weight:bold;">🔻 Currency likely depreciating</span>`;
    } else if(ppp < r){
        trendText = `<span style="color:green; font-weight:bold;">🔺 Currency likely appreciating</span>`;
    } else {
        trendText = `<span style="color:gray; font-weight:bold;">➡ Currency likely stable</span>`;
    }

    // Deep explanation with monetary + fiscal + trade policy
    let explanation = "";
    if(ppp > r){
        explanation = `
        <strong>Economic Scenario: Depreciating Currency</strong><br>
        - Domestic inflation is higher than foreign inflation, reducing your currency's purchasing power.<br>
        - Likely outcomes: High capital outflows, rising import costs, inflationary pressures.<br>
        - <strong>Monetary Policy:</strong> Increase interest rates to attract capital inflows, buy domestic currency, sell foreign reserves.<br>
        - <strong>Fiscal Policy:</strong> Reduce excessive government spending, consider targeted taxes, manage budget deficits to avoid worsening depreciation.<br>
        - <strong>Trade & Exports:</strong> Imports more expensive, exports more competitive if depreciation is controlled.<br>
        - <strong>Communication:</strong> Central bank and government must clearly communicate policy to maintain market confidence.<br>
        `;
    } else if(ppp < r){
        explanation = `
        <strong>Economic Scenario: Appreciating Currency</strong><br>
        - Domestic inflation is lower than foreign inflation, strengthening your currency.<br>
        - Likely outcomes: Capital inflows, export competitiveness may decline, risk of asset bubbles.<br>
        - <strong>Monetary Policy:</strong> Carefully lower interest rates to manage excessive appreciation, buy foreign currency, sell domestic currency.<br>
        - <strong>Fiscal Policy:</strong> Stimulate exports through tax incentives/subsidies, manage government spending to prevent overheating.<br>
        - <strong>Trade & Exports:</strong> Exports may become expensive, imports cheaper benefiting consumers.<br>
        - <strong>Communication:</strong> Signal policy intentions clearly to markets.<br>
        `;
    } else {
        explanation = `
        <strong>Economic Scenario: Stable Currency</strong><br>
        - Domestic and foreign inflation are roughly aligned; exchange rate stable.<br>
        - Likely outcomes: Normal capital flows, low immediate currency risk.<br>
        - <strong>Monetary Policy:</strong> Maintain current interest rates, monitor market for early signs of pressure.<br>
        - <strong>Fiscal Policy:</strong> Ensure sustainable government spending and taxation.<br>
        - <strong>Trade & Exports:</strong> Balanced imports and exports.<br>
        - <strong>Communication:</strong> Continue monitoring and transparent reporting to maintain market confidence.<br>
        `;
    }

    // Display basic results
    document.getElementById('results').innerHTML =
      `<p><strong>PPP Model forecast:</strong> ${ppp.toFixed(2)}</p>
       <p><strong>Random Walk Model forecast:</strong> ${rwm.toFixed(2)}</p>
       <p>${trendText}</p>`;

    // Put detailed explanation in hidden div
    document.getElementById('detailedExplanation').innerHTML = explanation;
});

// Toggle detailed explanation
document.getElementById('showExplanationBtn').addEventListener('click', function() {
    let div = document.getElementById('detailedExplanation');
    if(div.style.display === "none"){
        div.style.display = "block";
        this.textContent = "Hide How to Fix / Policy Advice";
    } else {
        div.style.display = "none";
        this.textContent = "Show How to Fix / Policy Advice";
    }
});
