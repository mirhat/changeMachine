function getChange(sum, coins) {
    const initialSum = sum;
    
    if (coins.length < 1 || sum < 0) {
        return {
            isOk: false,
            change: [],
        };
    }
    var result = {
        isOk: true,
        change: [],
    }
    var coinIndex = 0;
    sum = Number(((sum / coins[coins.length - 1].denomination) * coins[coins.length - 1].denomination).toFixed(2));

    while (sum > 0 && coinIndex < coins.length) {
        const value = coins[coinIndex].denomination;
        const numberOfItems = coins[coinIndex].numberOfItems;
        const coinChange = Number((Math.floor(sum / value) * value).toFixed(2));

        let numberOfChangeItems = parseInt(coinChange / value);
        if (numberOfChangeItems > numberOfItems) {
            numberOfChangeItems = numberOfItems
        }

        if (numberOfChangeItems > 0) {
            result.change.push({
                coin: value,
                numberOfItems: numberOfChangeItems
            })            
            sum -= numberOfChangeItems * value;
            sum = sum.toFixed(2);
        }
        coinIndex++;
    }    

    if (sum > 0.001) {
        if (coins.length > 1) {
            coins.splice(0, 1);
            return getChange(initialSum, coins);
        }
        return {
            isOk: false,
            change: [],
        };
    }
    return result;
}

export { getChange };