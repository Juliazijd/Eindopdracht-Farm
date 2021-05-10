const getYieldForPlant = (input, factors) => {
    let yieldResult

    if (factors.sun === "low") {
      yieldResult = input.crop.yield * (1 + (parseInt(input.crop.factors.sun.low)/100))
    } else if (factors.sun === "high") {
      yieldResult = input.crop.yield * (1 + (parseInt(input.crop.factors.sun.high)/100))
    } else {
      yieldResult = input.crop.yield
    }

    if (factors.wind === "medium") {
      yieldResult = yieldResult * (1 + (parseInt(input.crop.factors.wind.medium)/100))
    } else if (factors.wind === "heavy") {
      yieldResult = yieldResult * (1 + (parseInt(input.crop.factors.wind.heavy)/100))
    } 

    return yieldResult
}

const getYieldForCrop = (input, factors) => getYieldForPlant(input, factors) * input.numCrops

const getTotalYield = (input, factors) => {
    const crops = input.crops
    let totalYield = 0
    for (i = 0; i < crops.length; i++){
        totalYield += getYieldForCrop(crops[i], factors)
    }
    return totalYield
}

const getCostForPlant = input => input.cost

const getCostForCrop = input => getCostForPlant(input.crop) * input.numCrops

const getRevenueForCrop = (input, factors) => getYieldForPlant(input, factors) * input.crop.salePrice * input.numCrops

const getProfitForCrop = (input, factors) => getRevenueForCrop(input, factors) - getCostForCrop(input)

const getTotalProfit = (input, factors) => {
    const crops = input.crops
    let totalProfit = 0
    for (i = 0; i < crops.length; i++){
        totalProfit += getProfitForCrop(crops[i], factors)
    }
    return totalProfit
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop, 
    getTotalYield,
    getCostForPlant,
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}