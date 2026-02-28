async function loadBTC() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=jpy"
  );
  const data = await res.json();

  document.getElementById("btc").textContent =
    data.bitcoin.jpy.toLocaleString() + " 円";
}

loadBTC();