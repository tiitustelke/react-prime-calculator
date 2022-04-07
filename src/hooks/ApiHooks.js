const apiBaseUrl = 'http://localhost:3001/primeapi'

const getIsPrimeNumber = async (number) => {
    try {
        const response = await fetch(`${apiBaseUrl}/checkprime?number=${number}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        })
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const getSumAndIsPrimeNumber = async (numbers) => {
    try {
        const nums = JSON.stringify(numbers);
        const response = await fetch(`${apiBaseUrl}/sumandcheck?numbers=${nums}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        })
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export {getSumAndIsPrimeNumber, getIsPrimeNumber};