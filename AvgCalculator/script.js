function fetchNumbers() {
    const numberId = document.getElementById('numberId').value;
    fetch(`http://localhost:9876/numbers/${numberId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error fetching numbers: ' + error;
        });
}